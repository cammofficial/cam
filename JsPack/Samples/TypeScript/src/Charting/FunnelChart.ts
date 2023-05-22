import * as Collections from '@mindfusion/common-collections';
import * as Drawing from '@mindfusion/drawing';
import * as Charting from '@mindfusion/charting';


var Controls = Charting.Controls;

let xFunnelStart = 0, yFunnelStart = 0;

// create the chart
let funnelhartEl = <HTMLCanvasElement>document.getElementById('funnelChart');
funnelhartEl.width = funnelhartEl.offsetParent.clientWidth;
funnelhartEl.height = funnelhartEl.offsetParent.clientHeight;
let funnelChart = new Controls.FunnelChart(funnelhartEl);

// create sample data
let values = new Collections.List<number>([70, 60, 50, 30, 20, 15, 10, 4]);
let labels = new Collections.List<string>(["Unqualified prospects", "Leads", "Initial communication",
	"Customer evaluation", "Negotiation", "Purchase order received", "Delivery", "Payment"])
funnelChart.series = new Charting.SimpleSeries(values, labels);

let brushes = new Collections.List<Drawing.Brush>(
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

let strokes = new Collections.List<Drawing.Brush>(
    [
        new Drawing.Brush("#FFFFFF")
    ]);

let seriesBrushes = new Collections.List<Collections.List<Drawing.Brush>>();
seriesBrushes.add(brushes);
let seriesStrokes = new Collections.List<Collections.List<Drawing.Brush>>();
seriesStrokes.add(strokes);

let thicknesses = new Collections.List<number>(
    [
        6
    ]);

let seriesThicknesses = new Collections.List<Collections.List<number>>();
seriesThicknesses.add(thicknesses);

funnelChart.plot.seriesStyle = new Charting.PerElementSeriesStyle(seriesBrushes, seriesStrokes, seriesThicknesses);
funnelChart.theme.dataLabelsFontSize = funnelChart.theme.legendTitleFontSize = 14;
funnelChart.theme.highlightStroke = new Drawing.Brush("#ce0000");
funnelChart.theme.dataLabelsBrush = new Drawing.Brush("Black");

// create a custom legend renderer
let seriesList = new Collections.ObservableCollection<Charting.Series>();
let series = new Charting.SimpleSeries(null, null);
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

let ren = new Charting.BarRenderer(seriesList);
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

let showDataLabels = document.getElementById('showDataLabels') as HTMLInputElement;
showDataLabels.checked = funnelChart.showDataLabels == Charting.LabelKinds.All;
showDataLabels.onchange = () =>
{
	if (showDataLabels.checked)
		funnelChart.showDataLabels = Charting.LabelKinds.All;
	else
		funnelChart.showDataLabels = Charting.LabelKinds.None;
	funnelChart.draw();
};

let segmentSpacing = document.getElementById('segmentSpacing') as HTMLInputElement;
segmentSpacing.valueAsNumber = funnelChart.segmentSpacing;
segmentSpacing.onchange = () =>
{
	funnelChart.segmentSpacing = segmentSpacing.valueAsNumber;
	funnelChart.draw();
};

let stemWidth = document.getElementById('stemWidth') as HTMLInputElement;
stemWidth.valueAsNumber = funnelChart.stemWidth;
stemWidth.max = "33";
stemWidth.onchange = () =>
{
	funnelChart.stemWidth = stemWidth.valueAsNumber / 100.0;
	funnelChart.draw();
};

let marginLeft = document.getElementById('marginLeft') as HTMLInputElement;
marginLeft.onchange = () =>
{
	xFunnelStart = marginLeft.valueAsNumber;
	funnelChart.plot.margin = new Charting.Margins(xFunnelStart, yFunnelStart, 0, 0);
	funnelChart.plot.invalidate();
	funnelChart.draw();
};

let marginTop = document.getElementById('marginTop') as HTMLInputElement;
marginTop.onchange = () =>
{
	yFunnelStart = marginTop.valueAsNumber;
	funnelChart.plot.margin = new Charting.Margins(xFunnelStart, yFunnelStart, 0, 0);
	funnelChart.plot.invalidate();
	funnelChart.draw();
};

let fw = document.getElementById('funnelWidth') as HTMLInputElement;
fw.value = fw.max = funnelChart.plot.actualWidth.toString();
fw.onchange = () =>
{
	funnelChart.plot.width = fw.valueAsNumber;
	funnelChart.plot.invalidate();
	funnelChart.draw();
};

let fh = document.getElementById('funnelHeight') as HTMLInputElement;
fh.value = fh.max = funnelChart.plot.actualHeight.toString();
fh.onchange = () =>
{
	funnelChart.plot.height = fh.valueAsNumber;
	funnelChart.plot.invalidate();
	funnelChart.draw();
};

(document.getElementById('chbShowLegend') as HTMLInputElement).onchange = () =>
{
	funnelChart.showLegend = !funnelChart.showLegend;
}

(document.getElementById('chbAllowMoveLegend') as HTMLInputElement).onchange = () =>
{
	funnelChart.allowMoveLegend = !funnelChart.allowMoveLegend;
}

let cbLegendHorAlign = document.getElementById('cbLegendHorAlign') as HTMLSelectElement;
cbLegendHorAlign.onchange = () =>
{
	funnelChart.legendHorizontalAlignment = cbLegendHorAlign.selectedIndex;
};

let cbLegendVerAlign = document.getElementById('cbLegendVerAlign') as HTMLSelectElement;
cbLegendVerAlign.onchange = () =>
{
	funnelChart.legendVerticalAlignment = cbLegendVerAlign.selectedIndex;
};

let tbLegendMarginLeft = document.getElementById('tbLegendMarginLeft') as HTMLInputElement;
tbLegendMarginLeft.onchange = () =>
{
	let margin = funnelChart.legendMargin;
	margin.left = parseInt(tbLegendMarginLeft.value);
	funnelChart.legendMargin = margin;
	funnelChart.invalidateLayout(funnelChart.rootPanel);
	funnelChart.draw();
}
let tbLegendMarginTop = document.getElementById('tbLegendMarginTop') as HTMLInputElement;
tbLegendMarginTop.onchange = () =>
{
	let margin = funnelChart.legendMargin;
	margin.top = parseInt(tbLegendMarginTop.value);
	funnelChart.legendMargin = margin;
	funnelChart.invalidateLayout(funnelChart.rootPanel);
	funnelChart.draw();
}

