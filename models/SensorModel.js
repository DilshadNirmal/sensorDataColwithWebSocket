import mongoose from 'mongoose'

const sensorSchema1 = new mongoose.Schema({
    sensor: {
        type: String,
        required: true
    },
    value: {
        type: String,
        required: true
    }
}, {timestamps: true})

const sensorSchema2 = new mongoose.Schema({
    sensor: {
        type: String,
        required: true
    },
    value: {
        type: String,
        required: true
    }
}, {timestamps: true})

const sensorSchema3 = new mongoose.Schema({
    sensor: {
        type: String,
        required: true
    },
    value: {
        type: String,
        required: true
    }
}, {timestamps: true})

const SensorModel1 = mongoose.models.SensorCollection1 || mongoose.model("SensorCollection1", sensorSchema1)
const SensorModel2 = mongoose.models.SensorCollection2 || mongoose.model("SensorCollection2", sensorSchema2)
const SensorModel3 = mongoose.models.SensorCollection3 || mongoose.model("SensorCollection3", sensorSchema3)

export {SensorModel1, SensorModel2, SensorModel3};
