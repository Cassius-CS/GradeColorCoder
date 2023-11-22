async function addCookie(cookieName) {
    var requestHeaders = new Headers();
    requestHeaders.append("Type", "AddCookie");
    var requestOptions = {
        method: "POST",
        headers: requestHeaders,
        mode: "cors",
        body: cookieName
    };
    var request = new Request("https://rockbottomrockcare.com/cookie", requestOptions);
    var response = await fetch(request);
    await response.text().then(text => {
        console.log("Subject cookie added: " + text);
    });
}

async function getCookieList() {
    var cookieList = [];
    var requestHeaders = new Headers()
    requestHeaders.append("Type", "GetCookieList");
    var requestOptions = {
        method: "GET",
        headers: requestHeaders,
        mode: "cors",
    };
    var request = new Request("https://rockbottomrockcare.com/cookie", requestOptions);
    var response = await fetch(request);
    await response.text().then(text => {
        cookieList = text.split(",");
    });
    return cookieList;
}

async function sendTimeToDB() {
    const endTime = performance.now();
    const totalTime = (endTime - startTime) / 1000;
    var requestHeaders = new Headers();
    requestHeaders.append("Type", "AddTime");
    const reqBody = getSubjectCookie() + " " + String(totalTime);
    var requestOptions = {
        method: "POST",
        headers: requestHeaders,
        mode: "cors",
        body: reqBody
    };
    var request = new Request("https://rockbottomrockcare.com/cookie", requestOptions);
    var response = await fetch(request);
    await response.text().then(text => {
        console.log("Added time to cookie", text);
    });
}

function getSubjectCookie() {
    return document.cookie.replace(/(?:(?:^|.*;\s*)colorCodeCookie\s*\=\s*([^;]*).*$)|^.*$/, "$1");
}

async function createSubjectCookie() {
    let i = 0;
    let strLength = 8;
    newCookie = "colorCodeCookie="
    
    while (true) {
        while (i <= strLength) {
            let min = 65;
            let max = 90;
            let ranNum = Math.random() * (max - min) + min;
            let ranNumRound = Math.floor(ranNum);
            let chr = String.fromCharCode(ranNumRound);
            newCookie = newCookie + chr;
            i = i + 1;
        }
        let subjectString = newCookie.split("=")[1];
        if (await isValidCookie(subjectString)) {
            await addCookie(subjectString);
            document.cookie = newCookie;
            break;
        }
    }
}

async function isValidCookie(checkCook) {
    let keys = await getCookieList();
    if (keys.includes(checkCook)) {
        return false;
    }
    return true;
}

window.onbeforeunload = sendTimeToDB;
let startURL = location.href;
const startTime = performance.now();
if (document.cookie.indexOf("colorCodeCookie=") >= 0) {
    console.log("Welcome back: " + getSubjectCookie());
}
else {
    createSubjectCookie();
}

function calculateGradeColor(grade, bottomRange, topRange) {
    if (grade >= 0 && grade <= 100 && bottomRange >= 0 && topRange <= 100) {
      if (grade <= bottomRange) {
        return 'red'; // Change to bottom color ***
      } else if (grade > bottomRange && grade < topRange) {
        return 'yellow'; // Change to mid color ***
      } else {
        return 'green'; // Change to upper color ***
      }
    } 
}

function changeRowColorBasedOnGrade(rowId, bottomRange, topRange){
    const row = document.getElementById(rowId)

    if(row){
        const gradeElement = row.querySelector('.grade');

        if(gradeElement){
            const gradeValue = parseInt(gradeElement.textContent.trim(), 10)
            
            const color = calculateGradeColor(gradeValue, bottomRange, topRange)

            row.style.color = color;
        }
    }
}

// Get all rows with a specific class name (you may need to adjust this selector)
const rows = document.querySelectorAll('.student_assignment .assignment_graded .editable');

rows.forEach(row => {
  const rowId = row.id;
  const bottomRange = 70; //change to bottom of mid range **
  const topRange = 90; //change to top of mid range **

  changeRowColorBasedOnGrade(rowId, bottomRange, topRange);
});
 