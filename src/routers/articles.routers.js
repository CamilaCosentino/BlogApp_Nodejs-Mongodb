
const { Router } = require("express");

const router = Router()
const {
    renderArticlesAdd,
    createNewArticle,
    getAllArticles,
    editArticle,
    updateArticle,
    deleteArticle } = require("../controllers/articles.controller")

    const  {isAuthenticated} =  require("../auth/auth")
//New Article
router.get("/add",isAuthenticated,renderArticlesAdd)
router.post("/add",isAuthenticated,createNewArticle)

//Get all articles
router.get("/articles",isAuthenticated, getAllArticles)


//Edit Article 
router.get("/edit/:id",isAuthenticated,editArticle)
router.put("/edit/:id",isAuthenticated,updateArticle)


//Delete Article
router.delete("/delete/:id",isAuthenticated,deleteArticle)

module.exports =  router