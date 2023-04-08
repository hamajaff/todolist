import { Todos } from "./models/todo";

const titleWrapper = document.createElement("div");
titleWrapper.className = "title";
document.body.appendChild(titleWrapper);

const title = document.createElement("h3");
title.className = "title";
title.textContent = "To Do List";
titleWrapper.appendChild(title);

const taskWrapper = document.createElement("div");
taskWrapper.className = "taskWrapper";
document.body.appendChild(taskWrapper);

const userinput = document.createElement("input");
userinput.className = "userinput";
userinput.type = "text";
userinput.placeholder = "Skriv här";
taskWrapper.appendChild(userinput);

const taskContainer = document.createElement("div");
taskContainer.className = "taskContainer";
taskWrapper.appendChild(taskContainer);

const addTask = document.createElement("button");
addTask.className = "addTask";
addTask.textContent = "Lägg till";
taskContainer.appendChild(addTask);

const clearAll = document.createElement("button");
clearAll.className = "clearAll";
clearAll.textContent = "Rensa";
taskContainer.appendChild(clearAll);

const todosContainer = document.createElement("div");
todosContainer.id = "main";
taskWrapper.appendChild(todosContainer);

let task = [new Todos("test", false)];

function createTaskElement(todo) {
  const listItem = document.createElement("li");
  listItem.className = "list";
  listItem.textContent = todo.task;

  const deleteTask = document.createElement("button");
  deleteTask.className = "deleteTask";
  deleteTask.textContent = "X";

  const taskDone = document.createElement("button");
  taskDone.className = "taskFinished";
  taskDone.textContent = "Klart";

  taskDone.addEventListener("click", () => {
    if (!todo.done) {
      listItem.style.textDecoration = "line-through";
      todo.done = true;
      console.log(task);
    }
  });

  taskDone.addEventListener("dblclick", () => {
    if (todo.done) {
      listItem.style.textDecoration = "none";
      todo.done = false;
      console.log(task);
    }
  });

  deleteTask.addEventListener("click", () => {
    task = task.filter((t) => t !== todo);
    createHtml();
    console.log(task);
  });

  const list = document.createElement("ul");
  list.className = "list";
  list.appendChild(listItem);
  list.appendChild(taskDone);
  list.appendChild(deleteTask);

  const container = document.createElement("div");
  container.className = "container";
  container.appendChild(list);

  return container;
}

function createHtml() {
  const main = document.getElementById("main");
  main.innerHTML = "";

  if (task.length === 0) {
    const noTaskMessage = document.createElement("p");
    noTaskMessage.textContent = "Inga uppgifter.";
    main.appendChild(noTaskMessage);
  } else {
    task.forEach((todo) => {
      const taskElement = createTaskElement(todo);
      main.appendChild(taskElement);
    });
  }
}

addTask.addEventListener("click", () => {
  if (userinput.value.trim() === "") {
    alert("Var god skriv något!");
  } else {
    task.push(new Todos(userinput.value.trim(), false));
    createHtml();
    userinput.value = "";
  }
});

clearAll.addEventListener("click", () => {
  task = [];
  createHtml();
});

createHtml();
