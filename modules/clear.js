export function clearSchedule() {
    localStorage.clear();
    clearTimes();
    window.location.reload(true); 
    //"true" for hard refresh only works in FF, TODO clear on-page input in other browsers. but ok for FF dev't
    //will go through and reset values for all the inputs I guess? forcing a hard refresh for other browsers looks more annoying than just doing that
}

export function clearTimes() {

    //clears set start and end times from input
    
    //clears times saved to tasks
    let spanNodes = document.querySelectorAll("li>span");
    spanNodes.forEach(n => n.textContent = "0:00");

    let timeInputNodes = document.querySelectorAll("input[type='time']");
    timeInputNodes.forEach(n => n.value = 0);

    //removes the spans
    //or wait, should the spans be there from the start.....

    //current error is happening bc adding a span changes the order of the <li> node list
    //so yes ok i think it should be there from the start
}