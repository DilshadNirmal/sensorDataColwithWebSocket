import { SensorModel1, SensorModel2, SensorModel3 } from "../../models/SensorModel.js";

export const insertSensorData = async (req, res) => {
  try {
    const {
      sensor1,
      sensor2,
      sensor3,
      sensor4,
      sensor5,
      sensor6,
      sensor7,
      sensor8,
      sensor9,
      sensor10,
      sensor11,
      sensor12,
      sensor13,
      sensor14,
    } = req.query;

    const collection1Data = [
      { sensor: "sensor1", value: sensor1 },
      { sensor: "sensor2", value: sensor2 },
      { sensor: "sensor3", value: sensor3 },
      { sensor: "sensor4", value: sensor4 },
      { sensor: "sensor5", value: sensor5 },
    ].filter(data => data.value !== undefined);

    const collection2Data = [
      { sensor: "sensor6", value: sensor6 },
      { sensor: "sensor7", value: sensor7 },
      { sensor: "sensor8", value: sensor8 },
      { sensor: "sensor9", value: sensor9 },
      { sensor: "sensor10", value: sensor10 },
    ].filter(data => data.value !== undefined);

    const collection3Data = [
      { sensor: "sensor11", value: sensor11 },
      { sensor: "sensor12", value: sensor12 },
      { sensor: "sensor13", value: sensor13 },
      { sensor: "sensor14", value: sensor14 },
    ].filter(data => data.value !== undefined);

    if (collection1Data.length) await SensorModel1.insertMany(collection1Data)
    if (collection2Data.length) await SensorModel2.insertMany(collection2Data)
    if (collection3Data.length) await SensorModel3.insertMany(collection3Data)

    res.status(201).json({message: "sensor data inserted successfully"})
  } catch (error) {
    console.error(error);
    res.status(500).json({error: "Internal server error"})
  }
};

export const getLatestSensorData = async (req, res, io) => {
    try {
        const latestCollection1 = await SensorModel1.aggregate([
            {$sort: { createdAt: -1}},
            {$group: {_id: "$sensor", latestValue: {$first: "$value"}}}
        ])

        const latestCollection2 = await SensorModel2.aggregate([
            {$sort: { createdAt: -1}},
            {$group: {_id: "$sensor", latestValue: {$first: "$value"}}}
        ])

        const latestCollection3 = await SensorModel3.aggregate([
            {$sort: { createdAt: -1}},
            {$group: {_id: "$sensor", latestValue: {$first: "$value"}}}
        ])

        const latestData = {
            collection1: latestCollection1,
            collection2: latestCollection2,
            collection3: latestCollection3
        }

        io.emit('sensor-update', latestData)
        res.json(latestData)

    } catch(err) {
        console.error("[error retrieving latest data]\n" + err)
        res.status(500).json({ message: "Failed to retrieve latest sensor data" });
    }
}
