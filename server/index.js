'use strict';

let express = require('express');
let app     = express();

app.use(require('morgan')(app.get('env') === 'development' ? 'dev' : 'combined'));
app.use(express.static('public'));
app.use('/templates', express.static('client/templates'));
app.get('/', (req, res) => res.render('index.html.ejs'));

app.use(require('body-parser').json());
app.use(require('./api/posts'));
app.use(require('./api/user'));

let port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log(`server listening on :${port}`);
});
