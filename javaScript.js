{
  let tasks = [];
  let hideDoneTasks = false;

  const addNewTask = (newTaskContent) => {
    tasks = [
      ...tasks,
      {
        content: newTaskContent,
      },
    ];

    render();
  };

  const removeTask = (taskIndex) => {
    tasks = tasks.filter((_, index) => index !== taskIndex);

    render();
  };

  const markAllDone = () => {
    tasks = tasks.map((task) => ({
      ...task,
      done: true,
    }));

    render();
  };

  const toggleTaskDone = (taskIndex) => {
    tasks = tasks.map((task, index) =>
      index === taskIndex ? { ...task, done: !task.done } : task
    );

    render();
  };

  const toggleHideDoneTasks = () => {
    hideDoneTasks = !hideDoneTasks;

    render();
  };
  const bindRemoveEvents = () => {
    removeButtons = document.querySelectorAll(".js-remove");

    removeButtons.forEach((removeButton, index) => {
      removeButton.addEventListener("click", () => {
        removeTask(index);
      });
    });
  };
  const bindDoneEvents = () => {
    toggleDone = document.querySelectorAll(".js-done");

    toggleDone.forEach((toggleDoneButton, index) => {
      toggleDoneButton.addEventListener("click", () => {
        toggleTaskDone(index);
      });
    });
  };

  const renderTasks = () => {
    const taskToHtml = (task) => `<li class="${
      task.done && hideDoneTasks ? "tasks--hidden" : "listItem"
    }"><button class="listItem__checkButton js-done">${
      task.done ? "✔" : ""
    }</button><span class="listItem__paragraph ${
      task.done ? "listItem__task--done" : ""
    }">${
      task.content
    }</span> <button class="listItem__button js-remove">🗑️</button></li>
            `;

    const tasksElement = document.querySelector(".js-tasks");
    tasksElement.innerHTML = tasks.map(taskToHtml).join("");
  };

  const renderButtons = () => {
    const buttonsElement = document.querySelector(".js-buttons");

    if (!tasks.length) {
      buttonsElement.innerHTML = "";
      return;
    }

    buttonsElement.innerHTML = `
      <button class="buttons__button js-toggleHideDoneTasks">
          ${hideDoneTasks ? "Pokaż" : "Ukryj"} ukończone
      </button>
      <button class="buttons__button js-markAllDone" 
      ${ tasks.every(({ done }) => done) ? " disabled" : ""}
      >
          Ukończ wszystkie
      </button>
  `;
  };

  const bindButtonsEvents = () => {
    const markAllDoneButton = document.querySelector(".js-markAllDone");

    if (markAllDoneButton) {
      markAllDoneButton.addEventListener("click", markAllDone);
    }

    const toggleHideDoneButton = document.querySelector(
      ".js-toggleHideDoneTasks"
    );

    if (toggleHideDoneButton) {
      toggleHideDoneButton.addEventListener("click", toggleHideDoneTasks);
    }
  };

  const render = () => {
    renderTasks();
    bindButtonsEvents();
    bindRemoveEvents();
    bindDoneEvents();
    renderButtons();
  };

  const onFormSubmit = (event) => {
    event.preventDefault();

    const newTaskElement = document.querySelector(".js-newTask");
    const newTaskContent = newTaskElement.value.trim();

    if (newTaskContent !== "") {
      addNewTask(newTaskContent);
      newTaskElement.value = "";
    }
    newTaskElement.focus();
  };

  const init = () => {
    render();
    const buttonElement = document.querySelector(".js-button");
    const formElement = document.querySelector(".js-form");

    formElement.addEventListener("submit", onFormSubmit);
    buttonElement.addEventListener("click", onFormSubmit);
  };

  init();
}
