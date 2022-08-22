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
        
function displayTodo() {
    fetch(baseURL)
    .then((res) => res.json())
    .then((data) => {
        allTodos = data.todos;
        createUI(allTodos, root);
    });
}
displayTodo();
    


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
          })
          .then(() => {
            displayTodo();
          });
        event.target.value = "";
    } 
    controls.style.display = "flex";

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
    let data = {
        allTodos,
    }
    fetch(baseURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      .then(() => {
        displayTodo();
      });
}

function handleDelete(id) {
    fetch(baseURL + `/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(() => {
        displayTodo();
      });

    itemsLeft.children[0].innerText = allTodos.filter((todo) => todo.isCompleted == false).length;
}


 function handleToggle(id, status) {
    let data = {
        todo: {
            isCompleted : !status,
        },
    }
    fetch(baseURL + `/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      .then(() => {
        displayTodo();
      });
        itemsLeft.children[0].innerText = allTodos.filter((todo) => todo.isCompleted == false).length;
 }

function handleEdit(event, id, title){
    let input  = document.createElement("input");
    input.value = title;
    let p = event.target;
    let parent = event.target.parentElement;
    parent.replaceChild(input, p);
    input.addEventListener("keyup", (event) => {
        if(event.keyCode == 13 && event.target.value){
            let data = {
                todo: {
                    title: event.target.value,
                },
            };
            fetch(baseURL + `${id}`, {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
              })
              .then(() => {
                displayTodo();
              });
            event.target.value = "";
        }
    });
}


function createUI(arr, rootElm) {
    rootElm.innerHTML = "";
    arr.forEach((todo) => {
        let li = document.createElement("li");
        let input = document.createElement("input");
        input.type = "checkbox";
        input.addEventListener("click", () => {
            handleToggle(todo._id, todo.isCompleted)
        });
        input.setAttribute("data-id", todo._id);
        input.id = "checkbox";
        input.checked = todo.isCompleted;
        let p = document.createElement("p");
        p.innerText = todo.title;
        p.addEventListener("dblclick", (event) => {
            handleEdit(event, todo._id, todo.title)
        });
        let span = document.createElement("span");
        span.innerText = "X";
        span.setAttribute(`data-id`, todo._id);
        span.addEventListener("click", () => {
            handleDelete(todo._id);
        });
        li.classList.add("flex");
        li.append(input, p, span);
        rootElm.append(li);
        controls.style.display = "flex";

    });
}