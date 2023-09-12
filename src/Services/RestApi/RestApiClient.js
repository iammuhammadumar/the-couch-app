import { API, Auth } from 'aws-amplify';
import { get } from 'lodash';

import constants from '../../helpers/constants';

class RestApiClient {
    constructor(config) {
        this._apiName = config.apiName;
        this._endpoints = constants.REST_API_ENDPOINTS;
    }

    async _getToken() {
        return (await Auth.currentSession())
            .getIdToken()
            .getJwtToken();
    }

    _getPath(path, pathParam) {
        if (!pathParam) {
            return path;
        }

        const slug = path.match(/{(.*)}/g);
        if (slug) {
            return path.replace(/{(.*)}/g, pathParam);
        }

        return `${path}/${pathParam}`;
    }

    async _callApi({
        resource,
        method,
        pathParam,
        queryParams,
        body
    }) {
        try {
            const endpoint = get(this._endpoints, resource);
            const options = {
                headers: {
                    Authorization: `Bearer ${await this._getToken()}`
                }
            };
            if (queryParams) {
                options.queryStringParameters = queryParams;
            }

            if (body) {
                options.body = body;
                options.headers['Content-Type'] = 'application/json'
            }

            const methodCall = method === 'get' ?
                API.get.bind(API) :
                API.post.bind(API);
            const path = this._getPath(endpoint, pathParam);

            console.log(`send request to ??????????????????? ${path}
             ${JSON.stringify(options)}`,)
            const response = await methodCall(
                this._apiName,
                path,
                options
            );

            return response;
        } catch (error) {
            console.log(error)
            console.log({
                evt: 'thecouch.app.restApiClient._callApi',
                message: error.message || `${error}`,
                stack: error.stack
            });
            throw error;
        }
    }
};

RestApiClient._addMethods = function (methods) {
    for (let i in methods) {
        if (methods.hasOwnProperty(i)) {
            this.prototype[i] = methods[i];
        }
    }
}

export default RestApiClient;