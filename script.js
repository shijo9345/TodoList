
document.addEventListener("DOMContentLoaded",()=>{
  const StoredTasks = JSON.parse(localStorage.getItem('task'));
  if(StoredTasks){
      StoredTasks.forEach((items)=>{
          tasks.push(items)
          console.log(items)
      })
  }
  updateTasksList();
  completedTask();
})
let tasks=[];

document.getElementById("newTask").addEventListener('click',function(e){
  e.preventDefault();
  addTask();
})


const saveTask = () =>{
  localStorage.setItem('task',JSON.stringify(tasks));
}

const addTask=()=>{
  const taskInput=document.getElementById("taskInput")
  const text=taskInput.value.trim()

  if(text){
      tasks.push({text: text,completed: false})
      updateTasksList();
      completedTask();
      saveTask();
  }


}


const updateTasksList = () => {
  const taskList = document.getElementById("task-list")
  taskList.innerHTML = ''

  if(tasks.length==0){
      const listItem = document.createElement("li");
      listItem.innerHTML = `<img class="empty-image" src="./assets/images/background.png">`;
      taskList.appendChild(listItem);
      return;
  }


  tasks.forEach((task, index) => {
      const listItem = document.createElement("li");

      listItem.innerHTML = `
         <div class="taskItem">
          <div class="task ${task.completed ? 'completed' : ''}">
          <input type="checkbox" class="checkBox" ${task.completed ? "checked" : ""}/>
          <p  class= ${task.completed ? "underline" : ""}>${task.text}</p>
      </div>
      <div class="icons">
          <img src="./assets/icons/edit.png" onclick=editTask(${index})>
          <img src="./assets/icons/delete.png"  onclick=deleteTask(${index})>
      </div>
  </div>
  `;
      listItem.addEventListener('change', () => toggleTaskComplete(index))
      taskList.append(listItem);
  })
  taskInput.value = "";
  saveTask();
}


const completedTask = () =>{
  const completed= tasks.filter((task) => task.completed).length;
  const completedTaskNumber =document.getElementById("numbers");
  completedTaskNumber.innerText = `${ completed+' / '+tasks.length}`
  const progress=document.getElementById("progress");
  const percentage = (completed/tasks.length)*100+"%";
  progress.style.width = percentage;

  if(tasks.length !=0 && completed == tasks.length){
      animateS()
  }
  saveTask();
}



const deleteTask = (index) =>{
  tasks.splice(index, 1);
  updateTasksList();
  completedTask()
  saveTask();
}


const editTask = (index) =>{
  const taskInput=document.getElementById("taskInput")
  taskInput.value = tasks[index].text;
  tasks.splice(index, 1);
  saveTask();
  
  // updateTasksList();
}




function toggleTaskComplete(index){
  tasks[index].completed = !tasks[index].completed;
  console.log(tasks)
  updateTasksList();
  completedTask();
  saveTask();
}


const animateS = () =>{
  const count = 200,
defaults = {
  origin: { y: 0.7 },
};

function fire(particleRatio, opts) {
confetti(
  Object.assign({}, defaults, opts, {
    particleCount: Math.floor(count * particleRatio),
  })
);
}

fire(0.25, {
spread: 26,
startVelocity: 55,
});

fire(0.2, {
spread: 60,
});

fire(0.35, {
spread: 100,
decay: 0.91,
scalar: 0.8,
});

fire(0.1, {
spread: 120,
startVelocity: 25,
decay: 0.92,
scalar: 1.2,
});

fire(0.1, {
spread: 120,
startVelocity: 45,
});

}