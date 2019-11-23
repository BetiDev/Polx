messageContainer = document.getElementById("message-container")
isEmoji = false
kick = document.getElementById("kickContainer")
emojiModal = document.getElementById("emoji-modal")
app = document.getElementById("app")
input = document.getElementById("input")
input.addEventListener("keypress",(e)=>{
  if(e.key == ":"){
    if(isEmoji == true){
      isEmoji = false
      return
    }
    isEmoji = true
    emojiModal.style.bottom = input.style.top
    emojiModal.hidden = false
  }
})
function getUsers(){
  users = document.getElementById("users")
  users.hidden = false
  app.style.opacity = .5
  app.style.cursor = "not-allowed"
}
name = document.getElementById("name")
nameForm = document.getElementById("name-form")
test = document.getElementById("test")
typingSpeed = 0
typingMessage = document.getElementById("typing")
tst = document.getElementById("input")
form = document.getElementById("form")
document.getElementById("username").focus()
document.getElementById("username").select()
nameForm.addEventListener("submit",(e)=>{
  e.preventDefault()
  info = {
    "username":document.getElementById("username").value
  }
  username = document.getElementById("username").value
  nameForm.hidden = true
  app.hidden = false
  socket.emit("user",info)
  document.getElementById("input").focus()
  document.getElementById("input").select()
  xhr = new XMLHttpRequest()
  xhr.open("POST","/users",true)
  xhr.setRequestHeader("content-type","application/json")
  xhr.send(JSON.stringify(info))
})
form.addEventListener("submit",(e)=>{
  e.preventDefault()
  window.scrollBy(0,90)
  info = {
    "status":status = document.getElementById("status").value,
    "username":username,
    "message":document.getElementById("input").value
  }
  xhr = new XMLHttpRequest()
  xhr.open("POST","/message",true)
  xhr.setRequestHeader("Content-Type","application/json")
  xhr.send(JSON.stringify(info))
  fix = document.getElementById("input").value
  fix = fix.replace(" ","")
  if(fix == ""){
    return
  }
  if(fix == " "){
    return
  }
  socket.emit("new-message",info)
  document.getElementById("input").value = ""
})
window.onbeforeunload = function(){
  info = {
    "username":username
  }
  socket.emit("leave",info)
}
tst.onkeypress = function(){
  info = {
    "username":username
  }
  socket.emit("typing",info)
}
function appendMessage(user,what,color,status,id,isYours){
  if(isYours == false){
  final = document.createElement("div")
  message = document.createElement("span")
  pic = document.createElement("img")
  pic.src = "default.png"
  message.id = id
  message.className
  message.style.color = color
  message.className = "messages"
  message.isYours = false
  message.title = `${user}`
  message.innerText = `${user}: ${what}`
  final.appendChild(message)

  final.className = "messages"
  messageContainer.appendChild(final)
  return
  }
  pic = document.createElement("img")
  pic.src = "default.png"
  message = document.createElement("span")
  message.style.id = id
  message.isYours = true
  message.style.color = color
  message.title = `${user}`
  message.innerText = `${user}: ${what}`
  report = document.createElement("div")
  report.addEventListener("onmouseover",(e)=>{
    console.log("hi :wave:")
  })
  report.className = "report"
  final = document.createElement("div")
  final.append(message)
  final.append(report)
  final.className = "messages"
  messageContainer.append(final)
  lastMessage = message
  report.style.left = message.style.left
  message.addEventListener("click",(e)=>{
    // input = document.createElement("input")
    // input.style.left = message.style.left
    // input.style.top = message.style.top
    // messageContainer.append(input)
    socket.emit("edit",{"id":id,"message":"s"})
  })
}
socket = io("https://Polx-socket.pdaniely.repl.co")
socket.on("kick",(data)=>{
  if(data.username == username){
    app.hidden = true
    kick.hidden = false
  }
})
socket.on("clear",(data)=>{
  messageContainer.innerText = ""
})
socket.on("update",()=>{
  location.reload()
})
appendMessage("System","You joined the chat")
socket.on("new-user",(info)=>{
  if(info.isAdmin == true){
    appendMessage("System",`${info.username} joined the chat!`,info.color)
    return
  }
  appendMessage("System",`${info.username} joined the chat!`)
})
socket.on("leave",(info)=>{
  if(info.isAdmin == true){
    appendMessage("System",`${info.username} left!`,info.color)
    return
  }
  appendMessage("System",`${info.username} left!`)
})
socket.on("new-message",(info)=>{
  if(info.isAdmin == true){
    appendMessage(info.username,info.message,info.color,info.status,info.id)
  }
  if(info.status == "online"){
    if(info.username == username){
      appendMessage(info.username,info.message,"green",info.status,info.id,true)
      return
    }
    appendMessage(info.username,info.message,"green",info.status,info.id)
  }else if(info.status == "dnd"){
      if(info.username == username){
      appendMessage(info.username,info.message,"red",info.status,info.id,true)
      return
    }
    appendMessage(info.username,info.message,"red",info.status,info.id)
  }else{
      if(info.username == username){
      appendMessage(info.username,info.message,"black",info.status,info.id,true)
      return
    }
    appendMessage(info.username,info.message,"black",info.status,info.id)
  }
})
peopleTyping = 0
socket.on("typing",(info)=>{
  typingSpeed = typingSpeed + 1
  peopleTyping = peopleTyping + 1
  if(peopleTyping == 2){
    typingMessage.innerText = `Two people are typing`
    return
  }
  typingMessage.innerText = `${info.username} is typing!`
})
setInterval(function(){
  if(typingSpeed == 0){
  typingMessage.innerText = ""
  peopleTyping = peopleTyping - 1
  return
}
if(typingSpeed >= 10){
  typingSpeed = 3
}
  test.innerText = typingSpeed
  typingSpeed = typingSpeed - 1
},1000)
socket.on("edit",(info)=>{
  messages = document.getElementsByClassName("messages")
  interval = setInterval(function(){
    for(x in messages){
    if(messages[x].id == info.id){
      console.log("message")
      messages[x].innerText = info.message
      clearInterval(interval)
      return
    }
  }
  },01)
})