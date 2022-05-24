let express = require('express');
const db = require('../config/db.config');
let router = express.Router();


/* GET users listing. */
router.get('/login', function(req, res, next) {
  res.render("login",{title :"login"});
});

router.post('/login', function(req, res, next) {
  let password = req.body.password || '';
  let email = req.body.email;
  console.log({password,email})

  db.query(`
    SELECT * FROM bookloansystemdb.librarians WHERE email = '${email}' AND password = '${password}'
  
  `,(error, results, field)=>{
    if(error){throw error}
    if(results.length == 0){ return res.redirect("/login")}
    req.session.regenerate(function(){
      
      req.session.user = results[0]
      res.redirect("/dashboard");
    })     
  })
});

module.exports = router;
