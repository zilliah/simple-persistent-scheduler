import { Task } from "./modules/task.js";
import { newTaskRow, removeRow, updateRemovalButtons, showTimes, readPageSchedule, saveSchedule, readSavedSchedule, displaySavedSchedule } from "./modules/schedule.js";
import { getInitialTime, calculateTaskTime } from "./modules/time.js"
import { clearSchedule, clearTimes } from "./modules/clear.js"
import { clearErrors, displayError, validateDurationInput} from "./modules/errors.js";

const addBtn = document.querySelector(".add-new-row");
const orderedListNode = document.querySelector("ol");
let schedule = []; //array of Tasks


//check for saved schedule
const saved = localStorage.getItem("saved-schedule");
if (saved) displaySavedSchedule(readSavedSchedule(saved), orderedListNode);

// validate duration input
const numberInputNodes = document.querySelectorAll("input[type='number']");
numberInputNodes.forEach(n => n.addEventListener("input", e => validateDurationInput(n)));
////// TODO need to add an event listener to new rows (do in the add new row method)

// ------ CALCULATE ---- calculate schedule + save to local storage
const calculateBtn = document.querySelector("#calculate");
calculateBtn.addEventListener("click", e => {
    clearErrors();

    //read & save input
    const initTime = getInitialTime();
    schedule = readPageSchedule(orderedListNode); //input has been corrected
    saveSchedule(schedule); //corrected input is saved

    //TODO update task number inputs to show corrected values
    //do a function to loop through them and compare
    //pass in schedule (array of Task objects!)
    //ok am maybe doing on page validation instead

    if (!initTime) return null;
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


//  TMP TESTING CURR
// document.querySelector("#test").addEventListener("click", e => verifyCorrectScheduleInput(schedule, orderedListNode));