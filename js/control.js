let isForward = false;
let isREVERSE = false;
let isMSTOP = false;
let isRELAY1 = false;
let isRELAY2 = false;
let isRSTOP = false;

let intervalIdForward = null;
let intervalIdREVERSE = null;
let intervalIdMSTOP = null;
let intervalIdRELAY1 = null;
let intervalIdRELAY2 = null;
let intervalIdRSTOP = null;

function publishMessage() {
    let forward = isForward ? '1' : '0';
    let reverse = isREVERSE ? '1' : '0';
    let stop_motor = isMSTOP? '1' : '0';
    let relay1 = isRELAY1 ? '1' : '0';
    let relay2 = isRELAY2 ? '1' : '0';
    let stop_relay = isRSTOP? '1' : '0';
    // Other variables and message construction
    let msg_control = 'WEB,STATE,' + forward + ',' + stop_motor + ',' + reverse + ',' + relay1 + ',' + relay2 + ',' + stop_relay; //+ ',' + reset_alarm;
    publishToMQTT(msg_control);
    console.log('Published:', msg_control);
}

function BTN_FORWARD() {
    isForward = true; // Set forward to '1' when button is clicked
    publishMessage(); // Immediately publish the message
    clearInterval(intervalIdForward); // Clear any existing interval
    intervalIdForward = setTimeout(() => {
        isForward = false; // Update forward to '0' after 2 seconds
        publishMessage(); // Publish the message with forward set to '0'
    },1000);
}

function BTN_REVERSE() {
    isREVERSE = true; // Set REVERSE to '1' when button is clicked
    publishMessage(); // Immediately publish the message
    clearInterval(intervalIdREVERSE); // Clear any existing interval
    intervalIdREVERSE = setTimeout(() => {
        isREVERSE = false; // Update REVERSE to '0' after 2 seconds
        publishMessage(); // Publish the message with REVERSE set to '0'
    },1000);
}

function BTN_STOP() {
    isMSTOP = true; // Set STOP to '1' when button is clicked
    publishMessage(); // Immediately publish the message
    clearInterval(intervalIdMSTOP); // Clear any existing interval
    intervalIdMSTOP = setTimeout(() => {
        isMSTOP = false; // Update MSTOP to '0' after 2 seconds
        publishMessage(); // Publish the message with STOP set to '0'
    },1000);
}

function BTN_RELAY1() {
    setTimeout(() => {
        isRELAY1 = !isRELAY1;
        publishMessage();
    },100);
}

function BTN_RELAY2() {
    setTimeout(() => {
        isRELAY2 = !isRELAY2;
        publishMessage();
    },100);
}

function BTN_STOP_RELAY() {
    setTimeout(() => {
        isRSTOP = !isRSTOP;
        publishMessage();
    },100);
}

