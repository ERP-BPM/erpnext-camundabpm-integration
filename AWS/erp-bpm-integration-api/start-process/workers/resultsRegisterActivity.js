
const { sendEmail } = require('./../utils')

module.exports.resultsRegisterActivity = async (job) => {
  const { variables } = job;
  console.log(JSON.stringify(variables))

  await sendEmail({
    to: variables.data.new.email, //'a258177@alumnos.uaslp.mx',
    subject: 'Resultados de estudios',
    //text: 'Bienvenido a la clinica XXXX- XXX',
    html: `<h1>Estimado ${variables.data.new.nombre} ${variables.data.new.apellido_paterno} ${variables.data.new.apellido_materno} </h1>
    <br><p>Sus resultados de los estudios realizados con el folio no. <strong>${variables.workflow_id}<strong></p>
    <br><p>Son los siguientes -> Resultado: Positivo<p>
    <br><p>Saludos cordiales. Hospital XXXXX</p>
    `,
  })


  console.info(`* Starting patientComesActivity...: ${variables}`);
  job.complete({ success: true });
}
