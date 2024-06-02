import mongoose from 'mongoose';
import fs from 'fs';

// Function to generate a unique file ID
export const generateUniqueFileId = () => {
    return `file-${new mongoose.Types.ObjectId()}`;
};

// Function to delete a file after a specified duration
export const deleteFileAfterDelay = (filePath, delay) => {
    setTimeout(() => {
        // Check if the file exists before attempting to delete it
        if (fs.existsSync(filePath)) {
            fs.unlink(filePath, (err) => {
                if (err) {
                    console.error(`Error deleting file: ${err}`);
                } else {
                    console.log(`File deleted: ${filePath}`);
                }
            });
        } else {
            console.log(`File not found: ${filePath}`);
        }
    }, delay);
}