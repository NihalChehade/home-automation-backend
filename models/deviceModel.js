"use strict";

const db = require("../db");
const { sqlForPartialUpdate } = require("../helpers/sql");
const {
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
} = require("../expressError");

class Device {
    // Static method to insert a new device
    static async create({ name, type, status, user_name }) {
      const result = await db.query(
        `INSERT INTO devices (name, type, status, username) VALUES ($1, $2, $3, $4) RETURNING *;`,
        [name, type, status, user_name]
      );
      return result.rows[0];
    }
  
    // Static method to update an existing device
    static async update(deviceName, data) {
      const {status, brightness, color} = data;
      const updates = [];
      if (status) updates.push(`status='${status}'`);
      if (brightness !== undefined) updates.push(`brightness=${brightness}`);
      if (color) updates.push(`color='${color}'`);
  
      const updateQuery = `UPDATE devices SET ${updates.join(', ')} WHERE name=$1 RETURNING *;`;
      const result = await db.query(updateQuery, [deviceName]);
      return result.rows[0];
  }
  
    // Static method to delete a device
    static async remove(deviceName) {
      const result = await db.query(
        `DELETE FROM devices WHERE name=$1 RETURNING name;`,
        [deviceName]
      );
      return result.rows[0];
    }
  
    // Static method to retrieve all devices by username
    static async findByUserName(username) {
      const result = await db.query(
        `SELECT name, type, status FROM devices WHERE username=$1;`,
        [username]
      );
      return result.rows;
    }
  
    // Static method to find a single device by device name
    static async findByDeviceName(deviceName) {
      const result = await db.query(
        `SELECT name, type, status FROM devices WHERE name=$1;`,
        [deviceName]
      );
      return result.rows[0];
    }
  }
  
  module.exports = Device;