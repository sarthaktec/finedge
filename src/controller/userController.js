const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

const saltRound = 5;

const user = require("../model/userModel");

const createUser = async (req, res) => {
    try {
        const {name, email, password} = req.body;

        if ( !name || !email || !password ) {
            return res.status(400).json({ error: 'All fields are required.' });
        }
        
        const hashedPassword = await bcrypt.hash(password, saltRound);
        
        const ifUserExist = await user.findOne({email});

        if(ifUserExist) {
            return res.status(400).json({
                error: "User with this email alredy exist"
            })
        }

        const newUser = new user({
            name,
            email,
            password : hashedPassword,
        })

        await newUser.save();

        res.status(201).json({
            message: "User Created Succefully",
            id: newUser.id,
            name: newUser.name,
            email: newUser.email,
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Server error. please try again",
        })
    }
}

const getUserById = async (req, res) => {
    try {
        const { id } = req.params;

        const userData = await user.findById(id);

        if (!userData) {
            return res.status(404).json({
                error: "User not found",
            });
        }

        return res.status(200).json({
            message: "User fetched successfully",
            user: userData,
        });

    } catch (error) {
        return res.status(500).json({
            error: error.message,
        });
    }
};

const userLogin = async (req, res) => {
    try {
        console.log(req.body);
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required",
            });
        }

        const existingUser = await user.findOne({ email });

        if (!existingUser) {
            return res.status(400).json({
                message: "Invalid credentials",
            });
        }

        const isMatched = await bcrypt.compare(password, existingUser.password);

        if (! isMatched) {
            return res.status(400).json({
                message: "Invalid credentials",
            });
        }

        const token = jwt.sign(
            {
                id: existingUser._id,
                email: existingUser.email,
            },
            process.env.JWT_KEY,
            {
                expiresIn: "1d",
            }
        );

        return res.status(200).json({
            message: "Login successfully",
            token,
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            error: error.message,
        });
    }
};

module.exports = {createUser, getUserById, userLogin};