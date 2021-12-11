const express = require('express');
const sequelize = require('./config/connection');

const exphbs = require('express-handlebars');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const sess = {
    secret: 'super secret secret',
    cookies: {expires: 60000},
    resave: true,
    rolling: true,
    saveUninitialized: false,
    store: new SequelizeStore({
        db: sequelize
    })
}

app.use(session(sess));

app.use(express.json());
app.use(express.urlencoded({extended: true}));


sequelize.sync({force:false}).then(() => {
    app.listen(PORT, () => {
        console.log(`Now Listening on ${PORT}`)
    })
})