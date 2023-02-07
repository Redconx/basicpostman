const { response } = require("express");
var express = require("express");
const { default: axios } = require("axios");
var app = express();
app.use(express.json());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, OPTIONS, PUT, PATCH, POST, DELETE");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept,Authorization,*"
        );
    res.header("Access-Control-Expose-Headers","Authorization,X-Auth-Token")
    res.header("Access-Control-Allow-Credentials", "true");
    next();
    });

var port=process.env.PORT||2410
app.listen(port,()=>console.log(`Node app listening on port ${port}!`));

app.post('/getdata',async function(req,res) {
    let {method, fetchurl, txtfield,key,value}=req.body
    console.log(method,fetchurl,txtfield,key,value);

    if (method === "GET") {
      console.log(req.headers);
      try {
        let response = await axios.get(fetchurl,{headers:{Authorization:key==="Authorization"?value:""}});
        console.log(response.data);
        res.send({
          data:
            typeof response.data === "string"
              ? "" + response.data
              : response.data,
          status: response.status,
          statusText: response.statusText,
        });
      } catch (error) {
        console.log("before");
        console.log(error);
        res.send({data:error.message, statusText: error.response?.statusText, error: error,status:error.response?.status});
      }
    }
    if (method === "POST") {
      let body = JSON.parse(txtfield)
      try {
        // console.log("inpost");
        let response = await axios.post(fetchurl, body,{headers:{Authorization:key==="Authorization"?value:""}});
        console.log(response.data);
        res.send({data:response.data,status:response.status,statusText:response.statusText})
      } catch (error) {
        res.send({data:error.message, statusText: error.response?.statusText, error: error,status:error.response?.status})
      }
    }
if(method==="PUT"){
  let body=JSON.parse(txtfield)
  try{
    let response=await axios.put(fetchurl,body,{headers:{Authorization:key==="Authorization"?value:""}})
    console.log(response.data);
    res.send({data:response.data,status:response.status,statusText:response.statusText})
  }catch(error){
    res.send({data:error.message, statusText: error.response?.statusText, error: error,status:error.response?.status})
  }
}
if (method==="DELETE"){
  try{
    let response=await axios.delete(fetchurl,{headers:{Authorization:key==="Authorization"?value:""}})
    console.log(response.data);
    res.send({data:response.data,status:response.status,statusText:response.statusText})
  }catch(error){
    res.send({data:error.message, statusText: error.response?.statusText, error: error,status:error.response?.status})
  }
}
})