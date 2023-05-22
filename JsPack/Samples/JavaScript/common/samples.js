
var jsPackInfo =
    '<hr />' +
    '<h1>About MindFusion JsPack</h1>' +
    '<p>The following libraries are contained in the MindFusion JsPack:' +
    '<ul>' +
    '<li>Diagramming</li>' +
    'A fully interactive flow diagramming control.<br/>' +
    '<li>Charting</li>' +
    'A multi-functional dashboard library that draws various types of charts and gauges.<br/>' +
    '<li>Scheduling</li>' +
    'A scheduling control, that can be used to present calendars and timetables.<br/>' +
    '<li>Mapping</li>' +
    'An interactive map viewer control, that can be used to display tiled web maps hosted on a public server.<br/>' +
    '<li>DataViews</li>' +
    'A grid control, that binds to an array of objects and displays the data in tabular format.<br/>' +
    '<li>Virtual keyboard</li>' +
    'An on-screen keyboard component that enables text and shortcut input through touch, mouse or stylus events.<br/>' +
    '<li>UI library</li>' +
    'A set of lightweight UI controls for the web.<br/>' +
    '</ul>' +
    'All controls included are written 100% in JavaScript and can easily be integrated into any web application.</p>';

document.addEventListener("DOMContentLoaded", function ()
{
    if (document.getElementById('copyright'))
        document.getElementById('copyright').innerHTML = "&copy; " + new Date().getFullYear() + " MindFusion";

    var e = document.createElement('div');
    e.innerHTML = jsPackInfo;

    if (document.getElementById('infoTab'))
        document.getElementById('infoTab').appendChild(e);
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