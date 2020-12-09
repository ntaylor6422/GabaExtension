function saveOptions() {
    let baseBelt = document.getElementById("beltSelector").value;
    let fmBelt = document.getElementById("fmbeltSelector").value;
    let schedule = {
        "sun": [],
        "mon": [],
        "tue": [],
        "wed": [],
        "thu": [],
        "fri": [],
        "sat": [],
        "hol": []
    }

    for(day in schedule) {
        let days = document.getElementsByClassName(day);
        for(let i = 0; i < days.length; i++) {
            if(days[i].checked) {
                schedule[day].push(true);
            } else {
                schedule[day].push(false);
            }
        }
    }


    chrome.storage.sync.set({
        Belt: baseBelt,
        FMBelt: fmBelt,
        Schedule: schedule
    }, () => {
        toggleMessage("All settings have been saved");
    })
}

function restoreOptions() {

    let dayKeys = [
        "sun",
        "mon",
        "tue",
        "wed",
        "thu",
        "fri",
        "sat",
        "hol"
    ]

    chrome.storage.sync.get([
        'Belt',
        'FMBelt',
        'Schedule'
    ], (items) => {
        document.getElementById("beltSelector").value = items.Belt;
        document.getElementById("fmbeltSelector").value = items.FMBelt;
        for(let i = 0; i < dayKeys.length; i++) {
            let day = document.getElementsByClassName(dayKeys[i]);
            for(let n = 0; n < day.length; n++) {
                if(items.Schedule[dayKeys[i]][n]) {
                    day[n].checked = true;
                } else {
                    day[n].checked = false;
                }
            }
        }
    })
}

function clearOptions() {

    const schedule = {
        "sun": [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
        "mon": [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
        "tue": [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
        "wed": [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
        "thu": [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
        "fri": [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
        "sat": [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
        "hol": [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false]
    }

    chrome.storage.sync.set({
        Belt: "Belt A",
        FMBelt: "Belt A",
        Schedule: schedule
    }, () => {
        restoreOptions();
        toggleMessage("All settings have been reset");
    })
}

function toggleMessage(text) {
    let alertEl = document.getElementById("alertElement");
    alertEl.innerHTML = text;
    alertEl.classList.remove("invisible")
    alertEl.classList.add("visible");
    setTimeout(function() {
        alertEl.classList.remove("visible");
        alertEl.classList.add("invisible");
    }, 1500);
}

document.getElementById("clear").addEventListener("click", clearOptions);
document.getElementById("save").addEventListener("click", saveOptions);

restoreOptions();
