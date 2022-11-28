import db from "../config/db.mjs";
import { DataTypes } from "sequelize";
import Users from "./users.model.js";
import Posts from "./posts.models.js"

const Comments = db.define('comment',{
    desc: {
        type: DataTypes.TEXT(),
        allowNull: false
    },
},{
    updatedAt: false
})

Users.hasMany(Comments);
Posts.hasMany(Comments)

export default Comments;