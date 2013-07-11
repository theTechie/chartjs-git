var colors = 
[
"#632F00",
"#B01E00",
"#C1004F",
"#7200AC",
"#4617B4",
"#006AC1",
"#00C13F",
"#FF981D",
"#FF2E12",
"#FF1D77",
"#AA40FF",
"#1FAEFF",
"#56C5FF",
"#00D8CC",
"#91D100",
"#E1B700",
"#FF76BC",
"#CC0000",
"#33FF33"
];

init();

/*
Initiate charts.
*/
function init() {

	//Get the context of the canvas element we want to select
	var url = "https://api.github.com/repos/nnnick/chart.js/contributors";
	var responseData = API.Get(url);
    
	var context = document.getElementById("contributorsChart").getContext("2d");
	var options = 
	{
		
    };

	new Chart(context).Bar(getContributors(), options);
	
	var context = document.getElementById("summaryChart").getContext("2d");
	
	new Chart(context).Doughnut(getSummaryData(), options);
	//$('#chart' + "summaryChart" + '_label').text("hoila");

	var context = document.getElementById("reposChart").getContext("2d");	
	new Chart(context).Pie(getIssueData(), options);

	var context = document.getElementById("activityChart").getContext("2d");
	new Chart(context).Line(getActivityData(), {showLabels : false});

}

/*
Hide Loading message onBodyLoad.
*/
function loading(){
	document.getElementById("loading").style.visibility = "hidden";
}

/*
Get Contributions and their followers.
*/
function getContributors(){
	var url = "https://api.github.com/repos/nnnick/chart.js/contributors";
	
	var resultData = 
	{
		labels : [],
		datasets : []
	};

	var jsonData = getJsonData(url, false);

	var contributors = [];
	var followers = [];

	/*for (var i = 0; i < jsonData.length; i++) {
		resultData.labels.push(jsonData[i].login);

		var url = "https://api.github.com/users/" + jsonData[i].login + "/followers";
		var followersJsonData = getJsonData(url, false);

		followers.push(followersJsonData.length);
		contributors.push(jsonData[i].contributions);
	};*/

	resultData.labels = 
	[
		"Arduino",
		"Node.js",
		"Novels",
		"Robotics",
		"Lawn Tennis"
	];

	resultData.datasets.push(
		{
			fillColor: colors[6],
			strokeColor: colors[6],
			data : [20, 2, 2, 10, 8]
		},
		{
			fillColor: colors[5],
			strokeColor: colors[5],
			data : [2, 4, 6, 3, 10]
		}
	);

	return resultData;
}

/*
Get Summary data : Stargazers, Subscribers, Contributors and Forks.
*/
function getSummaryData(){
	var resultData = [];

	var url = "https://api.github.com/repos/nnnick/Chart.js/stargazers";
	//var jsonData = getJsonData(url);
	var starGazers = 40 ; //jsonData.length;

	resultData.push({value: starGazers, color: colors[4], label: "Stargazers"});

	var url = "https://api.github.com/repos/nnnick/Chart.js/subscribers";
	//var jsonData = getJsonData(url);
	var subscribersCount = 80; //jsonData.length;

	resultData.push({value: subscribersCount, color: colors[7], label: "Subscribers"});

	var url = "https://api.github.com/repos/nnnick/chart.js/contributors";
	//var jsonData = getJsonData(url);
	var contributorsCount = 60; //jsonData.length;

	resultData.push({value: contributorsCount, color: colors[9], label: "Contributors"});

	var url ="https://api.github.com/repos/nnnick/chart.js/forks";
	//var jsonData = getJsonData(url);
	var forkersCount = 40; //jsonData.length;

	resultData.push({value: forkersCount, color: colors[1], label: "Forks"});

	return resultData;
}

/*
Get data for Activity Chart : Contributions for previous weeks.
*/
function getActivityData(){
	var url = "https://api.github.com/repos/nnnick/chart.js/stats/contributors";

	var resultData = 
	{
		labels : [],
		datasets : []
	};

	/*var jsonData = getJsonData(url);
	var weeks = [];
	var added = [];
	var deleted = [];
	var commited = [];

	var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

	for (var j = 0; j < jsonData[0].weeks.length; j++) {
			for (var i = 0; i < jsonData.length; i++) {
			var date = new Date(jsonData[i].weeks[j].w * 1000);
			var w = date.getDate() + ', ' +  months[date.getMonth()] + ', ' + date.getFullYear() + ', ' + date.getHours() + ':' + date.getMinutes();
			weeks.push(w);
			added.push(jsonData[i].weeks[j].a);
			deleted.push(jsonData[i].weeks[j].d);
			commited.push(jsonData[i].weeks[j].c);
		};
	};*/

	var added = [0, 0, 0, 8, 12, 0, 0, 0, 1, 0, 0, 0, 8, 4, 0, 0];
	var deleted = [0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 0, 0, 1, 2, 0, 0];
	var commited = [0, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 2, 10, 0, 0];

	resultData.labels = 
	[
		"Jan 10, 2013", 
		"Jan 15, 2013", 
		"Jan 20, 2013", 
		"Feb 20, 2013", 
		"Feb 28, 2013", 
		"Mar 02, 2013", 
		"Mar 16, 2013", 
		"Mar 28, 2013", 
		"Apr 12, 2013", 
		"Apr 19, 2013", 
		"May 13, 2013", 
		"May 19, 2013", 
		"Jun 06, 2013", 
		"Jun 13, 2013", 
		"Jul 08, 2013", 
		"Jul 10, 2013"];
	resultData.datasets.push(
	{
		fillColor : colors[5],
		strokeColor : colors[5],
		pointColor : colors[5],
		pointStrokeColor : colors[5],
		data : added
	});

	resultData.datasets.push(
	{
		fillColor : colors[8],
		strokeColor : colors[8],
		pointColor : colors[8],
		pointStrokeColor : colors[8],
		data : deleted
	});

	resultData.datasets.push(
	{
		fillColor : colors[15],
		strokeColor : colors[15],
		pointColor : colors[15],
		pointStrokeColor : colors[15],
		data : commited
	});

	return resultData;
}

/*
Get Issues count.
*/
function getIssueData(){
	var resultData = [];

	var url = "https://api.github.com/repos/nnnick/chart.js/issues";

	var openCount = 0;
	var closeCount = 0;
	var nextPage = true;
	var page = 1;

	/*while(nextPage){
		var openData = getJsonData(url + "?page=" + page +"&state=open", true);
		if(openData.length === 0)
			nextPage = false;
		openCount += openData.length;	
		page += 1;
	}
	
	nextPage = true;
	page = 1;

	while(nextPage){
		var closeData = getJsonData(url + "?page=" + page + "&state=closed", true);
		if(closeData.length === 0)
			nextPage = false;
		closeCount += closeData.length;
		page += 1;
	}*/

	resultData.push({value: 10, color: colors[17], label: "Yet to visit : " + 10});
	resultData.push({value: 2, color: colors[18], label: "Visited : " + 2});

	return resultData;
}

function getReposData(){
	var url = "";
}

/*
Get JSON data for provided url.
*/
function getJsonData(url, withParams){
	var response = API.Get(url, withParams);
	if(response == "ERROR"){
		alert("The Maximum number of requests allowed for this hour by Github API has exceeded.\nPlease try after sometime.");
	}else{
		var jsonData = JSON.parse(response);
		return jsonData;
	}
	return null;
}