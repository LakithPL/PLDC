import mongoose from "mongoose";

const postsSchema = new mongoose.Schema({
    postHeader: {
        type: String,
        required: true
    },
    postBody: {
        type: String,
        required: true
    }
})

export default mongoose.model('Post', postsSchema)