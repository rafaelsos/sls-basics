import * as aws from 'aws-sdk';

const db = new aws.DynamoDB.DocumentClient({
  region: 'us-east-1'
});

export default db;
