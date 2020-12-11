const tableGenerator = (rows, details) => {
    let defaultTable = document.createElement("TABLE");
    let tableAtts = details["tableAtts"];
    let headersArray = details["headers"];
    let tdID = details["tdID"];

    for(let key in tableAtts) {
        defaultTable.setAttribute(key, tableAtts[key]);
    }


    defaultTable.appendChild(createTableHeader(headersArray));
    defaultTable.appendChild(createTableBody(tdID, rows));

    return defaultTable;

} 

const createTableHeader = (headArray) => {

    let tableHead = document.createElement("THEAD");

    for(let i = 0; i < headArray.length; i++) {
        let headerData = document.createElement("TH");
        headerData.innerHTML = headArray[i];
        tableHead.appendChild(headerData);
    }

    return tableHead;

}

const createTableBody = (tdIDArray, rows) => {

    let tableBody = document.createElement("TBODY");

    for(let n = 0; n < rows; n++) {
        let currRow = document.createElement("TR");
        for(let i = 0; i < tdIDArray.length; i++) { 
            let currTD = document.createElement("TD");
            currTD.setAttribute("id", tdIDArray[i]);
            currRow.appendChild(currTD);
        }
        tableBody.appendChild(currRow);
    }

    return tableBody;
}
