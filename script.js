const addBtn = document.querySelector(".add-new-row");
const orderedListNode = document.querySelector("ol");
let schedule = []; //array of Tasks

class Task {
    constructor(name, duration) {
        this.name = name;
        this.duration = duration; 
        this.startTime = undefined; //use the calcEtc methods below to calculate these, but can also be retrieved directly if previously set
        this.endTime = undefined;
        this.completed = false; //not used yet
    }

    //when working with an inputted START time, 
    //tasks are passed the start time and must calculate the end time
    //which is then passed to the next task as its start time
    calcEndTime(startTime) {
        let currStart = startTime ? startTime : this.startTime;
        this.startTime = currStart;
        this.endTime = currStart.add(this.duration);
        return this.endTime; 
    }

    //when working with an inputted END time
    //tasks are passed the end time and must calculate the start time
    //which is then passed to next task as its end time
    calcStartTime(endTime) {
        let currEnd = endTime ?  endTime : this.endTime;
        this.endTime = currEnd;
        this.startTime = currEnd.subtract(this.duration)
        return this.startTime;
    }
}





//check for saved schedule
const saved = localStorage.getItem("saved-schedule");
if (saved) displaySavedSchedule(readSavedSchedule(saved));

// ------ CALCULATE ---- calculate schedule + save to local storage
const calculateBtn = document.querySelector("#calculate");
calculateBtn.addEventListener("click", e => {
    const initTime = getInitialTime();
    
    schedule = readPageSchedule(orderedListNode);
    saveSchedule(schedule);
    calculateTaskTime(schedule, initTime)
});





// ---- PAGE DISPLAY UPDATES --------
updateRemovalButtons();
addBtn.addEventListener("click", e => {
    orderedListNode.appendChild(newTaskRow());
    updateRemovalButtons();
});
function newTaskRow() {
    const li = document.createElement("li");

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

    li.append(checkbox, inputText, inputHours, inputMins, btnX);
    return li;
}
function removeRow(btn) {
    btn.parentElement.remove();
}
//note: first row is not deletable and does not have X btn intentionally 
function updateRemovalButtons() {
    const btns = document.querySelectorAll(".delete-row");
    // console.log(btns);
    btns.forEach(node => {
         node.addEventListener("click", e => removeRow(node));
    });

}

// -------- TASK/SCHEDULE READ & SAVE FUNCTIONS --------------------
//read schedule from input boxes. returns schedule array
function readPageSchedule(liNodeList) {
    const taskList = liNodeList.childNodes; //actual notes index from 1...why? innerText?
    // console.log(taskList)//TODO error for empty list
    let readSchedule = [];
    for (let i = 0; i < taskList.length; i++) {
        let taskName = taskList[i].childNodes[1].value;
        //TODO add number validation + throw error if not a number + say where
        let taskHours = taskList[i].childNodes[2].value;
        let taskMinutes = taskList[i].childNodes[3].value;
        let currTask = new Task(taskName, Temporal.Duration.from({ hours: Number(taskHours), minutes: Number(taskMinutes)}))
        readSchedule.push(currTask); 
    };
    return readSchedule;
}
//save schedule to local storage as a string
//returns schedule as a string
function saveSchedule(scheduleArray) {
    let scheduleString = "";
    scheduleArray.forEach(el => scheduleString += `${el.name}:${el.duration.toString()},`);
    scheduleString = scheduleString.slice(0, scheduleString.length - 1);
    localStorage.setItem("saved-schedule", scheduleString);
    return scheduleString;
}
//read schedule from local storage
//returns saved schedule as array of objects with one key/value
//OR returns null if no saved schedule
function readSavedSchedule() {
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
function displaySavedSchedule(arr) {
    for (let i = 0; i < arr.length; i++) {
        if (i === 0) {
            let firstLiNodes = orderedListNode.firstChild.childNodes;
            firstLiNodes[1].setAttribute("value", arr[i].name);
            firstLiNodes[2].setAttribute("value", arr[i].duration.hours);
            firstLiNodes[3].setAttribute("value", arr[i].duration.minutes);
        } else {
            let li = newTaskRow();
            let inputEls = li.childNodes;
            inputEls[1].setAttribute("value", arr[i].name);
            inputEls[2].setAttribute("value", arr[i].duration.hours);
            inputEls[3].setAttribute("value", arr[i].duration.minutes);
            orderedListNode.append(li);
        }
    }
}

// ----------- TIME FUNCTIONS -----------------
function getInitialTime() {
    const timeInput = {
        "start": document.querySelector("#start-time").value, //TMP gives 24h value. can also get valueAsDate
        "end": document.querySelector("#end-time").value
    };
    const workableTime = {};
    if (timeInput.start) {
        // console.log("calculating from startTime");
        workableTime.start = Temporal.PlainTime.from(timeInput.start);
        document.querySelector("#end-time").value = 0;
    } else if (timeInput.end) {
        // console.log("calculating from endTime");
        workableTime.end = Temporal.PlainTime.from(timeInput.end);
    } else {
        alert("No start or end time: tasks have been saved but schedule is not calculated.");
        //TODO change to on page message instead of popup
    }
    // console.log(workableTime);
    return workableTime;
}

function calculateTaskTime(tasks, initTime) {
    // console.log(tasks);
    // console.log(initTime);

    for (let i = 0; i < tasks.length; i++) {
        // tasks[i].startTime = initTime.add()
    }
}

//  ------------ INFO NOTICES -----------------
// TODO

// ---------- CLEAR DATA/ETC --------------
// clear start/end time
const timeBtns = document.querySelectorAll(".clear-time");
// console.log(timeBtns);
timeBtns.forEach(btn => btn.addEventListener("click", e => btn.previousElementSibling.value = ""));

//clear schedule
const clearAllBtn = document.querySelector("#clear-all");
clearAllBtn.addEventListener("click", e => clearSchedule());
function clearSchedule() {
    localStorage.clear();
    window.location.reload(true); 
    //"true" for hard refresh only works in FF, TODO clear on-page input in other browsers. but ok for FF dev't
    //will go through and reset values for all the inputs I guess? forcing a hard refresh for other browsers looks annoying
}