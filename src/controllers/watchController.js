import {
    SensorModel1,
    SensorModel2,
    SensorModel3,
  } from "../../models/SensorModel.js";

  export const watchSensorCollections = (io) => {
    console.log("[watching sensor collections]");

    // Enable change stream for each collection with fullDocument option
    const options = { fullDocument: "updateLookup" };

    SensorModel1.watch([], options).on("change", (change) => {
      console.log("[change detected in SensorModel1]", change);
      emitLatestSensorData(io, "sensor-group1-update", "SensorModel1");
    });

    SensorModel3.watch([], options).on("change", (change) => {
      console.log("[change detected in SensorModel3]", change);
      emitLatestSensorData(io, "sensor-group1-update", "SensorModel3");
    });

    SensorModel2.watch([], options).on("change", (change) => {
      console.log("[change detected in SensorModel2]", change);
      emitLatestSensorData(io, "sensor-group2-update", "SensorModel2");
    });
  };

  const emitLatestSensorData = async (io, endpoint, modelName) => {
    try {
      const modelMap = {
        SensorModel1,
        SensorModel2,
        SensorModel3,
      };

      const model = modelMap[modelName];
      const latestCollection = await model.aggregate([
        { $sort: { createdAt: -1 } },
        { $group: { _id: "$sensor", latestValue: { $first: "$value" } } },
      ]);

      console.log(`Emitting latest sensor data to ${endpoint}:`, latestCollection);
      io.emit(endpoint, latestCollection);
    } catch (e) {
      console.error(
        `Error emitting latest sensor data to ${endpoint}:`,
        e
      );
    }
  };
