const request = require("request")

const geocode=(address, callback)=>{
  // console.log("inside geocode")
  encodedAddress=encodeURIComponent(address)
  // console.log(address)
  // console.log(encodedAddress)
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodedAddress}.json?access_token=pk.eyJ1IjoibWluZGFlIiwiYSI6ImNrdGJ1bnB5bDA3MWIycG1hdzE0bG50MWcifQ.ufJzDvJ_IhG0ann3DO6qbA&limit=1`
  request({url:url,json:true},(error,response)=>{
    if(error){
      // console.log("inside error")
      callback("error to conn",undefined)
    }else if(response.body.features.length === 0){
      // console.log("inside elseif")
      callback("feature is not availabe",undefined)
    }else{
      const data={
        latitude: response.body.features[0].center[1],
        longitude: response.body.features[0].center[0],
        location:  response.body.features[0].place_name
      }  
      callback(undefined,data)
    }
    // console.log("exiting geocode")
  })
}

module.exports = geocode