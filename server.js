'use strict';

let express = require('express');
let app     = express();

app.use(require('morgan')(app.get('env') === 'development' ? 'dev' : 'combined'));
app.use(express.static('public'));
app.get('/', function (req, res) {
  res.render('index.html.ejs');
});

//let Post = require('./db/post');

let port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log(`server listening on :${port}`);
});
