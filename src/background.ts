// This file is ran as a background script
console.log("Hello from background script!");

const windowIds: number[] = [];

const playAlarm = () => {
    console.log("play alarm");
    chrome.windows.create({
        url: "popup.html",
        type: "popup",
        focused: true,
        height: 300,
        width: 450
    }, (window) => {
        window && windowIds.push(window.id);
    });
}

const stopAlarm = () => {
    console.log("stop alarm");
    while (windowIds.length > 0) {
        let id: number | undefined = windowIds.pop();
        id && chrome.windows.remove(id);
    }
    
    chrome.tabs.query({}, (tabs) => {
        tabs.forEach((tab) => {
            tab.id && chrome.tabs.sendMessage(tab.id, { type: "ALARM_STOPPED" });
        });
    });
}

chrome.runtime.onMessage.addListener((message) => {
    switch(message.type) {
        case "PLAY_ALARM":
            playAlarm();
            break;
        case "STOP_ALARM":
            stopAlarm();
            break;
    }
});
