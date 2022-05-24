let express = require('express');
let router = express.Router();
let db = require("../config/db.config")

/* GET home page. */
router.get('/', (req, res)=> res.redirect("/books"));

router.get('/books', function(req, res, next) {
  db.query(`
        SELECT b.id, b.name, b.author,b.description,b.status, bc.category
        FROM bookloansystemdb.books b 
        join bookloansystemdb.bookcategory bc on b.category_id = bc.id
  
              `,(error, results, field)=>{
          if(error) {throw error}
          res.render('index', { title: 'Express', books:results});
  })
});

router.post('/book/:id', function(req, res, next) {
  let data = {
      book_id : req.body.book_id,
      due_date: new Date(Date.now() + 1209600000).toLocaleDateString().slice(0,10).replaceAll("/", "-"),
  }
  db.query(`SELECT * FROM bookloansystemdb.students where email = '${req.body.email}'`,(error, results, fields)=>{
    if (error) {throw error }
      if(results.length == 0){return res.redirect("/books")}
      

    db.query(`UPDATE bookloansystemdb.books set status = 'requested' WHERE id = ${data.book_id}`,(error, result, fields)=>{
      if(error) {throw error}
        console.log("updated book status")
    })


    // creates a loanbook records
    db.query(`
    insert into bookloansystemdb.loanedbooks(book_id,student_id,due_date) values(${req.params.id},${results[0].id},DATE_ADD(now(),INTERVAL 2 WEEK));
      `.replaceAll("\n", " "),(error, results,field)=>{
        if(error) {throw error}
        console.log(results)
        res.redirect("/books")
    })



  })

});
router.get('/dashboard', function(req, res, next) {
  if(!req.session.user) return res.redirect('/users/login')
  db.query(`
      SELECT b.id as book_id, 
      CONCAT(s.fname, " ", s.lname) as student, b.name as name,b.status as book_status, lb.loan_date, lb.due_date
      FROM bookloansystemdb.books b 
      JOIN bookloansystemdb.loanedbooks lb ON b.id = lb.book_id 
      JOIN bookloansystemdb.students s ON s.id = lb.student_id

  `, (error, results,field)=>{
    if(error){ throw error}
    records = results
    res.render('dashboard', { title: 'dashboard', records, user: req.session.user});
  })
  
});
router.post('/updateStatus/:id', function(req, res, next) {
  db.query(`UPDATE bookloansystemdb.books set status = '${req.body.status}' WHERE id = ${req.params.id}`,(error, result, fields)=>{
    if(error) {throw error}
      console.log("updated book status")
  })
  res.redirect("/dashboard");
});

module.exports = router;
