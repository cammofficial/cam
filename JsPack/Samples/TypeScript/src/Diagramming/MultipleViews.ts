import * as Diagramming from '@mindfusion/diagramming';
import * as Controls from '@mindfusion/controls';


namespace MultipleViews {
    // create the shared Diagram instance
    let diagram = new Diagramming.Diagram();
    diagram.backBrush = "#e0e9e9";
    diagram.theme = Diagramming.Theme.getEarth();
    let shapeNodeStyle = new Diagramming.Style();
    shapeNodeStyle.nodeEffects = [new Diagramming.GlassEffect()];
    diagram.style = shapeNodeStyle;

    diagram.factory.createShapeNode(10, 10, 30, 30);
    diagram.factory.createShapeNode(70, 10, 30, 30);
    diagram.factory.createDiagramLink(diagram.nodes[0], diagram.nodes[1]);

    // create two DiagramView controls, both displaying the same diagram
    let diagramView = Diagramming.DiagramView.create(<HTMLCanvasElement>document.getElementById("diagram"), diagram);
    diagramView.allowInplaceEdit = true;

    let diagramView2 = Diagramming.DiagramView.create(<HTMLCanvasElement>document.getElementById("diagram2"), diagram);
    diagramView2.allowInplaceEdit = true;
    // create an ZoomControl component, attached to the second DiagramView
    let zoomer = Controls.ZoomControl.create(<HTMLCanvasElement>document.getElementById("zoomer"));
    zoomer.target=(diagramView2);
    zoomer.zoomFactor = 25;
}

