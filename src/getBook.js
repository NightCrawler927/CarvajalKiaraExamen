const AWS = require("aws-sdk");

exports.getBook = async (event) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient();

  // Obtener todos los libros de la tabla BooksTable
  const result = await dynamodb.scan({
    TableName: "BooksTable",
  }).promise();

  const books = result.Items;

  return {
    statusCode: 200,
    body: JSON.stringify({ books }),  // Se devuelve la lista de libros
  };
};
