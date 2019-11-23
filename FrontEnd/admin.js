socket = io("https://polx-socket.pdaniely.repl.co")
function reload(){
  socket.emit("update",{})
}
function kick(){
  username = prompt("Who would you like to kick?")
  socket.emit("kick",{"username":username})
}