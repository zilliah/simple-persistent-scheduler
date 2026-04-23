export function getInitialTime() {
    const timeInput = {
        "start": document.querySelector("#start-time").value,
        "end": document.querySelector("#end-time").value
    };
    const workableTime = {};
    if (timeInput.start) {
        workableTime.start = Temporal.PlainTime.from(timeInput.start);
        document.querySelector("#end-time").value = 0;
    } else if (timeInput.end) {
        workableTime.end = Temporal.PlainTime.from(timeInput.end);
    } else {
        return null;
        //TODO change to on page message instead of popup
    }
    return workableTime;
}

//initTime is { start: Temporal.PlainTime, end: Temporal:PlainTime }
 export function calculateTaskTime(tasks, initTime) {
    console.log("starting with:")
    console.log(tasks);
    console.log(initTime);
    let calcArray;
    //check for start or end time
    //startTime: add to get tasks

    if (initTime.start) {
        console.log("start time found: adding to calculate");
        return tasks.map((t, i) => {
            i === 0? t.startTime = initTime.start : 
                     t.startTime = tasks[i-1].endTime;
            t.endTime = t.startTime.add(t.duration);
            return t;
            //CURR - may need to refactor this?
            //it works but it soooort of mutates the original array
            //like not really but it updates the properties of the Tasks
            //which idk is kind of fine and what I want 
            //(plus they don't get saved in localStorage anyway)
            //but is maybe not best practice
            //but like....I do want to be able to access that information in script.js
            //so like idk
            //also the return function doesn't seem to matter here so idk
        });
    } else if (initTime.end) {
        console.log("end time found: subtracting to calculate");
        //CURR - working on this but i abruptly got too sleepy
    }


    //endTime: subtract to get tasks


    console.log("ending with:")
    console.log(calcArray);
    return calcArray;
}