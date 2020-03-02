const fetch = require('node-fetch');
const _ = require('lodash');

const jsonMessage = (msg) =>{
    return {message: msg};
};

async function retrievePriceData(symbol,resp){
    const url = `http://www.randyconnolly.com/funwebdev/3rd/api/stocks/history.php?symbol=${symbol}`;
    const response = await fetch(url);
    const prices = await response.json();
    resp.json(prices);
}

const handlePriceData = (stocks,app)=>{
    app.get('/stock/daily/:symbol',(req,resp)=>{
        const symbolToFind = req.params.symbol.toUpperCase();
        const stock = stocks.filter(obj=>symbolToFind === obj.symbol);

        if(stock.length > 0){
            retrievePriceData(symbolToFind,resp);
        }
        else{
            resp.json(jsonMessage(`Symbol ${symbolToFind} nt found`));
        }
    })
}


const handleSingleSymbol = (stocks,app) =>{
   
    app.get('/stock/:symbol', (req,resp) => {
    
    
        const symbolToFind = req.params.symbol.toUpperCase();
        const stock = stocks.filter(obj => symbolToFind === obj.symbol);

        if(stock.length > 0){
            resp.json(stock);
        }
        else{
            resp.json(jsonMessage(`Symbol ${symbolToFind} not found`));
        }   
            
     });

};

const handleNameSearch = (stocks,app) =>{

    app.get('/stock/name/:substring', (req,resp) => {
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
        
    });
};

module.exports ={
    handleSingleSymbol,
    handleNameSearch,
    handlePriceData
};