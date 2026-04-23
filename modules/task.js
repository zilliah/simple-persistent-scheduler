export class Task {
    constructor(name, duration) {
        this.name = name;
        this.duration = duration; 
        this.startTime = undefined; //use the calcEtc methods below to calculate these, but can also be retrieved directly if previously set
        this.endTime = undefined;
        this.completed = false; //not used yet
    }

    //when working with an inputted START time, 
    //tasks are passed the start time and must calculate the end time
    //which is then passed to the next task as its start time
    calcEndTime(startTime) {
        let currStart = startTime ? startTime : this.startTime;
        this.startTime = currStart;
        this.endTime = currStart.add(this.duration);
        return this.endTime; 
    }

    //when working with an inputted END time
    //tasks are passed the end time and must calculate the start time
    //which is then passed to next task as its end time
    calcStartTime(endTime) {
        let currEnd = endTime ?  endTime : this.endTime;
        this.endTime = currEnd;
        this.startTime = currEnd.subtract(this.duration)
        return this.startTime;
    }
}
