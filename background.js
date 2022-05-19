const openWindow = () => {
    chrome.windows.create({
        'url': "https://www.messenger.com",
        'type': 'popup',
        'width': 1000,
        'height': 800
    }, function (w) {
        chrome.storage.local.set({ windowId: w.id });
    });
}

chrome.action.onClicked.addListener(() => {
    chrome.storage.local.get(["windowId"], (data) => {
        if (data.windowId) {
            chrome.windows.update(data.windowId, {
                "focused": true
            }, (window) => {
                if (!window) {
                    openWindow();
                }
            });
        } else {
            openWindow();
        }
    });
});