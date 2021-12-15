const { sendEmail } = require('./../utils')

module.exports.notifyInsuranceActivity = async (job) => {
  const { variables } = job;
  console.log(JSON.stringify(variables))

  await sendEmail({
    to: variables.data.new.email, //'a258177@alumnos.uaslp.mx',
    subject: 'Recepción de documentos necesarios',
    //text: 'Bienvenido a la clinica XXXX- XXX',
    html: `<h1>Estimado ${variables.data.new.nombre} ${variables.data.new.apellido_paterno} ${variables.data.new.apellido_materno} </h1>
    <br><p>Se solicita que nos haga llegar los documentos del paciente relacioandos con su Seguridad Social</p>
    <br><p>Agradecemos de antemano.<p>
    <br><p>Saludos cordiales. Hospital XXXXX</p>
    `,
  })


  console.info(`* Starting patientComesActivity...: ${variables}`);
  job.complete({ success: true });
}
