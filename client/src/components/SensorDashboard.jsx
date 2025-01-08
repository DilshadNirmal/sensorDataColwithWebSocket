import { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:4030/");

const SensorDashboard = () => {
  const [group1Data, setGroup1Data] = useState([]);
  const [group2Data, setGroup2Data] = useState([]);

  useEffect(() => {
    socket.on("sensor-group1-update", (data) => {
      console.log("Received Group 1 sensor data:", data);

      setGroup1Data((prevData) => {
        const newData = Array.isArray(data) ? data : [data];
        const dataMap = new Map(prevData.map((item) => [item._id, item]));
        newData.forEach((item) => dataMap.set(item._id, item));
        return Array.from(dataMap.values());
      });
    });

    // Listen for updates from SensorModel2
    socket.on("sensor-group2-update", (data) => {
      console.log("Received Group 2 sensor data:", data);

      setGroup2Data((prevData) => {
        const newData = Array.isArray(data) ? data : [data];
        const dataMap = new Map(prevData.map((item) => [item._id, item]));
        newData.forEach((item) => dataMap.set(item._id, item));
        return Array.from(dataMap.values());
      });
    });

    return () => {
      socket.off("sensor-group1-update");
      socket.off("sensor-group2-update");
    };
  }, []);

  return (
    <div>
      <h1>Sensor Dashboard</h1>

      <h2>Group 1 Sensors (SensorModel1 & SensorModel3)</h2>
      <ul>
        {group1Data
          .sort((a, b) => {
            const numA = parseInt(a._id.replace("sensor", ""), 10);
            const numB = parseInt(b._id.replace("sensor", ""), 10);
            return numA - numB;
          })
          .map((sensor, index) => (
            <li key={index}>{`${sensor._id}: ${sensor.latestValue}`}</li>
          ))}
      </ul>

      <h2>Group 2 Sensors (SensorModel2)</h2>
      <ul>
        {group2Data
          .sort((a, b) => {
            const numA = parseInt(a._id.replace("sensor", ""), 10);
            const numB = parseInt(b._id.replace("sensor", ""), 10);
            return numA - numB;
          })
          .map((sensor, index) => (
            <li key={index}>{`${sensor._id}: ${sensor.latestValue}`}</li>
          ))}
      </ul>
    </div>
  );
};

export default SensorDashboard;
