// import generateRandomTone from "../middlewares/mp3Generator.js";
import User from '../models/userModel.js'; // Import the User model
import File from "../models/fileModel.js";
import { generateUniqueFileId, deleteFileAfterDelay } from "../utils/fileUtils.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import path from 'path';
import fs from 'fs';

const generateMusic = asyncHandler(async (req, res) => {
    const { username, textPrompt } = req.body;

    if (!textPrompt) {
        res.status(400);
        throw new Error("Please provide a text prompt");
    }

    // Generate unqiue fileId fir the music file
    const fileId = generateUniqueFileId();

    let filePath;
    try {
        // Create a directory path within the /tmp directory
        const tempDir = path.join('/tmp', 'music_files');
        if (!fs.existsSync(tempDir)) {
            fs.mkdirSync(tempDir, { recursive: true });
        }
        filePath = path.join(tempDir, fileId + '.txt');

        // generate txt file and store it in the filePath
        fs.writeFileSync(filePath, textPrompt);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error writing to file' + error });
    }


    // create new file object
    const file = new File({ username, fileId, filePath, textPrompt });

    // Set timer to delete file from server
    deleteFileAfterDelay(filePath, 10000);

    // save file object to the database
    try {
        await file.save();
        res.status(201).json({
            username: file.username,
            fileId: file.fileId,
            filePath: file.filePath,
            textPrompt: file.textPrompt,
            downloadLink: "/files/download/" + file.fileId,
        });
    } catch (error) {
        res.status(400);
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
);


const getMusic = asyncHandler(async (req, res) => {

    try {
        const { fileId } = req.params;

        let filePath;

        // Get filePath from the database
        const file = await File.findOne({ fileId });
        if (!file) {
            res.status(404);
            throw new Error("File not found");
        }
        filePath = file.filePath;

        res.download(filePath, (err) => {
            if (err) {
                console.error('Error downloading file:', err);
                res.status(500).json({ error: 'File no longer exists on server' });
            }
        })
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


export { generateMusic, getMusic }