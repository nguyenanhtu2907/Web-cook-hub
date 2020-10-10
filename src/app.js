const path = require('path');
const express = require('express');
const morgan = require('morgan');
const handlebars = require('express-handlebars');

const route = require('./resources/app/routes');
const db = require('./resources/config/db');

db.connect();
const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.use(morgan('combined'));
//Template engine

app.engine('hbs', handlebars({
    extname: '.hbs',
}));

app.use(express.urlencoded({
    extended: true,
}));
app.use(express.json());

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources/views'))


route(app);


app.listen(port, () => {
    console.log(`http://localhost:${port}`);
})