import { listInfo } from "./main.js";
export { updateJson, storedTask}


/**
 * Stores the task in the Array by turning the array into JSON and storing it in localStorage
 */
function updateJson() {
    const jsonArray = JSON.stringify(listInfo());
    localStorage.setItem('list', jsonArray);
}

/**
 * returns the stores array of task 
 * @returns list of task
 */
function storedTask(){
    const tasks = localStorage.getItem('list')
    return JSON.parse(tasks)
}