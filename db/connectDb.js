import mongoose from 'mongoose'

const connectDb = async () => {
    const uri = 'mongodb+srv://Lamrin:Dahslid0220@cluster0.fcpt0.mongodb.net/sensors';
    try {
          await mongoose.connect(uri);
          console.log('Connected to MongoDB Replica Set');
    } catch (error) {
        console.error(error)
    }
}

export default connectDb;
