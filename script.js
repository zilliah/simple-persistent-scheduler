const addBtn = document.querySelector(".add-new-row");
const list = document.querySelector("ol");
let schedule = [];


//add and remove buttons 
updateRemovalButtons();
addBtn.addEventListener("click", (e) => {
    list.appendChild(newTaskRow());
    updateRemovalButtons();
});

function newTaskRow() {
    const li = document.createElement("li");

    const checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
    const inputText = document.createElement("input");
    inputText.setAttribute("type", "text");
    inputText.setAttribute("placeholder", "task");
    const inputNumber = document.createElement("input");
    inputNumber.setAttribute("type", "number");
    inputNumber.setAttribute("placeholder", "60");

    const btnX = document.createElement("button")
    btnX.textContent="X";
    btnX.classList.add("delete-row");

    li.append(checkbox, inputText, inputNumber, btnX);
    return li;
}

function removeRow(btn) {
    btn.parentElement.remove();
}

//note: first row is not deletable and does not have X btn intentionally 
function updateRemovalButtons() {
    const btns = document.querySelectorAll(".delete-row");
    // console.log(btns);
    btns.forEach((node) => {
         node.addEventListener("click", (e) => removeRow(node));
    });

}



// CALCULATE BUTTON: calculate schedule + save to local storage
const calculateBtn = document.querySelector("#calculate");
calculateBtn.addEventListener("click", (e) => {
    console.log("calculating, beep boop");

    schedule = readPageSchedule(list);

    console.log(schedule);
    saveSchedule(schedule);

});

//read schedule from input boxes. returns schedule array
function readPageSchedule(liNodeList) {
    const taskList = liNodeList.childNodes; //actual notes index from 1...why? innerText?
    //TODO error for empty list
    let readSchedule = [];
    for (let i = 1; i < taskList.length; i++) {
        let taskName = taskList[i].childNodes[0].value;
        //TODO add number validation + throw error if not a number + say where
        let taskTime = taskList[i].childNodes[1].value;
        readSchedule.push({[taskName]: taskTime});
    };
    return readSchedule;
}

//save schedule to local storage as a string
//returns schedule as a string
function saveSchedule(scheduleArray) {
    let scheduleString = "";

    scheduleArray.forEach((el) => {
        for (let key in el) scheduleString += key + ":" + el[key];
        scheduleString+= ",";
    });
    scheduleString = scheduleString.slice(0, length - 1);
    localStorage.setItem("saved-schedule", scheduleString);
    return scheduleString;
}

//read schedule from local storage
//return schedule array
//do the saving part first
function readSavedSchedule() {
    const scheduleString = localStorage.getItem("saved-schedule");
    if (schedule) {
        const scheduleArray = scheduleString.split(",");
        console.log(scheduleArray);
        //create list items for each element
        //fill in saved data, after parsing the string into an array
    } else return null;
}

//CLEAR:
// clear start/end time
const clearBtns = document.querySelectorAll(".clear");

//clear schedule
const clearAllBtn = document.querySelector("#clear-all");
clearAllBtn.addEventListener("click", (e) => clearSchedule());
function clearSchedule() {
    localStorage.clear();
    window.location.reload(true); 
    //"true" for hard refresh only works in FF, TODO clear on-page input in other browsers. but ok for FF dev't
}