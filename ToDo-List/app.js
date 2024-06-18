const inpBox = document.getElementById("input-box");
let listContainer = document.querySelector("#list-container");
const filters = document.querySelectorAll('.filters span');
const clearBtn = document.querySelector('.clear-btn');

let todos = JSON.parse(localStorage.getItem("todo-list"));


function showTodo(filters){
    if(filters === 'all'){
        document.querySelector('span.active').classList.remove('active');
        document.querySelector('#all').classList.add('active');
    }
    listContainer.innerHTML='';
    if(todos){
        todos.forEach((todo,id)=>{
        let isCompleted= todo.status === 'completed' ? 'checked' : '';
        if(filters === todo.status || filters === 'all'){
            let item = document.createElement("li");
            item.innerHTML=todo.name;
            item.setAttribute("id",id);
            item.setAttribute("class",`${isCompleted}`)
            let span = document.createElement('span');
            span.innerHTML="\u00d7";
            item.appendChild(span);
            listContainer.appendChild(item);
        }
      });
    }
    if(listContainer.innerHTML == ''){
        listContainer.innerHTML=`<p id="text">You don't have any task here</p>`
    }
}
showTodo("all");

function addTask(){
    let userTask = inpBox.value.trim();
    if(userTask === ""){
        alert("You must write something!");
    }
    else{
        if(!todos){
            todos=[];
        }
        inpBox.value="";
        let taskInfo = {name:userTask,status:"pending"};
        todos.push(taskInfo);
        localStorage.setItem("todo-list",JSON.stringify(todos));
        showTodo("all");
    }
   
}

listContainer.addEventListener("click",function(e){
    if(e.target.tagName === 'LI'){
        e.target.classList.toggle("checked");
        if(e.target.classList.contains('checked')){
            let selectedId = e.target.getAttribute('id');
            todos[selectedId].status = 'completed';
        }
        else{
            let selectedId = e.target.getAttribute('id');
            todos[selectedId].status = 'pending';
        }
        localStorage.setItem("todo-list",JSON.stringify(todos));
        showTodo('all');
        }
    
    else if(e.target.tagName === 'SPAN'){
       let delId = e.target.parentElement.getAttribute('id');
       todos.splice(delId,1);
       localStorage.setItem("todo-list",JSON.stringify(todos));
       showTodo('all');
    }
},false);


filters.forEach(btn => {
    btn.addEventListener('click',()=>{
        document.querySelector('span.active').classList.remove('active');
        btn.classList.add('active');
        showTodo(btn.id);
    })
});

clearBtn.addEventListener('click',()=>{
    todos.splice(0,todos.length);
    localStorage.setItem("todo-list",JSON.stringify(todos));
    showTodo('all');
})



