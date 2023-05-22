import * as Drawing from '@mindfusion/drawing';
import * as Gauges from '@mindfusion/gauges';

var d = Drawing;
var TickSettings = Gauges.TickSettings;
var Pointer = Gauges.Pointer;

let majorSettings: Gauges.TickSettings;
let middleSettings: Gauges.TickSettings;
let minorSettings: Gauges.TickSettings;
let pointer: Gauges.Pointer;

for (let i = 0; i < 8; ++i)
{
	let gauge = Gauges.LinearGauge.create(<HTMLCanvasElement>document.getElementById(`lg${i}`));
	gauge.orientation = (Gauges.Orientation.Vertical);
	gauge.addEventListener(Gauges.Events.prepaintBackground, cancelPaint.bind(this));
	gauge.addEventListener(Gauges.Events.prepaintForeground, cancelPaint.bind(this));
	gauge.addEventListener(Gauges.Events.prepaintScale, prepaintScale.bind(this));
	gauge.addEventListener(Gauges.Events.paintPointer, paintPointer.bind(this));

	let scale = new Gauges.LinearScale(gauge);
	scale.left = (new Gauges.Length(50, Gauges.LengthType.Relative));
	scale.top = (new Gauges.Length(10, Gauges.LengthType.Relative));
	scale.orientation = (Gauges.Orientation.Vertical);
	scale.scaleLength = (new Gauges.Length(80, Gauges.LengthType.Relative));
	scale.startWidth = (new Gauges.Length(20, Gauges.LengthType.Relative));
	scale.endWidth = (new Gauges.Length(20, Gauges.LengthType.Relative));
	scale.minValue = (-24);
	scale.maxValue = (24);
	scale.fill = ("Transparent");
	scale.stroke = ("Transparent");

	majorSettings = scale.majorTickSettings;
	majorSettings.tickShape = (Gauges.TickShape.Rectangle);
	majorSettings.tickWidth = (new Gauges.Length(2, Gauges.LengthType.Relative));
	majorSettings.tickHeight = (new Gauges.Length(0.5, Gauges.LengthType.Relative));
	majorSettings.tickAlignment  = (Gauges.Alignment.InnerInside);
	majorSettings.labelAlignment = (Gauges.Alignment.InnerCenter);
	majorSettings.tickOffset = (new Gauges.Length(1));
	majorSettings.labelOffset = (new Gauges.Length(25, Gauges.LengthType.Relative));
	majorSettings.labelRotation = (Gauges.LabelRotation.BaselineToCenter);
	majorSettings.fontSize = (new Gauges.Length(20, Gauges.LengthType.Relative));
	majorSettings.numberPrecision = (0);
	majorSettings.count  = (2);

	middleSettings = scale.middleTickSettings;
	middleSettings.showLabels = (false);
	middleSettings.tickShape = (Gauges.TickShape.Rectangle);
	middleSettings.tickWidth = (new Gauges.Length(1.5, Gauges.LengthType.Relative));
	middleSettings.tickHeight = (new Gauges.Length(1));
	middleSettings.tickOffset = (new Gauges.Length(1));
	middleSettings.tickAlignment  = (Gauges.Alignment.InnerInside);
	middleSettings.count  = (10);

	minorSettings = scale.minorTickSettings;
	minorSettings.showLabels = (false);
	minorSettings.showTicks = (false);

	pointer = new Pointer();
	pointer.name = ("mainPointer");
	pointer.pointerWidth = (new Gauges.Length(24, Gauges.LengthType.Relative));
	pointer.pointerHeight = (new Gauges.Length(48, Gauges.LengthType.Relative));
	pointer.shape = (Gauges.PointerShape.Custom);
	pointer.isInteractive = (true);
	scale.addPointer(pointer);
}

// oval gauges
for (var i = 0; i < 4; ++i)
{
	let gauge = Gauges.OvalGauge.create(<HTMLCanvasElement>document.getElementById(`og${i}`));
	gauge.addEventListener(Gauges.Events.prepaintBackground, cancelPaint.bind(this));
	gauge.addEventListener(Gauges.Events.prepaintForeground, cancelPaint.bind(this));
	gauge.addEventListener(Gauges.Events.prepaintPointer, ovalPrepaintPointer.bind(this));

	let scale = new Gauges.OvalScale(gauge);
	scale.scaleRelativeRadius = (0.45);
	scale.minValue = (-50);
	scale.maxValue = (50);
	scale.fill = ("Transparent");
	scale.stroke = ("Transparent");

	majorSettings = scale.majorTickSettings;
	majorSettings.tickShape = (Gauges.TickShape.Rectangle);
	majorSettings.tickWidth = (new Gauges.Length(12, Gauges.LengthType.Relative));
	majorSettings.tickHeight = (new Gauges.Length(4, Gauges.LengthType.Relative));
	majorSettings.fontSize = (new Gauges.Length(20, Gauges.LengthType.Relative));
	majorSettings.numberPrecision = (0);
	majorSettings.tickAlignment  = (Gauges.Alignment.InnerInside);
	majorSettings.labelAlignment = (Gauges.Alignment.OuterCenter);
	majorSettings.labelOffset = (new Gauges.Length(-15, Gauges.LengthType.Relative));
	majorSettings.labelRotation = (Gauges.LabelRotation.None);
	majorSettings.count  = (5);
	majorSettings.fill = ("Black");
	majorSettings.stroke = ("Black");

	middleSettings = scale.middleTickSettings;
	middleSettings.showLabels = (false);
	middleSettings.tickShape = (Gauges.TickShape.Rectangle);
	middleSettings.tickWidth = (new Gauges.Length(12, Gauges.LengthType.Relative));
	middleSettings.tickHeight = (new Gauges.Length(4, Gauges.LengthType.Relative));
	middleSettings.fill = ("Black");
	middleSettings.stroke = ("Black");

	minorSettings = scale.minorTickSettings;
	minorSettings.showTicks = (true);
	minorSettings.tickShape = (Gauges.TickShape.Rectangle);
	minorSettings.fill = ("Black");
	minorSettings.stroke = ("Black");
	minorSettings.tickWidth = (new Gauges.Length(12, Gauges.LengthType.Relative));
	minorSettings.tickHeight = (new Gauges.Length(4, Gauges.LengthType.Relative));

	pointer = new Pointer();
	pointer.pointerWidth = (new Gauges.Length(165, Gauges.LengthType.Relative));
	pointer.pointerHeight = (new Gauges.Length(165, Gauges.LengthType.Relative));
	pointer.isInteractive = (true);
	scale.addPointer(pointer);
}

//on/off gauge
let gauge = Gauges.OvalGauge.create(<HTMLCanvasElement>document.getElementById('onoff'));
gauge.addEventListener(Gauges.Events.prepaintBackground, cancelPaint.bind(this));
gauge.addEventListener(Gauges.Events.prepaintForeground, cancelPaint.bind(this));
gauge.addEventListener(Gauges.Events.prepaintPointer, onOffPrepaintPointer.bind(this));

let scale = new Gauges.OvalScale(gauge);
scale.startAngle = (225);
scale.endAngle = (315);
scale.minValue = (0);
scale.maxValue = (1);
scale.fill = ("Transparent");
scale.stroke = ("Transparent");

majorSettings = scale.majorTickSettings;
majorSettings.tickShape = (Gauges.TickShape.Rectangle);
majorSettings.tickWidth = (new Gauges.Length(15, Gauges.LengthType.Relative));
majorSettings.tickHeight = (new Gauges.Length(4, Gauges.LengthType.Relative));
majorSettings.fontSize = (new Gauges.Length(20, Gauges.LengthType.Relative));
majorSettings.labelAlignment = (Gauges.Alignment.OuterOutside);
majorSettings.labelOffset = (new Gauges.Length(-10, Gauges.LengthType.Relative));
majorSettings.labelRotation = (Gauges.LabelRotation.None);
majorSettings.count  = (1);

middleSettings = scale.middleTickSettings;
middleSettings.showLabels = (false);
middleSettings.showTicks = (false);

pointer = new Pointer();
pointer.pointerWidth = (new Gauges.Length(140, Gauges.LengthType.Relative));
pointer.pointerHeight = (new Gauges.Length(140, Gauges.LengthType.Relative));
pointer.isDiscrete = (true);
pointer.isInteractive = (true);
scale.addPointer(pointer);

function cancelPaint(sender, args)
{
	args.cancelDefaultPainting = (true);
}

function prepaintScale(sender, args)
{
	let context = args.context;
	let element = args.element;
	let size = element.renderSize;

	let r = new Gauges.RoundRectangle();
	r.roundness = (20);
	r.margin = (new d.Thickness(0.38, 0.055, 0.38, 0.05, true));
	r.fill = (Gauges.Utils.createLinearGradient(0, [0, '#666666', 0.2, '#cccccc', 0.4, '#cccccc', 1, '#888888']));
	args.paintVisualElement(r, size);

	let filledBounds = new d.Rect(0, 0, size.width, size.height);
	r.margin.toAbsolute(size).applyTo(filledBounds);
	let mid = size.width / 2;

	context.save();
	context.beginPath();
	context.strokeStyle = 'black';
	context.moveTo(mid - 0.5, filledBounds.y + 11);
	context.lineTo(mid - 0.5, filledBounds.bottom() - 11);
	context.stroke();

	context.strokeStyle = 'white';
	context.beginPath();
	context.moveTo(mid + 0.5, filledBounds.y + 11);
	context.lineTo(mid + 0.5, filledBounds.bottom() - 11);
	context.stroke();

	context.restore();
}

function paintPointer(sender, args)
{
	let context = args.context;
	let element = args.element;
	let size = element.renderSize;

	let r = new Gauges.RoundRectangle();
	r.roundness = (20);
	r.fill = ('black');
	args.paintVisualElement(r, size);

	var rsize = new d.Size(size.width - 2, size.height - 2)
	r.stroke = ('white');
	r.x = (1);
	r.y = (1);
	r.fill = (Gauges.Utils.createLinearGradient(0, [0, 'white', 1, '#666666']));
	args.paintVisualElement(r, rsize);

	let middle = rsize.height / 2;

	context.save();
	context.beginPath();
	context.strokeStyle = 'white';
	context.moveTo(3, middle - 0.5);
	context.lineTo(rsize.width - 3, middle - 0.5);
	context.stroke();

	context.strokeStyle = 'gray';
	context.moveTo(3, middle + 0.5);
	context.lineTo(rsize.width - 3, middle + 0.5);
	context.stroke();

	context.restore();
}

function ovalPrepaintPointer(sender, args)
{
	args.cancelDefaultPainting = (true);

	let context = args.context;
	let element = args.element;
	let size = element.renderSize;

	context.transform.apply(context, element.transform.matrix());
	context.save();
	context.beginPath();

	let outer = new Gauges.Ellipse();
	outer.fill = (Gauges.Utils.createLinearGradient(0, [0, '#a0c0c0', 1, '#103030']));
	args.paintVisualElement(outer, size);

	let inner1 = new Gauges.Ellipse();
	inner1.fill = ('#608080');
	inner1.margin = (new d.Thickness(0.15));
	args.paintVisualElement(inner1, size);

	let inner2 = new Gauges.Ellipse();
	inner2.fill = ('#608080');
	inner2.margin = (new d.Thickness(0.2));
	args.paintVisualElement(inner2, size);

	context.strokeStyle = 'black';
	context.moveTo(size.width / 2, size.height / 2);
	context.lineTo(size.width * 0.9, size.height / 2);
	context.stroke();
	context.restore();

	var dot = new Gauges.Ellipse();
	dot.fill = ('red');
	dot.margin = (new d.Thickness(0.9, 0.45, 0, 0.45));
	args.paintVisualElement(dot, size);
}

function onOffPrepaintPointer(sender, args)
{
	args.cancelDefaultPainting = (true);

	let context = args.context;
	let element = args.element;
	let bounds = new d.Rect(0, 0, element.renderSize.width, element.renderSize.height);

	context.transform.apply(context, element.transform.matrix());
	context.save();
	context.beginPath();

	let gradient1 = context.createLinearGradient(bounds.width, bounds.y, bounds.width, bounds.height);
	gradient1.addColorStop(0, "#a0a0a0");
	gradient1.addColorStop(0.4, "#d0d0d0");
	gradient1.addColorStop(0.4, "#ffffff");
	gradient1.addColorStop(0.41, "#ffffff");
	gradient1.addColorStop(0.41, "#a1a1a1");
	gradient1.addColorStop(0.6, "#a1a1a1");
	gradient1.addColorStop(0.6, "#808080");
	gradient1.addColorStop(0.8, "#a0a0a0");
	context.fillStyle = gradient1;
	context.strokeStyle = '#5f5f5f';

	context.arc(bounds.center().x, bounds.center().y, bounds.width / 2, 2 * Math.PI, false);
	context.fill();
	context.stroke();

	context.restore();
} 