const express = require('express')
const app = express()
const cors = require('cors')
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000


app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.json())

let users = []

io.on('connection', (socket) => {
  socket.on('add-user',(data)=>{
    users.push(data)
    io.emit('USER_CONNECTED',users)
  })
  socket.on('update-data',(data)=>{
    console.log(data);
    let inputs = data
    socket.emit('dataGame',inputs)
  })
});

http.listen(port, () => {
  console.log(`listening on *:${port}`);
});