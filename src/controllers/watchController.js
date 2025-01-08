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
    console.log("[change detected in collection1]", change);
    emitLatestSensorData(io, "collection1");
  });

  SensorModel2.watch([], options).on("change", (change) => {
    console.log("[change detected in collection2]", change);
    emitLatestSensorData(io, "collection2");
  });

  SensorModel3.watch([], options).on("change", (change) => {
    console.log("[change detected in collection3]", change);
    emitLatestSensorData(io, "collection3");
  });
};

const emitLatestSensorData = async (io, collectionName) => {
  try {
    const modelMap = {
      collection1: SensorModel1,
      collection2: SensorModel2,
      collection3: SensorModel3,
    };

    const model = modelMap[collectionName];
    const latestCollection = await model.aggregate([
      { $sort: { createdAt: -1 } },
      { $group: { _id: "$sensor", latestValue: { $first: "$value" } } },
    ]);

    console.log(`Emitting latest sensor data for ${collectionName}:`, latestCollection);
    io.emit("sensor-update", latestCollection);
  } catch (e) {
    console.error(
      `Error emitting latest sensor data for ${collectionName}:`,
      e
    );
  }
};
