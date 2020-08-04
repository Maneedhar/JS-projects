// Define UI vars
const form = document.querySelector('#task-form')
const taskList = document.querySelector('.collection')
const clearBtn = document.querySelector('.clear-tasks')
const filter =  document.querySelector('#filter')
const taskInput = document.querySelector('#task')

// Load all Event Listeners
loadEventListeners();

function loadEventListeners()
{
  //DOM Load event
  document.addEventListener('DOMContentLoaded', getTasks);
  //add task event
  form.addEventListener('submit', addTask);
  //remove task event
  taskList.addEventListener('click', removeTask);
  //Clear all Task events
  clearBtn.addEventListener('click', clearTasks);
  //Filter task events
  filter.addEventListener('keyup', filterTasks)
}

//Get tasks from LS
function getTasks() {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = []
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'))
  }

  tasks.forEach(function(task){
    //create li element
    const li = document.createElement('li');
    //Add class
    li.className = 'collection-item'
    //crate text node and append to li
    li.appendChild(document.createTextNode(task));
    //create new link element 
    const link = document.createElement('a');
    //Add class
    link.className = 'delete-item secondary-content'
    //Add icon html
    link.innerHTML = '<i class = "fa fa-remove"></i>';
    //Append link to li
    li.appendChild(link);

    //Append li to ul
    taskList.appendChild(li);
  });
}

function addTask(event)
{
  if(taskInput.value === '')
  {
    alert('Add a task');
  }
  else
  {
    //create li element
    const li = document.createElement('li');
    //Add class
    li.className = 'collection-item'
    //crate text node and append to li
    li.appendChild(document.createTextNode(taskInput.value));
    //create new link element 
    const link = document.createElement('a');
    //Add class
    link.className = 'delete-item secondary-content'
    //Add icon html
    link.innerHTML = '<i class = "fa fa-remove"></i>';
    //Append link to li
    li.appendChild(link);

    //Append li to ul
    taskList.appendChild(li);

    //store in Local storage
    storeTaskinLocalStorage(taskInput.value);

    //Clear input
    taskInput.value = '';
  }

  event.preventDefault();
}

function storeTaskinLocalStorage(task)
{
  let tasks;
  if(localStorage.getItem('tasks') === null)
  {
    tasks = []
  } else
  {
    tasks = JSON.parse(localStorage.getItem('tasks'))
  }

  tasks.push(task);

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

//Remove Task
function removeTask(event)
{
  if (event.target.parentElement.classList.contains('delete-item'))
  {
    if(confirm('Delete Task?'))
    {
      event.target.parentElement.parentElement.remove();

      //remove from LS
      removeTaskfromLocalStorage(event.target.parentElement.parentElement);
    }
  }
}

//Remove from LS
function removeTaskfromLocalStorage(taskItem)
{
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = []
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'))
  }

  tasks.forEach(function(task, index){
    if(taskItem.textContent === task){
      tasks.splice(index, 1);
    }
  })

  localStorage.setItem('tasks', JSON.stringify(tasks))
}

function clearTasks()
{
  if(confirm('Clear Tasks?'))
  {    
    //taskList.innerHTML = '';
    //faster
    while(taskList.firstChild)
    {
      taskList.removeChild(taskList.firstChild);
    }

    //Clear from LS
    clearTasksfromLocalStorage();
  }
}

//Clear from LS
function clearTasksfromLocalStorage(){
  localStorage.clear();
}

function filterTasks(event)
{
  const text = event.target.value.toLowerCase();

  document.querySelectorAll('.collection-item').forEach(function(task){
    const item = task.firstChild.textContent;
    if (item.toLowerCase().indexOf(text) != -1){
      task.style.display = 'block';
    }else{
      task.style.display = 'none';
    }
  });
}