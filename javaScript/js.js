const addTaskbtn = document.getElementById("add");
const inputTask = document.getElementById("in");
const blockToDo = document.querySelector(".block-todo");
const deleteAllBnt = document.getElementById("delete");


// при загрузке страницы заполняем массив из Localstorage
let tasks;
!localStorage.tasks
  ? (tasks = [])
  : (tasks = JSON.parse(localStorage.getItem("tasks")));

let todoItemElems = [];

function Task(description) {
  this.description = description;
  this.completed = false;
}
// Динамический шаблон для HTML страницы
const createTemplate = (task, index) => {
  return `
    <div class="block_todo_item ${task.completed ? 'checked' : ""}">
        <div class="description">${task.description}</div>
        <div class="buttons">
          <input onclick="completeTask(${index})" class="btn-complete" type="checkbox"${
            task.completed ? 'checked' : ""
          }>
          <button onclick="deleteTask(${index})" class="btn-delete">Delete</button>
        </div>
      </div>
  `;
};
// Фильтрация
const filterTask = () => {
  const activeTasks = tasks.length && tasks.filter(item => item.completed == false);
  const completedTask = tasks.length && tasks.filter(item => item.completed == true);
  tasks = [...activeTasks,...completedTask];
}
// заполнение HTML 
const fillHtmllist = () => {
  blockToDo.innerHTML = "";
  if(tasks.length > 0) {
    filterTask();
  tasks.forEach((item, index) => {
    blockToDo.innerHTML += createTemplate(item, index);
  });
  todoItemElems = document.querySelectorAll('.block_todo_item')
  }
}
fillHtmllist();

//отправляем массив tasks в localStorage 
const updatelocal = () => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

const completeTask = (index) => {
  tasks[index].completed = !tasks[index].completed;
  if(tasks[index].completed) {
    todoItemElems[index].classList.add('checked');
  } else {
    todoItemElems[index].classList.remove('checked');
  }
  updatelocal();
  fillHtmllist();
};

// событие на кнопку add(берем значение из инпута и создаем новый объект и отправляем его в tasks)
addTaskbtn.addEventListener("click", () => {
  tasks.push(new Task(inputTask.value));
  updatelocal();
  fillHtmllist();
  inputTask.value = "";
});
// удаление таски с задержкой 
const deleteTask = index => {
  todoItemElems[index].classList.add('delition')
  setTimeout(() => {
  tasks.splice(index, 1);
  updatelocal();
  fillHtmllist();
  }, 500);
}

deleteAllBnt.addEventListener('click', () => {
  tasks.forEach((item, index) => {
    tasks.splice(item);
    });
  updatelocal();
  fillHtmllist();
  inputTask.value = "";
});
//глазки
document.onmousemove = function(event) {
  let eyes = document.querySelector('.y-7')
  let x = (eyes.getBoundingClientRect().left) ;
  let y = (eyes.getBoundingClientRect().top) ;
  let radian = Math.atan2(event.pageX - x, event.pageY - y);
  let rotation = (radian * (180 / Math.PI) * -1) + 770;
  eyes.style.transform = `"rotate(${rotation}deg)"`;  
  document.querySelector('.y-1').style.transform = "rotate("+rotation+"deg)";
  document.querySelector('.y-3').style.transform = "rotate("+rotation+"deg)";
  document.querySelector('.y-5').style.transform = "rotate("+rotation+"deg)";
  document.querySelector('.y-7').style.transform = "rotate("+rotation+"deg)";
  document.querySelector('.y-9').style.transform = "rotate("+rotation+"deg)";
  document.querySelector('.y-11').style.transform = "rotate("+rotation+"deg)";
  document.querySelector('.y-13').style.transform = "rotate("+rotation+"deg)";
  document.querySelector('.y-15').style.transform = "rotate("+rotation+"deg)";
  document.querySelector('.y-17').style.transform = "rotate("+rotation+"deg)";
}

  

