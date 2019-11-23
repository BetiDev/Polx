express = require("express")
bodyParser = require("body-parser")

users = []
fs = require("fs")
app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
port = process.env.PORT || 4000
app.use(express.static("FrontEnd"))
app.get("/",(res,req)=>{
  fs.createReadStream("FrontEnd/./index.html").pipe(req)
})
app.get("/admin",(res,req)=>{
  fs.createReadStream("FrontEnd/./admin.html").pipe(req)
})
app.post("/users",(res,req)=>{
  users.push(res.body)
  req.end()
})
app.get("/users",(res,req)=>{
  req.end(users.join(","))
})

app.listen(port,function(err){
  if(err){
    throw err
  }
  console.log(`Listening on port ${port}`)
})
