import mongoose from 'mongoose'

const connectDb = async () => {
    const uri = `${process.env.MONGO_URI}sensors`;
    try {
          await mongoose.connect(uri);
          console.log('Connected to MongoDB Replica Set');
    } catch (error) {
        console.error(error)
    }
}

export default connectDb;
