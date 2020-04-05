const vitalSignModule = require('./vitalSign.js');
const vitalSign = vitalSignModule.vitalSign;

// TODO: Temporary implementation: patient ID for 20 patients
for (let patientID = 0; patientID < 20; patientID++) { 

    // TODO: Read Patient Queue

    // TODO: Read Patient Details

    // Create Vital Signs observation collected from device
    let vsBodyTemp = new vitalSign("body-temperature", patientID);
    vsBodyTemp.sendFHIRrequestLoop();
    
    let vsRespRate = new vitalSign("respiratory-rate", patientID);
    vsRespRate.sendFHIRrequestLoop();
    
    let vsHeartRate = new vitalSign("heart-rate", patientID);
    vsHeartRate.sendFHIRrequestLoop();
    
    let vsSPO2 = new vitalSign("SPO2", patientID);
    vsSPO2.sendFHIRrequestLoop();

    // TODO: Blood Pressure
    // TODO: ECG

}
