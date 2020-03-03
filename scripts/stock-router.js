const fetch = require('node-fetch');
const _ = require('lodash');
const stockController = require('./stockController.js');

const jsonMessage = (msg) =>{
    return {message: msg};
};



const handlePriceData = (stocks,app)=>{
    app.get('/stock/daily/:symbol',(req,resp)=>{
        
        stockController.findPrices(stocks,req,resp);

    });
}


const handleSingleSymbol = (stocks,app) =>{
   
    app.route('/stock/:symbol')
        
    .get((req,resp)=>{stockController.findSymbol(stocks,req,resp);
            
     })

     .put((req,resp)=>{
        stockController.updateSymbol(stocks,req,resp);
     });

     /*app.put('/stock/:symbol', (req,resp) =>{
          

        
        //stockController.updateSymbol(stocks,req,resp);
     });*/

     /*.post((req,resp)=>{
         stockController.insertSymbol(stocks,req,resp);
     });*/
 
     /*.delete((req,resp)=>{
         stockController.deleteSymbol(stocks,req,resp);
     });*/
     

};

/*app.put('/stock/:symbol',(req,resp)=>{
    stockController.updateSymbol(stocks,req,resp);
});*/

const handleNameSearch = (stocks,app) =>{

    app.get('/stock/name/:substring', (req,resp) => {
        
        stockController.findName(stocks,req,resp);

    });
};

module.exports ={
    handleSingleSymbol,
    handleNameSearch,
    handlePriceData
};