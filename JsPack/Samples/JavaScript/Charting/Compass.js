/// <reference path="../Scripts/jspack-vsdoc.js" />
var Gauges = MindFusion.Gauges;

var d = MindFusion.Drawing;

var compass = Gauges.OvalGauge.create(document.getElementById('compass'), false);
compass.addEventListener(Gauges.Events.prepaintBackground, onPrepaintBackground.bind(this));
compass.addEventListener(Gauges.Events.prepaintForeground, onPrepaintForeground.bind(this));
compass.addEventListener(Gauges.Events.prepaintScale, onPrepaintScale.bind(this));
compass.addEventListener(Gauges.Events.paintPointer, onPaintPointer.bind(this));

var scale = new Gauges.OvalScale(compass);
scale.name = ("mainScale");
scale.minValue = (0);
scale.maxValue = (360);
scale.startAngle = (285);
scale.endAngle = (645);
scale.scaleRelativeRadius = (0.5743);
scale.startWidth = (new Gauges.Length(5, Gauges.LengthType.Relative));
scale.endWidth  = (new Gauges.Length(5, Gauges.LengthType.Relative));
scale.fill = ("Transparent");
scale.stroke = ("#202020");
scale.margin = (new d.Thickness(0.075, 0.075, 0.075, 0.075, true));

var majorSettings = scale.majorTickSettings;
majorSettings.showLabels= (false);
majorSettings.tickShape = (Gauges.TickShape.Line);
majorSettings.tickWidth = (new Gauges.Length(100, Gauges.LengthType.Relative));
majorSettings.tickHeight = (new Gauges.Length(10, Gauges.LengthType.Relative));
majorSettings.fill = ("Transparent");
majorSettings.stroke = ("#202020");
majorSettings.tickAlignment= (Gauges.Alignment.CenterInside);
majorSettings.count = (12);

var middleSettings = scale.middleTickSettings;
middleSettings.showTicks= (true);
middleSettings.showLabels= (false);
middleSettings.tickShape = (Gauges.TickShape.Line);
middleSettings.tickWidth = (new Gauges.Length(8, Gauges.LengthType.Relative));
middleSettings.tickHeight = (new Gauges.Length(6, Gauges.LengthType.Relative));
middleSettings.fill = ("Transparent");
middleSettings.stroke = ("#202020");
middleSettings.tickAlignment= (Gauges.Alignment.CenterInside);
middleSettings.count = (6);

var minorSettings = scale.minorTickSettings;
minorSettings.showLabels= (false);
minorSettings.tickShape = (Gauges.TickShape.Line);
minorSettings.tickWidth = (new Gauges.Length(4, Gauges.LengthType.Relative));
minorSettings.tickHeight = (new Gauges.Length(2, Gauges.LengthType.Relative));
minorSettings.fill = ("Transparent");
minorSettings.stroke = ("#202020");
minorSettings.tickAlignment= (Gauges.Alignment.CenterInside);
minorSettings.count = (5);

// innerScale
var innerScale = new Gauges.OvalScale(compass);
innerScale.name = ("innerScale");
innerScale.minValue = (0);
innerScale.maxValue = (360);
innerScale.startAngle = (270);
innerScale.endAngle = (630);
innerScale.scaleRelativeRadius = (0.4);
innerScale.startWidth = (new Gauges.Length(5, Gauges.LengthType.Relative));
innerScale.endWidth  = (new Gauges.Length(5, Gauges.LengthType.Relative));
innerScale.fill = ("Transparent");
innerScale.stroke = ("#202020");
innerScale.margin = (new d.Thickness(0.075, 0.075, 0.075, 0.075, true));

majorSettings = innerScale.majorTickSettings;
majorSettings.tickShape = (Gauges.TickShape.None);
majorSettings.tickWidth = (new Gauges.Length(10, Gauges.LengthType.Relative));
majorSettings.tickHeight = (new Gauges.Length(10, Gauges.LengthType.Relative));
majorSettings.showMaxValueTick = (false);
majorSettings.fontSize = (new Gauges.Length(14, Gauges.LengthType.Relative));
majorSettings.numberPrecision = (0);
majorSettings.fill = ("White");
majorSettings.stroke = ("#808080");
majorSettings.labelForeground= ("White");
majorSettings.labelAlignment= (Gauges.Alignment.OuterCenter);
majorSettings.tickAlignment= (Gauges.Alignment.TrueCenter);
majorSettings.labelOffset= (new Gauges.Length(-10, Gauges.LengthType.Relative));
majorSettings.labelRotation= (Gauges.LabelRotation.BaselineToCenter);
majorSettings.count = (4);

middleSettings = innerScale.middleTickSettings;
middleSettings.tickShape = (Gauges.TickShape.None);
middleSettings.tickWidth = (new Gauges.Length(6, Gauges.LengthType.Relative));
middleSettings.tickHeight = (new Gauges.Length(6, Gauges.LengthType.Relative));
middleSettings.fontSize = (new Gauges.Length(12, Gauges.LengthType.Relative));
middleSettings.numberPrecision = (0);
middleSettings.fontStyle = ("bold");
middleSettings.fill = ("White");
middleSettings.stroke = ("#808080");
middleSettings.labelForeground= ("#505050");
middleSettings.labelAlignment= (Gauges.Alignment.OuterCenter);
middleSettings.tickAlignment= (Gauges.Alignment.TrueCenter);
middleSettings.labelOffset= (new Gauges.Length(-7, Gauges.LengthType.Relative));
middleSettings.labelRotation= (Gauges.LabelRotation.BaselineToCenter);
middleSettings.count = (2);

minorSettings = innerScale.minorTickSettings;
minorSettings.showLabels= (false);
minorSettings.showTicks= (false);

var pointer = new Gauges.Pointer();
pointer.pointerWidth= (new Gauges.Length(200, Gauges.LengthType.Relative));
pointer.pointerHeight= (new Gauges.Length(20, Gauges.LengthType.Relative));
pointer.pointerOffset = (new Gauges.Length(90, Gauges.LengthType.Relative));
pointer.shape = (Gauges.PointerShape.Custom);
pointer.isInteractive =(true);
innerScale.addPointer(pointer);


function onPrepaintBackground(sender, args)
{
	args.cancelDefaultPainting = (true);

	var context = args.context;
	var element = args.element;
	var bounds = new d.Rect(0, 0, element.renderSize.width, element.renderSize.height);
	context.save();
	context.beginPath();

	context.strokeStyle = 'rgba(122,123,124,1)';

	var gradient1 = context.createLinearGradient(bounds.x, bounds.y, bounds.width, bounds.height);
	gradient1.addColorStop(0, "rgba(148,148,148,1)");
	gradient1.addColorStop(1, "rgba(48,48,48,1)");
	context.fillStyle = gradient1;

	context.arc(bounds.center().x, bounds.center().y, bounds.width / 2, 2 * Math.PI, false);
	context.fill();
	context.stroke();

	context.beginPath();
	bounds.x += 10;
	bounds.y += 10;
	bounds.width -= 20;
	bounds.height -= 20;
	context.fillStyle = 'rgba(222,222,222,1)';

	context.arc(bounds.center().x, bounds.center().y, bounds.width / 2, 2 * Math.PI, false);
	context.fill();
	context.stroke();

	context.restore();
};

function onPrepaintForeground(sender, args)
{
	args.cancelDefaultPainting = (true);

	var context = args.context;
	var element = args.element;
	var size = element.renderSize;
	var psize = new d.Size(size.height, size.height);

	var area = new Gauges.ArcArea();
	area.x = (60);
	area.startAngle = (160);
	area.endAngle = (-20);
	area.margin = (new d.Thickness(0.03));
	area.fill = (Gauges.Utils.createRadialGradient(null, null, [0, 'rgba(255,255,255,0)', 1, 'rgba(255,255,255,0.3)'], null, null));
	args.paintVisualElement(area, psize);

	area = new Gauges.ArcArea();
	area.x = (60);
	area.startAngle = (140);
	area.endAngle = (-40);
	area.margin = (new d.Thickness(0.03));
	area.fill = (Gauges.Utils.createRadialGradient(null, null, [0, 'rgba(255,255,255,0)', 1, 'rgba(255,255,255,0.2)'], null, null));
	args.paintVisualElement(area, psize);
};

function onPrepaintScale(sender, args)
{
	var context = args.context;
	var element = args.element;
	var size = element.renderSize;

	if (element.name == 'innerScale')
	{
		var figure = new Gauges.PathFigure('M0.44, 0.5 L0.5, 0.15 L0.5, 0.85 L0.56, 0.5 Z');
		figure.fill = ('rgba(191,191,191,1)');
		args.paintVisualElement(figure, size);

		context.save();
		var transform = new d.Matrix();
		transform.rotateAt(90, new d.Point(size.width / 2, size.height / 2));
		context.transform.apply(context, transform.matrix());
		args.paintVisualElement(figure, size);
		context.restore();

		figure = new Gauges.PathFigure('M0.56, 0.5 L0.5, 0.15 L0.5, 0.85 L0.44, 0.5 Z');
		figure.fill = ('rgba(128,128,128,1)');
		args.paintVisualElement(figure, size);

		context.save();
		transform = new d.Matrix();
		transform.rotateAt(90, new d.Point(size.width / 2, size.height / 2));
		context.transform.apply(context, transform.matrix());
		args.paintVisualElement(figure, size);
		context.restore();

		figure = new Gauges.PathFigure('M0.44, 0.5 L0.5, 0.15 L0.56, 0.5 L0.5, 0.85 Z');
		figure.stroke = ('rgba(32,32,32,1)');
		args.paintVisualElement(figure, size);

		figure = new Gauges.PathFigure('M0.5, 0.56 L0.15, 0.5 L0.5, 0.44 L0.85, 0.5 Z');
		figure.stroke = ('rgba(32,32,32,1)');
		args.paintVisualElement(figure, size);

		figure = new Gauges.PathFigure('M0.46, 0.5 L0.3, 0.3 L0.5, 0.46 L0.7, 0.3 L0.53, 0.5 L0.7, 0.7 L0.5, 0.53 L0.3, 0.7Z');
		figure.fill = ('rgba(191,191,191,1)');
		figure.stroke = ('rgba(32,32,32,1)');
		args.paintVisualElement(figure, size);

		context.save();
		context.beginPath();
		context.arc(size.width / 2, size.height / 2, 37, 0, 2 * Math.PI, false);
		context.fillStyle = 'rgba(191,191,191,1)';
		context.strokeStyle = 'rgba(32,32,32,1)';
		context.fill();
		context.stroke();

		context.beginPath();
		context.arc(size.width / 2, size.height / 2, 35, 0, 2 * Math.PI, false);
		context.fillStyle = 'rgba(222,222,222,1)';
		context.fill();
		context.stroke();
		context.restore();
	}
};

function onPaintPointer(sender, args)
{
	var context = args.context;
	var element = args.element;
	var size = element.renderSize;

	var figure = new Gauges.PathFigure('M0.5, 0 L1, 0.5 L0.5, 1 Z');
	figure.fill = (Gauges.Utils.createRadialGradient(new d.Point(0.5, 0.1), 0, [0, 'rgba(193,0,0,1)', 0.3, 'rgba(255,0,0,1)', 1, 'rgba(102,0,0,1)'], null, null));
	figure.stroke = ('rgba(32,32,32,1)');
	args.paintVisualElement(figure, size);

	figure = new Gauges.PathFigure('M0.5, 0 L0, 0.5 L0.5, 1 Z');
	figure.fill = (Gauges.Utils.createRadialGradient(new d.Point(0.5, 0.1), 0, [0, 'rgba(193,193,193,1)', 0.3, 'rgba(204,204,204,1)', 1, 'rgba(102,102,102,1)'], null, null));
	figure.stroke = ('rgba(32,32,32,1)');
	args.paintVisualElement(figure, size);

	context.save();
	context.beginPath();
	context.arc(size.width / 2, size.height / 2, 3, 0, 2 * Math.PI, false);
	context.fillStyle = 'gray';
	context.strokeStyle = 'rgba(32,32,32,1)';
	context.fill();
	context.stroke();
	context.restore();
}; 