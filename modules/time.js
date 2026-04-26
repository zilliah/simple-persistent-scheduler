import { displayError } from "./errors.js";

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
        displayError("No start or end time: tasks have been saved but schedule is not calculated.");
        return null;
    }
    return workableTime;
}

// tasks is array of Tasks
// initTime is { start: Temporal.PlainTime, end: Temporal:PlainTime }
 export function calculateTaskTime(tasks, initTime) {
    let calcArray;
    console.log("initTime is:");
    console.log(initTime);
    if (initTime.start) {
        return tasks.map((t, i) => {
            i === 0? t.startTime = initTime.start : 
                     t.startTime = tasks[i-1].endTime;
            t.endTime = t.startTime.add(t.duration);
            return t;
        });
    } else if (initTime.end) {
        let totalDuration = tasks.reduce(
            (r, curr) => curr.duration.add(r),
            Temporal.Duration.from({minutes: 0}));
        let calculatedStartTime = initTime.end.subtract(totalDuration);
        return calculateTaskTime(tasks, {start: calculatedStartTime});
    }
    return calcArray;
}