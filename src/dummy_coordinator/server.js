const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// This dummy coordinator just prints the recieved JSON body then send status=200
app.post('/Observation', function(req, res){
    let log_data = req.body.effectiveDateTime + " " +
        "[" + req.body.subject.reference + "] " +
        req.body.code.text + " = " + req.body.valueQuantity.value;

    console.log(log_data);

    res.send({statusCode:200});
});

app.listen(port, () => console.log(`Dummy telemetry coordinator listening at http://localhost:${port}`))
