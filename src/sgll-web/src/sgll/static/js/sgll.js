var sgll = (function () {
    var SPACE = "&nbsp;&nbsp;"
    var LEVEL = ["","Ⅰ","Ⅱ","Ⅲ","Ⅳ","Ⅴ"]

    var update_card=function(card, id){
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

    var search_card=function(name){
        $.ajax({
            url: "/api/sgll/card/"+name,
            type: "GET",
            success: function(data){
                show_cards(data, $("#result"))
            },
            error: function(){alert("查询失败")}
        })
    };

    var add_card=function(name){
        $.ajax({
            url: "/api/sgll/card/"+name,
            type: "POST",
            success: function(){
                search_card(name)
            },
            error: function(){
                alert("添加失败")
            }
        })
    };

    var delete_card=function(card){
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

    var avatar_el = function(card){
        el = $("<img alt='' width='24' height='24'/>")
        var ava = card.figure.avatar || "http://wsa.sg.redatoms.com/mojo/resources/classic/mobile/image/entity/1/small/j2421.png"
        el.attr("src", ava)
        return el
    }

    var show_cards=function(data, container){
        container.empty()

        $(data).each(function(i, card){
            row = $("<p/>")
            row.append(avatar_el(card))
            row.append(card.figure.name).append(SPACE)
            row.append(card.skill_name).append(LEVEL[card.skill_level]).append(SPACE)
            // op
            row.append(edit_el(card)).append(SPACE)
            row.append(delete_el(card)).append(SPACE)
            container.append(row)
        })
    }

    return {
        show_cards: show_cards,
        add_card: add_card,
        search_card: search_card
    };
} ());
