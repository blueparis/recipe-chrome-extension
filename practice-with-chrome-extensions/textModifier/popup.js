// Initialize button
let word1 = document.getElementById("word1");
let word2 = document.getElementById("word2");


// When the button is clicked, call onButtonClick
word1.addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: onButtonClick(word1,tab),
    });
});
// same for this one
word2.addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: onButtonClick(word2,tab),
    });
});

// Store word as the word to change, and get ready to reformat all instances of word
function onButtonClick(button,tab) {

    let newWord = button.innerText;
    chrome.storage.sync.set({"word":newWord});

    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: reformatWordInstances,
    });

    // For future implementation: if some button is clicked, revert the changes made by the other button
    if (button === word1) {
        console.log("word 1 is clicked");
        $("#word2").off('click');
    }
    else {
        console.log("word 2 is clicked");
        $("#word1").off('click');
    }

}



// reformat all instances of the word, access the word to change from memory
function reformatWordInstances() {
    // access the word to change
    chrome.storage.sync.get("word", ({ word }) => {
        let wordToChange = word;
        console.log("the word to change is",wordToChange,"!");

        // generate list of different versions of word (first letter capitalized, all lowercase)
        let wordsToChange = [wordToChange.charAt(0).toUpperCase()+wordToChange.slice(1),wordToChange.trim()];


        // for each word in wordsToChange
        for (let i = 0, len = wordsToChange.length; i < len; i++) {
            console.log("looking for ",wordsToChange[i]);

            // This is a JQuery script, which does the following:
            // 1. for the entire body of the webpage html (except for scripts), filter by nodeType 3 (Text only)
            // 2. replace all instances of the current word with the word strikethrough'd and capitalized (cause y not)
            $('body :not(script)').contents().filter(function() {
                return this.nodeType === 3;
            }).replaceWith(function() {
                return this.nodeValue.replace(wordsToChange[i],`<s>${wordsToChange[i]}</s> <b>${wordToChange.toUpperCase()}</b>`);
            });

        }

    });

    // PREVIOUS implementation:

    // for each line in the document, replace any instances of word
    // let lines = document.getElementsByTagName('li')

    // for (let i = 0, len = lines.length; i < len; i++) {
    //     let html = lines[i].innerHTML;
    //     let newHTML = html.replace(wordToChange, `<s>${wordToChange}</s> <b>${wordToChange.toUpperCase()}</b>`);
    //     lines[i].innerHTML = newHTML;

}