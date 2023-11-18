import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Kindly provide your name'],
        trim: true,
        maxlength: [20, 'Your name can not be more than 20 characters'],
    }, 
    completed:  {
        type: Boolean,
        default: false,
    }
})

export default mongoose.model('Task', TaskSchema)