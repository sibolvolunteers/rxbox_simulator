// - This client app uses native NodeJS HTTP Client
// - Implement FHIR Client only if necessary
// - Uses third-party library to validate the FHIR request body at least
// - TODO: Maybe needs OAuth2 middleware in the future?... but one problem at a time
// - TODO: Do error scenarios, i.e. disconnected sensor, etc.

const http = require('http');
const fs = require("fs");
const Fhir = require('fhir').Fhir;
const fhir = new Fhir();

const config = JSON.parse(fs.readFileSync("config.json"));

let obxRequest = {
    // Change this to IP addr if you want to execute over the network
    hostname: config.server.ipAddress,
    port: config.server.port,
    path: '/Observation',
    method: 'POST',
    headers: {}
}

const vitalSign = function (vitalSignType, patientID) {
    this.vitalSignType = vitalSignType;
    this.patientID = patientID;
};

vitalSign.prototype.generateDummyValue = function (min, max, significantDigits) {
    return (Math.random() * (max - min) + min).toFixed(significantDigits);
};

vitalSign.prototype.sendFHIRrequestLoop = function () {
    console.log(`Sending simulated ${this.vitalSignType} for Patient ${this.patientID} every ${config.vitalSigns[this.vitalSignType].fixedInterval} ms ...`);
    let self = this;
    setInterval(self.sendFHIRrequest.bind(self),
        config.vitalSigns[this.vitalSignType].fixedInterval);
};

vitalSign.prototype.sendFHIRrequest = function () {

    // Generate FHIR Request Body from template
    let template = fs.readFileSync("data/template/Observation-" + this.vitalSignType + ".json");
    let resource = JSON.parse(template);

    // Modify FHIR Request Body with dummy data
    resource.status = "final"; // TODO: Unknown valid status values
    resource.subject.reference = "Patient/" + this.patientID;
    resource.effectiveDateTime = new Date();
    resource.valueQuantity.value = this.generateDummyValue(
        config.vitalSigns[this.vitalSignType].min,
        config.vitalSigns[this.vitalSignType].max,
        config.vitalSigns[this.vitalSignType].significantDigits);

    // Check for FHIR Request Body validity
    let results = fhir.validate(resource, {});

    if (results.valid) {

        let data = JSON.stringify(resource);

        // Update Custom Header
        obxRequest.headers = {
            'Content-Type': 'application/json',
            'Content-Length': data.length
        }

        // Send HTTP Request
        let req = http.request(obxRequest, (res) => {
            // console.log(`send ${this.vitalSignType} status: ${res.statusCode}`)
        });

        req.on('error', (error) => {
            console.error(error)
        });
        req.write(data);
        req.end();

    }
    else {
        console.err("Invalid FHIR Request");
        console.log(results);
    }

};

exports.vitalSign = vitalSign;
