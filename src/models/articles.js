const { Schema ,model} = require("mongoose");


const ArticlesSchema = new Schema({
    datetime:{
    type: Date,
    default: Date.now()

    },
    title:{
        type:String,
        required:true
    },
    description: {
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    user:{
        type:String,
        required:true
    }
  

},
{
    timestamps:true
})
module.exports = model("Articulos", ArticlesSchema)