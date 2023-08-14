const doneMore = document.querySelector('.doneMore-btn');
const taskInput = document.querySelector('.taskInput');
const tasksList = document.querySelector('.tasksList');
const btnAction = document.querySelector('.btn-action')

window.addEventListener('load', () => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    for (const task of savedTasks) {
        addTaskToList(task.text, task.done);
    }

    const taskTitles = document.querySelectorAll('.task-title');
    savedTasks.forEach((task, index) => {
        if (task.done) {
            taskTitles[index].classList.add('task-title--done');
        }
    });

    const doneBtn = document.querySelectorAll('.done')
    savedTasks.forEach((task, index) => {
        if (task.done) {
            doneBtn[index].classList.add('active');
        }
    });
    
});


taskInput.addEventListener('keydown', addTask);
function addTask(event){
    if(event.code === 'Enter' || event.code === 'NumpadEnter'){
        event.preventDefault();

        const taskText = taskInput.value.trim();


        if (taskText === "") return;

        addTaskToList(taskText, false);
        updateLocalStorage();
        taskInput.value = '';


    }   
}

function addTaskToList(taskText, done) {
    
    const taskHTML = 
    `<li class="list-group-item">
        <button type ="button" class="btn-action done" type="button" data-action="done"></button>
        <span class="task-title">${taskText}</span>
        <button type ="button" class="btn-action delete" type="button" data-action="delete">X</button>
    </li>`



 
    tasksList.insertAdjacentHTML('beforeend', taskHTML);
    taskInput.value  = ""

}


tasksList.addEventListener('click', listRemove)
function listRemove(event){
    if(event.target.classList.contains('delete')){
        const parentNode = event.target.closest('.list-group-item')
        parentNode.remove()
        updateLocalStorage();
    }

}



tasksList.addEventListener('click', listDone)
function listDone(event){

    if (event.target.classList.contains('done')){
        const parentNode = event.target.closest('.list-group-item');
        const taskTitle = event.target.nextElementSibling;
        taskTitle.classList.toggle('task-title--done');

        const doneBtn = parentNode.querySelectorAll('.done')
        for(const el of doneBtn){
            el.classList.toggle('active')
        }
        updateLocalStorage();
    }
}


doneMore.addEventListener('click', taskDoneMore);
function taskDoneMore(event){
    const taskTitles = document.querySelectorAll('.task-title');
    let allDone = true;

    for(const taskTitle of taskTitles ){
        if (!taskTitle.classList.contains('task-title--done')){
            allDone = false;
            break;
        }
    }


    for(const taskTitle of taskTitles ){
        if (allDone){
            taskTitle.classList.remove('task-title--done');
        } else {
            taskTitle.classList.add('task-title--done');
        }
    }




    const doneBtn = document.querySelectorAll('.done');
    let allActive = true;

    for (const button of doneBtn) {
        if (!button.classList.contains('active')) {
            allActive = false;
            break;
        }
    }

    

    for (const button of doneBtn) {
        if (allActive) {
            button.classList.remove('active');
        } else {
            button.classList.add('active');
        }
    }

   

    updateLocalStorage();

}



function updateLocalStorage() {
    const taskElements = document.querySelectorAll('.task-title');
    const taskData = Array.from(taskElements).map(taskElement => {
        return {
            text: taskElement.textContent,
            done: taskElement.classList.contains('task-title--done')
        };
    });
    localStorage.setItem('tasks', JSON.stringify(taskData));
}