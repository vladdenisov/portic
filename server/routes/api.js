let express = require('express');
let router = express.Router();

/* GET users listing. */
router.get('/', (req, res) => {
  res.send('respond with a resource');
});
router.get('/log', (req, res) => {
  res.send('respond log with a resource');
});
router.post('/create', (req,res) => {
  const content = req.body.content;
  console.log(req.body)
  const encrypted = req.body.encrypted;
  if (!content) return res.redirect('/');
    req.models.snippets.create({content, encrypted})
        .then(doc => {
            res.send({id: doc.id, code: 200})
        });
})
router.post('/get', (req, res) => {
  const {models, mongoose} = req;
  const id = req.body.id
  console.log(req.body)
  return models.snippets.findOne({_id: mongoose.Types.ObjectId(id)})
      .then(doc => {
          if (!doc) {
              res.status(404);
              return res.send(
                  {code: 404}
              );
          }
          res.send({encrypted: doc.encrypted, content: doc.content})
      });

})

module.exports = router;
