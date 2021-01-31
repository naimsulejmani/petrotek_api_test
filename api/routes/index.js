var express = require("express");
var router = express.Router();
var vrsController = require("../controllers/vrs.controller");

router.get('/test', function (req, res) {
    res.status(200).send({
        data: "hello world test"
    });
});

router.get('/test1', function (req, res) {
    var test = 10;
    const foo = JSON.parse(test);
    throw new Error();
});

router.post('/Vrs/DeviceRequest', vrsController.deviceRequest);

router.post('/Vrs/VrsTagControl', vrsController.tagControl);

router.post('/Vrs/AuthorizeRequest', vrsController.authorizeRequest);

router.post('/Vrs/SaleData', vrsController.saleData);

module.exports = router;