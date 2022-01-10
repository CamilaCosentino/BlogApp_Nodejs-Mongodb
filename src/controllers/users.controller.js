const UserCtl = {}
const passport = require("passport")
const User = require("../models/users")

UserCtl.RenderSignUpForm = (req, res) => {
    res.render("users/signup")
}
UserCtl.SignUp = async(req, res) => {
    const errors = []
const {firstname,lastname,email,password, confirm_password} =req.body
if(password != confirm_password){
   errors.push({text:`Passwords don't match`})
}
if(password.length < 8){
    errors.push({text:`The password must be at least 8 characters.`})
}
if(errors.length > 0){
    res.render("users/signup",{errors,firstname,lastname,email})

}else{
   const Emailuser = await User.findOne({email,})
   console.log(Emailuser)
   if(Emailuser) {
       req.flash("errorMessage","The email is already in use")
       res.redirect("/signup")
   }else{
     const newUser = new User({
         firstname,
         lastname,
         email,
         password,
         confirm_password
     })
     newUser.password = await newUser.hashPassword(password)
      const user = await newUser.save()
      console.log(user)
      req.flash("successMessage" ,"You are registered")
      res.redirect("/signin")
   }
}
}
UserCtl.RenderSignInForm = (req, res) => {
    res.render("users/signin")
}
UserCtl.SignIn = passport.authenticate("login",{
    successRedirect:"/articles",
    failureRedirect:"/signin",
    failureFlash:true
});
UserCtl.Logout = (req,res) =>{
    req.logout()
    req.flash("successMessage","You logged out now")
    res.redirect("/")
}



module.exports = UserCtl