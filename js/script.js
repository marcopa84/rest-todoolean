$(document).ready(function() {

  getList();


});

function getList() {
  var source = $('#todo-template').html();
  var template = Handlebars.compile(source);
  $.ajax(
    {
      url: "http://157.230.17.132:3028/todos",
      method: "GET",
      success: function (data, stato) {
        console.log(data);
        for (var i = 0; i < data.length; i++) {
          console.log(data[i].id);
          console.log(data[i].text);
          var context = {
            id: data[i].id,
            text: data[i].text
          }
          var html = template(context);
          $('.todo_list').append(html);
        }

      },
      error: function (richiesta, stato, errori) {
        alert("E' avvenuto un errore. " + errore);
      }
  });
}
