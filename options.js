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
        alert("All Saved!");
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
                }
            }
        }
    })
}

document.getElementById("save").addEventListener("click", saveOptions)

restoreOptions();
