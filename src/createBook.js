const { v4 } = require("uuid");
const AWS = require("aws-sdk");

exports.createBook = async (event) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient();
  const { title, author, genre, publishedYear } = JSON.parse(event.body);  // Ahora puedes recibir publishedYear como string
  const bookId = v4();

  const newBook = {
    bookId,
    title,
    author,
    genre,
    publishedYear,  // Este campo es ahora un string
    done: true,
  };

  await dynamodb
    .put({
      TableName: "BooksTable",
      Item: newBook,
    })
    .promise();

  return {
    statusCode: 200,
    body: JSON.stringify(newBook),
  };
};
