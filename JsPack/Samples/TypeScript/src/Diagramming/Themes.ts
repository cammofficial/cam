import * as Diagramming from '@mindfusion/diagramming';

namespace Themes
{
    const Theme = Diagramming.Theme;

	let glassEffect = new Diagramming.GlassEffect();
	let aeroEffect = new Diagramming.AeroEffect();

	let diagram: Diagramming.Diagram = null;


	// create a DiagramView component that wraps the "diagram" canvas
	let diagramView = Diagramming.DiagramView.create(<HTMLCanvasElement>document.getElementById("diagram"));
	diagram = diagramView.diagram;
	diagramView.loadFromXml("../data/Themes.xml");

    document.getElementById("theme").onchange = function (e)
    {
        if ((<HTMLSelectElement>e.target).value == "")
            diagram.theme = null;
        else
        {
            let f = Theme["get" + (<HTMLSelectElement>e.target).value[0].toUpperCase() + (<HTMLSelectElement>e.target).value.substring(1)];
            diagram.theme = f.call();
        }
    }

    document.getElementById("bGlass").onchange = function (e)
    {
        if ((<HTMLInputElement>e.target).checked)
            diagram.nodeEffects.push(glassEffect);
        else
            diagram.nodeEffects.splice(diagram.nodeEffects.indexOf(glassEffect));
        diagram.nodes.forEach((node) => { node.invalidate(); })

    }

    document.getElementById("bAero").onchange = function (e)
    {
        if ((<HTMLInputElement>e.target).checked)
            diagram.nodeEffects.push(aeroEffect);
        else
            diagram.nodeEffects.splice(diagram.nodeEffects.indexOf(aeroEffect));
        diagram.nodes.forEach((node) => { node.invalidate(); })

    }
}