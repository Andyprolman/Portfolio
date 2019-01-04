const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
var profile = require('./profile')

const app = express();

app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true}))
app.use('/profile', profile)

app.use('/public', express.static('public'))

app.set('views', './views');

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    const data = {
        person: {
            firstName: 'Andy',
            lastName: 'Prolman'
        }
    }
    res.render('index', data);
});

app.get('/contact', (req, res) => {
    res.render('contact');
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/projects', (req, res) => {
    res.render('projects');
});

app.post('/thanks', (req, res) => {
    const sgMail = require('@sendgrid/mail');
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
    to: 'aprolman21@gmail.com',
    from: req.body.email,
    subject: req.body.subject,
    text: req.body.message,
    html: req.body.message,
};
sgMail.send(msg);
    res.render('thanks', {contact: req.body})
});



//const PORT = process.env.PORT || 8080;

app.listen(process.env.PORT || 8080);
console.log('listening on 8080');