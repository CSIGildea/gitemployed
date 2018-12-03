const express = require('express');
//const fetch = require('node-fetch');
//var GitHub = require('github-api');
//const octokit = require('@octokit/rest')();
var github = require('octonode');
var HashMap = require('hashmap');

//LRVals - Linear Regression Vals
var javascriptLRVals = require('../scraper/JavaScript.json');
var pythonLRVals = require('../scraper/Python.json');
var javaLRVals = require('../scraper/Java.json');
var rubyLRVals = require('../scraper/Ruby.json');
var phpLRVals = require('../scraper/PHP.json');
var cplusplusLRVals = require('../scraper/C++.json');
var cssLRVals = require('../scraper/CSS.json');
var goLRVals = require('../scraper/Go.json');
var cLRVals = require('../scraper/C.json');
var typescriptLRVals = require('../scraper/TypeScript.json');
var shellLRVals = require('../scraper/Shell.json');
var swiftLRVals = require('../scraper/Swift.json');
var scalaLRVals = require('../scraper/Scala.json');
var objectiveCLRVals = require('../scraper/Objective-C.json');
var token = require('./token.json');

var primary_languages= ["JavaScript", "Python", "Java", "Ruby","PHP", "C++", "CSS","Go", "C", "TypeScript","Shell","Swift","Scala","Objective-C"];
var lrm = [javascriptLRVals,pythonLRVals,javaLRVals,rubyLRVals,phpLRVals,cplusplusLRVals,
								cssLRVals,goLRVals,cLRVals,typescriptLRVals,shellLRVals,swiftLRVals,scalaLRVals,objectiveCLRVals];
//lrm - linear regression models
const app = express();

function star_prediction(returnData, count,language,size,time_since_creation) {
	if(isNaN(returnData.most_used_languages[language])){
 		returnData.most_used_languages.push({ 
        				[language]:size
    				});
  	}else{
		returnData.most_used_languages[language]=returnData.most_used_languages[language]+size;
		console.log("increase");
 	}
	var index = primary_languages.indexOf(language);
    if(index>-1){
    	w1_value = parseFloat(lrm[index].w1_value);
    	w2_value = parseFloat(lrm[index].w2_value);
    	w3_value = parseFloat(lrm[index].w3_value);
    	w4_value = parseFloat(lrm[index].w4_value);    	
    	b_value= parseFloat(lrm[index].b_value);

    	followers_mean = parseFloat(lrm[index].followers_mean);
    	followers_std = parseFloat(lrm[index].followers_std);
    	following_mean = parseFloat(lrm[index].following_mean);
    	following_std = parseFloat(lrm[index].following_std);

    	bytes_of_code_mean = parseFloat(lrm[index].bytes_of_code_mean);
    	bytes_of_code_std = parseFloat(lrm[index].bytes_of_code_std);
    	seconds_since_creation_mean = parseFloat(lrm[index].seconds_since_creation_mean);
    	seconds_since_creation_std = parseFloat(lrm[index].seconds_since_creation_std);

    	stars_mean = parseFloat(lrm[index].stars_mean);
    	stars_std = parseFloat(lrm[index].stars_std);

    	console.log(followers_mean);

    	follow_val = ((returnData.bio.followers-followers_mean)/followers_std)*w1_value;
		following_val = ((returnData.bio.following-following_mean)/following_std)*w2_value;
		bytes_val =((size-bytes_of_code_mean)/bytes_of_code_std)*w3_value;
		seconds_val =((seconds_since_creation_mean-seconds_since_creation_mean)/seconds_since_creation_std)*w4_value;
		normalized_prediction_calculation=follow_val+following_val+bytes_val+seconds_val+b_value;

		console.log(normalized_prediction_calculation);
		var prediction = (normalized_prediction_calculation*stars_std)+stars_mean;
		returnData.statistics.expected_stars = returnData.statistics.expected_stars + prediction;
		returnData.statistics.predicted_percentage_star_difference = (((returnData.statistics.received_stars/returnData.statistics.expected_stars)*100)-100).toFixed(2);;
		if(returnData.statistics.predicted_percentage_star_difference>0){
			returnData.bio.color = "green"
		}
		else{returnData.bio.color = "red"};
		return(prediction);
    }
    else{
    	return 0;
    }
}

app.get('/api/:userId/', (req, res) => {
	var data;
	returnData = { 
						"bio": {
							"login":"", 
					   		"name":"",
					   		"avatar_url":"",
					   		"location":"",
					   		"followers":0,
					   		"following":0,
					   	},
					   	"statistics": {
							"received_stars":0, 
					   		"expected_stars":0,
					   		"predicted_percentage_star_difference":0,
					   	},
					   	most_used_languages: [],
					   	repos: [],
					   	follower: [],
					   	following: [],
					  };
	var client = github.client(token['token']);
	console.log(req.params.userId);
	var p1 = new Promise(function(resolve,reject){
	client.get('/users/'+req.params.userId, {}, function (err, status, body, headers) {
		data = body;
		resolve(data);
		});
	});
	var p2 = new Promise(function(resolve,reject){
	client.get('/users/'+req.params.userId+'/repos',null,100, true, function (err, status, body, headers) {
		repos = body;
		resolve(repos);
		});
	});
	var p3 = new Promise(function(resolve,reject){
	client.get('https://api.github.com/users/'+req.params.userId+'/followers',null,100, true, function (err, status, body, headers) {
		followers = body;
		resolve(followers);
		});
	})
	var p4 = new Promise(function(resolve,reject){
	client.get('https://api.github.com/users/'+req.params.userId+'/following',null,100, true, function (err, status, body, headers) {
		following = body;
		resolve(following);
		})
	})
	p1.then(function(arr){ 
		returnData.bio.login = arr['login'];
		returnData.bio.name = arr['name'];
		returnData.bio.avatar_url = arr['avatar_url'];
		returnData.bio.location = arr['location'];
		returnData.bio.followers= arr['followers'];
		returnData.bio.following = arr['following'];
		p2.then(function(repo_data){
			count = 0;
			var languagemap = new HashMap();
			repo_data.forEach(function(repo) { 
				returnData.statistics.received_stars+=repo['stargazers_count'];
				var star_predict = star_prediction(returnData,count,repo['language'],repo['size'],
									(Math.round((new Date(repo['created_at'])).getTime() / 1000)-Math.round((new Date().getTime() / 1000))));
 				console.log(returnData.most_used_languages);
				returnData.repos.push({ 
        			"name" : repo['name'],
        			"description": repo['description'],
        			"main_language" : repo['language'],
        			"stars": repo['stargazers_count'],
        			"size": repo['size'],
        			"created_at": Math.round((new Date(repo['created_at'])).getTime() / 1000),
        			"expected_stars": star_predict
    			});
    			count++;
			});
			p3.then(function(follower_data){
				follower_data.forEach(function(follower) { 
					returnData.follower.push({"login": follower['login']});
				});
				p4.then(function(following_data){
				following_data.forEach(function(following) { 
					returnData.following.push({ 
        				"login": following['login']
    				});
				});
				var userInfo = []
				userInfo.push(returnData);
 				res.send(userInfo);
			});
			});
    })
  });
});
	// Want to return
	// Bio - Name - Username - Description - PROFILE - Done
	// Statistics - Stars, Expected Stars, Percentage Difference, Followers Amount, Following Amount - CALCULATE and PROFILE
	// Most Used Programming Language language:bytes - Search each repo/languages
	// Repos - Name, Description, Java, Expected Stars, Actual Stars - List all repos
	// Followers - Link to their profile - FOLLOWERS - Done
	// Following - Link to their profile - FOLLOWING - Done

	//Number requests per search - 1 Profile + 1 Followers + 1 Following + 1 Repos List + 1*(n repos)
	//Min 4 Max 4+1(n) where n is the number of repos

const port = 5000;

app.listen(port, () => `Server running on port ${port}`);

//Couldn't get these promises to work as intended
 		// 		returnData.repos.forEach(function(repo){
 		// 		var p5 = new Promise(function(resolve,reject){
			// 		client.get('https://api.github.com/repos/'+req.params.userId+'/'+repo['name']+"/languages",null,100, true, function (err, status, body, headers) {
			// 		languages= body;
			// 		resolve(languages);
			// 		})
			// 	})
			// 	languagecount = 0;
			// 	p5.then(function(languages){
			// 	for (var key in languages) {
   //  				if (languages.hasOwnProperty(key)) {
   //  					if(languagemap.get(key)==(undefined)){
   //  						returnData.most_used_languages[key]=languages[key];
   //  					}
   //  					else{
   //  						returnData.most_used_languages[key]=returnData.most_used_languages[key]+languages[key];
   //  					}
   //      				console.log(returnData.most_used_languages);
   //      				if(arr['public_repos']==languagecount){
   //      					 setTimeout(function(){	res.send(returnData);}, 2000);
   //      				};
   //      				languagecount++;
   //  					}
			// 		}
 		// 		});
			// });