//with destructuring and shorthand syntax
const request=require("request")
const forecast = (latitude,longitude,callback)=>{
  const url="http://api.weatherstack.com/current?access_key=4f6ef341684bc6a9203806163bd0e88e&query="+latitude+","+longitude+"&units=f"
  request({url,json: true},(error, {body})=>{
      if(error){
         callback("unable to connect",undefined)
      }else if(body.error){
        callback("unable to find the location",undefined)
      }
      else{
        data=`temprature: ${body.current.temperature} and rain prob: ${body.current.precip}`
        callback(undefined,data)
      }
  })
}

module.exports = forecast