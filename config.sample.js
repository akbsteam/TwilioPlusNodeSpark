var config = {};

config.twilio = {};
config.spark = {};

config.twilio.sid = 'xxxxx';
config.twilio.key = 'yyyy';
config.twilio.smsWebhook = 'https://nodeserver/vote/sms';
config.twilio.voiceWebhook = 'https://nodeserver/vote/voice';
config.disableTwilioSigCheck = true;

config.spark.username = "a@b.c";
config.spark.password = "zzzz";

module.exports = config;