import { Task } from "./task.js";

// ---- PAGE DISPLAY UPDATES --------
export function newTaskRow() {
    const li = document.createElement("li");

    const span = document.createElement("span");
    span.textContent = "0:00"
    span.classList.add("task-start-time");
    const checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
    const inputText = document.createElement("input");
    inputText.setAttribute("type", "text");
    inputText.setAttribute("placeholder", "task");
    const inputHours = document.createElement("input");
    inputHours.setAttribute("type", "number");
    inputHours.setAttribute("name", "hours");
    inputHours.classList.add("hours");
    inputHours.setAttribute("placeholder", "hours");
    const inputMins = document.createElement("input");
    inputMins.setAttribute("type", "number");
    inputMins.setAttribute("name", "minutes");
    inputMins.classList.add("hours");
    inputMins.setAttribute("placeholder", "minutes");

    const btnX = document.createElement("button")
    btnX.textContent="X";
    btnX.classList.add("delete-row");

    li.append(span, checkbox, inputText, inputHours, inputMins, btnX);
    return li;
}
export function removeRow(btn) {
    btn.parentElement.remove();
}
//note: first row is not deletable and does not have X btn intentionally 
export function updateRemovalButtons() {
    const btns = document.querySelectorAll(".delete-row");
    // console.log(btns);
    btns.forEach(node => {
         node.addEventListener("click", e => removeRow(node));
    });

}

export function showTimes(taskList) {
    const liNodes = document.querySelectorAll("li");
    taskList.forEach((t,i) => {
        let currNode = liNodes[i];
        let fullTime = t.startTime.toString();
        currNode.querySelector("span").textContent = fullTime.slice(0,fullTime.lastIndexOf(":"));
    });
}

// -------- TASK/SCHEDULE READ & SAVE FUNCTIONS --------------------

//read schedule from input boxes. returns schedule array
export function readPageSchedule(liNodeList) {
    const taskList = liNodeList.childNodes; //actual notes index from 1...why? innerText?
    // console.log(taskList)//TODO error for empty list
    let readSchedule = [];
    for (let i = 0; i < taskList.length; i++) {
        let taskName = taskList[i].childNodes[2].value;
        //TODO add number validation + throw error if not a number + say where
        let taskHours = taskList[i].childNodes[3].value;
        let taskMinutes = taskList[i].childNodes[4].value;
        let currTask = new Task(taskName, Temporal.Duration.from({ hours: Number(taskHours), minutes: Number(taskMinutes)}))
        readSchedule.push(currTask); 
    };
    return readSchedule;
}
//save schedule to local storage as a string
//returns schedule as a string
export function saveSchedule(scheduleArray) {
    let scheduleString = "";
    scheduleArray.forEach(el => scheduleString += `${el.name}:${el.duration.toString()},`);
    scheduleString = scheduleString.slice(0, scheduleString.length - 1);
    localStorage.setItem("saved-schedule", scheduleString);
    return scheduleString;
}
//read schedule from local storage
//returns saved schedule as array of objects with one key/value
//OR returns null if no saved schedule
export function readSavedSchedule() {
    const scheduleString = localStorage.getItem("saved-schedule");
    if (scheduleString) {
        return scheduleString.split(",").map(str => {
            let taskArr = str.split(":");
            return { name: taskArr[0], duration: Temporal.Duration.from(taskArr[1]) };
        });
    } else return null;
}
//show saved schedule in editable input boxes
//returns nothing
export function displaySavedSchedule(arr, orderedListNode) {
    for (let i = 0; i < arr.length; i++) {
        if (i === 0) {
            let firstLiNodes = orderedListNode.firstChild.childNodes;
            firstLiNodes[2].setAttribute("value", arr[i].name);
            firstLiNodes[3].setAttribute("value", arr[i].duration.hours);
            firstLiNodes[4].setAttribute("value", arr[i].duration.minutes);
        } else {
            let li = newTaskRow();
            let inputEls = li.childNodes;
            inputEls[2].setAttribute("value", arr[i].name);
            inputEls[3].setAttribute("value", arr[i].duration.hours);
            inputEls[4].setAttribute("value", arr[i].duration.minutes);
            orderedListNode.append(li);
        }
    }
}