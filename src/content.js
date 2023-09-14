chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.message === "getHTML") {
      const htmlContent = document.documentElement.innerHTML;
      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlContent, 'text/html');
      const anchorTag = doc.querySelector('a[href*="strip=1"]');
      if (anchorTag) {
        const anchorText = anchorTag.href;
        console.log(anchorText);
        sendResponse({ anchorText: anchorText });
      } else {
        sendResponse({ anchorText: null });
      }
    }
  });
console.log('hi');