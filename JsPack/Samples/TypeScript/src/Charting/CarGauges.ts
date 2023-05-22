
import * as Drawing from '@mindfusion/drawing';
import * as Gauges from '@mindfusion/gauges';

var d = Drawing;
var OvalScale = Gauges.OvalScale;
var Length = Gauges.Length;
var LengthType = Gauges.LengthType;
var Alignment = Gauges.Alignment;
var LabelRotation = Gauges.LabelRotation;
var TickShape = Gauges.TickShape;
var PointerShape = Gauges.PointerShape;

let speedometer = Gauges.OvalGauge.create(<HTMLCanvasElement>document.getElementById('speedometer'));
speedometer.addEventListener(Gauges.Events.prepaintBackground, onSpeedometerPrepaintBackground.bind(this));
speedometer.addEventListener(Gauges.Events.prepaintPointer, onPrepaintPointer.bind(this));

let cyclometer = Gauges.OvalGauge.create(<HTMLCanvasElement>document.getElementById('cyclometer'));
cyclometer.addEventListener(Gauges.Events.prepaintBackground, onSpeedometerPrepaintBackground.bind(this));
cyclometer.addEventListener(Gauges.Events.prepaintPointer, onPrepaintPointer.bind(this));

let batteryMeter = Gauges.OvalGauge.create(<HTMLCanvasElement>document.getElementById('batteryMeter'));
batteryMeter.addEventListener(Gauges.Events.prepaintBackground, onBatteryPrepaintBackground.bind(this));
batteryMeter.addEventListener(Gauges.Events.prepaintForeground, onBatteryPrepaintForeground.bind(this));
batteryMeter.addEventListener(Gauges.Events.prepaintPointer, onPrepaintPointer.bind(this));

let oilMeter = Gauges.OvalGauge.create(<HTMLCanvasElement>document.getElementById('oilMeter'));
oilMeter.addEventListener(Gauges.Events.prepaintBackground, onBatteryPrepaintBackground.bind(this));
oilMeter.addEventListener(Gauges.Events.prepaintForeground, onBatteryPrepaintForeground.bind(this));
oilMeter.addEventListener(Gauges.Events.prepaintPointer, onPrepaintPointer.bind(this));

let speed = <HTMLInputElement>document.getElementById('speed');
speed.onchange = speedChanged.bind(speed);

let fuel = <HTMLInputElement>document.getElementById('fuel');
fuel.onchange = fuelChanged.bind(fuel);

let rpm = <HTMLInputElement>document.getElementById('rpm');
rpm.onchange = valueChanged.bind(rpm, ['cyclometer']);

let volt = <HTMLInputElement>document.getElementById('volt');
volt.onchange = valueChanged.bind(volt, ['batteryMeter']);

let oil = <HTMLInputElement>document.getElementById('oil');
oil.onchange = valueChanged.bind(oil, ['oilMeter']);

// kphScale
let kphScale = new OvalScale(speedometer);
kphScale.minValue = (0);
kphScale.maxValue = (305);
kphScale.startAngle = (120);
kphScale.endAngle = (420);
kphScale.startWidth = (new Length(10, LengthType.Relative));
kphScale.endWidth = (new Length(10, LengthType.Relative));
kphScale.fill = ('Tansparent');
kphScale.stroke = ('Transparent');
kphScale.margin = (new d.Thickness(0.20, 0.20, 0.20, 0.20));

let majorSettings = kphScale.majorTickSettings;
majorSettings.tickShape = (TickShape.Rectangle);
majorSettings.tickWidth = (new Length(4, LengthType.Relative));
majorSettings.tickHeight = (new Length(4, LengthType.Relative));
majorSettings.fontSize = (new Length(9, LengthType.Relative));
majorSettings.numberPrecision = (0);
majorSettings.fill = ('White');
majorSettings.stroke = ('Transparent');
majorSettings.labelForeground = ('White');
majorSettings.labelAlignment = (Alignment.InnerCenter);
majorSettings.labelRotation = (LabelRotation.Auto);
majorSettings.tickAlignment  = (Alignment.InnerCenter);
majorSettings.labelOffset = (new Length(8, LengthType.Relative));
majorSettings.step = (20);

var middleSettings = kphScale.middleTickSettings;
middleSettings.showLabels = (false);
middleSettings.showTicks = (false);

var minorSettings = kphScale.minorTickSettings;
minorSettings.showLabels = (false);
minorSettings.showTicks = (false);

// fuelScale
let fuelScale = new Gauges.OvalScale(speedometer);
fuelScale.minValue = (0);
fuelScale.maxValue = (100);
fuelScale.startAngle = (120);
fuelScale.endAngle = (60);
fuelScale.startWidth = (new Length(0, LengthType.Relative));
fuelScale.endWidth = (new Length(0, LengthType.Relative));
fuelScale.fill = ('Gray');
fuelScale.stroke = ('White');
fuelScale.margin = (new d.Thickness(0.25, 0.4, 0.25, 0.1));

majorSettings = fuelScale.majorTickSettings;
majorSettings.tickShape = (TickShape.Rectangle);
majorSettings.tickWidth = (new Length(10, LengthType.Relative));
majorSettings.tickHeight = (new Length(3, LengthType.Relative));
majorSettings.fontSize = (new Length(16, LengthType.Relative));
majorSettings.numberPrecision = (0);
majorSettings.fill = ('White');
majorSettings.stroke = ('Transparent');
majorSettings.labelForeground = ('White');
majorSettings.labelAlignment = (Alignment.InnerCenter);
majorSettings.labelRotation = (LabelRotation.None);
majorSettings.tickAlignment  = (Alignment.InnerInside);
majorSettings.labelOffset = (new Length(18, LengthType.Relative));
majorSettings.count  = (1);

middleSettings = fuelScale.middleTickSettings;
middleSettings.tickShape = (TickShape.Rectangle);
middleSettings.tickWidth = (new Length(8, LengthType.Relative));
middleSettings.tickHeight = (new Length(3, LengthType.Relative));
middleSettings.showLabels = (false);
middleSettings.fill = ('White');
middleSettings.stroke = ('Transparent');
middleSettings.tickAlignment  = (Alignment.InnerCenter);
middleSettings.count  = (3);

minorSettings = fuelScale.minorTickSettings;
minorSettings.showTicks = (true);
minorSettings.tickShape = (TickShape.Rectangle);
minorSettings.tickWidth = (new Length(5, LengthType.Relative));
minorSettings.tickHeight = (new Length(1.5, LengthType.Relative));
minorSettings.showLabels = (false);
minorSettings.fill = ('White');
minorSettings.stroke = ('Transparent');
minorSettings.tickAlignment  = (Alignment.InnerInside);
minorSettings.count  = (6);

let range = new Gauges.Range();
range.minValue = (0);
range.maxValue = (15);
range.offset = (new Length(6, LengthType.Absolute));
range.fill = ('Red');
range.stroke = ('Transparent');
range.startWidth = (new Length(4, LengthType.Relative));
range.endWidth = (new Length(4, LengthType.Relative));
fuelScale.addRange(range);

range = new Gauges.Range();
range.minValue = (15);
range.maxValue = (20);
range.offset = (new Length(6, LengthType.Absolute));
range.fill = ('Yellow');
range.stroke = ('Transparent');
range.startWidth = (new Length(4, LengthType.Relative));
range.endWidth = (new Length(4, LengthType.Relative));
fuelScale.addRange(range);

let pointer = new Gauges.Pointer();
pointer.name = ('fuelPointer');
pointer.fill = ({ "type": "LinearGradientBrush", "color1": "#CCCCCC", "color2": "#666666", "angle": 225 });
pointer.stroke = ('Gray');
pointer.pointerHeight = (new Length(20, LengthType.Relative));
pointer.pointerWidth = (new Length(100, LengthType.Relative));
pointer.shape = (PointerShape.Needle);
fuelScale.addPointer(pointer);

// outer scale
let outerScale = new Gauges.OvalScale(speedometer);
outerScale.minValue = (0);
outerScale.maxValue = (190);
outerScale.startWidth = (new Length(10, LengthType.Relative));
outerScale.endWidth = (new Length(10, LengthType.Relative));
outerScale.fill = ('Transparent');
outerScale.stroke = ('Transparent');

majorSettings = outerScale.majorTickSettings;
majorSettings.showLabels = (false);
majorSettings.tickShape = (TickShape.Rectangle);
majorSettings.tickWidth = (new Length(5, LengthType.Relative));
majorSettings.tickHeight = (new Length(3, LengthType.Relative));
majorSettings.fill = ("#CCCCCC");
majorSettings.stroke = ('Transparent');
majorSettings.tickAlignment  = (Alignment.OuterOutside);
majorSettings.step = (20);

middleSettings = outerScale.middleTickSettings;
middleSettings.showLabels = (false);
middleSettings.tickShape = (TickShape.Rectangle);
middleSettings.tickWidth = (new Length(5, LengthType.Relative));
middleSettings.tickHeight = (new Length(3, LengthType.Relative));
middleSettings.fill = ("#999999");
middleSettings.stroke = ('Transparent');
middleSettings.tickAlignment  = (Alignment.OuterOutside);
middleSettings.count  = (2);

minorSettings = outerScale.minorTickSettings;
minorSettings.showLabels = (false);
minorSettings.showTicks = (false);

// mph scale
let mphScale = new Gauges.OvalScale(speedometer);
mphScale.minValue = (0);
mphScale.maxValue = (190);
mphScale.startWidth = (new Length(10, LengthType.Relative));
mphScale.endWidth = (new Length(10, LengthType.Relative));
mphScale.fill = ('Transparent');
mphScale.stroke = ('Transparent');

majorSettings = mphScale.majorTickSettings;
majorSettings.tickShape = (TickShape.Rectangle);
majorSettings.tickWidth = (new Length(10, LengthType.Relative));
majorSettings.tickHeight = (new Length(2, LengthType.Relative));
majorSettings.fontSize = (new Length(9, LengthType.Relative));
majorSettings.numberPrecision = (0);
majorSettings.fill = ('White');
majorSettings.stroke = ('Transparent');
majorSettings.labelForeground = ('White');
majorSettings.labelRotation = (LabelRotation.Auto);
majorSettings.tickAlignment  = (Alignment.OuterInside);
majorSettings.step = (20);

let interval = new Gauges.CustomInterval();
interval.minValue = (60);
interval.maxValue = (80);
interval.fill = ('Red');
majorSettings.addCustomInterval(interval);

middleSettings = mphScale.middleTickSettings;
middleSettings.showLabels = (false);
middleSettings.tickShape = (TickShape.Rectangle);
middleSettings.tickWidth = (new Length(8, LengthType.Relative));
middleSettings.tickHeight = (new Length(3, LengthType.Relative));
middleSettings.fill = ('White');
middleSettings.stroke = ('Transparent');
middleSettings.tickAlignment  = (Alignment.OuterInside);
middleSettings.count  = (2);

interval = new Gauges.CustomInterval();
interval.minValue = (3);
interval.maxValue = (30);
interval.fill = ('Red');
middleSettings.addCustomInterval(interval);

minorSettings = mphScale.minorTickSettings;
minorSettings.showTicks = (true);
minorSettings.showLabels = (false);
minorSettings.tickShape = (TickShape.Rectangle);
minorSettings.tickWidth = (new Length(6, LengthType.Relative));
minorSettings.tickHeight = (new Length(1, LengthType.Relative));
minorSettings.fill = ('White');
minorSettings.stroke = ('Transparent');
minorSettings.tickAlignment  = (Alignment.OuterInside);
minorSettings.count  = (5);
minorSettings.addCustomInterval(interval);

pointer = new Gauges.Pointer();
pointer.name = ("speedPointer");
pointer.fill = ({ "type": "LinearGradientBrush", "color1": "#CCCCCC", "color2": "#666666", "angle": 225 });
pointer.stroke = ("#333333");
pointer.pointerHeight = (new Length(20, LengthType.Relative));
pointer.pointerWidth = (new Length(100, LengthType.Relative));
pointer.shape = (PointerShape.Needle);
mphScale.addPointer(pointer);

// cyclometer
// rpmScale
var rpmScale = new Gauges.OvalScale(cyclometer);
rpmScale.minValue = (0);
rpmScale.maxValue = (90);
rpmScale.startAngle = (120);
rpmScale.endAngle = (420);
rpmScale.fill = ('Transparent');
rpmScale.stroke = ('Transparent');

majorSettings = rpmScale.majorTickSettings;
majorSettings.tickShape = (TickShape.Ellipse);
majorSettings.tickWidth = (new Length(10, LengthType.Relative));
majorSettings.tickHeight = (new Length(2, LengthType.Relative));
majorSettings.fontSize = (new Length(9, LengthType.Relative));
majorSettings.numberPrecision = (0);
majorSettings.fill = ('White');
majorSettings.stroke = ('Transparent');
majorSettings.labelForeground = ('White');
majorSettings.labelAlignment = (Alignment.InnerCenter);
majorSettings.labelRotation = (LabelRotation.Auto);
majorSettings.tickAlignment  = (Alignment.TrueCenter);
majorSettings.labelOffset = (new Length(4, LengthType.Relative));
majorSettings.step = (10);

interval = new Gauges.CustomInterval();
interval.minValue = (60);
interval.fill = ('Red');
majorSettings.addCustomInterval(interval);

middleSettings = rpmScale.middleTickSettings;
middleSettings.showLabels = (false);
middleSettings.tickShape = (TickShape.Ellipse);
middleSettings.tickWidth = (new Length(6, LengthType.Relative));
middleSettings.tickHeight = (new Length(3, LengthType.Relative));
middleSettings.fontSize = (new Length(12, LengthType.Relative));
middleSettings.fill = ('White');
middleSettings.stroke = ('Transparent');
middleSettings.labelForeground = ('rgb(50, 50, 50)');
middleSettings.tickAlignment  = (Alignment.TrueCenter);
middleSettings.count  = (5);
middleSettings.addCustomInterval(interval);

minorSettings = rpmScale.minorTickSettings;
minorSettings.showLabels = (false);
minorSettings.showTicks = (false);

range = new Gauges.Range();
range.minValue = (60);
range.maxValue = (90);
range.fill = ('rgba(255, 0, 0, 0.4)');
range.stroke = ('Transparent');
range.startWidth = (new Length(0, LengthType.Relative));
range.endWidth = (new Length(8, LengthType.Relative));
range.alignment = (Alignment.TrueCenter);
rpmScale.addRange(range);

pointer = new Gauges.Pointer();
pointer.fill = ({ "type": "LinearGradientBrush", "color1": "#CCCCCC", "color2": "#666666", "angle": 225 });
pointer.stroke = ("#333333");
pointer.pointerHeight = (new Length(20, LengthType.Relative));
pointer.pointerWidth = (new Length(100, LengthType.Relative));
pointer.shape = (PointerShape.Needle);
rpmScale.addPointer(pointer);

// batteryMeter
// batteryScale
let batteryScale = new Gauges.OvalScale(batteryMeter);
batteryScale.minValue = (0);
batteryScale.maxValue = (96);
batteryScale.startAngle = (195);
batteryScale.endAngle = (345);
batteryScale.scaleRelativeCenter = (new d.Point(0.5, 0.9));
batteryScale.scaleRelativeRadius = (0.85);
batteryScale.fill = ('White');
batteryScale.stroke = ("#808080");

majorSettings = batteryScale.majorTickSettings;
majorSettings.tickShape = (TickShape.Rectangle);
majorSettings.tickWidth = (new Length(12, LengthType.Relative));
majorSettings.tickHeight = (new Length(4, LengthType.Relative));
majorSettings.tickOffset = (new Length(-3, LengthType.Relative));
majorSettings.fontSize = (new Length(20, LengthType.Relative));
majorSettings.numberPrecision = (0);
majorSettings.fill = ('White');
majorSettings.stroke = ('White');
majorSettings.labelForeground = ('White');
majorSettings.labelAlignment = (Alignment.InnerInside);
majorSettings.labelRotation = (LabelRotation.None);
majorSettings.tickAlignment  = (Alignment.CenterInside);
majorSettings.labelOffset = (new Length(8, LengthType.Relative));
majorSettings.count  = (4);

middleSettings = batteryScale.middleTickSettings;
middleSettings.showLabels = (false);
middleSettings.showTicks = (false);

minorSettings = batteryScale.minorTickSettings;
minorSettings.showLabels = (false);
minorSettings.showTicks = (false);

range = new Gauges.Range();
range.minValue = (0);
range.maxValue = (30);
range.offset = (new Length(-1, LengthType.Absolute));
range.fill = ('Red');
range.stroke = ('Transparent');
range.startWidth = (new Length(6, LengthType.Relative));
range.endWidth = (new Length(6, LengthType.Relative));
range.alignment = (Alignment.OuterOutside);
batteryScale.addRange(range);

range = new Gauges.Range();
range.minValue = (30);
range.maxValue = (48);
range.offset = (new Length(-1, LengthType.Absolute));
range.fill = ('Yellow');
range.stroke = ('Transparent');
range.startWidth = (new Length(6, LengthType.Relative));
range.endWidth = (new Length(6, LengthType.Relative));
range.alignment = (Alignment.OuterOutside);
batteryScale.addRange(range);

range = new Gauges.Range();
range.minValue = (48);
range.maxValue = (96);
range.offset = (new Length(-1, LengthType.Absolute));
range.fill = ('Green');
range.stroke = ('Transparent');
range.startWidth = (new Length(6, LengthType.Relative));
range.endWidth = (new Length(6, LengthType.Relative));
range.alignment = (Alignment.OuterOutside);
batteryScale.addRange(range);

pointer = new Gauges.Pointer();
pointer.fill = ({ "type": "LinearGradientBrush", "color1": "#CCCCCC", "color2": "#666666", "angle": 225 });
pointer.stroke = ("#333333");
pointer.pointerHeight = (new Length(22, LengthType.Relative));
pointer.pointerWidth = (new Length(110, LengthType.Relative));
pointer.shape = (PointerShape.Needle);
batteryScale.addPointer(pointer);

// oilMeter
// oilScale
let oilScale = new Gauges.OvalScale(oilMeter);
oilScale.minValue = (0);
oilScale.maxValue = (96);
oilScale.startAngle = (195);
oilScale.endAngle = (345);
oilScale.startWidth = (new Length(6, LengthType.Relative));
oilScale.endWidth = (new Length(6, LengthType.Relative));
oilScale.scaleRelativeCenter = (new d.Point(0.5, 0.9));
oilScale.scaleRelativeRadius = (0.85);
oilScale.fill = ('White');
oilScale.stroke = ('Transparent');

majorSettings = oilScale.majorTickSettings;
majorSettings.tickShape = (TickShape.Rectangle);
majorSettings.tickWidth = (new Length(12, LengthType.Relative));
majorSettings.tickHeight = (new Length(4, LengthType.Relative));
majorSettings.tickOffset = (new Length(-3, LengthType.Relative));
majorSettings.fill = ('White');
majorSettings.showLabels = (false);
majorSettings.tickAlignment  = (Alignment.CenterInside);
majorSettings.count  = (4);

middleSettings = oilScale.middleTickSettings;
middleSettings.showLabels = (false);
middleSettings.showTicks = (false);

minorSettings = oilScale.minorTickSettings;
minorSettings.showLabels = (false);
minorSettings.showTicks = (false);

range = new Gauges.Range();
range.minValue = (0);
range.maxValue = (20);
range.offset = (new Length(-1, LengthType.Absolute));
range.fill = ('Red');
range.stroke = ('Transparent');
range.startWidth = (new Length(6, LengthType.Relative));
range.endWidth = (new Length(0, LengthType.Relative));
range.alignment = (Alignment.OuterOutside);
oilScale.addRange(range);

range = new Gauges.Range();
range.minValue = (80);
range.maxValue = (100);
range.offset = (new Length(-1, LengthType.Absolute));
range.fill = ('Red');
range.stroke = ('Transparent');
range.startWidth = (new Length(0, LengthType.Relative));
range.endWidth = (new Length(6, LengthType.Relative));
range.alignment = (Alignment.OuterOutside);
oilScale.addRange(range);

pointer = new Gauges.Pointer();
pointer.fill = ({ "type": "LinearGradientBrush", "color1": "#CCCCCC", "color2": "#666666", "angle": 225 });
pointer.stroke = ("#333333");
pointer.pointerHeight = (new Length(22, LengthType.Relative));
pointer.pointerWidth = (new Length(110, LengthType.Relative));
pointer.shape = (PointerShape.Needle);
oilScale.addPointer(pointer);

function onSpeedometerPrepaintBackground(sender, args)
{
	args.cancelDefaultPainting = (true);

	var context = args.context;
	var element = args.element;
	var size = sender.size;

	var ellipse = new Gauges.Ellipse();
	ellipse.fill = ('gray');
	ellipse.stroke = ('transparent');
	args.paintVisualElement(ellipse, size);

	var ellipse = new Gauges.Ellipse();
	ellipse.fill = (Gauges.Utils.createLinearGradient(300, [0, '#303030', 0.2, '#303030', 0.8, '#909090', 1, '#909090']));
	ellipse.stroke = ('transparent');
	ellipse.margin = (new d.Thickness(0.015));
	args.paintVisualElement(ellipse, size);
};

function onPrepaintPointer(sender, args)
{
	args.cancelDefaultPainting = (true);

	var context = args.context;
	var element = args.element;
	var size = element.renderSize;
	var psize = new d.Size(0.2 * size.width, size.height);

	context.save();
	context.transform.apply(context, element.transform.matrix());

	context.beginPath();
	context.arc(psize.width / 2, psize.height / 2, psize.height / 2, 0, 2 * Math.PI, false);
	var fill = element.fill;
	context.fillStyle = Gauges.Utils.getBrush(context, fill, new d.Rect(0, 0, size.width, size.height), false);
	context.fill();
	context.strokeStyle = '#333333';
	context.stroke();

	context.beginPath();
	context.moveTo(0, 0.425 * size.height);
	context.lineTo(0, 0.575 * size.height);
	context.lineTo(0.95 * size.width, 0.575 * size.height);
	context.lineTo(size.width, 0.5 * size.height);
	context.lineTo(0.95 * size.width, 0.425 * size.height);
	context.fillStyle = 'red';
	context.fill();
	context.stroke();

	context.restore();
};

function onBatteryPrepaintBackground(sender, args)
{
	args.cancelDefaultPainting = (true);

	var context = args.context;
	var element = args.element;
	var size = element.renderSize;
	var gaugeSize = sender.size;
	var widthExtent = (gaugeSize.width - gaugeSize.height) / 2

	var rect = new Gauges.RoundRectangle();
	rect.roundness = (20);
	rect.x = (-widthExtent);
	rect.fill = (Gauges.Utils.createLinearGradient(45, [0.2, '#909090', 0.8, '#303030']));
	rect.stroke = ('transparent');
	args.paintVisualElement(rect, gaugeSize);

	var rect = new Gauges.RoundRectangle();
	rect.roundness = (20);
	rect.margin = (new d.Thickness(0.015 * gaugeSize.width, 0.015 * gaugeSize.width, 0.015 * gaugeSize.width, 0.015 * gaugeSize.width, false));
	rect.x = (-widthExtent);
	rect.fill = (Gauges.Utils.createLinearGradient(45, [0.2, '#303030', 0.8, '#909090']));
	rect.stroke = ('transparent');
	args.paintVisualElement(rect, gaugeSize);

	var rect = new Gauges.RoundRectangle();
	rect.roundness = (20);
	rect.margin = (new d.Thickness(0.03 * gaugeSize.width, 0.03 * gaugeSize.width, 0.03 * gaugeSize.width, 0.03 * gaugeSize.width, false));
	rect.x = (-widthExtent);
	rect.fill = ('#606060');
	rect.stroke = ('transparent');
	args.paintVisualElement(rect, gaugeSize);

	var rect = new Gauges.RoundRectangle();
	rect.roundness = (20);
	rect.margin = (new d.Thickness(0.06 * gaugeSize.width, 0.06 * gaugeSize.width, 0.06 * gaugeSize.width, 0.06 * gaugeSize.width, false));
	rect.x = (-widthExtent);
	rect.fill = (Gauges.Utils.createRadialGradient(null, null, [0.2, '#606060', 0.8, '#bbbbbb'], null, null));
	rect.stroke = ('transparent');
	args.paintVisualElement(rect, gaugeSize);
};

function onBatteryPrepaintForeground(sender, args)
{
	args.cancelDefaultPainting = (true);

	var context = args.context;
	var element = args.element;
	var size = element.renderSize;

	var area = new Gauges.ArcArea();
	area.startAngle = (160);
	area.endAngle = (-20);
	area.margin = (new d.Thickness(0.03));
	area.fill = (Gauges.Utils.createRadialGradient(null, null, [0, 'rgba(255,255,255,0)', 1, 'rgba(255,255,255,0.6)'], null, null));
	args.paintVisualElement(area, size);

	var area = new Gauges.ArcArea();
	area.startAngle = (140);
	area.endAngle = (-40);
	area.margin = (new d.Thickness(0.03));
	area.fill = (Gauges.Utils.createRadialGradient(null, null, [0, 'rgba(255,255,255,0)', 1, 'rgba(255,255,255,0.2)'], null, null));
	args.paintVisualElement(area, size);
};

function speedChanged()
{
	if (isNaN(this.value)) return;
	var speedometer = Gauges.OvalGauge.find('speedometer');
	var speedPointer: any = speedometer.getElementByName("speedPointer");
	speedPointer.value =  (+this.value);
};

function fuelChanged()
{
	if (isNaN(this.value)) return;
	var speedometer = Gauges.OvalGauge.find('speedometer');
	let fuelPointer: any = speedometer.getElementByName("fuelPointer");
	fuelPointer.value =  (+this.value);
};

function valueChanged(id)
{
	if (isNaN(this.value)) return;
	var gauge = Gauges.OvalGauge.find(id);
	var pointer = gauge.scales[0].pointers[0];
	pointer.value =  (+this.value);
};