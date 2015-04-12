var fg = (function () {
    var SPACE = "&nbsp;&nbsp;"
    var LEVEL = ["","★","★★","★★★","★★★★","★★★★★"]

    var show_error_msg = function(m){
         $("#result").html(m)
    }

    var update_figure=function(figure){
        figure.avatar=$("#result .avatar").val()
        figure.country=$("#result .country").val()
        figure.init_star=$("#result .init_star").val()
        figure.figure_type=$("#result .figure_type").val()

        data=[]
        $("#result .data .item").each(function(i, li){
            data.push({
                is_attack: $(li).children(".is_attack").val(),
                data_type: $(li).children(".data_type").val(),
                min: $(li).children(".min").val(),
                max: $(li).children(".max").val(),
                comment: $(li).children(".comment").val(),
            })
        });
        figure.data=data

        $.ajax({
            url: "/api/sgll/fg/"+figure.name,
            type: "PUT",
            data: JSON.stringify(figure),
            contentType: "application/json",
            success: function(){
                $("#result").append($("<p>更新成功</p>"))
                search_figure(figure.name)
            },
            error: function(){
                show_error_msg("修改失败")
            }
        })
    };

    var search_figure=function(name){
        $.ajax({
            url: "/api/sgll/fg/"+name,
            type: "GET",
            success: function(data){
                show_figure(data)
            },
            error: function(){
                show_error_msg("图鉴不存在")
            }
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
                show_error_msg("添加失败")
            }
        })
    };

    var delete_figure=function(name){
        $.ajax({
            url: "/api/sgll/fg/"+name,
            type: "DELETE",
            success: function(){
                $("#tags").val("")
                show_error_msg("删除成功")
            },
            error: function(){
                show_error_msg("删除失败")
            }
        })
    };

    var add_data_li = function(){
        ni = {
            id:$("#result .data .item").length+1,
            is_attack:1,
            data_type:"BASIC",
            min:"",
            max:"",
            comment:""
        }
        nh=new EJS({url: '/static/ejs/fg_li_05.ejs', cache: false}).render(ni)
        $("#result .data").append($(nh))
    }

    var delete_data_li=function(li_id){
        $("#"+li_id).remove()
    };

    var show_figure=function(figure){
        container = $('#result')
        container.empty()

        var html = new EJS({url: '/static/ejs/fg_12.ejs', cache: false}).render(figure);
        container.html(html)

        $("#result .country").val(figure.country)
        $("#result .init_star").val(figure.init_star)
        $("#result .figure_type").val(figure.figure_type)
        $("#result input.update").on("click", function(){
            update_figure(figure)
        });
    }

    return {
        add_figure: add_figure,
        search_figure: search_figure,
        delete_figure: delete_figure,
        add_data_li: add_data_li,
        delete_data_li: delete_data_li
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

    $("#delete").click(function(){
        name=$("#tags").val()
        if(!name){
            return;
        }
        fg.delete_figure(name)
    });

    $("#snewfg").click(function(){
        name=$("#tags").val()
        if(!name){
            return;
        }
        fg.add_figure(name)
    });
})
