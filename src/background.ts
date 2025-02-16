chrome.runtime.onInstalled.addListener(() => {
  console.log('AIH Extension installed or updated.')
})

chrome.action.onClicked.addListener(async (tab) => {
  if (tab.id) {
    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ['contentScript.js']
    });
  }
})