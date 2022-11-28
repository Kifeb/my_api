import db from "../config/db.mjs";
import Posts from "./posts.models.js";
import Users from "./users.model.js";

const Likes = db.define("like",{},{timestamps: false, createdAt: false, updatedAt: false});

Posts.hasOne(Likes);
Users.hasMany(Likes);

export default Likes