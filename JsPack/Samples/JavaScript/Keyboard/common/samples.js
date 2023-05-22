
var jsMapViewerInfo =
	'<hr />' +
	'<h1>About JsVirtualKeyboard</h1>' +
	'<p>JsVirtualKeyboard is an on-screen keyboard component that enables text and shortcut input through touch, mouse or stylus events.' +
	'The control works similarly to the keyboards embedded in hand-held devices, letting users input text into the currently focused entry field. '+
	'It is especially useful for applications running on touch screen terminals, such as POS or industrial systems.</p>'+
	'<p>JsVirtualKeyboard is written 100% in JavaScript and can easily be integrated into any web application.</p>';

document.addEventListener("DOMContentLoaded", function ()
{
	if (document.getElementById('copyright'))
		document.getElementById('copyright').innerHTML = "&copy; " + new Date().getFullYear() + " MindFusion";

	var e = document.createElement('div');
	e.innerHTML = jsMapViewerInfo;

	if (document.getElementById('infoTab'))
		document.getElementById('infoTab').appendChild(e);

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
