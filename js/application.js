$(document).ready(function() {
  updateUI();
});

let updateUI = function() {
  $.ajax({
    type: "GET",
    url: "https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=306",
    dataType: "json",
    success: function(response, textStatus) {
      $("#todo-list").empty();
      response.tasks.forEach(function(task) {
        $("#todo-list").append(
          '<div class="row"><p class="col-xs-8">' +
          task.content +
          '</p><button class="delete" data-id="' +
          task.id +
          '">Delete</button><input type="checkbox" class="mark-complete" data-id="' +
          task.id +
          '"' +
          (task.completed ? "checked" : "") +
          ">"
        );
      });
    },
    error: function(request, textStatus, errorMessage) {
      console.log(errorMessage);
    },
  });
};

let addTask = function() {
  $.ajax({
    type: "POST",
    url: "https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=306",
    contentType: "application/json",
    dataType: "json",
    data: JSON.stringify({
      task: {
        content: $("#taskInput").val(),
      },
    }),
    success: function(response, textStatus) {
      updateUI();
      $("#taskInput").val("");
    },
    error: function(request, textStatus, errorMessage) {
      console.log(errorMessage);
    },
  });
};

let removeTask = function(id) {
  $.ajax({
    type: "DELETE",
    url:
      "https://altcademy-to-do-list-api.herokuapp.com/tasks/" +
      id +
      "?api_key=306",
    success: function(response, textStatus) {
      updateUI();
    },
    error: function(request, textStatus, errorMessage) {
      console.log(errorMessage);
    },
  });
};

$(document).on("click", ".delete", function() {
  removeTask($(this).data("id"));
});

$(document).on("change", ".mark-complete", function() {
  if (this.checked) {
    markTaskComplete($(this).data("id"));
  }
});

var markTaskComplete = function(id) {
  $.ajax({
    type: "PUT",
    url:
      "https://altcademy-to-do-list-api.herokuapp.com/tasks/" +
      id +
      "/mark_complete?api_key=306",
    dataType: "json",
    success: function(response, textStatus) {
      updateUI();
    },
    error: function(request, textStatus, errorMessage) {
      console.log(errorMessage);
    },
  });
};
