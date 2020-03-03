const _ = require('lodash');
const fetch = require('node-fetch');

const jsonMessage = (msg) =>{
    return {message: msg};
};

async function retrievePriceData(symbol,resp){
    const url = `http://www.randyconnolly.com/funwebdev/3rd/api/stocks/history.php?symbol=${symbol}`;
    const response = await fetch(url);
    const prices = await response.json();
    resp.json(prices);
}

const findSymbol = (stocks,req,resp)=>{
    const symbolToFind = req.params.symbol.toUpperCase();
    const stock = stocks.filter(obj => symbolToFind === obj.symbol);

    if(stock.length > 0){
        resp.json(stock);
    }
    else{
        resp.json(jsonMessage(`Symbol ${symbolToFind} not found`));
    }   
};

const updateSymbol = (stocks,req,resp)=>{
    const symbolToUpd = req.params.symbol.toUpperCase();
    let indx = _.findIndex(stocks,['symbol',symbolToUpd]);
    if(indx < 0){
        resp.json(jsonMessage(`${symbolToUpd} not found`));
    }
    else{
        stocks[indx] = req.body;
        resp.json(jsonMessage(`${symbolToUpd} updated`));
    } 
};

const insertSymbol =(stocks,req,resp)=>{
    const stockToInsert = req.body;
    const symbolToInsert = req.body.symbol.toUpperCase();
    stocks.push(stockToInsert);
    resp.json(jsonMessage(`${symbolToInsert} added`));
    
};

const findName = (stocks,req,resp)=>{
    // change user supplied substring to lower case
    const substring = req.params.substring.toLowerCase();
    // search the array of objects for a match
    const matches = stocks.filter( (obj) => obj.name.toLowerCase().includes(substring) );
    // return the matching stocks
    if(matches.length > 0){
        resp.json(matches)
    }
    else{
        resp.json(jsonMessage(`No symbol matches found for ${substring}`));
    }
};

const findPrices = (stocks,req,resp)=>{
    const symbolToFind = req.params.symbol.toUpperCase();
    const stock = stocks.filter(obj=>symbolToFind === obj.symbol);

        if(stock.length > 0){
            retrievePriceData(symbolToFind,resp);
        }
        else{
            resp.json(jsonMessage(`Symbol ${symbolToFind} not found`));
        }
};

const deleteSymbol = (stocks,req,resp)=>{
    const symbolToDelete = req.body.symbol.toUpperCase();
    const stock = stocks.filter(obj => symbolToDelete === obj.symbol);

    if(stock.length>0){

        _.remove(stocks,function(e){
            return e.symbol === symbolToDelete;
        
        });
        resp.json(jsonMessage(`${symbolToDelete} was deleted`));
    }
    else{
        resp.json(jsonMessage(`${symbolToDelete} was not found`));
    }

    
};

module.exports={
    findSymbol,
    updateSymbol,
    findName,
    insertSymbol,
    deleteSymbol,
    findPrices
};