const express=require("express");
const bodyparser=require("body-parser");
const request=require("request");
const e = require("express");

const https=require("https")

const app=express();


app.use(express.static("public"))
app.use(bodyparser.urlencoded({extended:true}))

app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
})

app.post("/",function(req,res){
    var firstName=req.body.fname;
    var lastName=req.body.lname;
    var email=req.body.email

  var data ={
    members:[
        {
            email_address:email,
            status:"subscribed",
            merge_fields:{
                FNAME:firstName,
                LNAME:lastName
            }
        }
    ]
  };

  const jsondata=JSON.stringify(data);
  const url="https://us10.api.mailchimp.com/3.0/lists/55deeb9ae6";
  const options={
    method:"POST",
    auth:"sunny:fcfcdc857cf9b359c8ccb3bb8c5aa523-us10"

  }
const request=https.request(url,options,function(response){

    if(response.statusCode==200){
         res.sendFile(__dirname+"/success.html")
    }
    else{
        res.sendFile(__dirname+"/failure.html")
    }

  response.on("data",function(data){
    console.log(JSON.parse(data));
  })
})

request.write(jsondata);
request.end();
});



app.post("/failure",function(req,res){
    res.redirect("/")
})
app.listen(process.env.PORT || "5000",function(){
    console.log("server has started");
})

