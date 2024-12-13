const AWS = require("aws-sdk");

exports.updateBook = async (event) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient();
  const { bookId } = event.pathParameters;
  const { title, author, genre, publishedYear } = JSON.parse(event.body);  // Cambiado para que publishedYear sea string

  // Construcción de la expresión de actualización
  const updateExpression = "set done = :done, title = :title, author = :author, genre = :genre";
  const expressionAttributeValues = {
    ":done": done,
    ":title": title,
    ":author": author,
    ":genre": genre,
  };

  // Si `publishedYear` está presente en el cuerpo de la solicitud, incluirlo en la expresión de actualización
  if (publishedYear) {
    updateExpression += ", publishedYear = :publishedYear";
    expressionAttributeValues[":publishedYear"] = publishedYear;
  }

  await dynamodb.update({
    TableName: "BooksTable",
    Key: { bookId },
    UpdateExpression: updateExpression,
    ExpressionAttributeValues: expressionAttributeValues,
    ReturnValues: "ALL_NEW",
  }).promise();

  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Libro actualizado" }),
  };
};
