var fg = (function () {
    var SPACE = "&nbsp;&nbsp;"
    var LEVEL = ["","★","★★","★★★","★★★★","★★★★★"]

    var update_figure=function(card, id){
        card.skill_level=$("#"+id+" .skill_level").val()
        card.skill_name=$("#"+id+" .skill_name").val()
        card.graduated=$("#"+id+" .graduated").val()
        card.ready_to_convert=$("#"+id+" .ready_to_convert").val()
        card.is_seed=$("#"+id+" .is_seed").val()
        card.dan_shi=$("#"+id+" .dan_shi").val()
        card.need_enhance=$("#"+id+" .need_enhance").val()

        $.ajax({
            url: "/api/sgll/card/"+card.figure.name,
            type: "PUT",
            data: JSON.stringify(card),
            contentType: "application/json",
            success: function(){
                search_card(card.figure.name)
            },
            error: function(){
                alert("修改失败")
            }
        })
    };

    var search_figure=function(name){
        $.ajax({
            url: "/api/sgll/card/"+name,
            type: "GET",
            success: function(data){
                show_cards(data, $("#result"))
            },
            error: function(){alert("查询失败")}
        })
    };

    var add_figure=function(name){
        $.ajax({
            url: "/api/sgll/fg/"+name,
            type: "POST",
            success: function(){
                search_figure(name)
            },
            error: function(){
                alert("添加失败")
            }
        })
    };

    var delete_figure=function(card){
        $.ajax({
            url: "/api/sgll/card/"+card.figure.name+"?id="+card.id,
            type: "DELETE",
            success: function(){
                search_card(card.figure.name)
            },
            error: function(){
                alert("删除失败")
            }
        })
    };

    var edit_el = function(card){
        el=$("<a href='#'>编辑</a>").on("click", function(){
                var id="ca-edit-"+card.id
                var de_el = $("#"+id)
                if(!de_el.length){
                    var html = new EJS({url: '/static/ejs/de6.ejs', cache: false}).render(card);
                    $(this).parent().append($(html))
                    $("#"+id+" .skill_name").val(card.skill_name)
                    $("#"+id+" .skill_level").val(card.skill_level)
                    $("#"+id+" input.update").on("click", function(){
                        update_card(card, id)
                    })
                }
                de_el.toggle()
            });
        return el
    };

    var delete_el = function(card){
        el=$("<a href='#'>删除</a>").on("click", function(){
                delete_card(card)
            });
        return el
    };


    var show_figure=function(data, container){
        container.empty()

        $(data).each(function(i, card){
            row = $("<p/>")
            row.append(card.figure.name).append(SPACE)
            row.append(card.skill_name).append(LEVEL[card.skill_level]).append(SPACE)
            // op
            row.append(edit_el(card)).append(SPACE)
            row.append(delete_el(card)).append(SPACE)
            container.append(row)
        })
    }

    return {
        add_figure: add_figure,
        search_figure: search_figure
    };
} ());

$(document).ready(function(){
    $.ajax({
        url: "/api/sgll/fgs",
        type: "GET",
        success: function(data){
            $( "#tags" ).autocomplete({
                source: data
            });
        },
        error: function(){}
    });

    $("#search").click(function(){
        name=$("#tags").val()
        if(!name){
            return;
        }
        fg.search_figure(name)
    });

    $("#snewfg").click(function(){
        name=$("#tags").val()
        if(!name){
            return;
        }
        fg.add_figure(name)
    });
})
