# Twilio Flex Web Chat UI Custom Channels Sample

The [out-of-box web chat UI sample](https://github.com/twilio/flex-webchat-ui-sample) does not allow testing custom chat channels; it only allows testing the `web` channel type. This sample solution deploys a serverless function to create a custom chat channel that the UI consumes without further modification necessary.

## Instructions

1. First, to deploy the serverless function:
```
cd serverless-functions
npm install
twilio serverless:deploy
```

This will return the function URL. Keep a note of this to use for step 3.

2. For the webchat UI, install all dependencies by running:
```
cd ..
npm install
```
2. Copy webchat-appConfig.sample.js in public/assets folder and configure accordingly to use your Twilio account and the function URL from step 1.
```
cp public/assets/webchat-appConfig.sample.js public/assets/webchat-appConfig.js
```
3. Start Flex UI by running:
```
npm start
```