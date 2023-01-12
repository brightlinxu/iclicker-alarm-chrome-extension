import alarmSoundFile from "./alarmSound.mp3";

// This file is injected as a content script
console.log("Hello from content script!");

const ALARM_ID = "iclicker-chrome-extension-alarm";
const QUESTION_ID = "question-page";
let alarmPlaying = false;

const alarmStopped = () => {
    console.log("alarm stopped");
    alarmPlaying = false;
}

const observer = new MutationObserver((mutations) => {
    const questionElement = document.getElementById(QUESTION_ID);
    if (questionElement && alarmPlaying === false) {
        // element has been added. wake up to answer question
        console.log("alarm started");
    
        chrome.runtime.sendMessage({ type: "PLAY_ALARM" });
        alarmPlaying = true;
    }
});

observer.observe(document.body, {
    subtree: true,
    attributes: true
});

chrome.runtime.onMessage.addListener((message) => {
    switch(message.type) {
        case "ALARM_STOPPED":
            alarmStopped();
            break;
    }
});