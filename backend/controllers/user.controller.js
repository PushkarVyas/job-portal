import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


export const register = async (req, res) => {
    try{
        const {fullname, email, phoneNumber, password, role} = req.body;

        if(!fullname || !email || !phoneNumber || !password || !role){
            return res.status(400).json({message: "All fields are required", success: false});
        };

        const user = await User.findOne({email});
        if(user){
            return res.status(400).json({
                message: "User already exists",
                success: false
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({
            fullname,
            email,
            phoneNumber,
            password: hashedPassword,
            role
        });

        return res.status(201).json({
            message: "Account created successfully",
            success: true
        })


    } catch(error){
        console.log(error);
        res.status(500).json({
            message: "Something went wrong",
            success: false
        })
    }
}

export const login = async (req, res) => {
    try{
        const {email, password, role} = req.body;

        if(!email || !password || !role){
            return res.status(400).json({message: "All fields are required", success: false});
        };  

        let user = await User.findOne({email});
        if(!user){
            return res.status(400).json({
                message: "User does not exist",
                success: false
            })
        } 

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({
                message: "Invalid credentials",
                success: false
            })
        }

        if(role !== user.role){
            return res.status(400).json({
                message: "Account does not exist with current role",
                success: false
            })
        }

        const tokenData = {
            userId: user._id,
        }

        const token = await jwt.sign(tokenData, process.env.SECRET_KEY, {expiresIn: "1d"});

        user = {
            userId: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile : user.profile
        }

         return res.status(200).cookie("token", token, {
             maxAge: 1 * 24 * 60 * 60 * 1000,
             httpOnly: true,
             sameSite : 'strict'
         }).json({
             message: `Welcome back ${user.fullname}`,
             user,
             success: true
         })


    }catch(error){
        console.log(error);
        res.status(500).json({
            message: "Something went wrong",
            success: false
        })
    }
}


export const logout = async (req, res) => {
    try{
        return res.status(200).clearCookie("token").json({
            message: "Logout successful",
            success: true
        })
    }catch(error){
        console.log(error);
        res.status(500).json({
            message: "Something went wrong",
            success: false
        })
    }
}



export const updateProfile = async (req, res) => {
    try{
        const {fullname, email, phoneNumber, bio, skills} = req.body;
        const file = req.file;

        let skillsArray;
        if(skills){
            skillsArray = skills.split(",");
        }
        
        const userId = req.id;         //middleware authentication

        let user = await User.findById(userId);
        if(!user){
            return res.status(400).json({
                message: "User does not exist",
                success: false
            })
        }

        if(fullname) user.fullname = fullname;
        if(email) user.email = email;
        if(phoneNumber) user.phoneNumber = phoneNumber;
        if(bio) user.profile.bio = bio;
        if(skills) user.profile.skills = skillsArray;
        if(file) user.profile.profilePic = file.path;



        await user.save();

        user = {
            userId: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile : user.profile
        }

        return res.status(200).json({
            message: "Profile updated successfully",
            user,
            success: true
        })

    }catch(error){
        console.log(error);
        res.status(500).json({
            message: "Something went wrong",
            success: false
        })
    }
}