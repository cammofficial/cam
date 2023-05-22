import * as Drawing from '@mindfusion/drawing';
import * as Gauges from '@mindfusion/gauges';

var d = Drawing;

document.getElementById('lin').addEventListener("click", function () { typeChanged((this as any).value); });
document.getElementById('log').addEventListener("click", function () { typeChanged((this as any).value); });
document.getElementById('custom').addEventListener("click", function () { typeChanged((this as any).value); });

var gauge = Gauges.OvalGauge.create(<HTMLCanvasElement>document.getElementById('gauge'));
gauge.addEventListener(Gauges.Events.prepaintBackground, onPrepaintBackground.bind(this));
gauge.addEventListener(Gauges.Events.prepaintForeground, onPrepaintForeground.bind(this));
gauge.addEventListener(Gauges.Events.prepaintPointer, onPrepaintPointer.bind(this));

let os = new Gauges.OvalScale(gauge);
os.stroke = ('transparent');
os.fill = ('transparent');
os.minValue = (0);
os.maxValue = (100);
os.scaleRelativeRadius = (0.75);
os.scaleRelativeCenter = (new d.Point(0.5, 0.8));
os.startWidth = (new Gauges.Length(18, Gauges.LengthType.Relative));
os.endWidth = (new Gauges.Length(18, Gauges.LengthType.Relative));
os.startAngle = (188);
os.endAngle = (352);

os.customFunction = (customFunction.bind(gauge));
os.reversedCustomFunction = (reversedCustomFunction.bind(gauge));

let mj = os.majorTickSettings;
mj.count  = (10);
mj.labelAlignment = (Gauges.Alignment.InnerCenter);
mj.labelRotation = (Gauges.LabelRotation.None);
mj.labelOffset = (new Gauges.Length(-10, Gauges.LengthType.Relative));
mj.fontSize = (new Gauges.Length(11, Gauges.LengthType.Relative));
mj.tickAlignment  = (Gauges.Alignment.InnerCenter);
mj.tickShape = (Gauges.TickShape.Rectangle);
mj.fill = ('black');
mj.stroke = ('transparent');
mj.tickWidth = (new Gauges.Length(3, Gauges.LengthType.Relative));
mj.tickHeight = (new Gauges.Length(1, Gauges.LengthType.Absolute));
mj.numberPrecision = (0);

let md = os.middleTickSettings;
md.showTicks = (false);
md.showLabels = (false);

let mn = os.minorTickSettings;
mn.showTicks = (false);

let p = new Gauges.Pointer();
p.isInteractive = (true);
p.pointerWidth = (new Gauges.Length(80, Gauges.LengthType.Relative));
p.pointerHeight = (new Gauges.Length(10, Gauges.LengthType.Relative));
p.shape = (Gauges.PointerShape.Needle);
p.fill = ('transparent');
p.stroke = ('#333333');
os.addPointer(p);

let range = new Gauges.Range();
range.alignment = (Gauges.Alignment.InnerCenter);
range.minValue = (0);
range.maxValue = (50);
range.fill = ('#4682B4');
range.stroke = ('#808080');
range.startWidth = (new Gauges.Length(4, Gauges.LengthType.Relative));
range.endWidth = (new Gauges.Length(0, Gauges.LengthType.Relative));
os.addRange(range);

range = new Gauges.Range();
range.alignment = (Gauges.Alignment.InnerCenter);
range.minValue = (50);
range.maxValue = (100);
range.fill = ('#4682B4');
range.stroke = ('#808080');
range.startWidth = (new Gauges.Length(0, Gauges.LengthType.Relative));
range.endWidth = (new Gauges.Length(4, Gauges.LengthType.Relative));
os.addRange(range);

function onPrepaintBackground(sender, args)
{
	args.cancelDefaultPainting = (true);

	let context = args.context;
	let element = args.element;
	let size = element.renderSize;
	let bounds = new d.Rect(0, 0, size.width, size.height);
	let gaugeSize = sender.size;
	let widthExtent = (gaugeSize.width - gaugeSize.height) / (gaugeSize.height * 2);

	//Background base rectangle
	let rect = new Gauges.RoundRectangle();
	rect.roundness = (10);
	rect.margin = (new d.Thickness(-widthExtent, 0.05, -widthExtent + 0.01, 0.05));
	rect.fill = (Gauges.Utils.createLinearGradient(45, [0.2, '#a1acbe', 0.8, '#717c9e']));
	rect.stroke = ('#5c697a');
	args.paintVisualElement(rect, size);

	//Shape of the gauge
	let figurePath = "M0.5,0 C0.75,0,1,0.3,1,0.75 C1,0.8,1,0.81,1,0.8 " +
		"L0.57,0.9 C0.57,0.95,0.535,1,0.5,1 C0.465,1,0.43,0.95,0.43,0.9 L0,0.8 C0,0.3,0.25,0,0.5,0 Z";
	let baseShape = new Gauges.PathFigure(figurePath);
	baseShape.margin = (new d.Thickness(-widthExtent + 0.035, 0.095, -widthExtent + 0.035, 0.095));
	baseShape.fill = (Gauges.Utils.createLinearGradient(45,
		[0, '#909090', 0.2, '#909090', 0.8, '#303030', 1.0, '#303030']));
	args.paintVisualElement(baseShape, size);

	baseShape = new Gauges.PathFigure(figurePath);
	baseShape.margin = (new d.Thickness(-widthExtent + 0.045, 0.105, -widthExtent + 0.045, 0.105));
	baseShape.fill = (Gauges.Utils.createLinearGradient(45,
		[0, '#303030', 0.2, '#303030', 0.8, '#909090', 1, '#909090']));
	args.paintVisualElement(baseShape, size);

	baseShape = new Gauges.PathFigure(figurePath);
	baseShape.margin = (new d.Thickness(-widthExtent + 0.05, 0.11, -widthExtent + 0.05, 0.11));
	baseShape.fill = (Gauges.Utils.createRadialGradient(new d.Point(0.4, 0.4), 0, [0.15, '#eff8ff', 0.7, '#b0c4de'], null, null));
	args.paintVisualElement(baseShape, size);
}

function onPrepaintForeground(sender, args)
{
	args.cancelDefaultPainting = (true);

	let context = args.context;
	let element = args.element;
	let size = element.renderSize;
	let gaugeSize = sender.size;
	let widthExtent = (gaugeSize.width - gaugeSize.height) / (gaugeSize.height * 2);

	//Reflection 1
	let figure1 = new Gauges.PathFigure(
		"M0.51,0 C0.25,0,0.03,0.31,0.03,0.63 " +
		"C0.03,0.69,0.09,0.71,0.12,0.71 " +
		"C0.16,0.71,0.21,0.68,0.21,0.64 " +
		"C0.21,0.59,0.24,0.47,0.32,0.41 " +
		"C0.44,0.31,0.64,0.57,0.64,0.05 " +
		"C0.64,0.03,0.55,0,0.51,0 Z");
	figure1.fill = (Gauges.Utils.createLinearGradient(90,
		[0.05, 'rgba(255,255,255,0)',
			0.3, 'rgba(255,255,255,0.5)',
			0.7, 'rgba(255,255,255,0.5)',
			0.95, 'rgba(255,255,255,0)']));
	figure1.margin = (new d.Thickness(-widthExtent + 0.05, 0.11, -widthExtent + 0.05, 0.11));
	args.paintVisualElement(figure1, size);

	//Reflection 2
	let figure2 = new Gauges.PathFigure(
		"M0.8,0.32 L0.71,0.34 C0.795,0.37,0.89,0.44,0.95,0.54 " +
		"C0.95,0.47,0.9,0.36,0.8,0.32 Z");
	figure2.fill = (Gauges.Utils.createLinearGradient(90,
		[0.05, 'rgba(255,255,255,0)',
			0.3, 'rgba(255,255,255,0.5)',
			0.7, 'rgba(255,255,255,0.5)',
			0.95, 'rgba(255,255,255,0)']));
	figure2.margin = (new d.Thickness(-widthExtent + 0.05, 0, -widthExtent + 0.05, 0));
	args.paintVisualElement(figure2, size);
}

function onPrepaintPointer(sender, args)
{
	args.cancelDefaultPainting = (true);

	let context = args.context;
	let element = args.element;
	let size = element.renderSize;

	let c = -0.4 * size.height;
	let bounds = new d.Rect(-c, -c, size.width + 2 * c, size.height + 2 * c);

	context.transform.apply(context, element.transform.matrix());
	context.save();
	context.beginPath();

	let gradient1 = context.createLinearGradient(bounds.x, bounds.y, bounds.width, bounds.height);
	gradient1.addColorStop(0, "#818181");
	gradient1.addColorStop(0.25, "#606060");
	gradient1.addColorStop(0.75, "#323232");
	gradient1.addColorStop(1, "#000000");
	context.fillStyle = gradient1;

	context.strokeStyle = '#323232';
	context.rect(bounds.x, bounds.y, bounds.width, bounds.height);
	context.fill();
	context.stroke();
	bounds.x = bounds.y = 0;
	bounds.width = 0.125 * size.width;
	bounds.height = size.height;
	context.arc(bounds.center().x, bounds.center().y, bounds.width / 2, 2 * Math.PI, false);
	context.fill();
	context.stroke();

	context.restore();
}

function typeChanged(args)
{
	var scale = gauge.scales[0];
	if (args == 'lin')
		scale.functionType = (Gauges.FunctionType.Linear);
	else if (args == 'log')
		scale.functionType = (Gauges.FunctionType.Logarithmic);
	else if (args == 'custom')
		scale.functionType = (Gauges.FunctionType.Custom);
}

function customFunction(value, argument)
{
	var k = this.scales[0].minValue ;
	var l = this.scales[0].maxValue;

	var a = (l - k) / (Math.pow(l, 2) - Math.pow(k, 2));
	var b = k - a * Math.pow(k, 2);

	return a * value * value + b;
}

function reversedCustomFunction(value, argument)
{
	var k = this.scales[0].minValue ;
	var l = this.scales[0].maxValue;

	var a = (l - k) / (Math.pow(l, 2) - Math.pow(k, 2));
	var b = k - a * Math.pow(k, 2);

	return Math.sqrt((value - b) / a);
}