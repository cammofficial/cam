/// <reference path="./Scripts/jspack-vsdoc.js" />

var d = MindFusion.Diagramming;
var g = MindFusion.Gauges;
var ui = MindFusion.Common.UI;

document.addEventListener("DOMContentLoaded", function ()
{
	images = [];

	images.push("./images/icon_calculator.png");
	images.push("./images/icon_delivery.png");
	images.push("./images/icon_time.png");
	images.push("./images/icon_fish.png");

	// create the diagram control
	var diagramView = d.DiagramView.create(document.getElementById("diagram"));
	diagramView.behavior = d.Behavior.DoNothing;
	diagram = diagramView.diagram;
	diagram.shadowsStyle = d.ShadowsStyle.None;
	diagram.backBrush = "#ffcc33";
	diagram.nodeEffects.push(new d.GlassEffect());

	// create a custom input for the input dialog
	var select = document.createElement("select");

	var option = document.createElement("option");
	option.value = 0;
	option.innerHTML = "Relaxed";
	select.appendChild(option);

	option = document.createElement("option");
	option.value = 1;
	option.innerHTML = "Timed";
	select.appendChild(option);

	// show the dialog
	ui.Dialogs.showInputDialog("", "Choose game mode", startGame, document.getElementById("content"), select, "value");
});

flipId = null;
timerId = null;
node = null;
otherNode = null;
timedMode = false;
timeLimit = 30;

function startGame(result, mode)
{
	if (result == ui.ModalResult.Cancel)
	{
		diagram.clearAll();
		return;
	}

	timedMode = +mode;

	diagram.removeEventListener(d.Events.nodeClicked, onNodeClicked);

	clearTimeout(flipId);
	node = null;
	otherNode = null;

	diagram.clearAll();

	var size = 25;
	var count = 16;
	var perLine = 4;

	if (timedMode) runClock();

	for (var i = 0; i < count; i++)
	{
		var node = new d.ShapeNode(diagram);
		node.shape = "Circle";
		node.handlesStyle = d.HandlesStyle.Invisible;
		node.brush = "transparent";
		node.stroke = "transparent";
		node.imageLocation = "./images/question.png";
		node.tag = images[i % images.length];
		diagram.addItem(node);
	}

	shuffleArray(diagram.nodes);

	i = 0;
	for (var i = 0; i < count; i++)
	{
		var node = diagram.nodes[i];

		node.bounds = new MindFusion.Drawing.Rect(
			(i % perLine) * (size + 5) + 8,
			Math.floor(i / perLine) * (size + 5) + 8,
			size, size);
	}

	diagram.resizeToFitItems(10);

	diagram.addEventListener(d.Events.nodeClicked, onNodeClicked);
}

function shuffleArray(array)
{
	for (var i = array.length - 1; i > 0; i--)
	{
		var j = Math.floor(Math.random() * (i + 1));
		var temp = array[i];
		array[i] = array[j];
		array[j] = temp;
	}
}

function onNodeClicked(sender, args)
{
	node = args.node;
	node.imageLocation = node.tag;
	node.invalidate();

	if (otherNode)
	{
		diagram.removeEventListener(d.Events.nodeClicked, onNodeClicked); 
	
		if (otherNode.tag === node.tag)
		{
			flipId = setTimeout(function ()
			{
				closePair(true);
			}, 1000);
		}
		else
		{
			flipId = setTimeout(function ()
			{
				closePair(false);
			}, 1000);
		}
	}
	else
		otherNode = args.node;
}

function closePair(remove)
{
	if (remove)
	{
		diagram.removeItem(node);
		diagram.removeItem(otherNode);
	}
	else
	{
		node.imageLocation = "./images/question.png";
		otherNode.imageLocation = "./images/question.png";
	}

	diagram.invalidate();
	node = null;
	otherNode = null;

	if (diagram.nodes.length == 0)
	{
		finishGame(true);
	}
	diagram.addEventListener(d.Events.nodeClicked, onNodeClicked);
}


var OvalScale = g.OvalScale;
var Length = g.Length;
var LengthType = g.LengthType;
var Thickness = g.Thickness;
var Alignment = g.Alignment;
var TickShape = g.TickShape;
var Pointer = g.Pointer;
var PointerShape = g.PointerShape;

function stopClock()
{
	clearInterval(timerId);

	document.getElementById("clock").parentNode.style.visibility = "hidden";

	var clock = g.OvalGauge.find("clock");
	if (clock)
		clock.dispose();
}

function runClock()
{
	document.getElementById("clock").parentNode.style.visibility = "visible";

	var clock = g.OvalGauge.create(document.getElementById('clock'), false);
	clock.addEventListener(g.Events.prepaintBackground, onPrepaintBackground.bind(this));

	var scale = new OvalScale(clock);
	scale.minValue = 0;
	scale.maxValue = timeLimit;
	scale.startAngle = -90;
	scale.endAngle = 270;
	scale.fill = 'Transparent';
	scale.stroke = 'Transparent';

	var majorSettings = scale.majorTickSettings;
	majorSettings.showLabels = false;
	majorSettings.tickShape = TickShape.Rectangle;
	majorSettings.tickWidth = new Length(10, LengthType.Relative);
	majorSettings.tickHeight = new Length(3, LengthType.Relative);
	majorSettings.stroke = '#333';
	majorSettings.fill = '#333';
	majorSettings.tickAlignment = Alignment.OuterInside;
	majorSettings.count = timeLimit;

	var middleSettings = scale.middleTickSettings;
	middleSettings.showLabels = false;
	middleSettings.showTicks = false;

	var minorSettings = scale.minorTickSettings;
	minorSettings.showLabels = false;
	minorSettings.showTicks = false;

	start = 0;

	var pointer = new Pointer();
	pointer.name = 'Hand';
	pointer.fill = 'Red';
	pointer.pointerwidth = new Length(50, LengthType.Relative);
	pointer.pointerHeight = new Length(5, LengthType.Relative);
	pointer.shape = PointerShape.Rectangle;
	pointer.value = 0;

	scale.addPointer(pointer);
	timerId = setInterval(function () { updateTime(); }, 1000);
}

function updateTime()
{
	start++;

	var clock = g.OvalGauge.find("clock");
	var secondHand = clock.getElementByName("Hand");
	secondHand.value = start;

	if (start > timeLimit)
	{
		finishGame(false);
	}
}

function finishGame(gameWon)
{
	stopClock();
	var message = gameWon ? "YOU WIN! PLAY AGAIN?" : "TIME'S UP! PLAY AGAIN?";
	ui.Dialogs.showConfirmDialog("", message, function (result) { startGame(result, timedMode) }, document.getElementById("content"));
}

function onPrepaintBackground(sender, args)
{
	args.cancelDefaultPainting = true;

	var context = args.context;
	var element = args.element;

	var bounds = new MindFusion.Drawing.Rect(0, 0, element.renderSize.width, element.renderSize.height);

	context.save();

	context.beginPath();
	context.fillStyle = "white";
	context.arc(bounds.center().x, bounds.center().y, bounds.width/2, 2 * Math.PI, false);
	context.fill();

	context.beginPath();
	context.fillStyle = "red";
	context.arc(bounds.center().x, bounds.center().y, 10, 2 * Math.PI, false);
	context.fill();

	var secondHand = sender.getElementByName("Hand");
	var current = secondHand.value;

	if (current > (timeLimit - (timeLimit / 4)))
	{
		context.beginPath();
		context.fillStyle = "rgba(255,0,0,0.5)";
		context.moveTo(bounds.x, bounds.center().y);
		context.arc(bounds.center().x, bounds.center().y, bounds.width / 2, Math.PI, 1.5 * Math.PI, false);
		context.lineTo(bounds.center().x, bounds.center().y);
		context.closePath();
		context.fill();
	}

	context.restore();
};

		
