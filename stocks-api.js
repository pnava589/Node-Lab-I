const path = require('path');
const parser = require('body-parser');
const express = require('express');
const stocks = require('./scripts/data-provider.js');
const stockRouter = require('./scripts/stock-router');
const server = require('socket.io');


// create an express app
const app = express();
// tell node to use json and HTTP header features in body-parser
app.use(parser.json());
app.use(parser.urlencoded({extended: true}));
const provider = require('./scripts/data-provider.js');
provider.retrieveCompanies(app);

app.use('/static', express.static(path.join(__dirname,'public'))); // handle requests for static resources
app.use('/socket.io', express.static(path.join(__dirname,'/node_modules/socket.io-client/dist/')));

const io = new server(3000);
var list =[];
io.on('connection', socket => {
  
      console.log('new connection made with client');
      

        socket.broadcast.on('new user',user=>{
            socket.username = user.name; 
            const rawGender = user.apiResponse.results[0].gender;
            var gender = '';
            if(rawGender=="male"){gender = 'men';}
            else {gender = 'women';}
            const id = Math.floor(Math.random() * 70) + 1;
            const obj = {Name:socket.username ,Id:id,Gender:gender};
            list.push(obj);
            const newobj = {message:"has joined",users:list,user:obj,className:"message-user"}
            io.emit('user',newobj);


        });

        socket.on('client leaving',name=>{
          const updatedUsers = list.filter(element => element.Name != name);
          list = updatedUsers;
          const person={Name:socket.username};
          const obj = {message:'has left',users:list,user:person,className:"message-user"}
          io.emit("user",obj); 

        });

        socket.on('chat from client',msg=>{
          socket.broadcast.emit('chat from server',{user:socket.username,message:msg});
        
        });
      
    
    });


    let port = 8080;
    app.listen(port, () => {
    console.log("Server running at port= " + port);
});