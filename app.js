var express = require("express");
var app = express();
var request = require("request");
app.use(express.static("public"));

app.set("view engine","ejs");

// routes here

// homepage 
app.get("/",function(req,res){

    res.render("index");
});


// display the results 
app.get("/result",function(req,res){
    var url = "http://www.omdbapi.com/?apikey=92096425&s=" + req.query.title;
    request(url,function(error,response,body){

            if(!error && response.statusCode == 200){
                var movdata=JSON.parse(body);

                // if movie if found display
                if (movdata["Response"] !="False" ) 
                 {
                    res.render("result", { data: movdata, title: req.query.title });
                }

            else  // display not found
            {
                    res.render("result-not-found",{title: req.query.title});   
            }
    }
            else
            res.send(error);
    });

});

// server starting route 
app.listen(8080,()=>{

    console.log("finder started successfully");
});