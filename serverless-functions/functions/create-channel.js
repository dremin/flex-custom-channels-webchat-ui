const TokenValidator = require('twilio-flex-token-validator').validator;

exports.handler = async function(context, event, callback) {
  const response = new Twilio.Response();
  response.appendHeader('Access-Control-Allow-Origin', '*');
  response.appendHeader('Access-Control-Allow-Methods', 'OPTIONS POST');
  response.appendHeader('Content-Type', 'application/json');
  response.appendHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  const twilioClient = context.getTwilioClient();
  
  const { FlexFlowSid, Identity, ChatFriendlyName, CustomerFriendlyName, PreEngagementData } = event;
  const token = event.request.headers.authorization;
  
  // need to use TokenValidator this way because the token is formatted differently in the Authorization header
  try {
    const decodedToken = Buffer.from(token.replace('Basic ',''), 'base64').toString('utf8').replace('token:','');
    const tokenResult = await TokenValidator(decodedToken, context.ACCOUNT_SID, context.AUTH_TOKEN);
  } catch (error) {
    // validation failed
    callback(error);
    return;
  }
  
  try {
    const channel = await twilioClient.flexApi.v1.channel
     .create({
        flexFlowSid: FlexFlowSid,
        identity: Identity,
        target: CustomerFriendlyName,
        chatUserFriendlyName: CustomerFriendlyName,
        chatFriendlyName: ChatFriendlyName,
        preEngagementData: PreEngagementData
      });
    response.setBody(channel);
    callback(null, response);
  } catch (error) {
    // unable to create channel
    callback(error, response);
  }
};
