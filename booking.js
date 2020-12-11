//* Global Variables to update the count for peak and non-peak lessons

let peakCount = 0;
let nonPeakCount = 0;

//* Adds a button to set the template, also creates the table for keeping track of lesson counts

function addButtons() {
    let buttonLocation = document.getElementsByClassName("calendar-view-header")[0];
    let siblingNode = buttonLocation.getElementsByClassName("calendar-nav")[0];
    let templateButton = document.createElement("BUTTON");
    templateButton.innerHTML = "Apply Template";
    templateButton.setAttribute("class", "btn btn-primary pull-left");
    templateButton.setAttribute("type", "button");
    templateButton.addEventListener("click", setTemplate);


    buttonLocation.insertBefore(templateButton, siblingNode);


    const tableDetails = {
        "headers": ["Non-Peak", "Peak"],
        "tdID": ["lessonNumber", "peakNumber"],
        "tableAtts": {
            "id": "lessonTable"
        }
    }

    buttonLocation.appendChild(tableGenerator(1, tableDetails));
    document.getElementById("lessonNumber").innerHTML = nonPeakCount;
    document.getElementById("peakNumber").innerHTML = peakCount;
}

//* Adds all needed classes and properties to existing HTML elements on the page

function setUpPage() {

    let bodyEl = document.getElementsByTagName("BODY")[0];
    let styleTag = document.createElement("STYLE");
    let styleString = `#lessonTable {
        border-collapse: collapse;
        width: 15%;
      }
      
      #lessonTable td, #lessonTable th {
        border: 1px solid #ddd;
        padding: 4px;
      }
      
      
      #lessonTable th {
        padding-top: 6px;
        padding-bottom: 6px;
        text-align: center;
        background-color: #2d766b;
        color: white;
      }`;

      styleTag.innerHTML = styleString;
      bodyEl.appendChild(styleTag);

    let days = document.getElementsByClassName("day");
    for(let i = 0; i < days.length; i++) {
        let day = days[i].getElementsByClassName("visible-desktop")[0].innerHTML
        let checkValue = days[i].classList.contains("instructor-weekend");
        if(checkValue && day != "SUN" && day != "SAT") {
            days[i].classList.add("HOL");
        } else {
            days[i].classList.add(day);
        }
        let lists = days[i].getElementsByTagName("LI");
        for(let n = 1; n < lists.length; n++) {
        
            if(days[i].classList.contains("SUN") || days[i].classList.contains("SAT") || days[i].classList.contains("HOL") ) {
                lists[n].classList.add("peak");
            } else if(n < 4 || n > 14) {
                lists[n].classList.add("peak");
            } else {
                lists[n].classList.add("nonPeak");
            }

            lists[n].addEventListener('click', function() {
                sumLessons(this);
            });
        }
    }
}

//* Function called when the "Apply Template" button is clicked / Fetches the schedule object from Chrome Storage

function setTemplate() {
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

//* Updates the global variables for peak and non-peak on click

function sumLessons(x) {


    let classes = x.classList;
    let checkCheck = x.lastElementChild.value;

    if(checkCheck) {
        if(classes.contains("peak")) {
            peakCount++;
        } else {
            nonPeakCount++;
        }
    } else {
        if(classes.contains("peak")) {
            peakCount--;
        } else {
            nonPeakCount--;
        }
    }
    
    document.getElementById("peakNumber").innerHTML = peakCount;
    document.getElementById("lessonNumber").innerHTML = nonPeakCount;

}

function main() {
    addButtons();
    setUpPage();
}

main();