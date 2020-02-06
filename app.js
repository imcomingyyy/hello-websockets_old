// npm install --save express http url ws
const express =require ('express');
const http= require('http');
const Websocket =require('ws');
const app =express();
app.use(express.static('public'));

const server = http.createServer(app);
const wss = new Websocket.Server({server:server});
wss.on('connection',function(ws,request){
    console.log('Connected!');
    ws.on('message', function(message){
        wss.clients.forEach(function(clients){
            if (clients.readyState === Websocket.OPEN){
                clients.send(message);
            }
        });
    });
});

server.listen(8080,function(){
    console.log('App listening on port 8080');

});