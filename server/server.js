const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const request = require('request');
const async = require('async');
const expressHbs = require('express-handlebars');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const flash = require('express-flash');
const path = require('path');
const hbs = require('hbs');

const app = express();

app.engine('.hbs', expressHbs({ defaultLayout: 'layout', extname: '.hbs' }));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, '../public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: "ashikhahahaha",
    store: new MongoStore({ url: 'mongodb://root:abc123@ds239965.mlab.com:39965/emaillisting' })
}));

app.use(flash());

const port = process.env.PORT || 3000;

app.get('/', (req, res, next) => {
    res.render('main/index');
})

app.listen(port, () => {
    console.log(`Started on port: ${port}`);
});

module.exports = { app };