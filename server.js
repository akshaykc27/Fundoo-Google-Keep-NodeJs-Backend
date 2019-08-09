require('dotenv').config()
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongo = require('./config/configMongo')
const router = require('./routes/route');
const cors=require('cors');
app.use(cors());
var expressValidator = require('express-validator');
const swagger = require('swagger-ui-express');
swaggerDocument = require('./swagger/swagger.json');

app.use(expressValidator());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api',swagger.serve,swagger.setup(swaggerDocument));

app.use('/',router);

app.listen(process.env.PORT,() => {
    console.log(`server is listening to ${process.env.PORT}`);
    
})