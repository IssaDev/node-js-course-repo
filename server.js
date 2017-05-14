const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();
hbs.registerPartials(__dirname + '/views/partials');
//Set the view engine to be used for dynamic rendering
app.set('view engine', 'hbs');

app.use( (req,res,next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if(err){
      console.log('Unable to log file');
    }
  });
next();
});

// app.use( (req,res) => {
//     res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
})
//HTTP rrote handlers
app.get('/', (req,res) => {
  //res.send('<h1>Hello, Express!</h1>');
  res.render('home.hbs',{
    welcomeMessage: 'Welcome User',
    pageTitle : 'Home Page'
  })
});

app.get('/about', (req,res) => {
//  res.send('About Page');
res.render('about.hbs', {
  pageTitle : 'About Page'
});
});

app.get('/bad', (req,res) => {
  res.send({
    errocode:'404',
    errorMessage: 'Bad request'
  });
})

app.listen(3000, () => {
  console.log('Serve running on port 3000');
});
