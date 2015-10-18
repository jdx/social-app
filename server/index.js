'use strict';

let express = require('express');
let app     = express();

app.use(require('morgan')(app.get('env') === 'development' ? 'dev' : 'combined'));
app.use(express.static('public'));
app.use('/templates', express.static('client/templates'));
app.get('/', (req, res) => res.render('index.html.ejs'));

app.use(require('body-parser').json());
app.use(require('./middleware/auth'));
app.use(require('./api/user'));
app.use(require('./middleware/auth').required);
app.use(require('./api/posts'));

let port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log(`server listening on :${port}`);
});
