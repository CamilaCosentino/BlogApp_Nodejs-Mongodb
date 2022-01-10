const { Router} = require("express");
const router = Router()
const {
    RenderSignInForm,
    SignIn,
    SignUp,
    RenderSignUpForm,
    Logout,
    Google,
    GoogleV } = require("../controllers/users.controller");
const { isAuthenticated } = require("../auth/auth");
   
router.get("/signin", RenderSignInForm )





router.post("/signin",SignIn )

router.get("/signup",RenderSignUpForm )

router.post("/signup",SignUp )

router.get("/logout",isAuthenticated,Logout )


module.exports = router