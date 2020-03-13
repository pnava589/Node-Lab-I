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
const list =[];
io.on('connection', socket => {
  
      console.log('new connection made with client');
      

        socket.broadcast.on('new user',user=>{
          //console.log(user.results[0].name.first);
            socket.username = user.results[0].name.first;
            const rawGender = user.results[0].gender;
            var gender = '';
            if(rawGender=="male"){gender = 'men';}
            else {gender = 'women';}
            const id = Math.floor(Math.random() * 70) + 1;
            const obj = {Name:socket.username ,Id:id,Gender:gender};
            list.push(obj);
            const newobj = {users:list,user:obj};
            io.emit('user joined',newobj);
          console.log(newobj.users);

        });

        socket.on('client leaving',id=>{
          const user = list.find(element => element.Id == id);
          const index = list.indexOf(user);
          io.emit("user left",user);
          list.splice(index,1);
          

        });

        socket.on('chat from client',msg=>{
          socket.broadcast.emit('chat from server',{user:socket.username,message:msg});
        
        });
      
    
    });


    let port = 8080;
    app.listen(port, () => {
    console.log("Server running at port= " + port);
});