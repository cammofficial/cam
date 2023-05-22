
import * as Drawing from '@mindfusion/drawing';
import * as Gauges from '@mindfusion/gauges';

var d = Drawing;
var LinearScale = Gauges.LinearScale;
var Orientation = Gauges.Orientation;
var Length = Gauges.Length;
var LengthType = Gauges.LengthType;
var TickShape = Gauges.TickShape;
var Alignment = Gauges.Alignment;
var LabelRotation = Gauges.LabelRotation;
var Pointer = Gauges.Pointer;
var Range = Gauges.Range;

let gauge = Gauges.LinearGauge.create(<HTMLCanvasElement>document.getElementById('gauge'));
gauge.orientation = (Orientation.Vertical);
gauge.addEventListener(Gauges.Events.prepaintBackground, onPrepaintBackground.bind(this));
gauge.addEventListener(Gauges.Events.prepaintForeground, onPrepaintForeground.bind(this));
gauge.addEventListener(Gauges.Events.prepaintScale, onPrepaintScale.bind(this));

var scale = new LinearScale(gauge);
scale.orientation = (Orientation.Vertical);
scale.fill = ("Transparent");
scale.stroke = ("Green");
scale.minValue = (0);
scale.maxValue = (100);
scale.left = (new Length(50, LengthType.Relative));
scale.top = (new Length(5, LengthType.Relative));
scale.scaleLength = (new Length(80, LengthType.Relative));
scale.startWidth = (new Length(8));
scale.endWidth = (new Length(8));

var majorSettings = scale.majorTickSettings;
majorSettings.tickShape = (TickShape.Rectangle);
majorSettings.tickWidth = (new Length(10));
majorSettings.tickHeight = (new Length(1));
majorSettings.tickAlignment  = (Alignment.InnerInside);
majorSettings.labelAlignment = (Alignment.InnerInside);
majorSettings.tickOffset = (new Length(0));
majorSettings.labelOffset = (new Length(12));
majorSettings.labelRotation = (LabelRotation.Sideways);
majorSettings.fontSize = (new Length(10, LengthType.Relative));
majorSettings.numberPrecision = (0);
majorSettings.fill = ("Transparent");
majorSettings.stroke = ("White");
majorSettings.labelForeground = ("White");
majorSettings.count  = (10);

var middleSettings = scale.middleTickSettings;
middleSettings.showLabels = (false);
middleSettings.tickShape = (TickShape.Rectangle);
middleSettings.tickWidth = (new Length(4));
middleSettings.tickHeight = (new Length(1));
middleSettings.tickOffset = (new Length(0));
middleSettings.tickAlignment  = (Alignment.InnerInside);
middleSettings.fill = ("Transparent");
middleSettings.stroke = ("White");
middleSettings.count  = (5);

var minorSettings = scale.minorTickSettings;
minorSettings.showTicks = (false);

var scale2 = new LinearScale(gauge);
scale2.orientation = (Orientation.Vertical);
scale2.fill = ("Transparent");
scale2.stroke = ("White");
scale2.minValue = (32);
scale2.maxValue = (212);
scale2.left = (new Length(50, LengthType.Relative));
scale2.top = (new Length(5, LengthType.Relative));
scale2.scaleLength = (new Length(80, LengthType.Relative));
scale2.startWidth = (new Length(8));
scale2.endWidth = (new Length(8));

majorSettings = scale2.majorTickSettings;
majorSettings.tickShape = (TickShape.Rectangle);
majorSettings.tickWidth = (new Length(10));
majorSettings.tickHeight = (new Length(1));
majorSettings.tickAlignment  = (Alignment.OuterOutside);
majorSettings.labelAlignment = (Alignment.OuterOutside);
majorSettings.tickOffset = (new Length(0));
majorSettings.labelOffset = (new Length(-12));
majorSettings.labelRotation = (LabelRotation.Sideways);
majorSettings.fontSize = (new Length(10, LengthType.Relative));
majorSettings.numberPrecision = (0);
majorSettings.fill = ("Transparent");
majorSettings.stroke = ("White");
majorSettings.labelForeground = ("White");
majorSettings.count  = (10);

middleSettings = scale2.middleTickSettings;
middleSettings.showLabels = (false);
middleSettings.tickShape = (TickShape.Rectangle);
middleSettings.tickWidth = (new Length(4));
middleSettings.tickHeight = (new Length(1));
middleSettings.tickAlignment  = (Alignment.OuterOutside);
middleSettings.fill = ("Transparent");
middleSettings.stroke = ("Transparent");
middleSettings.count  = (5);

minorSettings = scale2.minorTickSettings;
minorSettings.showTicks = (false);

var pointer = new Pointer();
pointer.isInteractive = (true);
pointer.fill = ("Red");
pointer.value =  (0);
scale2.addPointer(pointer);
gauge.addEventListener(Gauges.Events.valueChanging, onPointerChanged, pointer);
gauge.addEventListener(Gauges.Events.valueChanged, onPointerChanged, pointer);

var range = new Range();
range.alignment = (Alignment.TrueCenter);
range.minValue = (scale2.minValue  - 12);
range.maxValue = (50);
range.autoSize = (true);
range.fill = (Gauges.Utils.createLinearGradient(0, [
	0.00, "#ffaa00",
	0.30, "rgba(255, 255, 102, 0.4)",
	0.31, "rgba(255, 255, 255, 0.6)",
	0.35, "rgba(255, 255, 102, 0.4)",
	1.00, "#ffaa00"]));
range.stroke = ("Transparent");
scale2.addRange(range);

range = new Range();
range.alignment = (Alignment.OuterOutside);
range.minValue = (150);
range.maxValue = (212);
range.startWidth = (new Length(0));
range.endWidth = (new Length(10));
range.fill = (Gauges.Utils.createLinearGradient(90, [
	0.25, "Yellow",
    0.90, "#ce0000"]));
range.stroke = ("White");
scale2.addRange(range);

function onPrepaintBackground(sender, args)
{
	args.cancelDefaultPainting = (true);

	let context = args.context;
	let element = args.element;
	let size = element.renderSize;

	let rect = new Gauges.RoundRectangle();
	rect.roundness = (20);
	rect.margin = (new d.Thickness(3, 3, 3, 3, false));
	rect.fill = (Gauges.Utils.createLinearGradient(
		45,	[0, '#9a9a9a', 0.6, '#212121']));
	rect.stroke = ('rgba(255,255,255,0.1)');
	args.paintVisualElement(rect, size);

	let rect2 = new Gauges.RoundRectangle();
	rect2.roundness = (20);
	rect2.stroke = ('#7a7a7a');
	args.paintVisualElement(rect2, size);
}

function onPrepaintForeground(sender, args)
{
	args.cancelDefaultPainting = (true);

	let context = args.context;
	let element = args.element;
	let size = element.renderSize;

	let rect = new Gauges.RoundRectangle();
	rect.roundness = (20);
	rect.margin = (new d.Thickness(3, 3, 3, 3, false));
	rect.fill = (Gauges.Utils.createLinearGradient(
		45, [0.2, 'rgba(255,255,255,0.18)', 0.6, 'rgba(255,255,255,0)']));
	args.paintVisualElement(rect, size);
}

function onPrepaintScale(sender, args)
{
	let context = args.context;
	let element = args.element;
	let size = element.renderSize;

	let el = new Gauges.Ellipse();
	el.margin = (new d.Thickness(0.35, 0.9, 0.35, 0.01, true));
	el.fill = (Gauges.Utils.createRadialGradient(
		null, null, [0, '#990000', 1, '#ff6666'], null, null));
	el.stroke = ('white');
	args.paintVisualElement(el, size);
}

function onPointerChanged(sender, args)
{
	let range = sender.parent.ranges[0];
	range.maxValue = (args.newValue);
}