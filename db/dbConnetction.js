import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            dbName: "Stundet-DB", 
        });
        console.log("DB Connection Successful :)");
    } catch (error) {
        console.error("DB Connection Failed");
        console.error(error);
        process.exit(1); // Exit the application on DB connection failure
    }
};


export default connectDB;
