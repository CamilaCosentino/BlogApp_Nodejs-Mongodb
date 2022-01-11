const passport = require("passport");
const  LocalStrategy =  require("passport-local").Strategy
const User =require("../models/users")
passport.use("login" ,new LocalStrategy({
usernameField:"email"

},async(email,password,done) =>{

//Validar email

      const user = await User.findOne({ email: email });

if(!user){
    return done(null,false,{message:"Not user found"})
}else{
    //comparar contraseña
  const match =  await  user.comparePassword(password)
  if(match){
    return done(null,user)
  }else{
      return done(null,false, {message:"Incorrect  password"})
  }
}
}))
passport.serializeUser((user,done) =>{
    return done(null,user.id)
})
passport.deserializeUser((id,done) =>{
    User.findById(id ,(err,user)=>{
        done(err,user)
    })
})