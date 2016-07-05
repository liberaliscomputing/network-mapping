var env = require('dotenv').load();
var	csvjson = require('csvjson');
var	Twitter = require('twitter');

// load csv
var pathHandles = 'data/handles.csv';

// convert csv to json
var rawHandles = csvjson.toObject(pathHandles).output;

var users = [];

// load credentials
var client = new Twitter({
	consumer_key: env.CONSUMER_KEY,
	consumer_secret: env.CONSUMER_SECRET,
	access_token_key: env.ACCESS_TOKEN_KEY,
	access_token_secret: env.ACCESS_TOKEN_SECRET
});

// given a handle, retrieve stringtied id, profile image url, and array of ids of friends
rawHandles.forEach(function (rawHandle, handleIndex) {
	if (handleIndex < 15) {
		var userInfo = {};
		client.get('users/show', { screen_name: rawHandle.handle }, function (error, result, response) {
			if (error) console.log(error); 
			userInfo.screenName = result.screen_name;
			userInfo.idStr = result.id_str;
			userInfo.profileImageUrlHttps = result.profile_image_url_https;
			client.get('friends/ids', { screen_name: rawHandle.handle, stringify_ids: true }, function (error, results, response) {
				if (error) console.log(error);
				userInfo.friends = results.ids;
				users.push(userInfo);
				if (handleIndex === 14) {
					users.forEach(function (user, userIndex) {
						if (userIndex === handleIndex) return false;
						user.mutualFollowing = [];
						users.slice(userIndex + 1, users.length).forEach(function (sliced) {
							if (sliced.idStr in user.friends) user.mutualFollowing.push(sliced.screenName);
							console.log(users); // for test						
						}); 
					});
				}
			});
		});	
	}
});
