import { Task } from "./task.js";
import { displayError, validateDurationInput, validateTaskNameInput } from "./errors.js";

// ---- PAGE DISPLAY UPDATES --------
export function newTaskRow() {
    const li = document.createElement("li");
    li.classList.add("grid");

    const spanStart = document.createElement("span");
    spanStart.textContent = "";
    spanStart.classList.add("task-start-time");
    const checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
    const inputText = document.createElement("input");
    inputText.setAttribute("type", "text");
    inputText.setAttribute("placeholder", "task");
    inputText.setAttribute("maxlength", 200);
    const inputHours = document.createElement("input");
    inputHours.setAttribute("type", "number");
    inputHours.setAttribute("name", "hours");
    inputHours.setAttribute("min", "0");
    inputHours.setAttribute("max", "3600");
    inputHours.classList.add("hours");
    inputHours.setAttribute("placeholder", "hours");
    const inputMins = document.createElement("input");
    inputMins.setAttribute("type", "number");
    inputMins.setAttribute("name", "minutes");
    inputMins.setAttribute("min", "0");
    inputMins.setAttribute("max", "3600");
    inputMins.classList.add("minutes");
    inputMins.setAttribute("placeholder", "minutes");
    const spanEnd = document.createElement("span");
    spanEnd.textContent = "";
    spanEnd.classList.add("task-end-time");

    const btnX = document.createElement("button")
    btnX.textContent="X";
    btnX.classList.add("delete-row");

    // input validation
    inputText.addEventListener("input", e => validateTaskNameInput(inputText));
    inputHours.addEventListener("input", e => validateDurationInput(inputHours));
    inputMins.addEventListener("input", e => validateDurationInput(inputMins));

    li.append(spanStart, checkbox, inputText, inputHours, inputMins, spanEnd, btnX);

    return li;
}
export function removeRow(btn) {
    btn.parentElement.remove();
}
//note: first row is not deletable and does not have X btn intentionally 
export function activateRemovalButtons() {
    const btns = document.querySelectorAll(".delete-row");
    btns.forEach(node => {
         node.addEventListener("click", e => removeRow(node));
    });
}

export function showTaskTimes(taskList) {
    function trimSeconds(str) {
        return str.slice(0,str.lastIndexOf(":"));
    }
    const liNodes = document.querySelectorAll("li");
    taskList.forEach((t,i) => {
        let currNode = liNodes[i];
        let spanNodes = currNode.querySelectorAll("span");
        // [spanNodes[0].textContent, spanNodes[1].textContent] = ["Start: " + trimSeconds(t.startTime.toString()), "End: " + trimSeconds(t.endTime.toString())];
        const readableTimes = ["Start: " + trimSeconds(t.startTime.toString()), "End: " + trimSeconds(t.endTime.toString())];
        spanNodes.forEach((span,i) => {
            span.classList.add("show");
            span.textContent = readableTimes[i];
        });
    });
}



// -------- TASK/SCHEDULE READ & SAVE FUNCTIONS --------------------

//read schedule from input boxes. returns schedule array
export function readPageSchedule(liNodeList) {
    const taskList = liNodeList.childNodes; //actual notes index from 1...why? innerText?
    let readSchedule = [];
    for (let i = 0; i < taskList.length; i++) {
        // handle bad input
        let taskName = taskList[i].childNodes[2].value.toString().slice(0, 200);
        
        let taskHours = Math.round(Number(taskList[i].childNodes[3].value));
        let taskMinutes = Math.round(Number(taskList[i].childNodes[4].value));
        if (taskHours > 3600) taskHours = 3600;
        if (taskHours < 0) taskHours = 0;
        if (taskMinutes > 3600) taskMinutes = 3600;
        if (taskMinutes < 0) taskMinutes = 0;

        let currTask = new Task(taskName, Temporal.Duration.from({ hours: taskHours, minutes: taskMinutes}));
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
    }
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

