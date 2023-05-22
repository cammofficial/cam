
var jsGridInfo =
	'<hr />' +
	'<h1>About JsDataViews</h1>' +
	'<p>Grid is a lightweight grid control, that binds to an array of objects and displays the data in tabular format.</p>' +
	'<h2>Features</h2>' +
	'<ul>' +
		'<li>Row virtualization</li>' +
		'<li>Inplace editing</li>' +
		'<li>Select, add and delete grid rows interactively</li>' +
		'<li>Interactive column sorting and resizing</li>' +
		'<li>Custom draw cells and column headers</li>' +
		'<li>Localization support</li>' +
		'<li>Themes</li>' +
	'</ul>' +
    '<p>PropertyGrid is a Grid-based control, that provides a user interface for browsing and editing the properties of an object.</p>' +
	'<h2>Features</h2>' +
	'<ul>' +
		'<li>Binding to objects and collections</li>' +
        '<li>Automatic data type resolving</li>' +
        '<li>Grouping by category</li>' +
		'<li>Searching by property name</li>' +
	'</ul>' +
	'JsDataViews controls are written 100% in JavaScript and can easily be integrated into any web application. ' +
	'They use Flexible Box for layout.</p>';

document.addEventListener("DOMContentLoaded", function ()
{
	if (document.getElementById('copyright'))
	{
		document.getElementById('copyright').innerHTML = "&copy; " + new Date().getFullYear() + " MindFusion";
	}

	var e = document.createElement('div');
	e.innerHTML = jsGridInfo;

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
