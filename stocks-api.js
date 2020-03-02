// first reference required modules
//const fs = require('fs');
const path = require('path');
const parser = require('body-parser');
const express = require('express');
const stocks = require('./scripts/data-provider.js');
const stockRouter = require('./scripts/stock-router');


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
app.use('/static', express.static(path.join(__dirname,'public'))); // handle requests for static resources
stockRouter.handleSingleSymbol(stocks,app);
stockRouter.handleNameSearch(stocks,app);
stockRouter.handlePriceData(stocks,app);

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