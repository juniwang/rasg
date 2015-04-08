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
        sgll.search_card(name)
    });

    $("#snewcard").click(function(){
        name=$("#tags").val()
        if(!name){
            return;
        }
        sgll.add_card(name)
    });
})
