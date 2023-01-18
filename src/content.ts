import alarmSoundFile from "./alarmSound.mp3";

// This file is injected as a content script
console.log("Hello from content script!");

const ALARM_ID = "iclicker-chrome-extension-alarm";
const QUESTION_ID = "polling-question-type";
const QUESTION_FINISH_ID = "question-page"
const CHECK_IN_ID = "activeSessionDropdown"
let alarmPlaying = false;
let alarmCanPlay = true;


const startAlarm = () => {
    console.log("starting alarm");
    
    chrome.runtime.sendMessage({ type: "PLAY_ALARM" });
    alarmPlaying = true;
}

// check for new question
const observer = new MutationObserver((mutations) => {
    console.log("observer fired")

    const questionElement = document.getElementById(QUESTION_ID);
    if (questionElement && alarmPlaying === false && alarmCanPlay === true) {
        console.log("questionElement if statement start: ", alarmCanPlay)
        // element has been added. wake up to answer question
        startAlarm()
        alarmCanPlay = false
        console.log("questionElement if statement end: ", alarmCanPlay)
    }

    const questionFinishElement = document.getElementById(QUESTION_FINISH_ID)
    if (questionFinishElement) {
        console.log("questionFinishElement if statement start: ", alarmCanPlay)
        alarmCanPlay = true
        console.log("questionFinishElement if statement end: ", alarmCanPlay)
    }
});

observer.observe(document.body, {
    subtree: true,
    attributes: true
});

// check for when class session can be joined
const checkInInterval = setInterval(() => {
    const checkInElement = document.getElementById(CHECK_IN_ID)
    if (checkInElement?.offsetHeight && checkInElement?.offsetHeight > 0) {
        startAlarm()
        clearInterval(checkInInterval)
    }
}, 1000)


const alarmStopped = () => {
    console.log("alarm stopped");
    alarmPlaying = false;
}

chrome.runtime.onMessage.addListener((message) => {
    switch(message.type) {
        case "ALARM_STOPPED":
            alarmStopped();
            break;
    }
});