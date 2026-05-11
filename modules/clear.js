export function clearSchedule() {
    localStorage.clear();
    clearTimes();
    window.location.reload(true); 
    //"true" for hard refresh only works in FF, TODO clear on-page input in other browsers. but ok for FF dev't
    //will go through and reset values for all the inputs I guess? forcing a hard refresh for other browsers looks more annoying than just doing that
}

export function clearTimes() {
    let spanNodes = document.querySelectorAll("li>span");
    spanNodes.forEach(n => {
        n.textContent = "";
        n.classList.remove("show");
    });

    let timeInputNodes = document.querySelectorAll("input[type='time']");
    timeInputNodes.forEach(n => n.value = 0);
}

//needed for clear everything in chrome/etc
//idk it kind of seems to be working already???
// leave this unless testing show it's a problem
// export function clearTaskInput(ol) {
//     const liList = ol.childNodes;
//     liList.forEach(li => {
//         li.querySelectorAll("input").forEach(i =>{
//             i.value = "";
//             });
//     })
// }