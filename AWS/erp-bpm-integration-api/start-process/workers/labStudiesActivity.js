const { sendEmail } = require('./../utils')

module.exports.labStudiesActivity = async (job) => {
  const { variables } = job;
  console.log(JSON.stringify(variables))

  await sendEmail({
    to: variables.data.new.email, //'a258177@alumnos.uaslp.mx',
    subject: 'Estudios de laboratorio',
    //text: 'Bienvenido a la clinica XXXX- XXX',
    html: `<h1>Estimado ${variables.data.new.nombre} ${variables.data.new.apellido_paterno} ${variables.data.new.apellido_materno} </h1>
    <br><p>Es necesario que cuente con los siguientes estudios próximos a su consulta:</p>
    <br><ul>
    <li>General Sangre</li>
    <li>Glucosa<l/i>
    </ul>
    <br><h2>Estos estudios deberán ser presentados a más tardar el X de XXXX del año XXXX</p> 
    <br><p>Saludos cordiales. Hospital XXXX.</p>
    `,
  })


  console.info(`* Starting patientComesActivity...: ${variables}`);
  job.complete({ success: true });
}
