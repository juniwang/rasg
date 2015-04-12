$(document).ready(function(){
    var show_top=function(data){
        $("#top").empty()

        $(data).each(function(i,a){
            $("#top").append($("<li>"+a.figure.name+":&nbsp;"+a.min+"</li>"))
        });
    };

    $.ajax({
        url: "/api/sgll/top"+ location.search,
        type: "GET",
        success: function(data){
            show_top(data)
        },
        error: function(){
            $("result").html("图鉴不存在")
        }
    })
})