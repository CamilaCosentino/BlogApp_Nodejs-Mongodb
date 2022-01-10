const { Schema ,model} = require("mongoose");
const bcrypt = require("bcrypt-nodejs")
const UserSchema = new  Schema({
    firstname:{
        type:String,
        trim:true,
        required:true
    },
    lastname:{
        type:String,
        trim:true,
        required:true 
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required: true
    }
    
})
UserSchema.methods.hashPassword = async password =>{
  const salt =  await bcrypt.genSaltSync(10)
  return await  bcrypt.hashSync(password, salt)
   
}
UserSchema.methods.comparePassword = async function(password){
    return await bcrypt.compareSync(password,this.password)
}

module.exports = model("Usuario",UserSchema)
