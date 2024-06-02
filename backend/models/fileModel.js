import mongoose from "mongoose";

const fileSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    fileId: {
        type: String,
        required: true,
        unique: true
    },
    filePath: {
        type: String,
        required: true
    },
    textPrompt: {
        type: String,
        required: true
    },
},
    { timestamps: true }
);


const File = mongoose.model("File", fileSchema);

export default File;