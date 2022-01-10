const Article =require("../models/articles")
const articleCtl = {}
//Add one
articleCtl.renderArticlesAdd = (req,res) =>{
   
    res.render("articles/addArticles")
}
articleCtl.createNewArticle = async(req,res) =>{
const {title, description,image} = req.body
const newArticle = new Article( {
    title,
    description,
    image
})
newArticle.user = req.user.id
await newArticle.save();

req.flash("successMessage","The article added successfully")
res.redirect("/articles")
}
//Get all
articleCtl.getAllArticles = async(req,res) =>{
   const article = await Article.find({user:req.user.id})
   .sort({datetime: -1})
   
   
   res.render("articles/getArticles",{articles:article})
}
//Edit one
articleCtl.editArticle = async(req,res) =>{
    const article =  await Article.findById(req.params.id)
    
    if(article.user != req.user.id){
        console.log(req.user.id);
        req.flash("errorMessage","Not authorized")
        return res.redirect("/articles")
    }
    res.render("articles/editArticle",{article})

}
articleCtl.updateArticle =async(req,res) =>{
    const {title,description,image} =  req.body
  const eArticle =  await Article.findByIdAndUpdate(req.params.id,{
      title,
      description,
      image
  })
  req.flash("successMessage",`The article updated successfully`)
  res.redirect("/articles")
}
articleCtl.deleteArticle = async(req,res) =>{
   const dArticle = await Article.findOneAndDelete(req.params.id)
   req.flash("successMessage",`The article deleted successfully`)

   res.redirect("/articles")
}
module.exports =  articleCtl