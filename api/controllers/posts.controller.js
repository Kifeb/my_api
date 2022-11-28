import jwt from "jsonwebtoken";
import moment from "moment";
import { database } from "../../config/db.mjs";
import Posts from "../../models/posts.models.js";

export const getPosts = (req, res) => {
    
    const userId = req.query.userId
    const token = req.cookies.accessToken;
    if(!token) return res.status(401).json("Not logged in!");

    jwt.verify(token, "secretKey", async (err, userInfo) => {
        if (err) return res.status(403).json("Invalid Token");

        const query = userId != "undefined"
        ? "SELECT p.*, u.id AS userId, name, profilePic FROM posts AS p JOIN users AS u ON (u.id = p.userId) WHERE userId = ? ORDER BY p.createdAt DESC"
        : "SELECT p.*, u.id AS userId, name, profilePic FROM posts AS p JOIN users AS u ON (u.id = p.userId) LEFT JOIN relationship AS r ON (p.userId = r.followedUserId) WHERE r.followersUserId = ? OR p.userId = ? ORDER BY p.createdAt DESC";

        const values = userId != "undefined" ? [userId] : [userInfo.id, userInfo.id]

        database.query(query, values, (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json(data);
        })
    })

}

export const addPost = (req, res) => {

    const token = req.cookies.accessToken;
    if(!token) return res.status(401).json("Not logged in!");

    jwt.verify(token, "secretKey", async (err, userInfo) => {
        if (err) return res.status(403).json("Invalid Token");

        const {desc, img} = req.body

        try {
            const post = await Posts.create({
                desc,
                img,
                createdAt: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
                userId: userInfo.id
            })
            return res.status(201).json({msg: "success posting"});
        } catch (error) {
            return res.status(500).json({msg: error.message})
        }
    })

}

export const deletePost = (req, res) => {

    const token = req.cookies.accessToken;
    if(!token) return res.status(401).json("Not logged in!");

    jwt.verify(token, "secretKey", (err, userInfo) => {
        if (err) return res.status(403).json("Invalid Token");

        const query = "DELETE FROM posts WHERE `id` = ? AND `userId` = ?";

        database.query(query, [req.params.id, userInfo.id] ,(err, data) => {
            if (err) return res.status(500).json(err);
            if(data.affectedRows > 0) return res.status(200).json("deleted");
            return res.status(403).json("You can delete only your post");
        })
    })

}