const mongoose = require("mongoose");
const db = require("./key")
mongoose.connect(db.mongodb.URL,{
    useUnifiedTopology: true,
    useNewUrlParser:true
})
.then((db)=>{console.log("Base de datos conectada!")})
.catch((err) =>{console.error(`No se pudo conectar ${err}`);})