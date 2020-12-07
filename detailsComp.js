/*
    * hideTables hides the body of tables on the page
    * will also add an event listener to the head of each table
    * this event listener triggers toggles the tables display
*/
function hideTables() {
    let parent = document.getElementById("lessonStatisticsForm");
    let tableBody = parent.getElementsByTagName("TBODY");
    let tableHead = parent.getElementsByTagName("THEAD");
    for(let i = 0; i < tableBody.length - 1; i++) {
        tableBody[i].style.display = "none";
        tableHead[i].addEventListener("click", function() {
            toggleTables(this);
        });
    }
}

function toggleTables(x) {
    if(x.nextElementSibling.style.display === "none") {
        x.nextElementSibling.style.display = "";
    } else {
        x.nextElementSibling.style.display = "none";
    }
}


function paymentTable() {
    let lessonStats = document.getElementById("lessonStatisticsForm");
    let h2Node = lessonStats.getElementsByTagName("H2")[1];


    let tableContainer = document.createElement("TABLE");
    tableContainer.setAttribute("class", "general full responsive-transpose-2col");
    let tableString = `<thead>
        <th>Lesson Type</th>
        <th>Payment</th>
    </thead>
    <tbody>
        <tr>
            <th>Lessons</th>
            <td id="Lessons"></td>
        </tr>
        <tr>
            <th>Peak Lessons</th>
            <td id="PeakLessons"></td>
        </tr>
        <tr>
            <th>FM Lessons</th>
            <td id="FMLessons"></td>
        </tr>
        <tr>
            <th>LPA Lessons</th>
            <td id="LPALessons"></td>
        </tr>
        <tr>
            <th>FL Lessons</th>
            <td id="FLLessons"></td>
        </tr>
        <tr>
            <th>Sem Lessons</th>
            <td id="SemLessons"></td>
        </tr>
        <tr>
            <th>Total</th>
            <td id="totals"></td>
        </tr>
    </tbody>`
    tableContainer.innerHTML = tableString;
    lessonStats.insertBefore(tableContainer, h2Node);
    
    gatherData();

}

function gatherData() {

    // * Get Belt Information from Chrome Storage

    const lessonPaymentByBelt = {
        "Belt A": [1500, 1500],
        "Belt A2": [1500, 1600],
        "Belt B1": [1500, 1700],
        "Belt B2": [1500, 1800],
        "Belt C1": [1500, 1900],
        "Belt C2": [1500, 2000],
        "Belt D1": [1600, 2100],
        "Belt D2": [1600, 2200]
    };

    const fmPaymentByBelt = {
        "Belt A": 2000, 
        "Belt B": 3000
    };


    // * getting lesson numbers for peaks and non-peaks
    let table = document.getElementsByClassName("table-lesson-statistics")[0];
    let keyBody = table.getElementsByTagName("TBODY")[0];
    let keyRow = keyBody.getElementsByTagName("TR")[keyBody.getElementsByTagName("TR").length - 1];
    let keyData = keyRow.getElementsByTagName("TD");
    let peakNumbers = parseInt(keyData[10].innerHTML) + parseInt(keyData[11].innerHTML);
    let nonPeakNumbers = (parseInt(keyData[9].innerHTML) + parseInt(keyData[5].innerHTML)) - peakNumbers;

    // * getting specialized lessons

    // * First get successful FM number
    let fmTable = document.getElementsByClassName("table-first-meeting-statistics")[0]; //Gets the parent Table
    let fmData = fmTable.getElementsByTagName("TD"); //Gets all table data
    let fmNumber = fmData[3].innerHTML; //contains the number of successful FMs

    // * Get LPA Data
    let lpaTable = document.getElementsByClassName("table-lpa-statistics")[0]; //Gets the parent Table
    let lpaData = lpaTable.getElementsByTagName("TD"); //Gets all table data
    let lpaNumber = lpaData[1].innerHTML; //contains the number of successful FMs

    // * Get FL Data
    let flTable = document.getElementsByClassName("table-first-lesson-statistics")[0]; //Gets the parent Table
    let flData = flTable.getElementsByTagName("TD"); //Gets all table data
    let flNumber = flData[1].innerHTML; //contains the number of successful FMs

    // * Get Seminar Data
    let semTable = document.getElementsByClassName("table-seminar-statistics")[0]; //Gets the parent Table
    let semData = semTable.getElementsByTagName("TD"); //Gets all table data
    let semNumber = parseInt(semData[3].innerHTML) + parseInt(semData[5].innerHTML); //contains the number of successful FMs


    chrome.storage.sync.get(["Belt", "FMBelt"], (keys) => { 

        let lessonsTD = nonPeakNumbers * lessonPaymentByBelt[keys.Belt][0];
        let peaklessonsTD = peakNumbers * lessonPaymentByBelt[keys.Belt][1];
        let FMlessonsTD = fmNumber * fmPaymentByBelt[keys.FMBelt];
        let LPAlessonsTD = lpaNumber * 1000;
        let FLlessonsTD = flNumber * 500;
        let SemlessonsTD = (semNumber * 4) * (lessonPaymentByBelt[keys.Belt][1] + 400);
        let totalAmount = lessonsTD + peaklessonsTD + FMlessonsTD + LPAlessonsTD + FLlessonsTD + SemlessonsTD;

        let paymentFinalized = {
            "Lessons": lessonsTD,
            "PeakLessons": peaklessonsTD,
            "FMLessons": FMlessonsTD,
            "LPALessons": LPAlessonsTD,
            "FLLessons": FLlessonsTD,
            "SemLessons": SemlessonsTD,
            "totals": totalAmount
        };

        for(key in paymentFinalized) {
            document.getElementById(key).innerHTML = paymentFinalized[key];
        }
    });

}

paymentTable();

hideTables();
