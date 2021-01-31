var debug = 0;
class Vrs {


    static splitter(tagId) {
        try {
            let t1 = parseInt('0x' + tagId.substr(0, tagId.length / 2));
            let t2 = parseInt('0x' + tagId.substr(tagId.length / 2, tagId.length));
            return {
                tagId: t1,
                secondTagId: t2
            };
        } catch (error) {
            return null;
        }
    }

    static async deviceRequest(req, res) {
        let userName = req.query.userName;
        let password = req.query.password;
        let datetime = req.query.datetime;
        let deviceId = req.query.deviceId;
        let tagId = req.query.tagId;
        let stringResponse = "";
        var tags = Vrs.splitter(tagId);

        if (userName == "admin" && password == "admin") {
            stringResponse = `${deviceId}|1|1|1|0`;
        } else {
            stringResponse = `${deviceId}|0|0|0|1`;
        }
        res.status(200).send(stringResponse);
    }

    static async tagControl(req, res) {

        let userName = req.query.userName;
        let password = req.query.password;
        let datetime = req.query.datetime;
        let deviceId = req.query.deviceId;
        let tagId = req.query.tagId;
        let stringResponse = "";
        var tags = Vrs.splitter(tagId);
        if (debug) console.log(req.query);
        if (userName == "admin" && password == "admin") {
            stringResponse = `${deviceId}|1|1|1|0`;
        } else {
            stringResponse = `${deviceId}|0|0|0|1`;
        }
        if (debug) console.log("RESPONSE = ", stringResponse);
        res.status(200).send(stringResponse);
    }

    static async authorizeRequest(req, res) {

        let userName = req.query.userName;
        let password = req.query.password;
        let datetime = req.query.datetime;

        let deviceId = req.query.deviceId;
        let tagId = req.query.tagId;
        let stringResponse = "";
        var tags = Vrs.splitter(tagId);



        if (debug) {
            console.log('authorize', req.query);
            console.log(tags, userName, password, datetime, deviceId, tagId);
        }
        if (tags == null || tags == undefined || tags.tagId == tags.secondTagId) {
            stringResponse = `${deviceId}|${tagId}|0|0|0|1|0|0|0`;
            res.status(200).send(stringResponse);
        }
        let isAuthorized = false;

        if (userName && password && datetime && deviceId && tagId) {

            stringResponse = `${deviceId}|${tagId}|1|0|1000|01-900-BB|0|1|0.82|1`;
            return res.status(200).send(stringResponse);
        } else {
            stringResponse = "0|0|0|0|0|0|1|0|0|0";
            if (debug) console.log("RESPONSE AUTHORIZE= ", stringResponse);
            return res.status(200).send(stringResponse);

        }
    }

    static async saleData(req, res) {

        let userName = req.query.userName;
        let password = req.query.password;
        let datetime = req.query.datetime;
        // datetime=new Date().toISOString();
        // console.log(datetime);
        let deviceId = req.query.deviceId;
        let tagId = req.query.tagId;
      //  let secondTagId = req.query.secondTagId;
        let systemSaleId = req.query.systemSaleId;
        let pumpNumber = req.query.pumpNumber;
        let nozzleNumber = req.query.nozzleNumber;
        let liter = req.query.liter;
        let unitPrice = req.query.unitPrice;
        let amount = req.query.amount;
        let plate = req.query.plate;
        let transactionNo = req.query.transactionNo;
        let stringResponse = "";


        if (liter) {
            liter = liter.replace(',', '.');
        }
        if (unitPrice) {
            unitPrice = unitPrice.replace(',', '.');
        }

        if (amount) {
            amount = amount.replace(',', '.');
        }

        var tags = Vrs.splitter(tagId);

        if (tags == null || tags == undefined) {
            stringResponse = `${deviceId}|${tagId}|0|0|1|0|`;
            res.status(200).send(stringResponse);
        }
        if (debug) {
            console.log('sale=', req.query, tags);
        }
        let respObject = [];
        let isAuthorized = false;
        if (userName && password && datetime && deviceId && tagId &&
            systemSaleId && pumpNumber && nozzleNumber && liter && unitPrice && amount &&
            plate && transactionNo) {
                stringResponse = `${deviceId}|${tagId}|1|1|0|1|`;
                return res.status(200).send(stringResponse);

        } else {
            stringResponse = `${deviceId}|${tagId}|0|0|1|0|`;
            if (debug) console.log("RESPONSE SALE = ", stringResponse);
            return res.status(200).send(stringResponse);
        }
    }

}

module.exports = Vrs;