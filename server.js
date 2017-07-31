const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
//app.use(express.static(__dirname + "/public")); //rykket ned under the maintenace da der ellers kan kaldes via fx /about

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    
    fs.appendFile('server.log', log + '\n', (err) => {
        console.log('uable to append to log file');
    })
    console.log(log);
    
    next();
});


// Unblog hvis siderne opdateres og blog bagefter
//app.use((req, res, next) => {
//    res.render('maintenance.hbs');
//});

app.use(express.static(__dirname + "/public"));


hbs.registerHelper('fullYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();   
});

app.get('/', (req, res) => {
    res.render('home.hbs',{
        pageTitle: 'Home',
        wellcomeMessage: 'Welcome dude!'
    });
});


app.get('/about', (req, res) => {
//   res.send('About Page'); 
    res.render('about.hbs',{
        pageTitle: 'About Page'
    });
});


app.get('/bad', (req, res) => {
   res.send({
       errorMessage: 'It fucked up'
   }); 
});

app.listen(3000, () =>{
    console.log('Server is up and running on port 3000');
});


//deleted stuff
//app.get('/', (req, res) => {
////    res.send('<h1>Hello Express</h1>');
//    res.send({
//        name: 'Johan',
//        like: [
//            'Icecream',
//            'bananas',
//            'codeing'
//        ]
//    })
//});