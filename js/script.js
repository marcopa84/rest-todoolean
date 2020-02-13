$(document).ready(function() {

  getList();

  $(document).on('click', '.todo_command', function () {
    var thisElementId = $(this).parents('li').attr('data_id')
    console.log(thisElementId);
    deleteIthem(thisElementId);
  });

  $(document).on('click', '#add_button', function () {
    var addValue = $('#add_input').val();
    addIthem(addValue)
  });


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
function deleteIthem(id) {
  $.ajax(
    {
      url: "http://157.230.17.132:3028/todos/"+id,
      method: "DELETE",
      success: function (data, stato) {
        $('.todo_list').html('');
        getList();

      },
      error: function (richiesta, stato, errori) {
        alert("E' avvenuto un errore. " + errore);
      }
  });
}

function addIthem(data) {
  $.ajax(
    {
      url: "http://157.230.17.132:3028/todos",
      method: "POST",
      data:{
        text: data,
      },
      success: function (data, stato) {
        $('#add_input').val('');
        $('.todo_list').html('');
        getList();

      },
      error: function (richiesta, stato, errori) {
        alert("E' avvenuto un errore. " + errore);
      }
  });
}
