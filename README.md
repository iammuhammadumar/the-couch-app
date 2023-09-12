# the-couch-FE

## Run Locally

1. Prepare configs needed for AWS Amplify
- Before starting, contact the person in charge (PIC) for these files:
    - `default.dev.js`
    - `default.prod.js`
- These files will have credentials formatted like the content in `default.example.js` for `dev` and `prod` envs respectively

    **Note:** If it is your first time using Amplify on your device, you should either:
    - create a new IAM user with Amplify access by running `amplify configure` **or**
    - update your AWS configurations with IAM credentials for an existing user with Amplify access by running `aws configure` and entering AWS access and secret keys

1. Run `yarn init-amplify:dev`
   ```
    yarn init-amplify:dev
    --------------------------------------------------------
    ****** EXPECTED RESPONSE ******
    ⚠️ Local changes detected.
    ⚠️ Pulling changes from the cloud will override your local changes.
    ? Are you sure you would like to continue? (y/N) y
    ✔ Successfully pulled backend environment dev from the cloud.
    --------------------------------------------------------
    ```
2. Run `yarn prepare-config:dev`
- Running this will populate the `default.js` file in `config` folder

3. Install packages
    - `yarn install`
    - `cd ios && pod install`

4. To run app in ios: `yarn ios` or `yarn ios --Device "Your DeviceName"`

5. To run app in android: `yarn android`

    **Note:** Must have debugger open for app to load (http://localhost:8081/debugger-ui/)

<br />

## Deploy

1. Run `yarn init-amplify:prod`

2. Run `yarn prepare-config:prod`
- Running this will populate the `default.js` file in `config` folder

3. Install packages
- `yarn install`
- `cd ios && pod install`

4. Build archive and release on App store connect

<br />

## Calling Backend REST API

### [API Endpoints Documentation](https://annie-cannons.atlassian.net/wiki/spaces/CA/pages/8421377/The+Couch+App+API+Endpoints+Documentation)

All functions to call the REST API are located in `src/Helpers/RestApi/methods` folder. Please take a look at the function implementations to see which params to pass.

In order to call the REST API in a file:

```
const { raClient } = useAppContext();

const user = await raClient.getUser();
```

## Login Flow

Here is the login flow diagram:

**Note:** Implementation on `Create Account` and `Login` for the identity providers (Facebook, Google, Apple) on the frontend side should be the same (it just signs user into the app using the identity provider). So we don't necessarily need separate screens for the social sign ins.

![https://lucid.app/publicSegments/view/454de315-95d3-46ee-bb0a-dfee6f4ebfcd/image.jpeg](https://lucid.app/publicSegments/view/454de315-95d3-46ee-bb0a-dfee6f4ebfcd/image.jpeg)

<br />

## Push Notifications

We use [Firebase](https://firebase.google.com/) for push notifications.

To test on iOS:
* Must have an actual device on iOS
* Navigate to `Certificates, Identifiers & Profiles` of `App Store Connect` and click on Devices: https://developer.apple.com/account/resources/devices/list
* Add your testing device UUID/UDID
* Navigate to Profiles, and click on the only profile in the list. Click edit and add your device to the profile.
* On the `xcworkspace` file of XCode, navigate to `Signing & Capabilities` and click `Automatically manage signing`
    - Make sure that there is an iOS Provisioning Profile now
* Ensure that Background Modes > Background Fetch and Remote notifications are toggled on.
* Ensure that Push Notifications are toggled on
* Ensure that Sign in with Apple is toggled on
* Send a message to yourself via The Couch chat or create a new chat with yourself. A message should have been sent to your phone as push notification.
