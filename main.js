
import { taskListManager } from "./taskManager.js"
export{listInfo}

const newTaskBtn = document.querySelector("#newtaskContiner");
const taskInfo = document.querySelector("#taskInfo");
const closeBtn = document.querySelector("#close-btn");
const taskInput = document.querySelector('#task');
const descriptionInput = document.querySelector('#description');

let myList = new taskListManager(JSON.parse(localStorage.getItem('list')));
    // myList.add('Clean Room', 'Fix Bed and clean Desk')
    // myList.add('Read', 'Read 15 pages of Meditations')
myList.refresh();
taskInfo.style.display = 'none';
let isTaskInfoHidden = taskInfo.style.display;

/**
 * 
 * @returns return the list of task in a array
 */
function listInfo(){
    return myList.list;
}

/**
 * allow user to add new task, create a dropdown box to enter info
 */
newTaskBtn.addEventListener("click", () => {
    if (isTaskInfoHidden == 'none') {
        taskInfo.style.display = 'block';
        isTaskInfoHidden = 'block';
    }

})

/**
 * closes the new task info box
 */
closeBtn.addEventListener("click", () => {
    if (isTaskInfoHidden != 'none') {
        taskInfo.style.display = 'none';
        isTaskInfoHidden = 'none';
    }
})

/**
 * create new task, adds it to array, displays the elements in the array, resets the inputs
 */
taskInfo.addEventListener('submit', (e) => {
    e.preventDefault();
    let title = taskInput.value;
    let text = descriptionInput.value;
    myList.add(title, text);
    myList.refresh();
    taskInfo.reset();
})






