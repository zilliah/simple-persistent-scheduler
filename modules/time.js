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

// tasks is array of Tasks
// initTime is { start: Temporal.PlainTime, end: Temporal:PlainTime }
 export function calculateTaskTime(tasks, initTime) {
    console.log("starting with:")
    let calcArray;
    if (initTime.start) {
        console.log("start time found: adding to calculate");
        return tasks.map((t, i) => {
            i === 0? t.startTime = initTime.start : 
                     t.startTime = tasks[i-1].endTime;
            t.endTime = t.startTime.add(t.duration);
            return t;
        });
    } else if (initTime.end) {
        return tasks.map((t,i) => {
            i === 0? t.endTime = initTime.end : 
                     t.endTime = tasks[i-1].startTime;
            t.startTime = t.endTime.subtract(t.duration);
            return t;
        });
    }
    return calcArray;
}