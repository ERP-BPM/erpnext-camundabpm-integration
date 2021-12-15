const { sendEmail } = require('./../utils')

module.exports.changePatientInitialActivity = async (job) => {
  const { variables } = job;
  console.log(JSON.stringify(variables))

  await sendEmail({
    to: variables.data.new.email, //'a258177@alumnos.uaslp.mx',
    subject: 'Ingreso al Hospital',
    //text: 'Bienvenido a la clinica XXXX- XXX',
    html: `<h1>Saludos estimado ${variables.data.new.nombre} ${variables.data.new.apellido_paterno} ${variables.data.new.apellido_materno} </h1>
    <br><p>Hemos confirmado su ingreso al Hospital<p>
    <br><p>Espere próximas indicaciones a llevar a cabo<p>
    <br><p>Saludos cordiales. Hospital XXXXX</p>
    `,
  })


  console.info(`* Starting patientComesActivity...: ${variables}`);
  job.complete({ success: true });
}
