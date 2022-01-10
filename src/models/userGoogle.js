const {model, Schema} =  require("mongoose")
const UserG = new Schema({
    googleId:{
        type:String,
        required:true
    },
    displayName:{
        type:String,
        required:true
    },
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    },
    image:{
        type:String,
     
    },
    createAt:{
        type:Date,
        default:Date.now
    }

})
module.exports =  model("UserGoogle", UserG)