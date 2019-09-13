const express = require('express');
const router = express.Router();
const ELASTICSEARCH_Service = require('../elasticSearch/elasticSearch')

router.get("/ping" , ELASTICSEARCH_Service.ping );
router.post('/index/init',ELASTICSEARCH_Service.initIndex);
router.post('/search',ELASTICSEARCH_Service.search);


module.exports = router;