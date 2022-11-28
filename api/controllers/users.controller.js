import Users from "../../models/users.model.js";
import jwt from "jsonwebtoken";

export const getUsers = async (req, res) => {

    const userId = req.params.userId;
    if(!userId) return res.status(404).json({msg: "Id Not Found"});
    try {
        const user = await Users.findOne({
            where: {
                id: userId
            }
        })
        const {id, username, email, name, coverPic, profilePic, city, website} = user;
        return res.status(200).json({
            id,
            username,
            email,
            name,
            coverPic,
            profilePic,
            city,
            website
        })
    } catch (error) {
        return res.status(500).json({msg: error.message});
    }
}

export const updateUsers = (req, res) => {
    const token = req.cookies.accessToken;
    if(!token) return res.status(401).json("Not logged in!");

    jwt.verify(token, "secretKey", async (err, userInfo) => {
        if (err) return res.status(403).json("Invalid Token");

        try {
            const user = await Users.update(req.body, {
                where: {
                    id: userInfo.id
                }
            })
            if(!user) return res.status(409).json({msg: "Not created"});
            return res.status(201).json({msg: "User has been Updated"});
        } catch (error) {
            return res.status(500).json({msg: error.message});
        }
    })
}