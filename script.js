import { Task } from "./modules/task.js";
import { newTaskRow, removeRow, updateRemovalButtons, readPageSchedule, saveSchedule, readSavedSchedule, displaySavedSchedule } from "./modules/schedule.js";
import { getInitialTime, calculateTaskTime } from "./modules/time.js"
import { clearSchedule } from "./modules/clear.js"


const addBtn = document.querySelector(".add-new-row");
const orderedListNode = document.querySelector("ol");
let schedule = []; //array of Tasks


//check for saved schedule
const saved = localStorage.getItem("saved-schedule");
if (saved) displaySavedSchedule(readSavedSchedule(saved), orderedListNode);

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


// ----------- TIME FUNCTIONS -----------------
// CURR 

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
