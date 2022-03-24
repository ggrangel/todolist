let addTask = function () {
  $.ajax({
    type: "POST",
    url: "https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=306",
    contentTYpe: "application/json",
    dataType: "json",
    data: JSON.stringify({
      task: {
        content: $("#taskInput").val(),
      },
    }),
    success: function (response, textStatus) {
      console.log(response);
      console.log(textStatus);
      updateUI();
    },
    error: function (request, textStatus, errorMessage) {
      console.log(errorMessage);
    },
  });
};

let updateUI = function () {
  $.ajax({
    type: "GET",
    url: "https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=308",
    dataType: "json",
    sucess: function (response, textStatus) {
      console.log(response);
    },
    error: function (request, textStatus, errorMessage) {
      console.log(errorMessage);
    },
  });
};
