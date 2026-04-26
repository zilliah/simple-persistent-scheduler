import { Task } from "./modules/task.js";
import { newTaskRow, removeRow, activateRemovalButtons, showTaskTimes, readPageSchedule, saveSchedule, readSavedSchedule, displaySavedSchedule } from "./modules/schedule.js";
import { getInitialTime, calculateTaskTime } from "./modules/time.js"
import { clearSchedule, clearTimes } from "./modules/clear.js"
import { clearErrors, displayError, validateDurationInput, validateTaskNameInput} from "./modules/errors.js";

const addBtn = document.querySelector(".add-new-row");
const orderedListNode = document.querySelector("ol");
let schedule = []; //array of Tasks

// check if browser supports temporal
(function() {
    try {
        let a = new Temporal.PlainTime();
    } catch {
        displayError("Sorry, your browser doesn't support a core feature this tool needs. Try using Firefox or Chrome, or update your browser if you're already using one of those.")
    }
})();


//check for saved schedule
const saved = localStorage.getItem("saved-schedule");
if (saved) {
    try {
        displaySavedSchedule(readSavedSchedule(saved), orderedListNode);
    } catch {
        displayError("Something was wrong with your saved schedule. Saved schedule has been deleted, sorry. (Might be emojis - don't use them in your task names. Sometimes they're fine but sometimes they aren't.)")
    }
}

// validate inputs
// TODO error: 
    // these are doubled for added tasks and I'm not sure how to handle it
    // needs to be called here to add listeners for the saved tasks (otherwise they won't get error handling)
    // but also needs to be called when creating a new task row (newTaskRow()) bc otherwise new tasks won't have listeners
    // it's working fine for newly added tasks and the starter task 
    // but for saved tasks it's called twice!
    // and idk why, event listeners shouldn't last page page refresh
    // it's not a huge problem, it can get called twice I guess, but whyyyyyyyy is it happening
const nameInputNodes = document.querySelectorAll("input[type='text']");
nameInputNodes.forEach(n => n.addEventListener("input", e => validateTaskNameInput(n)));
const numberInputNodes = document.querySelectorAll("input[type='number']");
numberInputNodes.forEach(n => n.addEventListener("input", e => validateDurationInput(n)));

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
    // TODO: ok this still isn't working right
    // like the value and the textContent are both the correct thing
    // but the text in the input box is still wrong???? like ARG

    if (!initTime) return null;
    calculateTaskTime(schedule, initTime);
    showTaskTimes(schedule); 
});


// ---- PAGE DISPLAY UPDATES --------
activateRemovalButtons();
addBtn.addEventListener("click", e => {
    orderedListNode.appendChild(newTaskRow());
    activateRemovalButtons();
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