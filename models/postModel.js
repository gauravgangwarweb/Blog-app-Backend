import mongoose from "mongoose";


const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    publicId: {
        type: String,
    },
    imageUrl: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    body: {
        type: String,
        required: true
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Like'
    }],
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }]
},
    { timestamps: true }
)

postSchema.set('toJSON', {
    transform: function (doc, ret) {
        delete ret.userId;
        return ret;
    },
});


const Post = mongoose.model('Post', postSchema)

export default Post