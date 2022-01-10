const helpers = {}

helpers.isAuthenticated = (req,res,next) =>{
    if(req.isAuthenticated()){
       
        return next()
    }
    req.flash("errorMessage","Not authorized")
    res.redirect("/signin")
}
module.exports = helpers