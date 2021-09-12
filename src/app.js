const path=require("path")
const express = require("express")
const hbs=require("hbs")

const app = express()
const port = process.env.PORT || 3000
//express configs
const publicDirPath = path.join(__dirname,"../public")
const viewsPath=path.join(__dirname,"../templates/views")
const partialsPath=path.join(__dirname,"../templates/partials")
//geocode and forecast
const geocode = require("./utils/geocode")
const forecast = require("./utils/forecast")
//handlebar engine and views location
app.set("view engine","hbs")
app.set("views",viewsPath)
hbs.registerPartials(partialsPath)
//static dir to serve
app.use(express.static(publicDirPath))


app.get("",(req,res)=>{
  res.render("index",{
    title: "Weather",
    name: "mindae"
  })
})

app.get("/about",(req,res)=>{
  res.render("about",{
    title:"about",
    name:"mindae"
  })
})

app.get("/help",(req,res)=>{
  res.render("help",{
    title: "help",
    name: "mindae",
    msg: "help is coming hold on!"
  })
})
app.get("/help/*",(req,res)=>{
  res.render("error",{
    title: "404-Help",
    name: "mindae",
    errorMsg: "page NOT found"
  })
})


app.get("/weather",(req,res)=>{
  
  if(!req.query.address){
    return res.send({
      error: "you must provide an address please"
    })  
  }
  geocode(req.query.address, (error, {latitude,longitude,location}={})=>{     
    if(error){
      return res.send({error}) //shorthand version
    }
    forecast(latitude,longitude,(error,forecastData)=>{
      if(error){
        return res.send({error: error}) //long version 
      }
      res.send({ 
        location, //shorthand version of property as its same name
        forecast: forecastData,
        address: req.query.address
      })
    })  
  })
})

app.get("*",(req,res)=>{
  res.render("error",{
    title: "404",
    name: "mindae",
    errorMsg: "Page NOT found"
  })
})
app.listen(port,()=>{
  console.log("server is up on port "+port)
})