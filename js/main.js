const doneMore = document.querySelector('.doneMore-btn');
const taskInput = document.querySelector('.taskInput');
const tasksList = document.querySelector('.tasksList');
const btnAction = document.querySelector('.btn-action')

let tasks = [];


taskInput.addEventListener('keydown', addTask);
function addTask(event){
    if(event.code === 'Enter' || event.code === 'NumpadEnter'){
        event.preventDefault();

        const taskText = taskInput.value 


        const newTask = {
            id: Date.now(),
            text: taskText,
            done:false,
        };

        tasks.push(newTask)

        const cssClass = newTask.done ? 'task-title task-title--done' : 'task-title';



        if (taskText === "") return;

        const task = {
            text: taskText,
            done: false
        };

        const taskHTML = 
        `<li id="${newTask.id}" class="list-group-item">
            <button type ="button" class="btn-action done" type="button" data-action="done"></button>
            <span class="${cssClass}">${newTask.text}</span>
            <button type ="button" class="btn-action delete" type="button" data-action="delete">X</button>
        </li>`


     
        tasksList.insertAdjacentHTML('beforeend', taskHTML);
        taskInput.value  = ""
    }   
}


tasksList.addEventListener('click', listRemove)
function listRemove(event){
    if(event.target.classList.contains('delete')){
        const parentNode = event.target.closest('.list-group-item')

        const id = Number(parentNode.id)

      const index =  tasks.findIndex(function (task) {
            return task.id === id
        });


        tasks.splice(index, 1)


        parentNode.remove()
    }
}



tasksList.addEventListener('click', listDone)
function listDone(event){

    if (event.target.classList.contains('done')){
        const parentNode = event.target.closest('.list-group-item');
        const taskTitle = parentNode.querySelector('.task-title');
        taskTitle.classList.toggle('task-title--done');

        const doneBtn = parentNode.querySelectorAll('.done')
        for(const el of doneBtn){
            el.classList.toggle('active')
        }
        
    }
}


doneMore.addEventListener('click', taskDoneMore);
function taskDoneMore(event){
    const taskTitles = document.querySelectorAll('.task-title');
    for(const taskTitle of taskTitles ){
        taskTitle.classList.toggle('task-title--done')
    }


    const doneBtn = document.querySelectorAll('.done')
    for(const el of doneBtn){
        el.classList.toggle('active')
    }
}



