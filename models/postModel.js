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
        validate: {
            validator: async (value) => {
                const user = await mongoose.model('User').findById(value);
                return user !== null
            },
            message: 'User does not exist'
        }
    },
    body: {
        type: String,
        required: true
    }
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
