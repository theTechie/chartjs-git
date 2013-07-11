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
"#33FF33",
"#0E5797",
"#0E8C97"
];

init();

/*
Initiate charts.
*/
function init() {

	//Get the context of the canvas element we want to select
    
	var context = document.getElementById("contributorsChart").getContext("2d");
	var options = 
	{
		
    };

	new Chart(context).Bar(getTimeInvested(), options);
	
	var context = document.getElementById("summaryChart").getContext("2d");	
	new Chart(context).Doughnut(getSummaryData(), options);
	
	var context = document.getElementById("reposChart").getContext("2d");	
	new Chart(context).Pie(getGlobalFootprint(), options);

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
Get time invested in activities.
*/
function getTimeInvested(){
	var resultData = 
	{
		labels : [],
		datasets : []
	};

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
Get Summary data : time spent with different group of people.
*/
function getSummaryData(){
	var resultData = [];

	resultData.push({value: 40, color: colors[4]});

	resultData.push({value: 80, color: colors[7]});

	resultData.push({value: 60, color: colors[9]});

	resultData.push({value: 40, color: colors[1]});

	return resultData;
}

/*
Get data for Activity Chart : Github activity.
*/
function getActivityData(){
	var resultData = 
	{
		labels : [],
		datasets : []
	};

	var added = [0, 0, 0, 8, 12, 0, 0, 0, 1, 0, 0, 0, 8, 4, 0, 0];
	var deleted = [0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 0, 0, 1, 2, 0, 0];
	var commited = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 10, 0, 0];

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
		"Jul 10, 2013"
	];

	resultData.datasets.push(
	{
		fillColor : colors[5],
		strokeColor : colors[5],
		pointColor : colors[5],
		pointStrokeColor : "#5a5a5a", //colors[5],
		data : added
	});

	resultData.datasets.push(
	{
		fillColor : colors[8],
		strokeColor : "#010101", //colors[8],
		pointColor : colors[8],
		pointStrokeColor : "#010101", //colors[8],
		data : deleted
	});

	resultData.datasets.push(
	{
		fillColor : colors[15],
		strokeColor : colors[15],
		pointColor : colors[15],
		pointStrokeColor : "#EADB33", //"#010101", //colors[15],
		data : commited
	});

	return resultData;
}

/*
Get global footprint count.
*/
function getGlobalFootprint(){
	var resultData = [];

	resultData.push({value: 10, color: colors[13], label: "Yet to visit : " + 10});
	resultData.push({value: 2, color: colors[20], label: "Visited : " + 2});

	return resultData;
}
