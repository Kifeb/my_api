import db from "../config/db.mjs";
import { DataTypes } from "sequelize";

const Users = db.define('user', {
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    coverPic: {
        type: DataTypes.STRING(300),
        allowNull: true
    },
    profilePic: {
        type: DataTypes.STRING(300),
        allowNull: true
    },
    city: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    website: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
},{
    timestamps: false,
    createdAt: false,
    updatedAt: false
}

)

export default Users;