import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://s4nat:jp6YgZQihC6egQzL@cluster0.e0aeipq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
        console.log(`Successfully connnected to mongoDB 👍`);
    } catch (error) {
        console.error(`ERROR: ${error.message}`);
        process.exit(1);
    }
};

export default connectDB;