'use strict'

const zb = require('zeebe-node');
const { notifyPrivateInsurance, notifyInsuranceActivity, notifyPatientComesActivity, changePatientInitialActivity, assignBedActivity, notifyDoctorActivity, labStudiesActivity, resultsRegisterActivity, notifyDischargeActivity } = require('./workers');

const URI = 'camunda endpoint'

module.exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;

  /*
  Tell lambda to stop when I issue the callback.
  This is super important or the lambda funciton will always go until it hits the timeout limit you set.
  */
  /*const result = {
    'body': JSON.stringify(event.data),
    'content-type': event.headers["content-type"]
  }*/

  console.log(event.body)

  const { username, password } = event.headers

  //console.log(`User and ${username}  ${password}`)

  const method = event.httpMethod;
  //const { data, zeebe_credentials } = event.body
  const payload = JSON.parse(event.body)

  console.log(JSON.stringify(payload))

  //return context.status(200).succeed(payload)

  console.log(`Payload ${JSON.stringify(payload.id)}`)
  /**
   * Only POST requests
   */
  switch (method) {
    case 'POST':

      const zbc = new zb.ZBClient(URI, { "basicAuth": { username: username, password: password }, useTLS: false }, { loglevel: 'INFO' });
      //const orderid = uuid.v4()

      // DECLARATION OF ANY PROCESS:


      zbc.createWorker(
        {
          taskType: 'notify_patient_comes_activity',
          taskHandler: notifyPatientComesActivity,
        }
      );

      zbc.createWorker(
        {
          taskType: 'change_patient_initial_activity',
          taskHandler: changePatientInitialActivity,
        }
      );

      zbc.createWorker(
        {
          taskType: 'notify_insure_activity',
          taskHandler: notifyInsuranceActivity,
        }
      );

      zbc.createWorker(
        {
          taskType: 'notify_private_insurance',
          taskHandler: notifyPrivateInsurance,
        }
      );

      zbc.createWorker(
        {
          taskType: 'assign_bed_activity',
          taskHandler: assignBedActivity,
        }
      );

      zbc.createWorker(
        {
          taskType: 'notify_doctor_activity',
          taskHandler: notifyDoctorActivity,
        }
      );

      zbc.createWorker(
        {
          taskType: 'lab_studies_activity',
          taskHandler: labStudiesActivity,
        }
      );

      zbc.createWorker(
        {
          taskType: 'results_register_activity',
          taskHandler: resultsRegisterActivity,
        }
      );

      zbc.createWorker(
        {
          taskType: 'notify_discharge_activity',
          taskHandler: notifyDischargeActivity,
        }
      );

      const data = payload.event.data

      const wfi = await zbc.createProcessInstance(
        "hospital_process", {
        workflow_id: data.new.id_paciente,
        data: data
      }
      );

      console.log(wfi)

      await sleep(10000)

      //wfi.orderid = orderid;
      return {
        statusCode: 200,
        isBase64Encoded: false,
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ res: payload, wfi }),
      }

    default:
      return {
        statusCode: 405,
        isBase64Encoded: false,
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ message: "Only POST" }),
      }
  }
}

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
