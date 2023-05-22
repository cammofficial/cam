import * as Drawing from '@mindfusion/drawing';
import * as Diagramming from '@mindfusion/diagramming';

//import {icon_calculator, icon_time, icon_delivery, treeicon1, treeicon2, } from './samples';

namespace TreeViewNodes {

    const Behavior = Diagramming.Behavior;
    const TreeViewItem = Diagramming.TreeViewItem;
    const SimpleShape = Diagramming.SimpleShape;
    const Thickness = Drawing.Thickness;
    const Font = Drawing.Font;
    const FontStyle = Drawing.FontStyle;

    (<any>Diagramming.ScrollBar.prototype).background = "#eee";
    (<any>Diagramming.ScrollBar.prototype).foreground = "#aaa";

    let diagram: Diagramming.Diagram = null;

    // create a DiagramView component that wraps the "diagram" canvas
    let diagramView = Diagramming.DiagramView.create(<HTMLCanvasElement>document.getElementById("diagram"));
    // allow users to draw TreeView nodes
    diagramView.behavior = Behavior.LinkTreeViews;
    diagramView.allowInplaceEdit = true;

    diagram = diagramView.diagram;
    diagram.linkHeadShapeSize = 2;

    diagram.addEventListener("nodeClicked", (s, a) => onNodeClicked(s, a));
    diagram.addEventListener("treeItemTextEdited", (s, a) => onItemEdited(s, a));

    // Customers node
    let node1 = diagram.factory.createTreeViewNode(30, 10, 50, 88);
    node1.text = "Customers";
    node1.shape = SimpleShape.RoundedRectangle;

    node1.addItem(createItem("Name", "../assets/treeicon1.png"));
    let item2 = createItem("Address", "../assets/treeicon2.png");
    node1.addItem(item2);
    node1.addItem(createItem("Country", "../assets/treeicon1.png"), item2);
    node1.addItem(createItem("City", "../assets/treeicon1.png"), item2);
    node1.addItem(createItem("Street", "../assets/treeicon1.png"), item2);
    node1.addItem(createItem("ZIP Code", "../assets/treeicon1.png"), item2);

    let item3 = createItem("Orders", "../assets/treeicon2.png");
    node1.addItem(item3);
    node1.addItem(createItem("OrderDate", "../assets/treeicon1.png"), item3);

    let item31 = createItem("Details", "../assets/treeicon1.png");
    node1.addItem(item31, item3);
    node1.addItem(createItem("ProductID", "../assets/treeicon1.png"), item31);
    node1.addItem(createItem("UnitPrice", "../assets/treeicon1.png"), item31);
    node1.addItem(createItem("Quantity", "../assets/treeicon1.png"), item31);

    node1.flatItems[6].textColor = "green";
    node1.flatItems[6].font = new Font("Arial", 4, FontStyle.Underline);
    node1.flatItems[9].textColor = "orange";

    // Products node
    let node2 = diagram.factory.createTreeViewNode(220, 40, 50, 56);
    node2.text = "Category";
    node2.shape = SimpleShape.RoundedRectangle;
    node2.fromObject(
        [{
            text: "Name"
        },
        {
            text: "Description"
        },
        {
            text: "Product",
            textColor: "orange",
            children: [{ text: "Name" }, { text: "QuantityPerUnit" }, { text: "UnitPrice" }]

        }]
    );

    node2.flatItems.forEach((item) => {
        item.imagePadding = new Thickness(0, 1, 1, 1);
        if (item.children.length)
            item.imageLocation = "../assets/treeicon1.png"; else item.imageLocation = "../assets/treeicon2.png";
    })

    // Report node
    let node3 = diagram.factory.createTreeViewNode(130, 100, 50, 50);
    node3.text = "Report";
    node3.brush = "lightyellow";
    node3.fromObject(
        [{
            text: "Order",
            imageLocation: "../assets/icon_calculator.png"
        },
        {
            text: "Date",
            imageLocation: "../assets/icon_time.png"
        },
        {
            text: "Products",
            imageLocation: "../assets/icon_delivery.png",
            children: [{ text: "Name" }, { text: "TotalPrice", brush: "lightblue" }]

        }]
    );

  // Transport node
  var node4 = diagram.factory.createTreeViewNode(120, 10, 60, 70);
  node4.shape = SimpleShape.RoundedRectangle;
  node4.text = "Transport";
  node4.brush = "lightyellow";
  node4.fromObject(
      [{
          text: "Check documents",
          imageLocation: "../assets/icon_documents.png"
      },
      {
          text: "Fixed-time delivery",
          imageLocation: "../assets/icon_clock.png"
      },
      {
          text: "Route Optimization",
          imageLocation: "../assets/icon_map.png"
      },
      {
          text: "Delivery Address",
          imageLocation: "../assets/treeicon1.png"
      },
      {
          text: "Cargo",
          imageLocation: "../assets/icon_cargo.png",
          brush: "#ebebeb",
          children: [{ text: "Package", imageLocation: "../assets/icon_danger.png" },
          { text: "Chemicals", imageLocation: "../assets/icon_chemicals.png", brush: "#ffccd6", textColor: "#ff1744" },
          { text: "Auditor", imageLocation: "../assets/icon_person.png" }]

      }]
  );

    let link1 = diagram.factory.createDiagramLink(node1, node2);
    link1.autoRoute = true;
    link1.headShape = null;
    link1.pen = "orange";
    link1.originIndex = 9;
    link1.destinationIndex = 2;

    let link2 = diagram.factory.createDiagramLink(node2, node3);
    link2.pen = "blue";
    link2.originIndex = 3;
    link2.destinationIndex = 3;

    let link3 = diagram.factory.createDiagramLink(node1, node3);
    link3.originIndex = 6;
    link3.destinationIndex = 0;

    let link4 = diagram.factory.createDiagramLink(node1, node3);
    link4.originIndex = 7;
    link4.destinationIndex = 1;



    function createItem(text, icon) {
        let item = new TreeViewItem();
        item.text = text;
        item.imageLocation = icon;
        item.imagePadding = new Thickness(0, 1, 1, 1);
        return item;
    }

    function onNodeClicked(sender: Diagramming.Diagram, args: Diagramming.NodeEventArgs) {
        if (args.mouseButton == 2) {
            let treeViewNode = <Diagramming.TreeViewNode>args.node
            let item = createItem("<untitled>", "../assets/treeicon2.png");
            let parent = treeViewNode.itemFromPoint(args.mousePosition);

            treeViewNode.addItem(item, parent);
        }
    }

    function onItemEdited(sender: Diagramming.Diagram, args: Diagramming.TreeItemEventArgs) {
        if (!args.newText)
            args.node.removeItem(args.item);
    }
}