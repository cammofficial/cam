import * as Collections from '@mindfusion/common-collections';
import * as Drawing from '@mindfusion/drawing';
import * as Charting from '@mindfusion/charting';


var Controls = Charting.Controls;
var ToolTip = Charting.ToolTip;

class StudentData
{
	public constructor(subject: string, gpa1: number, gpa2: number, gpa3: number)
	{
		this.Subject = subject;
		this.GPA1 = gpa1;
		this.GPA2 = gpa2;
		this.GPA3 = gpa3;
	}

	public Subject: string;
	public GPA1: number;
	public GPA2: number;
	public GPA3: number;
}

let chartEl = <HTMLCanvasElement>document.getElementById('radarChart');
chartEl.width = chartEl.offsetParent.clientWidth;
chartEl.height = chartEl.offsetParent.clientHeight;
// create the chart
let radarChart = new Controls.RadarChart(chartEl);

let plot = <Charting.RadarPlot>radarChart.plot;

// create sample data, a list of objects
let data = createData();

for (let i = 0; i < 5; i++)
{
	let axis = new Charting.Axis();
	axis.title = data.item(i).Subject;
	axis.minValue = 0;
	axis.maxValue = 4;
	plot.axes.add(axis);
}

// set the data source and specify property names to use as data
radarChart.xDataFields = radarChart.yDataFields = new Collections.ObservableCollection<string>(["GPA1", "GPA2", "GPA3"]);
radarChart.innerLabelsDataFields = new Collections.ObservableCollection<string>(["GPA1", "GPA2", "GPA3"]);
radarChart.toolTipsDataFields = new Collections.ObservableCollection<string>(["Subject", "Subject", "Subject"]);
radarChart.dataSource = data;
radarChart.dataBind();

// set the series titles
(<Charting.DataBoundSeries>radarChart.series.item(0)).title = "age range 7-10";
(<Charting.DataBoundSeries>radarChart.series.item(1)).title = "age range 11-13";
(<Charting.DataBoundSeries>radarChart.series.item(2)).title = "age range 14-17";

// set up legend
radarChart.legendTitle = "GPA by subject and age";
radarChart.theme.legendBackground = new Drawing.Brush(new Drawing.Color('transparent'));
radarChart.allowMoveLegend = false;

// customize appearance
radarChart.showCoordinates = false;
radarChart.plot.margin = new Charting.Margins(0, 0, 0, 30);
radarChart.backColor = new Drawing.Color("#ffffff");
radarChart.gridColor1 = new Drawing.Color("#e0e9e9");
radarChart.gridColor2 = new Drawing.Color("#ffffff");
radarChart.theme.highlightStroke = new Drawing.Brush(new Drawing.Color("#9caac6"));
radarChart.theme.axisTitleFontStyle = Drawing.FontStyle.Underline;
radarChart.theme.legendTitleFontStyle = Drawing.FontStyle.Underline;
radarChart.theme.dataLabelsFontSize = radarChart.theme.axisLabelsFontSize = 12;
radarChart.theme.legendTitleFontSize = radarChart.theme.axisTitleFontSize = 14;
radarChart.theme.axisStroke = new Drawing.Brush(new Drawing.Color("#c0c0c0"));
radarChart.theme.commonSeriesFills = radarChart.theme.commonSeriesStrokes = new Collections.List<Drawing.Brush>
	([
    new Drawing.Brush(new Drawing.Color("#669acc")),
    new Drawing.Brush(new Drawing.Color("#ce0000")),
    new Drawing.Brush(new Drawing.Color("#000063"))
	]);
radarChart.theme.uniformSeriesStrokeThickness = 5;

// customize tooltips
ToolTip.brush = new Drawing.Brush("#fafafa");
ToolTip.pen = new Drawing.Pen("#9caac6");
ToolTip.textBrush = new Drawing.Brush("#5050c0");
ToolTip.horizontalPadding = 6;
ToolTip.verticalPadding = 4;
ToolTip.horizontalOffset = -6;
ToolTip.verticalOffset = -4;
ToolTip.font = new Drawing.Font("Verdana", 12, Drawing.FontStyle.Italic);

function createData(): Collections.List<StudentData>
{
	let data = new Collections.List<StudentData>();

	let subjects = new Array<string>("Math", "Physics", "Chemistry", "Biology", "IT");
	let gpa1 = new Array<number>(2.3, 1.7, 2, 4, 3.7);
	let gpa2 = new Array<number>(3.3, 2.7, 1.7, 2, 3.3);
	let gpa3 = new Array<number>(4, 3.7, 2, 1, 1.3);

	for (var i = 0; i < 5; i++)
		data.add(new StudentData(subjects[i], gpa1[i], gpa2[i], gpa3[i]));

	return data;
}


let radarType = document.getElementById('radarType') as HTMLSelectElement;
radarType.selectedIndex = radarChart.radarType;
radarType.onchange = () =>
{
	radarChart.radarType = radarType.selectedIndex;
};

let gridType = document.getElementById('gridType') as HTMLSelectElement;
gridType.selectedIndex = radarChart.gridType;
gridType.onchange = () =>
{
	radarChart.gridType = gridType.selectedIndex;
};

(document.getElementById('chbShowScatter') as HTMLInputElement).onchange = () =>
{
	radarChart.showScatter = !radarChart.showScatter;
}

let areaOpacity = document.getElementById('areaOpacity') as HTMLInputElement;
areaOpacity.valueAsNumber = radarChart.areaOpacity * 10;
areaOpacity.onchange = () =>
{
	radarChart.areaOpacity = areaOpacity.valueAsNumber / 10;
	radarChart.draw();
};
