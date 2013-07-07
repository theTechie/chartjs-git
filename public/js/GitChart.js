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

	for (var i = 0; i < jsonData.length; i++) {
		resultData.labels.push(jsonData[i].login);

		var url = "https://api.github.com/users/" + jsonData[i].login + "/followers";
		var followersJsonData = getJsonData(url, false);

		followers.push(followersJsonData.length);
		contributors.push(jsonData[i].contributions);
	};

	resultData.datasets.push(
		{
			fillColor: colors[5],
			strokeColor: colors[5],
			data : contributors
		},
		{
			fillColor: colors[6],
			strokeColor: colors[6],
			data : followers
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
	var jsonData = getJsonData(url);
	var startGazersCount = jsonData.length;

	resultData.push({value: startGazersCount, color: colors[4], label: "Stargazers"});

	var url = "https://api.github.com/repos/nnnick/Chart.js/subscribers";
	var jsonData = getJsonData(url);
	var subscribersCount = jsonData.length;

	resultData.push({value: subscribersCount, color: colors[7], label: "Subscribers"});

	var url = "https://api.github.com/repos/nnnick/chart.js/contributors";
	var jsonData = getJsonData(url);
	var contributorsCount = jsonData.length;

	resultData.push({value: contributorsCount, color: colors[9], label: "Contributors"});

	var url ="https://api.github.com/repos/nnnick/chart.js/forks";
	var jsonData = getJsonData(url);
	var forkersCount = jsonData.length;

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

	var jsonData = getJsonData(url);
	var weeks = [];
	var added = [];
	var deleted = [];
	var commited = [];

	for (var i = 0; i < jsonData.length; i++) {
		for (var j = 0; j < jsonData[i].weeks.length; j++) {
			var w = (new Date(jsonData[i].weeks[j].w * 1000)).toUTCString();
			weeks.push(w);
			added.push(jsonData[i].weeks[j].a);
			deleted.push(jsonData[i].weeks[j].d);
			commited.push(jsonData[i].weeks[j].c);
		};
	};

	resultData.labels = weeks;
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

function getIssueData(){
	var resultData = [];

	var url = "https://api.github.com/repos/nnnick/chart.js/issues";

	var openCount = 0;
	var closeCount = 0;
	var nextPage = true;
	var page = 1;

	while(nextPage){
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
	}

	resultData.push({value: openCount, color: colors[18], label: "Open"});
	resultData.push({value: closeCount, color: colors[17], label: "Closed"});

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