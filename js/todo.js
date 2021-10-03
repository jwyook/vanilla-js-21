const toDoForm = document.getElementById("todo-form");
// const toDoInput = toDoForm.querySelector("input");
const toDoInput = document.querySelector("#todo-form input");
const toDoList = document.getElementById("todo-list");

const TODOS_KEY = "todos";

// const toDos= [];
// let 으로 선언 하면 빈값에 선언 할 수 있음.
let toDos = [];

function saveToDos() {
  localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}

function deleteToDo(event) {
  const li = event.target.parentElement;
  li.remove();
  toDos = toDos.filter((toDo) => toDo.id !== li.id);
  saveToDos();
}

function paintToDo(newTodo) {
  const li = document.createElement("li");
  li.id = newTodo.id;
  const span = document.createElement("span");
  span.innerText = newTodo.text;
  const button = document.createElement("button");
  button.innerText = "X";
  button.addEventListener("click", deleteToDo);
  li.appendChild(span);
  li.appendChild(button);
  toDoList.appendChild(li);
}

function handleToDoSubmit(event) {
  event.preventDefault();

  // input의 현재 value를 새로운 변수에 복사, newToDo의 변수와 상관 X
  const newTodo = toDoInput.value;

  toDoInput.value = "";

  const newToDoObj = {
    text: newTodo,
    id: Date.now(),
  };
  toDos.push(newToDoObj);
  paintToDo(newToDoObj);
  saveToDos();
}

toDoForm.addEventListener("submit", handleToDoSubmit);

// function sayHello(item) {
//   console.log("This is the turn of ", item);
// }
const savedToDos = localStorage.getItem(TODOS_KEY);

if (savedToDos !== null) {
  const parsedToDos = JSON.parse(savedToDos);
  //   parsedToDos.forEach(sayHello);

  //   parsedToDos.forEach((item) => console.log("This is the turn of ", item));
  toDos = parsedToDos;
  parsedToDos.forEach(paintToDo);
}

function goodFilter() {}
