import { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:4030/");

const SensorDashboard = () => {
  const [sensorData, setSensorData] = useState([]);

  useEffect(() => {
    socket.on("sensor-update", (data) => {
      console.log("Received sensor data:", data);

      // Update sensorData to maintain all 1 to 14 sensors
      setSensorData((prevData) => {
        const newData = Array.isArray(data) ? data : [data];
        const dataMap = new Map(prevData.map((item) => [item._id, item])); // Create map of current data
        data.forEach((item) => {
          dataMap.set(item._id, item); // Update or add new sensor data
        });
        return Array.from(dataMap.values()); // Convert back to array
      });
    });

    return () => {
      socket.off("sensor-update");
    };
  }, []);

  useEffect(() => {
    console.log("[after setSensorData] ", sensorData)
  }, [sensorData])



  return (
    <div>
      <h1>Sensor Data</h1>
      <ul>
        {sensorData.sort((a,b) => {
            const numA = parseInt(a._id.replace("sensor", ""), 10)
            const numB = parseInt(b._id.replace("sensor", ""), 10)
            return numA - numB
        }).map((sensor, index) => (
          <li key={index}>{`${sensor._id}: ${sensor.latestValue}`}</li>
        ))}
      </ul>
    </div>
  );
};

export default SensorDashboard;
