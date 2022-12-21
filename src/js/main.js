import { Todos } from "./models/todo";

let titleWrapper = document.createElement("div");

titleWrapper.className = "title";
document.body.appendChild(titleWrapper);

let title = document.createElement("h3");
title.className = "title";
title.innerHTML = "To Do List";
titleWrapper.appendChild(title);

let taskWrapper = document.createElement("div");
taskWrapper.className = "taskWrapper";

let userinput = document.createElement("input");
userinput.className = "userinput";
userinput.setAttribute("type", "text");
userinput.placeholder = "Skriv här ";

let taskContainer = document.createElement("div");
taskContainer.className = "taskContainer";

let addTask = document.createElement("button");
addTask.className = "addTask";
addTask.innerHTML = "Lägg till";

let clearAll = document.createElement("button");
clearAll.className = "clearAll";
clearAll.innerHTML = "Rensa";

let todosContainer = document.createElement("div");
todosContainer.id = "main";

document.body.appendChild(taskWrapper);
taskWrapper.appendChild(userinput);
taskContainer.appendChild(addTask);
taskContainer.appendChild(clearAll);
taskWrapper.appendChild(taskContainer);
taskWrapper.appendChild(todosContainer);

addTask.addEventListener("click", function () {
  if (userinput.value === "") {
    alert("Var god skriv något!");
  } else {
    task.push(new Todos(userinput.value, false));
    createHtml();
    userinput.value = "";
  }
});

let task = [new Todos("test", false)];

//let task = ["Eat", "Code", "Sleep"];

function createHtml() {
  let main = document.getElementById("main");
  main.innerHTML = "";

  for (let i = 0; i < task.length; i++) {
    let container = document.createElement("div");
    let list = document.createElement("ul");
    let listItem = document.createElement("li");
    let deleteTask = document.createElement("button");
    let taskDone = document.createElement("button");

    container.className = "container";
    list.className = "list";
    listItem.className = "list";
    taskDone.className = "taskFinished";
    deleteTask.className = "deleteTask";

    main.appendChild(container);

    container.appendChild(list);
    list.appendChild(listItem);
    list.appendChild(taskDone);
    list.appendChild(deleteTask);

    taskDone.innerHTML = "Klart";
    deleteTask.innerHTML = "X";

    listItem.innerHTML = task[i].task;

    taskDone.addEventListener("click", () => {
      if (task[i].done === false) {
        listItem.style.textDecoration = "line-through";
        task[i].done = true;
        console.log(task);
      }
    });

    taskDone.addEventListener("dblclick", () => {
      if (task[i].done === true) {
        listItem.style.textDecoration = "none";
        task[i].done = false;
      }
      console.log(task);
    });

    deleteTask.addEventListener("click", () => {
      const newTasks = task?.filter((clickToDelete) => {
        return clickToDelete !== task[i];
      });
      task = newTasks;

      createHtml();
      console.log(newTasks);
    });

    clearAll.addEventListener("click", function () {
      task = [];
      createHtml();
    });
  }
}

createHtml();
