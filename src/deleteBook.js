const AWS = require("aws-sdk");

exports.deleteBook = async (event) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient();
  const { bookId } = event.pathParameters;

  // Eliminación del libro de la tabla BooksTable
  await dynamodb.delete({
    TableName: "BooksTable",
    Key: { bookId },
  }).promise();

  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Libro eliminado" }),
  };
};
