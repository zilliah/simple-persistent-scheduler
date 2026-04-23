import { Task } from "./modules/task.js";
import { newTaskRow, removeRow, updateRemovalButtons, showTimes, readPageSchedule, saveSchedule, readSavedSchedule, displaySavedSchedule } from "./modules/schedule.js";
import { getInitialTime, calculateTaskTime } from "./modules/time.js"
import { clearSchedule, clearTimes } from "./modules/clear.js"
import { clearErrors, displayError } from "./modules/errors.js";

const addBtn = document.querySelector(".add-new-row");
const orderedListNode = document.querySelector("ol");
let schedule = []; //array of Tasks


//check for saved schedule
const saved = localStorage.getItem("saved-schedule");
if (saved) displaySavedSchedule(readSavedSchedule(saved), orderedListNode);

// ------ CALCULATE ---- calculate schedule + save to local storage
const calculateBtn = document.querySelector("#calculate");
calculateBtn.addEventListener("click", e => {
    clearErrors();
    const initTime = getInitialTime();
    schedule = readPageSchedule(orderedListNode);
    saveSchedule(schedule);

    if (!initTime) {
        displayError("No start or end time: tasks have been saved but schedule is not calculated.");
        //TODO change this to an on page message instead of an alert
        return null;
    }
    calculateTaskTime(schedule, initTime);
    showTimes(schedule);
});


// ---- PAGE DISPLAY UPDATES --------
updateRemovalButtons();
addBtn.addEventListener("click", e => {
    orderedListNode.appendChild(newTaskRow());
    updateRemovalButtons();
});


// ---------- CLEAR DATA/ETC --------------
// clear start/end time
const clearTimeBtn = document.querySelector("#clear-time");
clearTimeBtn.addEventListener("click", e => clearTimes());

//clear schedule
const clearAllBtn = document.querySelector("#clear-all");
clearAllBtn.addEventListener("click", e => clearSchedule());


// TODO check if browser supports Temporal, show error if not