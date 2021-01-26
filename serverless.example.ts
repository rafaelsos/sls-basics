import type { AWS } from '@serverless/typescript';

import { userCreate } from './src/functions';

const serverlessConfiguration: AWS = {
  service: 'sls-basics',
  frameworkVersion: '2',
  custom: {
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: true
    }
  },
  plugins: ['serverless-webpack'],
  provider: {
    name: 'aws',
    runtime: 'nodejs12.x',    
    region: 'us-east-1',
    stage: "${opt:stage, 'dev'}",
    iamRoleStatements: [
      {
        Effect: 'Allow',
        Action: [
          "dynamodb:Query",
          "dynamodb:Scan",
          "dynamodb:GetItem",
          "dynamodb:PutItem",
          "dynamodb:UpdateItem",
          "dynamodb:DeleteItem"
        ],        
      }
    ],              
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
    },
    lambdaHashingVersion: '20201221',
  },
  functions: {
    userCreate,    
  }, 
  resources: {
    Resources: {
      serviceTable: {
        Type:'AWS::DynamoDB::Table',
        Properties: {
          TableName: 'users',
          AttributeDefinitions: [
            { AttributeName: 'PK', AttributeType: 'S' },
            { AttributeName: 'SK', AttributeType: 'S' }
          ],
          KeySchema: [
            { AttributeName: 'PK', KeyType: 'HASH' },
            { AttributeName: 'SK', KeyType: 'RANGE' }
          ], 
          BillingMode: 'PAY_PER_REQUEST'         
        }   
      }          
    }     
  }  
}

module.exports = serverlessConfiguration;
