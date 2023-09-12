/**
 * @format
 */

import AWS from "aws-sdk";
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { Amplify } from 'aws-amplify'
import awsConfig from './config/index.js';
const { credentialsConfig, amplifyConfig } = awsConfig;

AWS.config.region = amplifyConfig.aws_project_region;
AWS.config.credentials = new AWS.CognitoIdentityCredentials(credentialsConfig);

Amplify.configure(amplifyConfig)

AppRegistry.registerComponent(appName, () => App);
