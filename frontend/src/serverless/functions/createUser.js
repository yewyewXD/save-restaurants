const AWS = require("aws-sdk");

module.exports.createUser = async (event, context) => {
  const { username, email, password } = JSON.parse(event.body);
  const newUserParams = {
    TableName: process.env.DYNAMO_USER_TABLE,
    Item: {
      pk: username,
      password,
    },
  };

  try {
    const dynamoDb = new AWS.DynamoDB.DocumentClient();
    const res = await dynamoDb.put(newUserParams).promise();

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
        "Access-Control-Allow-Headers": "Authorization",
      },
    };
  } catch (err) {
    console.log(err);
    return new Error("There was an error creating a user");
  }
};
