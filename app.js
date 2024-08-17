const form = document.querySelector("#notAddForm");
const addInput = document.querySelector("#notName");
const addButton = document.querySelector("#clearNotesButton");
const NotBody = document.querySelector(".not-body");
const NotBody2 = document.querySelector(".not-body2");
const notList = document.querySelector("#notList");
const filterInput = document.querySelector("#notSearch");

let todos=[];



runEvents();

function runEvents(){
    form.addEventListener("submit",addTodo);
    document.addEventListener("DOMContentLoaded",pageLoaded);
    notList.addEventListener("click",removeTodoToUI);
    addButton.addEventListener("click",allTodosEverywhere);
    filterInput.addEventListener("keyup",filter);
}

function pageLoaded(){
    checkTodosFromStorage();
    todos.forEach(function(todo){
        addTodoToUI(todo);
    });
}



function filter(e) {
    const filterValue = e.target.value.toLowerCase().trim();
    const todoListesi = document.querySelectorAll(".not-item");

    // Filtreleme yaparken notların mevcut olup olmadığını kontrol et
    todoListesi.forEach(function(todo) {
        if (todo.textContent.toLowerCase().trim().includes(filterValue)) {
            todo.style.display = "block";
        } else {
            todo.style.display = "none";
        }
    });

    // Filtreleme yapılacak bir not olup olmadığını kontrol et
    if (todoListesi.length === 0) {
        showAlert("warning", "Filtreleme yapmak için en az bir not olmalıdır!");
    }
}





function allTodosEverywhere(){
    const todoListesi = document.querySelectorAll(".not-item"); 
    if(todoListesi.length > 0){
        todoListesi.forEach(function(todo){
            todo.remove();
        });
        localStorage.clear(); 
        showAlert("success", "Tüm notlar başarıyla silindi.");
    } else {
        showAlert("warning", "Silmek için en az bir not olmalıdır");
    }
}



function removeTodoToUI(e) {
    if (e.target.classList.contains("not-remove")) { 
        const todo = e.target.parentElement.parentElement;
        const todoText = todo.firstChild.textContent.trim();
        todo.remove();
        removeTodoToStorage(todoText);
        showAlert("success","Not başarıyla silindi");
    }
}

function removeTodoToStorage(removeTodo){
    checkTodosFromStorage();
    todos.forEach(function(todo,index){
        if(removeTodo===todo){
            todos.splice(index,1);
        }
    });
    localStorage.setItem("todos",JSON.stringify(todos));
}



function addTodo(e){
    const inputText = addInput.value.trim();
    if(inputText==null || inputText==""){
        showAlert("warning","Lütfen boş bırakmayınız!");
    }else{
        addTodoToUI(inputText);
        addTodoToStorage(inputText);
        showAlert("success","Not Eklendi.");
    }

    e.preventDefault();
}

function addTodoToUI(newTodo){
    const li = document.createElement("li");
li.className = "not-item";
li.textContent = newTodo;

const a = document.createElement("a");
a.href="#";
a.className="not-link";

const i = document.createElement("i");
i.className="not-remove";
i.textContent = "×";

a.appendChild(i);
li.appendChild(a);
notList.appendChild(li);

addInput.value = "";

}

function addTodoToStorage(newTodo){
    checkTodosFromStorage();
    todos.push(newTodo);
    localStorage.setItem("todos",JSON.stringify(todos));
}


function checkTodosFromStorage(){
    if(localStorage.getItem("todos")===null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
}

function showAlert(type,message){
    const div = document.createElement("div");
    div.className="alert alert-"+type;
    div.textContent = message;

    NotBody.appendChild(div);

    setTimeout(function(){
        div.remove();
    },2500);
}