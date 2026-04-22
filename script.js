const addBtn = document.querySelector(".add-new-row");
const orderedListNode = document.querySelector("ol");
let schedule = [];

//check for saved schedule
const saved = localStorage.getItem("saved-schedule");
if (saved) displaySavedSchedule(readSavedSchedule(saved));

//add and remove buttons 
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
    const inputMins = document.createElement("input");
    inputMins.setAttribute("type", "number");
    inputMins.setAttribute("name", "hours");
    inputMins.classList.add("hours");
    inputMins.setAttribute("placeholder", "hours");
    const inputHours = document.createElement("input");
    inputHours.setAttribute("type", "number");
    inputHours.setAttribute("name", "minutes");
    inputHours.classList.add("minutes");
    inputHours.setAttribute("placeholder", "minutes");

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

// CALCULATE BUTTON: calculate schedule + save to local storage
const calculateBtn = document.querySelector("#calculate");
calculateBtn.addEventListener("click", e => {
    getInitialTime();
    
    schedule = readPageSchedule(orderedListNode);
    saveSchedule(schedule);
});


// -------- TASK FUNCTIONS --------------------
//read schedule from input boxes. returns schedule array
function readPageSchedule(liNodeList) {
    const taskList = liNodeList.childNodes; //actual notes index from 1...why? innerText?
    // console.log(taskList)//TODO error for empty list
    let readSchedule = [];
    for (let i = 0; i < taskList.length; i++) {
        let taskName = taskList[i].childNodes[1].value;
        //TODO add number validation + throw error if not a number + say where
        let taskTime = taskList[i].childNodes[2].value;
        readSchedule.push({[taskName]: taskTime});
    };
    return readSchedule;
}
//save schedule to local storage as a string
//returns schedule as a string
function saveSchedule(scheduleArray) {
    let scheduleString = "";
    scheduleArray.forEach(el => {
        for (let key in el) scheduleString += key + ":" + el[key];
        scheduleString+= ",";
    });
    scheduleString = scheduleString.slice(0, length - 1);
    localStorage.setItem("saved-schedule", scheduleString);
    return scheduleString;
}
//read schedule from local storage
//returns saved schedule as array of objects with one key/value
//OR returns null if no saved schedule
function readSavedSchedule() {
    const scheduleString = localStorage.getItem("saved-schedule");
    // console.log(scheduleString);
    if (schedule) {
        let scheduleArray = scheduleString.split(",");
        return scheduleArray.map(str => {
            let arr = str.split(":");
            return {[arr[0]]: arr[1]}
        });
    } else return null;
}
//show saved schedule in editable input boxes
//returns nothing
function displaySavedSchedule(arr) {
    for (let i = 0; i < arr.length; i++) {
        if (i === 0) {
            let firstLiNodes = orderedListNode.firstChild.childNodes;
            firstLiNodes[1].setAttribute("value", Object.keys(arr[i])[0]);
            firstLiNodes[2].setAttribute("value", Object.values(arr[i])[0]);
        } else {
            let li = newTaskRow();
            let inputEls = li.childNodes;
            inputEls[1].setAttribute("value", Object.keys(arr[i])[0]);
            inputEls[2].setAttribute("value", Object.values(arr[i])[0]);
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
        console.log("calculating from startTime");
        workableTime.start = Temporal.PlainTime.from(timeInput.start);
        document.querySelector("#end-time").value = 0;
    } else if (timeInput.end) {
        console.log("calculating from endTime");
        workableTime.end = Temporal.PlainTime.from(timeInput.end);
    } else {
        alert("No start or end time: tasks have been saved but schedule is not calculated.");
    }

    console.log(workableTime);
    return workableTime;
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