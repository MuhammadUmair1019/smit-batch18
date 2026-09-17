import mongoose from "mongoose";

const { Schema } = mongoose;

const UserSchema = new Schema({
    name: String,
    email: String,
    age: Number
},
    { timestamps: true }
)


export default mongoose.model("User", UserSchema)