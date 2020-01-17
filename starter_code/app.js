const express = require('express');
const hbs = require('hbs');
const expHbr = require('express-handlebars');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

app.engine(
  'handlebars',
  expHbr({
    //by default handlebar looking for main.handlebars file, to make a diff name we can use next =>
    defaultLayout: 'layout',
    layoutsDir: path.join(__dirname, 'views') //or this will be comparable with windows as well
    // layoutsDir: 'views/mainLayouts', //or
    //  when we are using layouts by default handlebar will be looking for layout in the view folder. To make it different name we use this method layoutsDir and provide location of that file
    //the same apply for when we are using partials, by default hbs looking for that name. To change it we use partialsDir: '<-- provide folder path -->'.
  })
);

app.get('/', (req, res, next) => {
  res.render('index', { title: 'Home' });
});

//Iteration-3
// Inside the /beers route, call to the getBeers() method of our PunkAPI package.
// The package will return you an array of 25 beers, and you should pass that array to the beers.hbs view.
app.get('/beers', (req, res, next) => {
  punkAPI
    .getBeers()
    .then(beers => {
      res.render('beers', { title: 'Beers', beers });
    })
    .catch(error => console.log(error));
});
// app.get('/random-beer', (req, res, next) => {
//   res.render('index', { title: 'Random Beer' });
// });

app.listen(3000, () => console.log(`Server running`));
