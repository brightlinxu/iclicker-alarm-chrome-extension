import * as React from "react";
import "./App.css";
import alarmSoundFile from "./alarmSound.mp3";

const App = () => {
    const stopAlarm = () => {
        chrome.runtime.sendMessage({ type: "STOP_ALARM" });
    }

    return (
        <div>
            <div onClick={stopAlarm} className="stopButton">Click anywhere to stop alarm</div>
            <audio src={alarmSoundFile} autoPlay={true} loop={true} />
        </div>
    );
};

export default App;
