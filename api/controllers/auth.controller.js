import Users from "../../models/users.model.js"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
    // Check user if exists
    const {username, email, password, name} = req.body

    try {
        const userName = await Users.findOne({
            where: {
                username: username
            },
        })
        if(userName != null) return res.status(409).json({msg: 'User already Exist'})

        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);
        console.log(hashedPassword)

        const user = await Users.create({
            username,
            email,
            password: hashedPassword,
            name
        })
        return res.status(200).json({msg: "User has been created", data: user})
    } catch (error) {
        return res.status(500).json({msg: error.message});
    }
};


export const login = async (req, res) => {
    
    // Check user if exists
        const user = await Users.findOne({
            where: {
                username: req.body.username
            },
        })


        if(!user) return res.status(409).json({msg: 'user not found'});

        const checkPassword = bcrypt.compareSync(req.body.password, user.password);
        if(!checkPassword) return res.status(400).json({msg: "Wrong password or username"});

        const token = jwt.sign({id: user.id}, "secretKey");

        const {id, username, email, name, coverPic, profilePic, city, website} = user;

        res.cookie("accessToken", token, {
            httpOnly: true
        }).status(200).json({
            id,
            username,
            email,
            name,
            coverPic,
            profilePic,
            city,
            website
        });
};


export const logout = (req, res) => {
    res.clearCookie("accessToken", {
        secure: true,
        sameSite: "none"
    }).status(200).json({msg: "user has been logout!"})
};
