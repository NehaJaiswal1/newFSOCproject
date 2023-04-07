const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        trim: true,
        required: true
    },
    password: {
        type: String,
        trim: true,
        required: true
    },
    
    tags:{
        type: [String],
        default: []
    },

    role: {
        type: String,
        enum: ["job-seeker", "admin", "employer"],
        default: "job-seeker"
    },
    
    isDelete: {
        type: Boolean,
        default: false
    },

    question:{
        type: String,
        required: true  
    },

    answer:{
        type: String,
        required: true  
    }

}, { timestamps: true })

module.exports = mongoose.model("Users", userSchema);