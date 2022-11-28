import Users from "./users.model.js";
import db from "../config/db.mjs";
import { DataTypes } from "sequelize";

const Relationship = db.define('relationship', {
    followersUserId: {
        type: DataTypes.INTEGER,
        references: {
            model: Users,
            key: 'id'
        }
    },
    followedUserId: {
        type: DataTypes.INTEGER,
        references: {
            model: Users,
            key: 'id'
        }
    },
}, {timestamps: false, createdAt: false, updatedAt: false});

export default Relationship;