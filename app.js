var express  = require("express")
var srv      = require("./lib/serverManager.js")
var app      = express()

var router = express.Router()

var JSON_SUCCESS = {"status": "success"}

router.route('/servers')
    .get(function (req, res) {
        srv.serverlist(function (err, data) {
            if (err) {
                res.send(err)
            }
            res.json(data)
        })
    })

router.route('/servers/start')
    .get(function (req, res) {
        srv.serverlist(function(err, data) {
            if (err) {
                res.send(err)
            }
            srv.start(data)
            res.json(JSON_SUCCESS)
        })
    })

router.route('/servers/stop')
    .get(function (req, res) {
        srv.serverlist(function(err, data) {
            if (err) {
                res.send(err)
            }
            srv.stop(data)
            res.json(JSON_SUCCESS)
        })
    })

router.route('/servers/:server/start')
    .get(function (req, res) {
        srv.start([req.params.server])
        res.json(JSON_SUCCESS)
    })

router.route('/servers/:server/stop')
    .get(function (req, res) {
        srv.stop([req.params.server])
        res.json(JSON_SUCCESS)
    })

app.use('/api/v1', router)

app.listen(8081)
