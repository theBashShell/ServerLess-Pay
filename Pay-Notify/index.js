var qs = require("querystring");
var unirest = require("unirest");
var http = require("http");

module.exports = function (context, req) {
    let data = req.body.payload.amount_settled; 
    let dollar = data.slice(0, data.length - 2);
    let cent = data.slice(data.lenght - 2);
    let amount = dollar + "." + cent; 

    let api = "https://serverless-pay.herokuapp.com/api";
    
    context.res = {
        'amount': amount 
    }; 

    // make post request to site   

    var req = unirest("POST", "https://serverless-pay.herokuapp.com/api");
    
    req.headers({ 
      "Cache-Control": "no-cache",
      "Content-Type": "application/x-www-form-urlencoded"
    });
    
    req.form({
      "amount": amount
    });
    
    req.end(function (res) {
      if (res.error) throw new Error(res.error);
    
      context.log(res.body);
    });
    
    context.done();
};
