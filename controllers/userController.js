import User from "../models/userModel.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


//Create new user
export const createUser = async (req, res) => {
    try {
        const { firstName, lastName, publicId, imageUrl, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 8)

        const user = await User.create({ firstName, lastName, publicId, imageUrl, email, password: hashedPassword })
        const data = { firstName: user.firstName, lastName: user.lastName, imageUrl: user.imageUrl, email: user.email, id: user._id }
        res.status(201).json(data)
    } catch (error) {
        res.status(500).json({ message: "Server error" })
    }
}

//update a user
export const updateUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const { firstName, lastName, publicId, imageUrl, email, password } = req.body;

        const updateFields = {};

        // Conditionally build the update object based on the provided fields
        if (firstName) updateFields.firstName = firstName;
        if (lastName) updateFields.lastName = lastName;
        if (email) updateFields.email = email;
        if (password) {
            const hashedPassword = await bcrypt.hash(password, 8);
            updateFields.password = hashedPassword;
        }
        if (req.decodedToken.user !== userId) {
            return res.status(401).json({ error: 'Unauthorized access' });
        }

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            updateFields,
            { new: true }
        );
        if (!updateUser) {
            return res.status(404).json({ error: "User not found" })
        }
        res.status(201).json({ status: "SUCCESS", data: updateUser })
    } catch (error) {
        res.status(500).json({ message: "Server error" })
    }
}

//login user
export const login = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email })

        if (!user) {
            return res.status(401).json({ error: "Invalid user email" })
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (!isPasswordValid) {
            return res.status(401).json({ error: "Invalid user password" })
        }

        const token = jwt.sign({ user: user._id }, process.env.SECRET, { expiresIn: '1h' })
        res.status(200).json({ user: user, token: token, msg: `${user.firstName} logged in succesfully` })
    } catch (error) {
        res.status(501).json({ error: "Invalid user credentials or server error" })
    }
}

//User by id
export const getUserById = async (req, res) => {
    try {
        const { userId } = req.params
        // console.log(id)
        const user = await User.findById(userId).populate('posts')
        // console.log(user.posts)
        if (!user) {
            res.status(404).json({ message: "User not found" })
        }
        const data = {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            posts: user.posts
        }
        res.json(data)
    } catch (error) {
        res.status(501).json({ message: "Server error" })
    }
}