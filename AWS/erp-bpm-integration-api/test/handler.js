module.exports.handler = async (event, context) => {
  console.log(event.headers)
  console.log(event.body)

  return {
    statusCode: 200,
    isBase64Encoded: false,
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      hola: 'adios'
    }),
  }
}
