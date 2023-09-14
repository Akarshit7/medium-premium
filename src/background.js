let URL = "";
let anchor_link = '';
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (changeInfo.status === "complete" && tab.url.includes("medium.com")) {
    URL = tab.url;
  }
  if (changeInfo.status === "complete" && tab.url.includes("webcache.googleusercontent.com")) {
    chrome.tabs.sendMessage(tabId, { message: "getHTML" }, function (response) {
      if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError);
        return;
      }
      console.log(response.anchorText);
      if (response.anchorText) {
        // Redirect the tab to the extracted URL
        chrome.tabs.update(tabId, { url: response.anchorText });
      } else {
        console.log("No anchor text found.");
      }
    });
  }
});

chrome.action.onClicked.addListener(function (tab) {
  // Create a new tab with the Google Web Cache URL
  chrome.tabs.create({
    url: `http://webcache.googleusercontent.com/search?q=cache:${URL}`,
  }, function (createdTab) {
    // Send a message to the content script to get HTML content
  });
});


chrome.tabs.onActivated.addListener(function(activeInfo) {
  // activeInfo.tabId contains the ID of the newly activated tab
  const tabId = activeInfo.tabId;

  // Get the URL of the currently active tab
  chrome.tabs.get(tabId, function(tab) {
    if (chrome.runtime.lastError) {
      console.error(chrome.runtime.lastError);
      return;
    }

    URL = tab.url;
    console.log(URL);
    // Now, you can use `currentTabUrl` as needed
  
  });
});
