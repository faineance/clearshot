$(document).ready(function(){
  var url;
  var submit = function() {
    console.log("ASD");
    url=$("#url").val();
    $.post("/api",{url: url}, function(data){
      $('#result').text(data.result);
      $('input[name=url]').focus().select();
    });
  };

  $("#submit").click(submit);

  $('input[type=text]').bind('keydown', function(e) {
    if (e.keyCode == 13) {
      submit();
    }
  });

});