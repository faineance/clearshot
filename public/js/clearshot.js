$(document).ready(function(){
  $('input[name=url]').focus().select();
  
  var submit = function() {
    url=$("#url").val();
    if (!/^https?:\/\//i.test(url)) {
      url = 'http://' + url;
    }
    $.post("/api",{url: url}, function(data){
      $('#result').text(data.result);
      $('input[name=url]').focus().select();
    });
  };


  $('input[type=url]').on('keydown', function(e) {

    url=$("#url").val();

    if(/(^|\s)((https?:\/\/)?[\w-]+(\.[\w-]+)+\.?(:\d+)?(\/\S*)?)/gi.test(url)) {
      $("#submit").on("click", submit);
      if (e.keyCode == 13) {
        submit();
      }
    } else {
      $("#submit").off("click");
    }
  });



});