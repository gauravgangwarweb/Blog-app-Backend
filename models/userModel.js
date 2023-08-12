import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName: {
        require: true,
        type: String
    },
    lastName: {
        require: true,
        type: String
    },
    publicId: {
        type: String,
        default: "admin"
    },
    imageUrl: {
        type: String,
        default: "https://res.cloudinary.com/dz27v8vsy/image/upload/v1689497760/defauktadmin_llhv43.jpg"
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

userSchema.set('toJSON', {
    transform: function (doc, ret) {
        delete ret.password;
        return ret;
    }
});

const User = mongoose.model('User', userSchema)

export default User