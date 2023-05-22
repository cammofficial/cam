var common = MindFusion.Common;
var dv = MindFusion.DataViews;
var ui = MindFusion.Common.UI;
var d = MindFusion.Diagramming;
var reverseMap = MindFusion.Controls.DomUtils.reverseMap;

// create the DiagramView control
var diagramView = d.DiagramView.create(document.getElementById("diagram"));
var diagram = diagramView.diagram;
diagram.fromJson(JSON.stringify(flowcharter_sample));

diagram.addEventListener(d.Events.nodeSelected, (sender, args) => onNodeSelected(sender, args));
diagram.addEventListener(d.Events.linkSelected, (sender, args) => onLinkSelected(sender, args));

// create the PropertyGrid control
var propGrid = new dv.PropertyGrid(document.getElementById("grid"));
propGrid.theme = "blue";
propGrid.setLeft("60%");
propGrid.setWidth("40%");

propGrid.showAllProperties = false;

setViewMetaData();

propGrid.selectedObject = d.DiagramView.find("diagram");

propGrid.rowLoading.addEventListener((sender, args) => { onRowLoading(sender, args) });
propGrid.currentObjectChanging.addEventListener((sender, args) => { onCurrentObjectChanging(sender, args) });
propGrid.propertyValueChanging.addEventListener((sender, args) => { onPropertyValueChanging(sender, args) });
propGrid.propertyValueChanged.addEventListener((sender, args) => { onPropertyValueChanged(sender, args) });

propGrid.render();

function setViewMetaData() {
    var meta = new Map();
    meta.set(
        "allowInplaceEdit", {
        dataType: dv.BooleanType,
        category: "Behavior"
    },
    );
    meta.set(
        "behavior", {
        keyValues: reverseMap(new Map(Object.entries(d.Behavior))),
        dataType: dv.LookupType,
        customEditor: { multiple: false },
        category: "Behavior"
    }
    );
    meta.set("diagram", { category: "Data" });
    meta.set("enabled", { category: "Behavior" });
    meta.set(
        "leftButtonActions", {
        keyValues: reverseMap(new Map(Object.entries(d.MouseButtonActions))),
        dataType: dv.LookupType,
        category: "Behavior"
    }
    );
    meta.set("magnifierEnabled", { category: "Behavior" });
    meta.set(
        "modificationStart", {
        keyValues: reverseMap(new Map(Object.entries(d.ModificationStart))),
        dataType: dv.LookupType,
        category: "Behavior"
    }
    );
    meta.set(
        "mouseWheelAction", {
        keyValues: reverseMap(new Map(Object.entries(d.MouseWheelAction))),
        dataType: dv.LookupType,
        category: "Behavior"
    }
    );
    meta.set(
        "rightButtonActions", {
        keyValues: reverseMap(new Map(Object.entries(d.MouseButtonActions))),
        dataType: dv.LookupType,
        category: "Behavior"
    }
    );

    meta.set("zoomFactor", {
        customAttributes: {
            type: "range",
            min: 10,
            max: 500,
            step: 10
        },
        category: "Appearance",
        displayName: "Zoom 10-500"
    });

    propGrid.metaData = meta;
    propGrid.showAllProperties = false;
}


function setDiagramMetaData() {
    var meta = new Map();
    meta.set("adjustmentHandlesSize", {
        customType: "number",
        category: "Appearance - Items"
    });
    meta.set("alignToGrid", { category: "Grid" });
    meta.set("allowMultipleResize", { category: "Behavior" });
    meta.set("allowSelfLoops", { category: "Behavior" });
    meta.set(
        "allowUnconnectedLinks", {
        dataType: dv.BooleanType,
        category: "Behavior"
    }
    );
    meta.set("autoResize", {
        dataType: dv.LookupType,
        keyValues: reverseMap(new Map(Object.entries(d.AutoResize))),
        category: "Behavior"
    });

    meta.set("backBrush", { category: "Appearance" });
    meta.set("backgroundImageAlign", {
        dataType: dv.LookupType,
        keyValues: reverseMap(new Map(Object.entries(d.ImageAlign))),
        category: "Appearance"
    });

    meta.set("backgroundImageUrl", {
        dataType: dv.ImageType,
        category: "Appearance"
    });

    meta.set("defaultShape", {
        dataType: dv.LookupType,
        keyValues: reverseMap(new Map(Object.entries(d.Shape.shapes))),
        category: "Behavior"
    });
    meta.set(
        "dynamicLinks", {
        dataType: dv.BooleanType,
        category: "Behavior"
    }
    );
    meta.set(
        "freeFormTargets", {
        dataType: dv.LookupType,
        values: Object.keys(d.Shape.shapes),
        customEditor: { mutliple: true },
        category: "Behavior"
    });
    meta.set("gridColor", { category: "Grid" });
    meta.set("gridSize", { category: "Grid" });
    meta.set("linkBaseShape", { category: "Appearance - Items" });
    meta.set("linkBaseShapeSize", { category: "Appearance - Items" });
    meta.set("linkHeadShape", { category: "Appearance - Items" });
    meta.set("linkHeadShapeSize", { category: "Appearance - Items" });
    meta.set("linkShape", {
        dataType: dv.LookupType,
        keyValues: reverseMap(new Map(Object.entries(d.LinkShape))),
        category: "Appearance - Items"
    });

    meta.set(
        "links", {
        dataType: dv.CollectionType,
        category: "Items",
        allowAdd: false,
        allowRemove: false,
        nullable: false
    }
    );
    meta.set(
        "nodes", {
        dataType: dv.CollectionType,
        category: "Items",
        nullable: false
    }
    );
    meta.set(
        "nodesExpandable", {
        dataType: dv.BooleanType,
        category: "Behavior"
    }
    );
    meta.set(
        "roundedLinks", {
        dataType: dv.BooleanType,
        category: "Appearance - Items"
    }
    );
    meta.set("routeLinks", { category: "Behavior" });
    meta.set("selectedHandlesStyle", { category: "Appearance" });
    meta.set("shadowsStyle", {
        dataType: dv.LookupType,
        keyValues: reverseMap(new Map(Object.entries(d.ShadowsStyle))),
        category: "Appearance - Items"
    });

    meta.set("showGrid", { category: "Grid" });
    meta.set("style", { category: "Appearance" });

    var themes = new Map();
    themes.set(null, "none");
    themes.set(d.Theme.getGreen(), "green");
    themes.set(d.Theme.getGray(), "gray");
    themes.set(d.Theme.getBlue(), "blue");
    meta.set(
        "theme", {
        dataType: dv.LookupType,
        keyValues: themes,
        category: "Appearance"
    });

    propGrid.metaData = meta;
    propGrid.showAllProperties = false;
}


function setNodeMetaData() {
    var meta = new Map();
    meta.set("allowIncomingLinks", { category: "Behavior"});
    meta.set("allowOutgoingLinks", { category: "Behavior" });

    var patterns = new Map();
    patterns.set(d.AnchorPattern.fromId("Decision2In2Out"), "Decision2In2Out");
    patterns.set(d.AnchorPattern.fromId("Decision1In3Out"), "Decision1In3Out");
    patterns.set(d.AnchorPattern.fromId("LeftInRightOut"), "LeftInRightOut");
    patterns.set(d.AnchorPattern.fromId("TopInBottomOut"), "TopInBottomOut");
    meta.set("anchorPattern", {
        keyValues: patterns,
        dataType: dv.LookupType,
        category: "Behavior"
    });
    meta.set(
        "enabledHandles", {
        keyValues: reverseMap(new Map(Object.entries(d.AdjustmentHandles))),
        dataType: dv.LookupType,
        customEditor: {
            mode: ui.CheckListBoxType.Flags
            },
            category: "Behavior"
    });
    meta.set("expandable", { category: "Behavior" });
    meta.set("imageLocation", { dataType: dv.ImageType, category: "Appearance" });
    meta.set("locked", { category: "Behavior" });
    meta.set("rotationAngle", {
        customAttributes: {
            type: "range",
            min: 0,
            max: 350,
            step: 10
        },
        category: "Appearance"
    });
    meta.set("shape", {
        dataType: dv.LookupType,
        keyValues: reverseMap(new Map(Object.entries(d.Shape.shapes))),
        category: "Appearance"
    });
    meta.set("text", { category: "Appearance" });
    meta.set("visible", { category: "Appearance" });
    propGrid.metaData = meta;
    propGrid.showReadonlyProperties = false;
}

function setLinkMetaData() {
    var meta = new Map();

    var nodes = new Map();
    diagram.nodes.forEach(node =>
        nodes.set(node, node.text)
    );
    meta.set("destination", {
        dataType: dv.LookupType,
        keyValues: nodes
    });
    meta.set("origin", {
        dataType: dv.LookupType,
        keyValues: nodes
    });
    meta.set("text");
    meta.set("visible");
    propGrid.metaData = meta;
    propGrid.showReadonlyProperties = false;
}


function setStyleMetaData() {
    var meta = new Map();
    meta.set("backBrush");
    meta.set("brush");
    meta.set("fontName", {
        dataType: dv.LookupType,
        values: ["Arial", "Tahoma", "Times New Roman"]
    });
    meta.set("fontSize", {
        dataType: dv.IntegerType
    });
    meta.set("fontStyle", {
        dataType: dv.LookupType,
        keyValues: reverseMap(new Map(Object.entries(MindFusion.Drawing.FontStyle))),
        customEditor: {
            mode: ui.CheckListBoxType.Flags
        }
    });
    meta.set("nodeEffects", {
        dataType: dv.CollectionType
    });
    meta.set("selectedBrush");
    meta.set("selectedStroke");
    meta.set("stroke");
    meta.set("strokeThickness", {
        dataType: dv.IntegerType
    });

    meta.set("opacity", {
        customAttributes: {
            type: "range",
            min: 0,
            max: 1,
            step: 0.1
        }
    });

    meta.set("type", {
        dataType: dv.LookupType,
        keyValues: reverseMap(new Map(Object.entries(d.GlassEffectType)))
    });

    meta.set("usePenAsGlow", { exclude: true });

    propGrid.metaData = meta;
    propGrid.showReadonlyProperties = false;
}


function onRowLoading(sender, args) {

    var excluded = ["autoAnchorsNode", "autoArrangeAvoidContainers", "autoArrangeAvoidSegments", "factory", "items"];
    if (args.propertyName.startsWith("_"))
        args.cancel = true;
    if (excluded.indexOf(args.propertyName) > -1)
        args.cancel = true;

    if (args.propertyName == "linkHeadShape" || args.propertyName == "linkBaseShape") {
        var shapes = new Map();
        shapes.set(null, "None");
        shapes.set(d.Shape.fromId("Arrow"), "Arrow");
        shapes.set(d.Shape.fromId("Circle"), "Circle");
        shapes.set(d.Shape.fromId("Triangle"), "Triangle");
        args.meta.set("keyValues", shapes);
        args.meta.set("dataType", dv.LookupType);
    }

    if (args.propertyName.toLowerCase().indexOf("brush") > -1 || args.propertyName.toLowerCase().indexOf("pen") > -1 ||
        args.propertyName.toLowerCase().indexOf("color") > -1 || args.propertyName.toLowerCase() == "stroke" ||
        args.propertyName.toLowerCase() == "selectedstroke" || args.propertyName.toLowerCase() == "gridColor") {
        args.meta.set("dataType", dv.StringType);
        args.meta.set("customType", "color");
    }
}


function onCurrentObjectChanging(sender, args) {
    if (args.action == dv.RowAction.Collapse) {
        if (args.propertyName == "diagram")
            setViewMetaData();
    }
    if (args.action == dv.RowAction.Select) {
        if (args.propertyName == "diagram")
            setDiagramMetaData();
        else if (sender.currentProperty == "nodes")
            setNodeMetaData();
        else if (sender.currentProperty == "links")
            setLinkMetaData();
        else if (args.propertyName == "style")
            setStyleMetaData();
        else if (args.propertyName == "nodeEffects") {
            if (diagram.style.nodeEffects == undefined)
                diagram.style.nodeEffects = args.newValue = [];
        }
        else
            sender.showAllProperties = true;
    }
}


function onPropertyValueChanging(sender, args) {
    switch (args.action) {
        case dv.RowAction.Create:
            if (args.propertyName == "nodes") {
                diagram.factory.createShapeNode(10, 50, 40, 40);
            }
            if (args.propertyName == "nodeEffects") {

                // create a custom input for the input dialog
                var select = document.createElement("select");

                var option = document.createElement("option");
                option.value = "0";
                option.innerHTML = "Glass Effect";
                select.appendChild(option);

                option = document.createElement("option");
                option.value = "1";
                option.innerHTML = "Aero Effect";
                select.appendChild(option);

                ui.Dialogs.showInputDialog("Choose effect type",
                    "Effect Type",
                    (result, value) => { onGetEffectType(result, value); },
                    sender.element,
                    select, "value", "0",
                    sender.theme);
            }
            break;
        case dv.RowAction.Delete:
            if (args.propertyName == "nodes") {
                diagram.removeItem(diagram.nodes[args.index]);
            }
            if (args.propertyName == "nodeEffects") {
                diagram.style.nodeEffects.splice(args.index, 1);
            }
            break;
        default:
            console.log([args.propertyName, args.propertyValue]);
    }
}

function onPropertyValueChanged(sender, args) {
    if (args.propertyName == "diagram" && args.propertyValue == null) {
        diagramView.diagram = new d.Diagram();
        propGrid.rebind();
    }
}

function onGetEffectType(modalResult, result) {
    if (modalResult == ui.ModalResult.OK) {
        var effect = result == "0" ? new d.GlassEffect() : new d.AeroEffect();
        diagram.style.nodeEffects.push(effect);
        propGrid.rebind();
    }
}

function onNodeSelected(sender, args)
{
    if (!(propGrid.currentObject instanceof d.DiagramView))
        propGrid.collapseProperty("diagram");
    propGrid.expandProperty("diagram").then(propGrid.expandProperty("nodes").then(propGrid.expandProperty("nodes", sender.nodes.indexOf(args.node))));
}

function onLinkSelected(sender, args)
{
    if (!(propGrid.currentObject instanceof d.DiagramView))
        propGrid.collapseProperty("diagram");
    propGrid.expandProperty("diagram").then(propGrid.expandProperty("links").then(propGrid.expandProperty("links", sender.links.indexOf(args.link))));
}

document.getElementById("theme").onchange = function () {
    propGrid.theme = document.getElementById("theme").value;
}