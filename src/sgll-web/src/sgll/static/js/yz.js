$(document).ready(function(){
    var show_yz=function(data){
        $("#attack").empty()
        $("#defense").empty()

        $(data.attack).each(function(i,a){
            $("#attack").append($("<li>"+a.figure.name+":&nbsp;"+a.min+"&nbsp;~&nbsp;"+a.max+"</li>"))
        });
        $(data.defense).each(function(i,a){
            $("#defense").append($("<li>"+a.figure.name+":&nbsp;"+a.min+"&nbsp;~&nbsp;"+a.max+"</li>"))
        });
    };

    $.ajax({
        url: "/api/sgll/top?t=0",
        type: "GET",
        success: function(data){
            show_yz(data)
        },
        error: function(){
            $("result").html("图鉴不存在")
        }
    })
})