// MODULES //

const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const app = express();

// LET //

let openDoor = false;
let loIntento = null;


//  APP SET  //

app.set("port", 1000);
app.set("views", path.join(__dirname, "/VIEWS/"));
app.set("view engine", "ejs");



//  APP USE  //

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : false }));
app.use(express.static(path.join(__dirname, "/PUBLIC/")));

//  APP GET  //


app.get("/", (req, res)=>{
    if (openDoor) {
        res.render("index", { passLogin : true });
    }else{
        loIntento = false;
        res.render("index", { passLogin : false });
    }

});

app.get("/login", (req, res)=>{
    if (!openDoor){
        if (loIntento) {
            res.render("login" , { logueo : false });        
        }
        else{
            res.render("login", { logueo : true });
        }
    }
    else if (openDoor) {
        res.redirect("/home");
    }
});

app.get("/home", (req, res)=>{
    if (openDoor) {
        res.render("home");
    }
    else{
        res.redirect("/login");
    }
});


//  APP POST  //


app.post("/login", (req, res)=>{
    if (req.body.username == "Riccino" && req.body.password == "333") {
        res.redirect("/home"); 
        openDoor = true;       
    }
    else{
        res.redirect("/login");
        openDoor = false;
        loIntento = true;
    }
});



//  APP LISTEN //


app.listen(app.get("port"), ()=>{
    console.log("Server in port " + app.get("port"));
});