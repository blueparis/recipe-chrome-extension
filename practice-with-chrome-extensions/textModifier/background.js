// initialize word variable and store in local storage

let word = "";
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({"word": word });
});