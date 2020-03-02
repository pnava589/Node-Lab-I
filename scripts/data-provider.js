const path = require("path");
const fs = require("fs");

// for now, we will get our data by reading the provided json file
const jsonPath = path.join(__dirname, '../public','stocks-complete.json');
const jsonData = fs.readFileSync(jsonPath, 'utf8');
// convert string data into JSON object
const stocks = JSON.parse(jsonData);


module.exports = stocks;

// create an express app
/*const app = express();
// tell node to use json and HTTP header features in body-parser
app.use(parser.json());
app.use(parser.urlencoded({extended: true}));*/