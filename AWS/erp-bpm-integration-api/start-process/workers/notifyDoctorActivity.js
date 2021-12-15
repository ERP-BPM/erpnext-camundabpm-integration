const { sendEmail } = require('./../utils')

module.exports.notifyDoctorActivity = async (job) => {
  const { variables } = job;
  console.log(JSON.stringify(variables))

  await sendEmail({
    to: variables.data.new.email, //'a258177@alumnos.uaslp.mx',
    subject: 'Notificación',
    //text: 'Bienvenido a la clinica XXXX- XXX',
    html: `<h1>Estimado ${variables.data.new.nombre} ${variables.data.new.apellido_paterno} ${variables.data.new.apellido_materno} </h1>
    <br><p>Se le notifica que su médico encargado será el Dr. Mario Molina, encargado del área y especialista.</p>
    <br><p>Su número de expediente es ${variables.workflow_id}<p>
    <br><p>Saludos cordiales. Hospital XXXXX</p>
    `,
  })


  console.info(`* Starting patientComesActivity...: ${variables}`);
  job.complete({ success: true });
}
