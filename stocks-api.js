const path = require('path');
const parser = require('body-parser');
const express = require('express');
const stocks = require('./scripts/data-provider.js');
const stockRouter = require('./scripts/stock-router');
const server = require('socket.io');




/*// for now, we will get our data by reading the provided json file
const jsonPath = path.join(__dirname, 'public',
'stocks-complete.json');
const jsonData = fs.readFileSync(jsonPath, 'utf8');
// convert string data into JSON object
const stocks = JSON.parse(jsonData);*/
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
          const name = user.results[0].name.first;
          const rawGender = user.results[0].gender;
          var gender = '';
          if(rawGender=="male"){gender = 'men';}
          else {gender = 'women';}
          const id = Math.floor(Math.random() * 70) + 1;
          const obj = {Name:name,Id:id,Gender:gender};
          list.push(obj);
          io.emit('user joined',list);
          console.log(list);

        
        /*socket.username =msg;
        const obj = {message:"Has joined",user:msg};
        io.emit('user joined',obj);
        });

        socket.on('chat from client',msg=>{
          io.emit('chat from server',{user:socket.username,message:msg});*/
        });
      
    
    });


// return all the stocks when a root request arrives
//app.route('/')
  /*  app.get('/stock/:symbol', (req,resp) => {
    
        const symbolToFind = req.params.symbol.toUpperCase();
        const matches = stocks.filter(obj => symbolToFind === obj.symbol);
        resp.json(matches);
     });

     // return all the stocks whose name contains the supplied text
            app.get('/stock/name/:substring', (req,resp) => {
            // change user supplied substring to lower case
            const substring = req.params.substring.toLowerCase();
            // search the array of objects for a match
            const matches = stocks.filter( (obj) => obj.name.toLowerCase().includes(substring) );
            // return the matching stocks
            resp.json(matches);
    });*/
    // Use express to listen to port
    let port = 8080;
    app.listen(port, () => {
    console.log("Server running at port= " + port);
});