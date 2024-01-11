let tasks = [];

let HideDoneTask = false;

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
  tasks = tasks.filter((index) => index !== taskIndex);
  render();
};

const toggleTaskDone = (index) => {
  tasks = tasks.map((x, y) => (y === index ? { ...x, done: !x.done } : x));
  render();
};

const bindEvents = () => {
  removeButtons = document.querySelectorAll(".js-remove");

  removeButtons.forEach((removeButton, index) => {
    removeButton.addEventListener("click", () => {
      removeTask(index);
    });
  });
  const toggleDone = document.querySelectorAll(".js-done");

  toggleDone.forEach((toggleDoneButton, index) => {
    toggleDoneButton.addEventListener("click", () => {
      toggleTaskDone(index);
    });
  });
};

const render = () => {
  let htmlString = "";

  for (const task of tasks) {
    htmlString += `<li class="listItem"><button class="listItem__checkButton js-done">${
      task.done ? "✔" : ""
    }</button><span class="listItem__paragraph ${
      task.done ? "listItem__task--done" : ""
    }">${
      task.content
    }</span> <button class="listItem__button js-remove">🗑️</button></li>
            `;
  }
  document.querySelector(".js-tasks").innerHTML = htmlString;
  bindEvents();
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
