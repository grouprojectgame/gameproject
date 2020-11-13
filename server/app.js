const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const routes = require('./routes')
const cors = require('cors')
const errHandler = require('./middlewares/errorHandler')

var http = require('http').createServer(app);
var io = require('socket.io')(http);

//CORS
app.use(cors())

//BODY PARSER
app.use(express.urlencoded({extended: true}))
app.use(express.json())


//ROUTER
app.use(routes)

app.use(errHandler)

const data = 'eh masuk nih'

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.emit("init", data)

    socket.on('updateLeaderboards', (payload) => {
        console.log(payload, "<<dari server nihh");
        socket.broadcast.emit('sendLeaderboardsToOther', payload);
    })

    socket.on('loseMessage', (payload) => {
        console.log(payload, "<<dari server nihh");
        socket.broadcast.emit('sendLoseToOther', payload);
    })

    socket.on('newMessage', (payload) => {
        console.log(payload, "<<dari server nihh");
        socket.broadcast.emit('sendMessageToOther', payload);
    })

    
});

  
http.listen(port, () => {
    console.log(`listening on *:${port}`); 
});


