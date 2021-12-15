const { sendEmail } = require('./../utils')

module.exports.notifyPatientComesActivity = async (job) => {
  console.log('Hola desde notify patient comes activity')

  const { variables } = job;
  console.log(JSON.stringify(variables))

  await sendEmail({
    to: variables.data.new.email, //'a258177@alumnos.uaslp.mx',
    subject: 'Ingreso al Hospital',
    //text: 'Bienvenido a la clinica XXXX- XXX',
    html: `<h1>Bienvenido estimado ${variables.data.new.nombre} ${variables.data.new.apellido_paterno} ${variables.data.new.apellido_materno} </h1>
    <br><p>Su ID de paciente es el siguiente: <strong>${variables.workflow_id}<strong></p>
    <br><p>Éste será el medio por que nos comunicaremos con Ud<p>
    <br><p>Saludos cordiales. Hospital XXXXX</p>
    `,
  })


  console.log(`* Starting patientComesActivity...: ${variables}`);

  await job.complete({ success: true });
}

