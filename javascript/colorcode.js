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

function changeColors(colors, ranges) {
    lowColor = colors[0];
    midColor = colors[1];
    highColor = colors[2];

    lowRange.push(ranges[0]);
    lowRange.push(ranges[1]);

    midRange.push(ranges[2]);
    midRange.push(ranges[3]);

    highRange.push(ranges[4]);
    highRange.push(ranges[5]);

    list.forEach(row => {
        gradeContainer = row.querySelectorAll(".tooltip")[0];

        receivedGrade = gradeContainer.children[0];
        receivedGrade = receivedGrade.innerText;
        if (receivedGrade.match(/[-+]?\d*.?\d+/g)) {
            receivedGrade = receivedGrade.match(/[-+]?\d*.?\d+/g)[0];
        }
        else {
            return;
        }

        totalGrade = gradeContainer.children[1].innerHTML.substring(2);

        percentage = parseFloat(receivedGrade) / parseFloat(totalGrade);
        percentage = percentage * 100;

        if (percentage > highRange[0] && percentage <= highRange[1]) {
            row.style.backgroundColor = highColor;
        }
        else if (percentage > midRange[0] && percentage <= midRange[1]) {
            row.style.backgroundColor = midColor;
        }
        else if (percentage >= lowRange[0] && percentage <= lowRange[1]) {
            row.style.backgroundColor = lowColor;
        }
    });
    lowRange = [];
    midRange = [];
    highRange = [];
}

var highColor;
var midColor;
var lowColor;
var highRange = [];
var midRange = [];
var lowRange = [];

var list = document.querySelectorAll(".student_assignment.assignment_graded.editable");

window.onbeforeunload = sendTimeToDB;
let startURL = location.href;
const startTime = performance.now();
if (document.cookie.indexOf("colorCodeCookie=") >= 0) {
    console.log("Welcome back: " + getSubjectCookie());
}
else {
    createSubjectCookie();
}

chrome.runtime.onConnect.addListener(function(port) {
    console.assert(port.name === "colorInfo");
    port.onMessage.addListener(function(msg) {
        var colors = msg.colors.split(",");
        var ranges = msg.range.split(",");
        changeColors(colors, ranges);
    });
});

defaultColors = ["indianred", "lightyellow", "lightgreen"];
defaultRanges = [0, 60, 60, 85, 85, 100];
changeColors(defaultColors, defaultRanges);
