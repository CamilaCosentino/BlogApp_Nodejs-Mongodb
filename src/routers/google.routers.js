const {Router} =require("express")
const passport = require("passport")
const router =  Router()

router.get('/auth/google', passport.authenticate('google', { scope: ['profile'] }))


router.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/signin' }),
  (req, res) => {
    res.redirect('/articles')
  }
)



module.exports = router