import db from "../config/db.mjs";
import { DataTypes } from "sequelize";
import Users from "./users.model.js";

const Posts = db.define('post',{
    desc: {
        type: DataTypes.TEXT(),
        allowNull: false
    },
    img: {
        type: DataTypes.STRING(300),
        allowNull: true
    },
},{
    updatedAt: false
})

Users.hasMany(Posts)

export default Posts;