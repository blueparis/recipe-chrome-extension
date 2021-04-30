console.log('content-script.js')


/*
    FUNCTIONALITY of content-script.js

    This file is really just the skeleton code for executing conversions, substitutions, etc. and changing the text on
    the page.
    We removed the code that actually changes stuff just because y'all don't need to worry about it when it comes
    to the design of the popup. Instead, when a task is triggered (e.g. a user clicks to double the recipe),
    this code will just trigger an alert to the browser tab that says "user wants to <task>"
*/

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    // Handle message.

    let task = message.task;
    console.log(task);

    if (task === 'reProportion') {
        reProportion(Number(message.value));
    }
    else if (task === 'convert') {
        convertMetrics(message.value);
    }
    else if (task === 'substitute') {
        makeSubstitutions(message.value);
    }

});


// Re-proportion all ingredients by some multiplier
function reProportion(multiplier) {
    alert("user wants to re-proportion measurements");
}


function convertMetrics(isImperial) {
    alert("user wants to convert the measurement type");
}

// Make substitutions to specific ingredients
function makeSubstitutions(ingredients) {
    alert("user wants to make substitutions");

}