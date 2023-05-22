/// <reference path="../Scripts/jspack-vsdoc.js" />
var Charting = MindFusion.Charting;

var Controls = Charting.Controls;
var Collections = MindFusion.Common.Collections;
var Drawing = MindFusion.Drawing;

var xFunnelStart = 0, yFunnelStart = 0;

// create the chart
var funnelhartEl = document.getElementById('funnelChart');
funnelhartEl.width = funnelhartEl.offsetParent.clientWidth;
funnelhartEl.height = funnelhartEl.offsetParent.clientHeight;
var funnelChart = new Controls.FunnelChart(funnelhartEl);

// create sample data
var values = new Collections.List([70, 60, 50, 30, 20, 15, 10, 4]);
var labels = new Collections.List(["Unqualified prospects", "Leads", "Initial communication",
	"Customer evaluation", "Negotiation", "Purchase order received", "Delivery", "Payment"])
funnelChart.series = new Charting.SimpleSeries(values, labels);

var brushes = new Collections.List(
	[
        new Drawing.Brush("#669acc"),
        new Drawing.Brush("#616a7f"),
        new Drawing.Brush("#e0e9e9"),
        new Drawing.Brush("#114488"),
        new Drawing.Brush("#c0c0c0"),
        new Drawing.Brush("#ce0000"),
        new Drawing.Brush("#9caac6"),
        new Drawing.Brush("#333393")
    ]);

var strokes = new Collections.List(
    [
        new Drawing.Brush("#FFFFFF")
    ]);

var seriesBrushes = new Collections.List();
seriesBrushes.add(brushes);
var seriesStrokes = new Collections.List();
seriesStrokes.add(strokes);

var thicknesses = new Collections.List(
    [
        6
    ]);

var seriesThicknesses = new Collections.List();
seriesThicknesses.add(thicknesses);

funnelChart.plot.seriesStyle = new Charting.PerElementSeriesStyle(seriesBrushes, seriesStrokes, seriesThicknesses);
funnelChart.theme.dataLabelsFontSize = funnelChart.theme.legendTitleFontSize = 14;
funnelChart.theme.highlightStroke = new Drawing.Brush("#ce0000");
funnelChart.theme.dataLabelsBrush = new Drawing.Brush("Black");

// create a custom legend renderer
var seriesList = new Collections.ObservableCollection();
var series = new Charting.SimpleSeries(null, null);
series.title = "Unqualified prospects=70K, 100%";
seriesList.add(series);
series = new Charting.SimpleSeries(null, null);
series.title = "Leads=60K, 85.7%";
seriesList.add(series);
series = new Charting.SimpleSeries(null, null);
series.title = "Initial communication=50K, 71.4%";
seriesList.add(series);
series = new Charting.SimpleSeries(null, null);
series.title = "Customer evaluation=30K, 42.9%";
seriesList.add(series);
series = new Charting.SimpleSeries(null, null);
series.title = "Negotiation=20K, 28.6%";
seriesList.add(series);
series = new Charting.SimpleSeries(null, null);
series.title = "Purchase order received=15K, 21.4%";
seriesList.add(series);
series = new Charting.SimpleSeries(null, null);
series.title = "Delivery=10K, 14.3%";
seriesList.add(series);
series = new Charting.SimpleSeries(null, null);
series.title = "Payment=4K, 5.7%";
seriesList.add(series);

var ren = new Charting.BarRenderer(seriesList);
ren.series = seriesList;
ren.labelFontSize = 12.0;
ren.seriesStyle = new Charting.PerSeriesStyle(brushes);

funnelChart.legendRenderer.content.clear();

funnelChart.legendRenderer.background = new Drawing.Brush("#e0e9e9");
funnelChart.legendRenderer.borderStroke = new Drawing.Brush("#c0c0c0");
funnelChart.legendRenderer.titleFontSize = 14.0;
funnelChart.legendRenderer.title = "Distribution";
funnelChart.legendRenderer.showSeriesElements = false;
funnelChart.legendRenderer.content.add(ren);

funnelChart.legendVerticalAlignment = Charting.Components.LayoutAlignment.Far;

funnelChart.draw();

var showDataLabels = document.getElementById('showDataLabels');
showDataLabels.checked = funnelChart.showDataLabels == Charting.LabelKinds.All;
showDataLabels.addEventListener("change", function() 
{
	if (showDataLabels.checked)
		funnelChart.showDataLabels = Charting.LabelKinds.All;
	else
		funnelChart.showDataLabels = Charting.LabelKinds.None;
	funnelChart.draw();
});

var segmentSpacing = document.getElementById('segmentSpacing');
segmentSpacing.valueAsNumber = funnelChart.segmentSpacing;
segmentSpacing.addEventListener("change", function() 
{
	funnelChart.segmentSpacing = segmentSpacing.valueAsNumber;
	funnelChart.draw();
});

var stemWidth = document.getElementById('stemWidth');
stemWidth.valueAsNumber = funnelChart.stemWidth;
stemWidth.max = "33";
stemWidth.addEventListener("change", function() 
{
	funnelChart.stemWidth = stemWidth.valueAsNumber / 100.0;
	funnelChart.draw();
});

var marginLeft = document.getElementById('marginLeft');
marginLeft.addEventListener("change", function() 
{
	xFunnelStart = marginLeft.valueAsNumber;
	funnelChart.plot.margin = new Charting.Margins(xFunnelStart, yFunnelStart, 0, 0);
	funnelChart.plot.invalidate();
	funnelChart.draw();
});

var marginTop = document.getElementById('marginTop');
marginTop.addEventListener("change", function() 
{
	yFunnelStart = marginTop.valueAsNumber;
	funnelChart.plot.margin = new Charting.Margins(xFunnelStart, yFunnelStart, 0, 0);
	funnelChart.plot.invalidate();
	funnelChart.draw();
});

var fw = document.getElementById('funnelWidth');
fw.value = fw.max = funnelChart.plot.actualWidth.toString();
fw.addEventListener("change", function() 
{
	funnelChart.plot.width = fw.valueAsNumber;
	funnelChart.plot.invalidate();
	funnelChart.draw();
});

var fh = document.getElementById('funnelHeight');
fh.value = fh.max = funnelChart.plot.actualHeight.toString();
fh.addEventListener("change", function() 
{
	funnelChart.plot.height = fh.valueAsNumber;
	funnelChart.plot.invalidate();
	funnelChart.draw();
});

(document.getElementById('chbShowLegend')).addEventListener("change", function() 
{
	funnelChart.showLegend = !funnelChart.showLegend;
});

(document.getElementById('chbAllowMoveLegend')).addEventListener("change", function() 
{
	funnelChart.allowMoveLegend = !funnelChart.allowMoveLegend;
});

var cbLegendHorAlign = document.getElementById('cbLegendHorAlign');
cbLegendHorAlign.addEventListener("change", function() 
{
	funnelChart.legendHorizontalAlignment = cbLegendHorAlign.selectedIndex;
});

var cbLegendVerAlign = document.getElementById('cbLegendVerAlign');
cbLegendVerAlign.addEventListener("change", function() 
{
	funnelChart.legendVerticalAlignment = cbLegendVerAlign.selectedIndex;
});

var tbLegendMarginLeft = document.getElementById('tbLegendMarginLeft');
tbLegendMarginLeft.addEventListener("change", function() 
{
	var margin = funnelChart.legendMargin;
	margin.left = parseInt(tbLegendMarginLeft.value);
	funnelChart.legendMargin = margin;
	funnelChart.invalidateLayout(funnelChart.rootPanel);
	funnelChart.draw();
});
var tbLegendMarginTop = document.getElementById('tbLegendMarginTop');
tbLegendMarginTop.addEventListener("change", function() 
{
	var margin = funnelChart.legendMargin;
	margin.top = parseInt(tbLegendMarginTop.value);
	funnelChart.legendMargin = margin;
	funnelChart.invalidateLayout(funnelChart.rootPanel);
	funnelChart.draw();
});

