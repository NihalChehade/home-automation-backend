const Device = require('../models/deviceModel');
const mqttService = require('../services/mqttService');

exports.controlLight = async (req, res) => {
    const { name } = req.params;
    const { status } = req.body;

    try {
        const device = await Device.findByDeviceName(name);
        if (!device) {
            return res.status(404).json({ message: "Device not found" });
        }

        const topic = `home/lights/${device.name}`;

        switch (status) {
            case 'ON':
                mqttService.turnOn(topic);
                
                break;
            case 'OFF':
                mqttService.turnOff(topic);
                break;
            default:
                return res.status(400).json({ message: "Invalid action" });
        }

        // Update device status in the database
        await Device.update(name, { status: status });
        res.json({ message: `Light ${device.name} has been turned ${status}` });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.setBrightness = async (req, res) => {
    const { name } = req.params;
    const { brightness } = req.body;

    try {
        const device = await Device.findByDeviceName(name);
        if (!device) {
            return res.status(404).json({ message: "Device not found" });
        }

        const topic = `home/lights/${device.name}/brightness`;
        mqttService.setBrightness(topic, brightness);

        // Update device brightness in the database
        await Device.update(name, { brightness: brightness });
        res.json({ message: `Brightness of ${device.name} set to ${brightness}%` });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.setColor = async (req, res) => {
    const { name } = req.params;
    const { color } = req.body;

    try {
        const device = await Device.findByDeviceName(name);
        if (!device) {
            return res.status(404).json({ message: "Device not found" });
        }

        const topic = `home/lights/${device.name}/color`;
        mqttService.setColor(topic, color);

        // Update device color in the database
        await Device.update(name, { color: color });
        res.json({ message: `Color of ${device.name} changed to ${color}` });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
