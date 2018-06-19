const TaskController = (function () {

  const Task = function (id, title, description) {
    this.id = id;
    this.title = title;
    this.description = description;
  }

  const dataSource = {
    tasks: []
  }

  return {
    getTasks: function () {
      return dataSource.tasks;
    },
    addTask: function (title, description) {
      let id = 0;
      if (dataSource.tasks.length > 0) {
        id = dataSource.tasks[dataSource.tasks.length - 1].id + 1;
      }
      const newTask = new Task(id, title, description);
      dataSource.tasks.push(newTask);
      return newTask;
    },
    deleteTask: function (task) {
      const ids = data.tasks.map(function (task) {
        return task.id;
      });
      const index = ids.indexOf(id);
      data.items.splice(index, 1);
    }
  }

})();

const UIController = (function () {
  const UISelectors = {
    taskList: ".task-list",
    taskForm: '#task-form',
    taskTitleInput: '#task-title-input',
    taskDescriptionInput: '#task-description-input'
  }

  return {
    reloadTaskList: function (taskArray) {
      let html = '';

      taskArray.forEach(function (task) {
        html += `
        <tr>
        <td>
          <strong>${task.title}</strong>
        </td>
        <td>
          <em>${task.description}</em>
        </td>
        <td>
          <button class="btn btn-outline-danger btn-sm delete-task">X</button>
        </td>
      </tr>
      `
      });

      document.querySelector(UISelectors.taskList).innerHTML = html;
    },
    getTaskInput: function () {
      return {
        title: document.querySelector(UISelectors.taskTitleInput).value,
        description: document.querySelector(UISelectors.taskDescriptionInput).value
      }
    },
    getSelectors: function () {
      return UISelectors;
    }
  }

})();

const ApplicationController = (function (TaskController, UIController) {

  const loadEventListeners = function () {
    const UISelectors = UIController.getSelectors();
    document.querySelector(UISelectors.taskForm).addEventListener('submit', addTaskButtonAction);
    document.querySelector(UISelectors.taskList).addEventListener('click', deleteTaskButtonAction);
  }

  const addTaskButtonAction = function (e) {
    const newTaskInput = UIController.getTaskInput();

    if (newTaskInput.title === '' || newTaskInput.description === '') {
      alert('Title and Description can\'t be empty.');
      return
    }

    TaskController.addTask(newTaskInput.title, newTaskInput.description);
    const dataSource = TaskController.getTasks();
    UIController.reloadTaskList(dataSource);
    e.preventDefault();
  }

  const deleteTaskButtonAction = function (e) {
    if (e.target.classList.contains('delete-task')) {
      if (confirm('Are you sure?')) {
        e.target.parentElement.parentElement.remove();
      }
    }
    e.preventDefault();
  }

  return {
    init: function () {
      loadEventListeners();
    }
  }

})(TaskController, UIController);

ApplicationController.init();