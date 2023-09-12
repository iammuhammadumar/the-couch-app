import awsConfig from '../src/aws-exports.js';
import defaultConfig from './default.js';

export default {
    amplifyConfig: {
        ...awsConfig,
        API: defaultConfig.API
    },
    credentialsConfig: {
        IdentityPoolId: awsConfig.aws_cognito_identity_pool_id,
        RoleArn: defaultConfig.COGNITO.RoleArn
    },
    websocketConfig: defaultConfig.WEBSOCKET,
    revenuecatConfig: defaultConfig.REVENUECAT,
    contentfulConfig: defaultConfig.CONTENTFUL
};