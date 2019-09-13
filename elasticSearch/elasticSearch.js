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

exports.addDocument = (data) => {
    let array = [];
    console.log("data in addDoc file", data);
    data.forEach(element => {
        console.log(element);
        array.push({
            index: {
                _index: element.userID,
                _type: "notes"
            }
        })
        let data = {
            "id": element._id,
            "title": element.title,
            "description": element.description,
            //"labels": element.labels
        }
        array.push(data);
        console.log("elements in array ===========>", array);
    });
    elasticClient.bulk({ body: array }, (err, res) => {
        if (err) {
            console.log(err);

        }
        else {
            console.log("sucess", res);

        }
    })
}

exports.search = (req, res) => {
    let body = {
        query: {
            query_string: {
                query: `*${req.body.search}*`,
                analyze_wildcard: true

            }
        }
    }
    elasticClient.search({ index: req.body.userId, body, type: 'notes' }, (err, res) => {
        if (err) {
            console.log("error in search func", err);
        }
        else {
            console.log("sucess", res.hits.hits);
            //console.log("sucess", res.hits.hits[1]._source.data)
        }
    })
}
