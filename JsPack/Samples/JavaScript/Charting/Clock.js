﻿/// <reference path="../Scripts/jspack-vsdoc.js" />
var Gauges = MindFusion.Gauges;

var d = MindFusion.Drawing;
var OvalScale = Gauges.OvalScale;
var Length = Gauges.Length;
var LengthType = Gauges.LengthType;
var Alignment = Gauges.Alignment;
var LabelRotation = Gauges.LabelRotation;
var TickShape = Gauges.TickShape;
var Pointer = Gauges.Pointer;
var PointerShape = Gauges.PointerShape;

var clock = Gauges.OvalGauge.create(document.getElementById('clock'), false);
clock.addEventListener(Gauges.Events.prepaintBackground, onPrepaintBackground.bind(this));
clock.addEventListener(Gauges.Events.prepaintPointer, onPrepaintPointer.bind(this));

var scale = new OvalScale(clock);
scale.minValue = (0);
scale.maxValue = (60);
scale.startAngle = (-90);
scale.endAngle = (270);
scale.fill = ('Transparent');
scale.stroke = ('Transparent');

var majorSettings = scale.majorTickSettings;
majorSettings.showLabels= (false);
majorSettings.tickShape = (TickShape.Rectangle);
majorSettings.tickWidth = (new Length(10, LengthType.Relative));
majorSettings.tickHeight = (new Length(1, LengthType.Relative));
majorSettings.fill = ('#5E6263');
majorSettings.stroke = ('#5E6263');
majorSettings.tickAlignment= (Alignment.OuterInside);
majorSettings.count = (12);

var middleSettings = scale.middleTickSettings;
middleSettings.showLabels= (false);
middleSettings.tickShape = (TickShape.Ellipse);
middleSettings.tickWidth = (new Length(3, LengthType.Relative));
middleSettings.tickHeight = (new Length(3, LengthType.Relative));
middleSettings.fill = ('White');
middleSettings.stroke = ('White');
middleSettings.tickAlignment= (Alignment.OuterInside);
middleSettings.count = (5);

var minorSettings = scale.minorTickSettings;
minorSettings.showLabels= (false);
minorSettings.showTicks= (false);

var now = new Date();

var pointer = new Pointer();
pointer.name = ('HourHand');
pointer.fill = ('Transparent');
pointer.stroke = ('#333333');
pointer.pointerWidth= (new Length(50, LengthType.Relative));
pointer.pointerHeight= (new Length(4, LengthType.Relative));
pointer.shape = (PointerShape.Needle);
pointer.value = ((now.getHours() * 5) % 60);
scale.addPointer(pointer);

pointer = new Pointer();
pointer.name = ('MinuteHand');
pointer.fill = ('Transparent');
pointer.stroke = ('#333333');
pointer.pointerWidth= (new Length(80, LengthType.Relative));
pointer.pointerHeight= (new Length(4, LengthType.Relative));
pointer.shape = (PointerShape.Needle);
pointer.value = (now.getMinutes() % 60);
scale.addPointer(pointer);

pointer = new Pointer();
pointer.name = ('SecondHand');
pointer.fill = ('Transparent');
pointer.stroke = ('#333333');
pointer.pointerWidth= (new Length(90, LengthType.Relative));
pointer.pointerHeight= (new Length(4, LengthType.Relative));
pointer.shape = (PointerShape.Needle);
pointer.value = (now.getSeconds());
scale.addPointer(pointer);

setInterval(function () { updateTime() }, 1000);


function updateTime()
{
	var clock = Gauges.OvalGauge.find("clock");
	var hourHand = clock.getElementByName("HourHand");
	var minuteHand = clock.getElementByName("MinuteHand");
	var secondHand = clock.getElementByName("SecondHand");

	var now = new Date();
	hourHand.value = ((now.getHours() * 5) % 60);
	minuteHand.value = (now.getMinutes() % 60);
	secondHand.value = (now.getSeconds());
}

function onPrepaintBackground(sender, args)
{
	args.cancelDefaultPainting = (true);

	var context = args.context;
	var element = args.element;
	var bounds = new d.Rect(0, 0, element.renderSize.width, element.renderSize.height);

	context.save();
	context.beginPath();

	context.strokeStyle = 'rgba(122,123,124,1)';

	var gradient1 = context.createLinearGradient(0, 0, 90, 0);
	gradient1.addColorStop(0, "rgba(245,245,245,1)");
    gradient1.addColorStop(1, "rgba(102, 154, 204,1)");
	context.fillStyle = gradient1;
	context.arc(bounds.center().x, bounds.center().y, bounds.width / 2, 2 * Math.PI, false);
	context.fill();
	context.stroke();

	var gradient2 = context.createRadialGradient(bounds.center().x, bounds.center().y, bounds.width / 2, bounds.center().x, bounds.center().y, bounds.width);
	gradient2.addColorStop(0, "rgba(225,236,238,0.5)");
	gradient2.addColorStop(0.3, "rgba(225, 236, 235,0.5)");
	gradient2.addColorStop(0.7, "rgba(255,255,255,0.5)");
	gradient2.addColorStop(1, "rgba(255,255,255,0.5)");
	context.fillStyle = gradient2;

	context.arc(bounds.center().x, bounds.center().y, bounds.width / 2, 2 * Math.PI, false);
	context.fill();
	context.stroke();

	context.restore();
};

function onPrepaintPointer(sender, args)
{
	var context = args.context;
	var element = args.element;

	context.save();
	context.fillStyle = "rgba(94,98,99,1)";

	context.transform.apply(context, element.transform.matrix());
	context.scale(element.children[0].renderSize.width, element.children[0].renderSize.height);

	context.beginPath();
	if (args.element.name == "HourHand") {
		context.rect(0, 0.3, 1.0, 0.4);
	}
	if (args.element.name == "MinuteHand") {
		context.rect(0, 0.3, 1, 0.4);
	}
	if (args.element.name == "SecondHand")
	{
		context.rect(0, 0.3, 1, 0.32);
	}

	context.fill();
	context.restore();
};