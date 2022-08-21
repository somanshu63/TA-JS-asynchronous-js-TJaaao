let root = document.querySelector("ul");
let input = document.querySelector("#text");
let controls = document.querySelector(".controls");
let itemsLeft = document.querySelector(".itemsLeft");
let clearCompleted = document.querySelector(".clearCompleted");
let All = document.querySelector(".All");
let Active = document.querySelector(".Active");
let Completed = document.querySelector(".Completed");
let baseURL = 'https://basic-todo-api.vercel.app/api/todo';
var allTodos;
let fetchtodo = fetch(baseURL)
                .then((res) => res.json())
                .then((data) => {
                    allTodos = data.todos;
                    createUI(allTodos, root);
                });


controls.style.display = "none";

function handleInput(event){
    let value = event.target.value;
    if(event.keyCode === 13 && value !== ""){
        let todo = {
            title: value,
            isCompleted: false,
        };
        allTodos.push(todo);
        let data = {
            todo,
        }
        fetch(baseURL, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          });
          fetch(baseURL)
                .then((res) => res.json())
                .then((data) => {
                    allTodos = data.todos;
                });
        event.target.value = "";
        createUI(allTodos, root);
    } 
    controls.style.display = "flex";

    localStorage.setItem(
        "todos", 
        JSON.stringify(allTodos)
    );
    
    itemsLeft.children[0].innerText = allTodos.filter((todo) => todo.isCompleted == false).length;
    
    clearCompleted.addEventListener("click", handleClearCompleted);
    All.addEventListener("click", handleAll);
    Active.addEventListener("click", handleActive);
    Completed.addEventListener("click", handleCompleted);


}

input.addEventListener("keyup", handleInput);


function handleAll() {
    allTodos = allTodos;
    createUI(allTodos, root);

}


function handleActive() {
    let activeTodos = allTodos.filter((todo) => todo.isCompleted == false);
    createUI(activeTodos, root);

}


function handleCompleted() {
    let completedTodos = allTodos.filter((todo) => todo.isCompleted == true);
    createUI(completedTodos, root);

}

function handleClearCompleted() {
    allTodos = allTodos.filter((todo) => todo.isCompleted == false);
    localStorage.setItem(
        "todos", 
        JSON.stringify(allTodos)
        );
    createUI(allTodos, root);
}

function handleDelete(event) {
    let id = event.target.dataset.id;
    allTodos.splice(id, 1);
    fetch(baseURL + `/${allTodos[id]._id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      fetch(baseURL)
                .then((res) => res.json())
                .then((data) => {
                    allTodos = data.todos;
                });
    localStorage.setItem(
        "todos", 
        JSON.stringify(allTodos)
        );
        createUI(allTodos, root);
        itemsLeft.children[0].innerText = allTodos.filter((todo) => todo.isCompleted == false).length;


}
 function handleToggle(event) {
    let id = event.target.dataset.id;
    let check;
    if(allTodos[id].isCompleted == true){
        check = false;
    }else{
        check = true;
    }
    allTodos[id].isCompleted = !allTodos[id].isCompleted;
    let data = {
        todo: {
            isCompleted : check,
        },
    }
    fetch(baseURL + `/${allTodos[id]._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      fetch(baseURL)
                .then((res) => res.json())
                .then((data) => {
                    allTodos = data.todos;
                });
    localStorage.setItem(
        "todos", 
        JSON.stringify(allTodos)
        );
        createUI(allTodos, root);
        itemsLeft.children[0].innerText = allTodos.filter((todo) => todo.isCompleted == false).length;

 }

function createUI(arr, rootElm) {
    rootElm.innerHTML = "";
    arr.forEach((todo, index) => {
        let li = document.createElement("li");
        let input = document.createElement("input");
        input.name = "checkbox";
        input.type = "checkbox";
        input.addEventListener("input", handleToggle);
        input.setAttribute("data-id", index);
        input.id = "checkbox";
        input.checked = todo.isCompleted;
        let p = document.createElement("p");
        p.innerText = todo.title;
        let span = document.createElement("span");
        span.innerText = "X";
        span.setAttribute(`data-id`, index);
        span.addEventListener("click", handleDelete);
        li.classList.add("flex");
        li.append(input, p, span);
        rootElm.append(li);
    });
}