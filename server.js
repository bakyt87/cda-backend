const mongoDBConnectionString = "mongodb+srv://user:pass@cluster0-zja2g.mongodb.net/admin_list?retryWrites=true&w=majority"

const HTTP_PORT = process.env.PORT || 8080;

const express = require("express");
const bodyParser = require('body-parser');

const cors = require("cors");
const dataService = require("./modules/data-service.js");

const data = dataService(mongoDBConnectionString);
const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get("/api/admins", (req,res)=>{
    data.getAdmin().then((data)=>{
        res.json(data);
    })
    .catch((err)=>{
        res.json({message: `an error occurred: ${err}`});
    })
});
// Connect to the DB and start the server

data.connect().then(()=>{
    app.listen(HTTP_PORT, ()=>{console.log("API listening on: " + HTTP_PORT)});
})
.catch((err)=>{
    console.log("unable to start the server: " + err);
    process.exit();
});