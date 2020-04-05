const vitalSignModule = require('./vitalSign.js');
const vitalSign = vitalSignModule.vitalSign;

// TODO: Temporary implementation: simple patient ID for 20 patients
for (let patientID = 0; patientID < 20; patientID++) { 

    let vsBodyTemp = new vitalSign("body-temperature", patientID);
    vsBodyTemp.sendFHIRrequestLoop();
    
    let vsRespRate = new vitalSign("respiratory-rate", patientID);
    vsRespRate.sendFHIRrequestLoop();
    
    let vsHeartRate = new vitalSign("heart-rate", patientID);
    vsHeartRate.sendFHIRrequestLoop();
    
    let vsSPO2 = new vitalSign("SPO2", patientID);
    vsSPO2.sendFHIRrequestLoop();

}
