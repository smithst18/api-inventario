const server = require('./app')
//instancia de servidor para socket io
const app = require('http').Server(server);
//crear instancia del socket
const io = require('socket.io')(app, {
  cors: {
      origin: [process.env.FRONT_CORS_URL,"http://localhost:4200"],
      methods: ["GET", "POST","DELETE"],
      transports: ['websocket', 'polling'],
      credentials: true
  },
  allowEIO3: true
});

//cuando alguien se conecte 
io.on('connection',async function(socket){
  const socketId = socket.id;
  console.log(`user socker id :  -----------  ${socketId}`);

  socket.on('get-nots', async () =>{
    let notifications  =  await require('./services/socketServices/getNotifications').getNotifys();
    socket.emit('Notifications',notifications);
  });
  
});

module.exports = { app, io};