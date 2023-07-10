import mongoose from "mongoose";
import Post from "./postModel.js";

const userSchema = new mongoose.Schema({
    firstName: {
        require: true,
        type: String
    },
    lastName: {
        require: true,
        type: String
    },
    email: {
        require: true,
        type: String,
        unique: true
    },
    password: {
        require: true,
        type: String
    }
},
    {
        timestamps: true
    }
)

userSchema.virtual('posts', {
    ref: 'Post',
    localField: '_id',
    foreignField: 'userId',
});

const User = mongoose.model('User', userSchema)

export default User