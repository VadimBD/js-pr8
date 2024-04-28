const list = document.getElementById('todo-list')
const itemCountSpan = document.getElementById('item-count')
const uncheckedCountSpan = document.getElementById('unchecked-count')
const dialogTODO= document.getElementById("TODO_Dialog");
dialogTODO.addEventListener('close',(e)=>{
  document.getElementById('txtNewTODO').value='';
});

var todos=[];

function newTodo() {
  dialogTODO.showModal();
}

function addTodo(){
  todos[todos.length]={checked:false,value:document.getElementById('txtNewTODO').value,id:todos.length};
  dialogTODO.close();
  render();
  updateCounter();
}



function renderTodo(todo){
  return`
  <li class="list-group-item">
      <input type="checkbox" class="form-check-input me-2" id="${todo.id}" ${todo.checked ? 'checked' : ''} onchange="checkTodo(${todo.id})">
      <label for="${todo.id}" id="lb${todo.id}">
          <span class="${todo.checked ? 'text-success text-decoration-line-through' : ''}">${todo.value}</span>
      </label>
      <button class="btn btn-danger btn-sm float-end" onclick="deleteTodo(${todo.id})">delete</button>
  </li>
`;
}


function render(){
  let todoItems = todos.map(renderTodo).join('');
  document.getElementById('todo-list').innerHTML = todoItems;
}
function updateCounter(){
  itemCountSpan.innerText=todos.length;
  let count=0;
  for(let todo in todos){
    if(todos[todo].checked)
    {
      count+=1;
    }
  }
  uncheckedCountSpan.innerText=count;
}

function checkTodo(id){
  for(let i=0; i<todos.length;i++){
    if(todos[i].id===id){
      todos[i].checked=!todos[i].checked;
      if(todos[i].checked){
        document.getElementById('lb'+id+'').children[0].classList.add('text-success','text-decoration-line-through');
      }
      else{
        document.getElementById('lb'+id+'').children[0].classList.remove('text-success','text-decoration-line-through');
      }
      updateCounter();
      return;
    }
  }
}

function deleteTodo(id){
  let index = todos.findIndex(todo => todo.id === id);
  if (index !== -1) {
      todos.splice(index, 1);
  }
  render();
  updateCounter();
}

function SaveInLocalStorage(){
  localStorage.setItem('TODOS',JSON.stringify(todos));

}
