const express = require('express');
const hbs = require('express-handlebars');
const app = express();
const PORT = 1030;
//requiring fs
const fs = require('fs');

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use("/static",express.static("./users"));
app.engine('handlebars',hbs.engine());
app.set('view engine','handlebars');
app.set('views','./views');

//routes
const mainRoute = require('./routes/main');
const userRoute = require('./routes/user');

app.use("/",mainRoute);
app.use("/users",userRoute);

//for not found page
app.use("*",(req,res)=>{
    res.render("notfound");
})

app.listen(PORT,(err)=>{
    if(err) throw err;
    else console.log(`PORT ${PORT}`);
});