var colors = ['rgba(96,169,23,.5)','rgba(0,171,169,.5)','rgba(27,161,226,.5)' ,'rgba(240,163,10,.5)','rgba(227,200,0,.5)','rgba(1,67,157,.5)','rgba(239,149,0,.5)','rgba(178,0,129,.5)'];

/* set up data - copied from Excel*/
var keys = [
	{key: 'user', caption: 'User', grouping: false},
	{key: 'status', caption: 'Status', grouping: true},
	{key: 'association', caption: 'Association', grouping: true},
	{key: 'relationship', caption: 'In a relationship', grouping: true},
	{key: 'attending', caption: 'Attending', grouping: true},
	{key: 'rsvp', caption: 'Sent RSVP', grouping: true},
	{key: 'oot', caption: 'Out of towner', grouping: true},
	{key: 'hasp1', caption: 'Has a plus-1', grouping: true},
	{key: 'isp1', caption: 'Is a plus-1', grouping: true},
	{key: 'meal', caption: 'Meal choice', grouping: true}
];

var data1 = [
	{value : 'maxgranier', color : 'rgba(96,169,23,.5)'},
	{value : 'Wikunia', color : 'rgba(0,171,169,.5)'},
	{value : 'plus-', color : 'rgba(27,161,226,.5)'},
	{value : 'yDgunz', color : 'rgba(240,163,10,.5)'},
	{value : 'ericrange', color : 'rgba(1,67,237,.5)'}
];

var data = [
	{value : 10, color : 'rgba(96,169,23,.5)'},
	{value : 20, color : 'rgba(0,171,169,.5)'},
	{value : 1, color : 'rgba(27,161,226,.5)'},
	{value : 40, color : 'rgba(240,163,10,.5)'},
	{value : 20, color : 'rgba(227,200,0,.5)'}
];

init();

function init() {
	//Get the context of the canvas element we want to select
	var url = "https://api.github.com/repos/nnnick/chart.js/contributors";
	var responseData = API.Get(url);
    
	var context = document.getElementById("issuesChart").getContext("2d");
	var options = {labelFontColor: '#000', labelFontSize: "16"};
	new Chart(context).Bar(getContributors(), options);
	//var issuesChart = new Chart(ctx).Pie(data,options);
}

function create_chart(chart_id, grouping_key_id) {
	new Chart($('#chart' + chart_id + '_canvas')[0].getContext('2d')).Pie(get_chart_data(keys[grouping_key_id].key),{labelFontColor: '#000', labelFontSize: "16"});
	$('#chart' + chart_id + '_label').text(keys[grouping_key_id].caption);
}

function getContributors(){
	var url = "https://api.github.com/repos/nnnick/chart.js/contributors";
	var response = API.Get(url);
	var resultData = 
	{
		labels : [],
		datasets : []
	};

	var jsonData = JSON.parse(response);
	var values = [];

	resultData.datasets.push(
		{
			fillColor: 'rgba(96,169,23,.5)', //colors[i%colors.length], 
			strokeColor: 'rgba(0,171,169,.5)' //colors[i%colors.length]
		}
	);

	for (var i = 0; i < jsonData.length; i++) {
		resultData.labels.push(jsonData[i].login);
		values.push(jsonData[i].contributions);
	};

	resultData.datasets[0].data = values;
	console.log(resultData);
	return resultData;
}

function get_chart_data(grouping) {
	var chart_data = [];
	var counts = {};
	for (var i = 0; i < data.length; i++) {
		if (!counts[data[i][grouping]])
			counts[data[i][grouping]] = 1;
		else
			counts[data[i][grouping]]++;
	}
	for (var i = 0; i < Object.keys(counts).length; i++) {
		Object.keys(counts)[i];
		counts[Object.keys(counts)[i]];
		chart_data.push({value: counts[Object.keys(counts)[i]], color: colors[i%colors.length], label: Object.keys(counts)[i]});
	}
	return chart_data;
}

function get_next_grouping_key_index(index) {
	if (keys[index].grouping) {
		return index;
	} else {
		return get_next_grouping_key_index((index+1)%keys.length);
	}
}

$('#guests_table').append('<tr>' + $.map(keys, function(n) { return '<th>' + n.caption + '</th>'; }).join('') + '</tr>');
$('#guests_table').append($.map(data, function(data) { return '<tr>' + $.map(keys, function(key) { return '<td>' + data[key.key] + '</td>'; }).join('') + '</tr>'; }).join(''));