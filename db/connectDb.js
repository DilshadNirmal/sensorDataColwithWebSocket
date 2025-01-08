import mongoose from 'mongoose'

const connectDb = async () => {
    const uri = 'mongodb://192.168.188.174:27017,192.168.188.174:27018,192.168.188.174:27019/sensors?replicaSet=rs0&directConnection=false';
    try {
          await mongoose.connect(uri);
          console.log('Connected to MongoDB Replica Set');
    } catch (error) {
        console.error(error)
    }
}

export default connectDb;
