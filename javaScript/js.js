const addTaskbtn = document.getElementById("add");
const inputTask = document.getElementById("in");
const blockToDo = document.querySelector(".block-todo");
let tasks;

!localStorage.tasks
  ? (tasks = [])
  : (tasks = JSON.parse(localStorage.getItem("tasks")));

function Task(description) {
  this.description = description;
  this.completed = false;
}

const createTemplate = (task, index) => {
  return `
    <div class="block_todo_item">
        <div class="description">${task.description}</div>
        <div class="buttons">
          <input class="btn-complete" type="checkbox">
          <button class="btn-delete">Delete</button>
        </div>
      </div>
  `;
};

// const fillHtmllist = () => {
//   blockToDo.innerHTML = '';
//   if(tasks.lenght > 0) {
//     tasks.forEach((item, index) => {
//       blockToDo.innerHTML += createTemplate(item, index);

//     });
//   }
// };

const fillHtmllist = () => {
  blockToDo.innerHTML = "";
  tasks.forEach((item, index) => {
    blockToDo.innerHTML += createTemplate(item, index);
  });
};
fillHtmllist();
const updatelocal = () => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

addTaskbtn.addEventListener("click", () => {
  tasks.push(new Task(inputTask.value));
  updatelocal();
  fillHtmllist();
});
