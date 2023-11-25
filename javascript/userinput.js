var highColor;
var midColor;
var lowColor;
var highRange = [];
var midRange = [];
var lowRange = [];

const tabs = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
var submitButton = document.getElementById("submitColors");
submitButton.addEventListener("click", submitColors);

function checkRanges(ranges) {
    if (ranges[0][1] > ranges[1][0] ||
        ranges[1][1] > ranges[2][0]) {
            document.getElementById("errorMessage").innerHTML = "Please make sure none of the values overlap.";
            throw new Error();
    }
}

async function submitColors() {
    document.getElementById("errorMessage").innerHTML = " ";

    highColor = document.getElementById("color1").value;
    midColor = document.getElementById("color2").value;
    lowColor = document.getElementById("color3").value;

    highRange.push(parseFloat(document.getElementById("lowRange1").value));
    highRange.push(parseFloat(document.getElementById("highRange1").value));
    highRange.sort((a,b) => a < b);

    midRange.push(parseFloat(document.getElementById("lowRange2").value));
    midRange.push(parseFloat(document.getElementById("highRange2").value));
    midRange.sort((a,b) => a < b);
    
    lowRange.push(parseFloat(document.getElementById("lowRange3").value));
    lowRange.push(parseFloat(document.getElementById("highRange3").value));
    lowRange.sort((a,b) => a < b);

    var allRanges = [lowRange, midRange, highRange];
    checkRanges(allRanges);

    var port = chrome.tabs.connect(tabs[0].id, {name: "colorInfo"});
    port.postMessage({range: allRanges.join(","),
                    colors: lowColor + "," + midColor + "," + highColor});
    return true;
}