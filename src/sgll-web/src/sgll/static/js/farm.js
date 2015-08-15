$(document).ready(function(){
    var toggle_1 = function(id){
        $(".div1").hide()
        $("#"+id).show()
    }

    var ld = {
        plant: function(){
            c=$("#plant")
            c.empty()
            $.ajax({
                cache: false,
                url: "/api/farm/seed/list",
                type: "GET",
                success: function(data){
                    toggle_1("plant")
                    $(data).each(function(i,f){
                        row = $("<p/>")
                        row.append(f.name)
                        row.append("&nbsp;&nbsp;["+f.number+"]&nbsp;&nbsp;")
                        don = $("<a href='#'>完成</a>").on("click", function(){
                            ld.disable(f.name)
                        })
                        row.append(don)
                        del = $("<a href='#' style='margin-left:20px'>删除</a>").on("click", function(){
                            ld.del(f.name, function(){
                                ld.plant()
                            })
                        })
                        row.append(del)
                        c.append(row)
                    })
                },
                error: function(){
                    c.html("error")
                }
            })
        },
        disable: function(name){
            $.ajax({
                cache: false,
                url: "/api/farm/seed/"+name,
                type: "DELETE",
                success: function(){
                    ld.plant()
                },
                error: function(){
                    c.html("error")
                }
            })
        },
        del: function(name, success){
            $.ajax({
                url: "/api/farm/seed/"+name+"?del=1",
                type: "DELETE",
                success: success | function(){} ,
                error: function(){
                    $("#msg").html("error")
                }
            })
        },
        sell: function(){
            c=$("#sell")
            c.empty()
            $.ajax({
                cache: false,
                url: "/api/farm/seed/list?del=1",
                type: "GET",
                success: function(data){
                    toggle_1("sell")
                    $(data).each(function(i,f){
                        row = $("<p/>")
                        row.append(f.name)
                        row.append("&nbsp;&nbsp;["+f.number+"]")
                        c.append(row)
                    })
                },
                error: function(){
                    c.html("error")
                }
            })
        },
        edit: function(){
            toggle_1("edit")
        }
    }

    $(".nav1").click(function(){
        fd = $(this).attr("fd")
        ld[fd]()
    })

    $("#idel").click(function(){
        name = $("#tags").val()
        ld.del(name, function(){
            $("#num").val("")
            $("#tags").val("")
            $("#msg").val("删除成功")
            old=$("#num").data("seeds")
            new_data=old.filter(function(o){
                if(o.name!=name){
                    return o
                }
            })
            $("#num").data("seeds",new_data)
        })
    })

    $("#igo").click(function(){
        name = $("#tags").val()
        number = +$("#num").val()
        if(isNaN(number)){
            $("#msg").html("请输入数字")
            return
        }
        $.ajax({
            url: "/api/farm/seed/"+name,
            type: "POST",
            data:JSON.stringify({
                "number": number
            }),
            contentType: "application/json",
            success: function(data){
                $("#msg").html("添加/更新成功")
                $("#num").val("")
                $("#tags").val("")
                old=$("#num").data("seeds")
                new_data=old.map(function(o){
                    if(o.name==name){
                        o.number=number
                    }
                    return o
                })
                $("#num").data("seeds",new_data)
            },
            error: function(){
                $("#msg").html("error")
            }
        })
    })

    ld.plant()

    $.ajax({
        cache: false,
        url: "/api/farm/seeds",
        type: "GET",
        success: function(data){
            names = data.map(function(d){
                return d.name
            })
            $("#num").data("seeds",data)
            $( "#tags" ).autocomplete({
                source: names,
                select: function(event, ui){
                    n=ui.item.value
                    s=$("#num").data("seeds").filter(function(obj){
                        if(obj.name==n)
                            return obj
                    })
                    if(s.length>0)
                        $("#num").val(s[0].number)
                }
            });
        },
        error: function(){
            $("#msg").html("error")
        }
    })
});
