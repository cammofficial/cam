
var jsUIInfo =
	'<hr />' +
	'<h1>About JsUI</h1>' +
	'<p>JsUI is as set of JavaScript controls, including ' +
	'<ul>' +
	'<li>Window and WindowHost controls</li>' +
	'<li>TabControl</li>' +
	'<li>ListView</li>' +
	'<li>TreeView</li>' +
	'<li>Menu</li>' +
	'<li>ToolStrip</li>' +
	'<li>Calendar and DatePicker controls</li>' +
	'<li>ImagePicker</li>' +
	'<li>Tooltips</li>' +
	'<li>Custom dialogs</li>' +
	'</ul>' +
	'JsUI controls are written 100% in JavaScript and can easily be integrated into any web application. </p>';

document.addEventListener("DOMContentLoaded", function ()
{
	if (document.getElementById('copyright'))
	{
		document.getElementById('copyright').innerHTML = "&copy; " + new Date().getFullYear() + " MindFusion";
	}

	var e = document.createElement('div');
	e.innerHTML = jsUIInfo;

	if (document.getElementById('infoTab'))
	{
		document.getElementById('infoTab').appendChild(e);
	}

	MindFusion.Controls.Control.licenseLocation = "../pack_lic.txt";
});

var collapsed = false;
function onExpandCollapse()
{
	if (collapsed)
	{
		document.getElementById('info').style.width = '400px';
		document.getElementById('content').style.right = '401px';
		document.getElementById('expandButton').innerHTML = "&rsaquo;";
		collapsed = false;
	}
	else
	{
		document.getElementById('info').style.width = '0px';
		document.getElementById('content').style.right = '0px';
		document.getElementById('expandButton').innerHTML = "&lsaquo;";
		collapsed = true;
	}
}
