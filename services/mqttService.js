// services/mqttService.js
const mqtt = require("mqtt");
const client = mqtt.connect("mqtt://localhost:1883", {
  debug: true,
}); // Use your Mosquitto broker URL

client.on("connect", () => {
  console.log("MQTT Client Connected to the broker");
});

client.on("error", (error) => {
  console.error("Failed to Connect: ", error);
});

client.on("offline", function () {
  console.log("MQTT Client Offline");
});

client.on("reconnect", function () {
  console.log("MQTT Client Reconnecting");
});

module.exports = {
    turnOn: (topic) => {
      client.publish(topic, "ON", { qos: 1 }, (error) => {
        if (error) {
          console.error("Failed to send 'ON' message", error);
        }
      });
    },
    turnOff: (topic) => {
      client.publish(topic, "OFF", { qos: 1 }, (error) => {
        if (error) {
          console.error("Failed to send 'OFF' message", error);
        }
      });
    },
    setBrightness: (topic, brightness) => {
      client.publish(topic, `BRIGHTNESS:${brightness}`, { qos: 1 }, (error) => {
        if (error) {
          console.error("Failed to send 'BRIGHTNESS' message", error);
        }
      });
    },
    setColor: (topic, color) => {
      client.publish(topic, `COLOR:${color}`, { qos: 1 }, (error) => {
        if (error) {
          console.error("Failed to send 'COLOR' message", error);
        }
      });
    },
  };