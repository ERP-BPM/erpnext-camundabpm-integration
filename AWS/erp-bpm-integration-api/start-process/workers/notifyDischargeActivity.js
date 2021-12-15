const { sendEmail } = require('./../utils')

module.exports.notifyDischargeActivity = async (job) => {
  const { variables } = job;
  console.log(JSON.stringify(variables))

  await sendEmail({
    to: variables.data.new.email, //'a258177@alumnos.uaslp.mx',
    subject: 'Notificación de Alta de Hospital',
    //text: 'Bienvenido a la clinica XXXX- XXX',
    html: `<h1>Estimado ${variables.data.new.nombre} ${variables.data.new.apellido_paterno} ${variables.data.new.apellido_materno} </h1>
      <br><p>El paciente con el ID <strong>${variables.workflow_id}: <strong></p>
      <br><p>Ha sido dado de alta el dia de hoy a las XX:XX horas.<p>
      <br><p>Saludos cordiales. Hospital XXXXX</p>
      `,
  })


  console.info(`* Starting patientComesActivity...: ${variables}`);
  job.complete({ success: true });

}
