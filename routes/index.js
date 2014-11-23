var config = require('../config')
	, twilio = require('twilio')
	, spark = require('spark');

var state = false;

var core;

spark.on('login', function() {
	// If login is successful we get and accessToken,
	// we'll use that to call Spark API ListDevices
	var devicesPr = spark.listDevices();
	var state = false;

	devicesPr.then(
		// We get an array with devices back and we list them
		function(devices){
			core = devices[1];
		},
		function(err) {
			console.log('API call failed: ', err);
		}
	);
});

spark.login({username: config.spark.username, password: config.spark.password});

exports.voteSMS = function(request, response) {
	if (twilio.validateExpressRequest(request, config.twilio.key, {url: config.twilio.smsWebhook}) || config.disableTwilioSigCheck) {
		response.header('Content-Type', 'text/xml');
		var body = request.param('Body').trim();
		
		console.log(body);
		
		state = (body.toLowerCase() == "on");

		// the voter, use this to keep people from voting more than once
		var from = request.param('From');

		console.log('Accepting vote:' + from);
		
		if (core) {
			// callback to be executed by each core
			var callback = function(err, data) {
				if (err) {
					console.log('An error occurred while getting core attrs:', err);
				} else {
					console.log('Core attr retrieved successfully:', data);
				}
			};
			
			if (state) {
				console.log("on");
				core.callFunction('digitalwrite', 'D7:HIGH', callback);
			} else {
				console.log("off");
				core.callFunction('digitalwrite', 'D7:LOW', callback);
			}
		}
		
		response.send('<Response><Sms>Thanks for your vote</Sms></Response>');   

	} else {
		response.statusCode = 403;
		response.render('forbidden');
	}
};