'use strict'
const zb = require("zeebe-node");
const { notifyPrivateInsurance, notifyInsuranceActivity, notifyPatientComesActivity, changePatientInitialActivity, assignBedActivity, notifyDoctorActivity, labStudiesActivity, resultsRegisterActivity, notifyDischargeActivity } = require('../start-process/workers');
const uuid = require("uuid");

const URI = 'zeebe endpoint'


module.exports.handler = async (event, context) => {
  const { username, password } = event.headers

  //console.log(`User and ${username}  ${password}`)

  const method = event.httpMethod;

  console.log(event.body)

  //return context.succeed(event.body)
  const payload = JSON.parse(event.body)
  //console.log(`Payload ${JSON.stringify(payload.id)}`)

  /**
   * Only POST requests
   */
  switch (method) {
    case 'POST':


      const { message_name, workflow_id, message } = payload;

      console.log(payload)
      console.log(message_name)

      const zbc = new zb.ZBClient(URI, { "basicAuth": { username: username, password: password }, useTLS: false }, { loglevel: 'INFO' });

      console.log(workflow_id)

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

      //variables.status = 'PROCESSED'
      const res = await zbc.publishMessage({
        correlationKey: workflow_id,
        messageId: uuid.v4(),
        name: message_name,
        variables: message,
        timeToLive: zb.Duration.seconds.of(1), // seconds
      });

      console.log(res)

      await sleep(20000)

      return {
        statusCode: 200,
        isBase64Encoded: false,
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          success: true,
          result: res
        }),
      }
    default:
      return {
        statusCode: 405,
        isBase64Encoded: false,
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ succes: false }),
      }
  }
}

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
