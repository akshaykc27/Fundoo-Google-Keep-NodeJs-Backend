const elasticsearch = require('elasticsearch');
var elasticClient = new elasticsearch.Client({
    host: 'localhost:9200',
    log: "trace"
})

// module.exports = {
exports.ping = (req, res) => {
    elasticClient.ping({
        requestTimeout: 300000,
    }, function (error) {
        if (error) {
            res.status(500)
            return res.json({ status: false, msg: "Elastic Search cluster is down " })
        }
        else {
            res.status(200)
            return res.json({ status: true, msg: "Success!  Elastic search cluster is up " })
        }
    });
},

    exports.initIndex = (req, res) => {
        console.log("in initIndex");

        elasticClient.indices.create({
            index: req.param('indexName')
        }).then(function (resp) {
            console.log(resp);
            res.status(200)
            return res.json(resp);
        }, function (err) {
            res.status(500)
            return res.json(err)
        })
    }

exports.initMapping = (indexName, docType, payload) => {
    elasticClient.indices.putMapping({
        index: indexName,
        type: docType,
        body: payload
    }).then(resp => {
        //res.status(200);
        console.log("success",resp);
        
        //return res.json(resp)
    }, err => {
       // res.status(500);
        console.log("error",err)
        //return res.json(err)
    });
}
// }