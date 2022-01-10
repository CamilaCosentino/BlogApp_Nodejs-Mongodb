const express = require("express")
const {engine} = require("express-handlebars")
const morgan = require("morgan")
const path = require("path")
const Handlebars = require('handlebars');
const {allowInsecurePrototypeAccess} = require("@handlebars/allow-prototype-access")
const method_override =require("method-override");
const passport = require("passport");
const flash =  require("connect-flash")
const session =  require("express-session")

//initialization
const app = express()
require("./auth/local")
require("./config/database")
require("dotenv").config()
//settings
app.set("port" ,process.env.PORT || 8080) 
app.set("views", path.join(__dirname,"views"))
app.engine(".hbs" , engine({
    defaultLayout: "main.hbs",
    layoutsDir: path.join(app.get("views"),"layouts"),
    partialsDir: path.join(app.get("views"),"temp"),
    extname: ".hbs",
    handlebars: allowInsecurePrototypeAccess(Handlebars)

})) 
app.set("view engine", ".hbs")
//midlewares
app.use(express.urlencoded({extended:false}))
app.use(morgan("dev"))
app.use(method_override("_method"))
app.use(session({
    secret:"ffojeffefg",
    resave: true,
    saveUninitialized:true
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

//global varibles
app.use((req,res,next) =>{
   res.locals.success_msn = req.flash("successMessage")
   res.locals.error_msn = req.flash("errorMessage")
   res.locals.error = req.flash("error")
   res.locals.user = req.user || null
    next()
})

//Routers
app.use(require("./routers/index.routers"))
app.use(require("./routers/articles.routers"))
app.use(require("./routers/users.routers"))

//Statics files
app.use(express.static(path.join(__dirname,"public")))
//Listening Server
app.listen(`${app.get("port")}`,() =>{
console.log(`Server Num: ${process.pid} on port ${app.get("port")}`)
})
module.exports = app