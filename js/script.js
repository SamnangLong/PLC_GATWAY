// Variable to store the last received speed
let lastSetSpeed = null;
var connection_status= false;


setTimeout(function() {
    ConnectToMQTT();
  }, 2000);
function ConnectToMQTT(){
    // Generate a random number for the client ID
    const randomClientNumber = Math.floor(Math.random() * 1000) + 1;
    const clientID = 'MOTOR 3PHASE' + randomClientNumber;
          host = 'pf-i8jlmc6hgrtkssv5sgqz.cedalo.cloud';
          port = 443;

    // Create a client instance
    // client = new Paho.MQTT.Client('e8f424ec.emqx.cloud', 8083, "test");
    client = new Paho.MQTT.Client(host, Number(port), clientID);

    // set callback handlers
    client.onConnectionLost = onConnectionLost;
    client.onMessageArrived = onMessageArrived;

    // connect the client
    client.connect({
      onSuccess: onConnect,
      // onFailure: onFailure,
      useSSL: true,

      userName: 'ADMIN',
      password: 'admin123',
      mqttVersion:4
  });
}


// called when the client connects
function onConnect() {
  // Once a connection has been made, make a subscription and send a message.
  console.log("onConnect");
  connection_status = true ;
  // alert("Connect to server is success.");
  setTimeout(() => {
    console.log('Connection successful!');
  }, 2000);

  const subTopic1 = 'RTU_DATA';
  const subTopic2 = 'controller1_con_status_speed';
  const subTopic3 = 'status lamp';
  const subTopic4 = 'ALLARM';
  qos = 0;
  client.subscribe(subTopic1);
  client.subscribe(subTopic2);
  client.subscribe(subTopic3);
  client.subscribe(subTopic4);
}

// FUNCTION FOR PUBLISH DATA INTO TOPIC
function publishToMQTT(value) {
  client.send('controller1_con_pub1', value);
}
  
// called when the client loses its connection
function onConnectionLost(responseObject) {
  if (responseObject.errorCode !== 0) {
    console.log("onConnectionLost:"+ responseObject.errorMessage);
    alert("MQTT Connection Lost");
  }
}



function onMessageArrived(message) {
  console.log("Message arrived on topic " + message.destinationName + ": " + message.payloadString);

  const values = message.payloadString.split(',');
  // Display Data Voltage Current Frequency
  if (values[0] === 'setspeed') {
    const currentSpeed = values[1];

    // Check if the speed is different from the last speed
    if (currentSpeed !== lastSetSpeed) {
        lastSetSpeed = currentSpeed; // Update the last received speed
        document.getElementById('box_set_speed').value = currentSpeed || '';
        console.log(`Updated speed to: ${currentSpeed}`);
      } else {
        console.log(`Duplicate speed value ignored: ${currentSpeed}`);
      }
  }

  // Display Data Voltage Current Frequency
  if (values[0]=='MOTOR'&&values[1]=='DATA'){
    document.getElementById('box_frquency').value = values[2] || '';
    document.getElementById('box_voltage').value = values[3] || '';
    document.getElementById('box_current').value = values[4] || '';
  }

  // Display ALLARM
  // if (values[0]=='ALLARM') {
    
  // }

  // Display LAMP
  // if (values[0]=='LAMP'){
  //   if (values[1]=='L1'&&values[2]=='10'){
  //     document.getElementById('checkbox')= checked;
  //   } if (values[3]=='L2'&&values[4]=='10'){
  //     document.getElementById('checkbox1')= checked;
  //   }
  // }

  // if (values[1]=='10L2' || values[1]=='0L2' && values[2]=='10'){
  //   document.getElementById('checkbox1')= checked;
  // }
  
  // else{
  //   document.getElementById('checkbox')= Unchecked;
  //   document.getElementById('checkbox1')= Unchecked;    
  // }
}
    