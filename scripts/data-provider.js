const path = require("path");
const fs = require("fs");
const fetch = require('node-fetch');
const stockRouter = require('./stock-router.js');

async function retrieveCompanies(app){
    const url = `https://www.randyconnolly.com/funwebdev/3rd/api/stocks/companies.php`;
    const response = await fetch(url);
    const stocks = await response.json();
    
    stockRouter.handleSingleSymbol(stocks,app);
    stockRouter.handleNameSearch(stocks,app);
    stockRouter.handlePriceData(stocks,app);

    app.get('/',(req,resp)=>{resp.json(stocks)});

}




/*// for now, we will get our data by reading the provided json file
const jsonPath = path.join(__dirname, '../public','stocks-complete.json');
const jsonData = fs.readFileSync(jsonPath, 'utf8');
// convert string data into JSON object
const stocks = JSON.parse(jsonData);*/


//module.exports = stocks;

module.exports = {retrieveCompanies};

// create an express app
/*const app = express();
// tell node to use json and HTTP header features in body-parser
app.use(parser.json());
app.use(parser.urlencoded({extended: true}));*/