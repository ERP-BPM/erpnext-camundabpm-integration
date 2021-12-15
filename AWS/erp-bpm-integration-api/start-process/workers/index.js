module.exports = {

  ...require('./assignBedActivity'),

  ...require('./changePatientInitialActivity'),

  ...require('./labStudiesActivity'),
  ...require('./notifyDischargeActivity'),
  ...require('./notifyDoctorActivity'),
  ...require('./notifyInsuranceActivity'),

  ...require('./notifyPatientsComesActivity'),
  ...require('./notifyPrivateInsurance'),


  ...require('./resultsRegisterActivity')
}
