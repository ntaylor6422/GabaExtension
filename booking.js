function addButtons() {
    let buttonLocation = document.getElementsByClassName("calendar-view-header")[0];
    let siblingNode = buttonLocation.getElementsByClassName("calendar-nav")[0];
    // let mirrorButton = document.createElement("BUTTON");
    // mirrorButton.innerHTML = "Mirror Off"
    // mirrorButton.setAttribute("class", "btn btn-success")
    let templateButton = document.createElement("BUTTON");
    templateButton.innerHTML = "Apply Template";
    templateButton.setAttribute("class", "btn btn-primary pull-left");
    templateButton.setAttribute("type", "button");
    templateButton.addEventListener("click", setTemplate);


    // buttonLocation.insertBefore(mirrorButton, siblingNode)
    buttonLocation.insertBefore(templateButton, siblingNode)
}

function setUpPage() {
    let days = document.getElementsByClassName("day");
    for(let i = 0; i < days.length; i++) {
        let day = days[i].getElementsByClassName("visible-desktop")[0].innerHTML
        let checkValue = days[i].classList.contains("instructor-weekend");
        if(checkValue && day != "SUN" && day != "SAT") {
            days[i].classList.add("HOL");
        } else {
            days[i].classList.add(day);
        }
    }
}

function setTemplate() {
    console.log("fired");
    chrome.storage.sync.get("Schedule", (item) => {
        for(day in item.Schedule) {
            let date = document.getElementsByClassName(day.toUpperCase());
            for(let n = 0; n < date.length; n++) {
                let getLI = date[n].getElementsByTagName("LI");
                for(let i = 1; i < getLI.length; i++) {
                    let slot = getLI[i].getElementsByTagName("INPUT")[0];
                    if(item.Schedule[day][i] === true) {
                        slot.click();
                    }
                }
            }
        }
    })
}

addButtons();
setUpPage();