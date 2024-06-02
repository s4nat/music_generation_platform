import mongoose from 'mongoose';

// Function to generate a unique file ID
const generateUniqueFileId = () => {
    return `file-${new mongoose.Types.ObjectId()}`;
};


export default generateUniqueFileId;


