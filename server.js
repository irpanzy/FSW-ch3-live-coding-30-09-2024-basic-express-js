const fs = require("fs");
// const http = require("http");
const express = require("express");

const app = express();

// default url = health check
app.get('/', (req, res) => {
    res.status(200).json({
        "status": "Success",
        "message": "Application is running good..."
   })
})

// if (req.url === "/muria") 
app.get('/muria', (req, res) => {
    res.status(200).json({
        "message": "Ping Succesfully !"
    })
})

// middleware / handler untuk url yang tidak dapat diakses karena memang tidak ada di aplikasi
// membuat middleware = our own middleware
app.use((req, res, next) => {
    res.status(404).json({
        "status": "Failed",
        "message": "API not exist"
    })
})

app.listen("3000", () => {
    console.log("server running on port 3000");
})
