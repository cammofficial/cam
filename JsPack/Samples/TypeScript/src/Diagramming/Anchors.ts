

import * as Diagramming from '@mindfusion/diagramming';;
import * as Drawing from '@mindfusion/drawing';

namespace Anchors
{
    let diagram: Diagramming.Diagram = null;

    const decision1In3Out = Diagramming.AnchorPattern.fromId("Decision1In3Out");

    // create a DiagramView component that wraps the "diagram" canvas
    let view = Diagramming.DiagramView.create(<HTMLCanvasElement>document.getElementById("diagram"));
    diagram = view.diagram;
    // register event handlers
    diagram.addEventListener(Diagramming.Events.nodeCreated, onNodeCreated);

    diagram.linkHeadShapeSize = 2;
    diagram.defaultShape = "Rectangle";
    diagram.routeLinks = true;
    diagram.roundedLinks = true;
    diagram.showGrid = false;
    diagram.backBrush = "#e0e9e9";


    let theme = new Diagramming.Theme();
    let shapeNodeStyle = new Diagramming.Style();
    shapeNodeStyle.brush = { type: 'LinearGradientBrush', color1: '#e0e9e9', color2: '#616a7f', angle: 90 };
    shapeNodeStyle.stroke = "#7F7F7F";
    shapeNodeStyle.textColor = "#585A5C";
    shapeNodeStyle.fontName = "Verdana";
    shapeNodeStyle.fontSize = 3;
    shapeNodeStyle.backBrush = "#e0e9e9";
    shapeNodeStyle.nodeEffects = [new Diagramming.GlassEffect()];
    theme.styles["std:ShapeNode"] = shapeNodeStyle;
    diagram.style = (shapeNodeStyle);

    const blue = "#2d3956";
    const green = "#5a7444";
    const red = "#ce0000";

    let apat1 = new Diagramming.AnchorPattern([
        new Diagramming.AnchorPoint(50, 0, true, true),
        new Diagramming.AnchorPoint(100, 50, true, true),
        new Diagramming.AnchorPoint(50, 100, true, true),
        new Diagramming.AnchorPoint(0, 50, true, true)
    ]);

    let apat2 = new Diagramming.AnchorPattern(
        [
            new Diagramming.AnchorPoint(10, 0, true, false, Diagramming.MarkStyle.Circle, green),
            new Diagramming.AnchorPoint(50, 0, true, false, Diagramming.MarkStyle.Circle, blue),
            new Diagramming.AnchorPoint(90, 0, true, false, Diagramming.MarkStyle.Circle, red),
            new Diagramming.AnchorPoint(10, 100, false, true, Diagramming.MarkStyle.Rectangle),
            new Diagramming.AnchorPoint(50, 100, false, true, Diagramming.MarkStyle.Rectangle),
            new Diagramming.AnchorPoint(90, 100, false, true, Diagramming.MarkStyle.Rectangle),
            new Diagramming.AnchorPoint(0, 50, true, true, Diagramming.MarkStyle.X)
        ]);

    let pb1 = diagram.factory.createShapeNode(new Drawing.Rect(10, 7, 25, 18));
    pb1.shape = ("Ellipse");
    pb1.text = ("Start");
    pb1.anchorPattern = (apat1);

    let pb2 = diagram.factory.createShapeNode(new Drawing.Rect(20, 78, 25, 18));
    pb2.text = ("node 1");
    pb2.anchorPattern = (apat2);

    let pb3 = diagram.factory.createShapeNode(new Drawing.Rect(70, 73, 25, 18));
    pb3.text = ("node 2");
    pb3.anchorPattern = (apat2);

    let pb4 = diagram.factory.createShapeNode(new Drawing.Rect(80, 110, 25, 18));
    pb4.shape = ("Ellipse");
    pb4.text = ("End");
    pb4.anchorPattern = (apat1);

    let decb1 = diagram.factory.createShapeNode(new Drawing.Rect(20, 35, 30, 20));
    decb1.shape = ("Decision");
    decb1.text = ("check 1");
    decb1.anchorPattern = (decision1In3Out);

    let decision2In2Out = Diagramming.AnchorPattern.fromId("Decision2In2Out");

    let decb2 = diagram.factory.createShapeNode(new Drawing.Rect(70, 30, 30, 20));
    decb2.shape = ("Decision");
    decb2.text = ("check 2");
    decb2.anchorPattern = (decision2In2Out);

    let link = diagram.factory.createDiagramLink(decb1, decb2);
    link.route();

    function onNodeCreated(sender: Diagramming.Diagram, args: Diagramming.NodeEventArgs)
    {
        var node: Diagramming.DiagramNode = args.node;
        if ((<any>diagram.defaultShape).id == "Rectangle")
            node.anchorPattern = apat2;
        else
            node.anchorPattern = decision1In3Out;
    }

    document.getElementById("rNode").addEventListener("change", () =>
    {
        diagram.defaultShape = (Diagramming.Shape.fromId("Rectangle"));
    });

    document.getElementById("rDecision").addEventListener("change", () =>
    {
        diagram.defaultShape = (Diagramming.Shape.fromId("Decision"));
    });
}