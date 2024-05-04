
export { taskObj, taskListManager }
import { updateJson, storedTask } from "./storage.js";

const taskList = document.querySelector('.list');

/**
 * Object that holds the information of a task
 * @param {String} task 
 * @param {String} text 
 */
function taskObj(task, text, marked = false) {
    this.task = task;
    this.description = text;
    this.marked = marked;
}

/**
 * the list manager the allows usesr to add and remove task
 */
class taskListManager {
    constructor(arr = []) {
        this.list = arr
    }

    /**
     * create a new task and add it to the list
     * @param {String} task 
     * @param {String} text 
     */
    add(task, text) {
        const newtask = new taskObj(task, text);
        this.list.push(newtask);
    }

    /**
     * Removes an item when button is clicked, is used in refresh method
     */
    remove() {
        let rb = document.querySelectorAll(`.removeBtns`);
        rb.forEach((ele) => {
            ele.addEventListener('click', () => {
                this.list.splice(ele.parentElement.parentElement.getAttribute('data-item'), 1);
                this.refresh();
            })
        })
    }

    /** 
     * returns the number of task in the array 
     * */
    size() {
        return this.list.length;
    }

    /**
     * displays the items in the array; adds remove function to task; 
     */
    refresh() {
        taskList.innerHTML = "";
        this.list.forEach((ele, index) => {
            createTask(ele.task, ele.description, index, ele.marked)
        });
        this.remove();
        this.isChecked();
        updateJson();
        this.list = storedTask();
    }


    /**
     * saves checked task
     */
    isChecked() {
        let boxes = document.querySelectorAll(`.checkboxs`);

        boxes.forEach((ele, index) => {
            ele.checked = this.list[index].marked;

            ele.addEventListener('click', () => {
                ele.checked ? this.list[index].marked = true : this.list[index].marked = false;
                updateJson()
            })
        })

    }
}

// ---------------------- HTML ELEMENT STUFF ---------------------
/**
 * Takes a string version of html and convertes it to real HTML
 * @param {String} html
 * @returns HTML element or elements
 */
function HTMLConverter(html) {
    const templete = document.createElement("template");
    templete.innerHTML = html.trim();
    return templete.content.firstElementChild;
}
/**
 * Adds the html created into Array of task
 * @param {String} task 
 * @param {String} text 
 * @param {Integer} index 
 * @param {Boolean} checked 
 */
function createTask(task, text, index, checked) {

    const html = HTMLConverter(`
    <div class="listItems" data-item="${index}">
        <div class="item-nav">
            <input type="checkbox" name="${task.trim().toLowerCase()}" id="${task.trim().toLowerCase()}" class="checkboxs" data-isChecked="${checked}">
            <label for="${task.trim().toLowerCase()}" class="tasks">${task.trim()}</label>
            <i class='bx bx-x taskIcons removeBtns' id="remove-btn""></i>
        </div>
        <p class="description">${text.trim()}</p>
    </div>
     `);

    taskList.appendChild(html);
}