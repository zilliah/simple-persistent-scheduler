export function getInitialTime() {
    const timeInput = {
        "start": document.querySelector("#start-time").value, //TMP gives 24h value. can also get valueAsDate
        "end": document.querySelector("#end-time").value
    };
    const workableTime = {};
    if (timeInput.start) {
        // console.log("calculating from startTime");
        workableTime.start = Temporal.PlainTime.from(timeInput.start);
        document.querySelector("#end-time").value = 0;
    } else if (timeInput.end) {
        // console.log("calculating from endTime");
        workableTime.end = Temporal.PlainTime.from(timeInput.end);
    } else {
        alert("No start or end time: tasks have been saved but schedule is not calculated.");
        //TODO change to on page message instead of popup
    }
    // console.log(workableTime);
    return workableTime;
}

 export function calculateTaskTime(tasks, initTime) {
    // console.log(tasks);
    // console.log(initTime);

    for (let i = 0; i < tasks.length; i++) {
        // tasks[i].startTime = initTime.add()
    }
}