import * as Diagramming from '@mindfusion/diagramming';
import * as Drawing from '@mindfusion/drawing';
import * as UI from '@mindfusion/common-ui';

var diagram;
var tableCount = 0, rowClicked = -1;
var tblClicked = null, currentLink = null;
var btnAddRow, btnEditRow, btnDeleteRow, btnRenameTable, btnInfo;

namespace DBDesign {
    // create a DiagramView component that wraps the "diagram" canvas
    var diagramView = Diagramming.DiagramView.create(<HTMLCanvasElement>document.getElementById("diagram"));
    diagramView.behavior = Diagramming.Behavior.LinkTables;
    diagram = diagramView.diagram;

    // set some Diagram properties.
    diagram.allowSelfLoops = false;
    diagram.backBrush = '#F0F0F0';
    diagram.linkHeadShape = 'Triangle';
    diagram.linkHeadShapeSize = 4;
    diagram.selection.allowMultipleSelection = false;
    diagram.linkShape = Diagramming.LinkShape.Cascading;
    diagram.routeLinks = true;

    // set the Diagram style.
    var theme = new Diagramming.Theme();

    var tableNodeStyle = new Diagramming.Style();
    tableNodeStyle.brush = { type: 'LinearGradientBrush', color1: 'rgb(224, 233, 233)', color2: 'rgb(102, 154, 204)', angle: 30 };
    tableNodeStyle.textColor = 'rgb(45, 57, 86)';
    tableNodeStyle.stroke = 'rgb(192, 192, 192)';

    var linkStyle = new Diagramming.Style();
    linkStyle.brush = { type: 'SolidBrush', color: 'rgb(0, 52, 102)' };
    linkStyle.stroke = 'rgb(192, 192, 192)';

    theme.styles.set('std:TableNode', tableNodeStyle);
    theme.styles.set('std:DiagramLink', linkStyle);

    diagram.theme = theme;


    // Set diagram event listeners
    diagram.addEventListener(Diagramming.Events.nodeCreated, function (sender, args) {
        var table = args.node;

        if (table) {
            table.text = "Table" + tableCount++;
            table.captionFont = new Drawing.Font("sans-serif", 3, true, false, false);
            table.redimTable(2, 0);

            table.scrollable = true;
            table.connectionStyle = Diagramming.ConnectionStyle.Rows;

            // set the first column to resize with the table
            table.getColumn(0).columnStyle = Diagramming.ColumnStyle.AutoWidth;

            generateSQL();
        }
    });

    diagram.addEventListener(Diagramming.Events.clicked, function (sender, args) {
        rowClicked = -1;
        tblClicked = null;

        document.querySelector('#btnEditRow').innerHTML = "Edit row";
        document.querySelector('#btnDeleteRow').innerHTML = "Delete row";
    });

    diagram.addEventListener(Diagramming.Events.nodeClicked, function (sender, args) {
        rowClicked = -1;
        tblClicked = args.node;
        if (tblClicked) {
            var cellClicked = tblClicked.cellFromPoint(args.mousePosition);
            if (cellClicked) {
                rowClicked = cellClicked.row;
                document.querySelector('#btnEditRow').innerHTML = "Edit row " + rowClicked;
                document.querySelector('#btnDeleteRow').innerHTML = "Delete row " + rowClicked;
            }
        }
    });

    diagram.addEventListener(Diagramming.Events.nodeDoubleClicked, function (sender, args) {
        if (tblClicked != args.node) {
            tblClicked = args.node;
        }

        if (tblClicked) {
            var cellClicked = tblClicked.cellFromPoint(args.mousePosition);
            if (cellClicked) {
                rowClicked = cellClicked.row;
                editRowOpen();
            }
            else if (tblClicked.hitTestManipulators(args.mousePosition) == null) {
                if (args.mousePosition.y <= tblClicked.bounds.y + tblClicked.captionHeight)
                    renameTableOpen();
                else
                    addRowOpen();
            }
        }
    });

    diagram.addEventListener(Diagramming.Events.linkDoubleClicked, function (sender, args) {
        infoOpen();
    });

    diagram.addEventListener(Diagramming.Events.nodeSelected, function (sender, args) {
        (<HTMLButtonElement>document.querySelector('#btnAddRow')).disabled = false;
        (<HTMLButtonElement>document.querySelector('#btnEditRow')).disabled = false;
        (<HTMLButtonElement>document.querySelector('#btnDeleteRow')).disabled = false;
        (<HTMLButtonElement>document.querySelector('#btnRenameTable')).disabled = false;
        (<HTMLButtonElement>document.querySelector('#btnDeleteTable')).disabled = false;
    });

    diagram.addEventListener(Diagramming.Events.nodeDeselected, function (sender, args) {
        (<HTMLButtonElement>document.querySelector('#btnAddRow')).disabled = true;
        (<HTMLButtonElement>document.querySelector('#btnEditRow')).disabled = true;
        (<HTMLButtonElement>document.querySelector('#btnDeleteRow')).disabled = true;
        (<HTMLButtonElement>document.querySelector('#btnRenameTable')).disabled = true;
        (<HTMLButtonElement>document.querySelector('#btnDeleteTable')).disabled = true;
    });

    diagram.addEventListener(Diagramming.Events.linkSelected, function (sender, args) {
        (<HTMLButtonElement>document.querySelector('#btnInfo')).disabled = false;
    });

    diagram.addEventListener(Diagramming.Events.linkDeselected, function (sender, args) {
        (<HTMLButtonElement>document.querySelector('#btnInfo')).disabled = true;
    });

    // Prepare buttons
    (<HTMLButtonElement>document.querySelector('#btnAddRow')).disabled = true;
    document.querySelector('#btnAddRow').addEventListener("click", (function () { addRowOpen(); }));
    (<HTMLButtonElement>document.querySelector('#btnEditRow')).disabled = true;
    document.querySelector('#btnEditRow').addEventListener("click", (function () { editRowOpen(); }));
    (<HTMLButtonElement>document.querySelector('#btnDeleteRow')).disabled = true;
    document.querySelector('#btnDeleteRow').addEventListener("click", (function () { deleteRow(); }));
    (<HTMLButtonElement>document.querySelector('#btnRenameTable')).disabled = true;
    document.querySelector('#btnRenameTable').addEventListener("click", (function () { renameTableOpen(); }));
    (<HTMLButtonElement>document.querySelector('#btnDeleteTable')).disabled = true;
    document.querySelector('#btnDeleteTable').addEventListener("click", (function () { deleteTable(); }));
    document.querySelector('#btnCreateTable').addEventListener("click", (function () { createTable(); }));
    (<HTMLButtonElement>document.querySelector('#btnInfo')).disabled = true;
    document.querySelector('#btnInfo').addEventListener("click", (function () { infoOpen(); }));

    function addRowOpen() {
        var table = tblClicked || diagram.activeItem;

        if (!table || !(table instanceof Diagramming.TableNode))
            return;

        UI.Dialogs.showTemplatedDialog("Add Row", document.getElementById("addRow-dialog"), addRow, document.getElementById("content"));
    }

    function addRow(result, values) {
        if (result == UI.ModalResult.OK) {
            var table = tblClicked || diagram.activeItem;

            if (!table || !(table instanceof Diagramming.TableNode))
                return;

            table.addRow();

            var lastRow = table.cells.rows - 1;

            // use the cell indexer to access cells by their column and row
            table.getCell(0, lastRow).text = values.get("addRow-fieldName");
            table.getCell(1, lastRow).text = values.get("addRow-fieldType");

            // refresh SQL definition
            generateSQL();
        }
    }

    function editRowOpen() {
        var table = tblClicked || diagram.activeItem;

        if (!table || !(table instanceof Diagramming.TableNode) || rowClicked < 0)
            return;

        var initialValues = new Map();
        initialValues.set("editRow-fieldName", table.getCell(0, rowClicked).text);
        initialValues.set("editRow-fieldType", table.getCell(1, rowClicked).text);
        UI.Dialogs.showTemplatedDialog("Edit Row", document.getElementById("editRow-dialog"), editRow, document.getElementById("content"), initialValues);
    }

    function editRow(result, values) {
        if (result == UI.ModalResult.OK) {
            var table = tblClicked || diagram.getActiveItem();

            if (!table || !(table instanceof Diagramming.TableNode) || rowClicked < 0)
                return;

            // use the cell indexer to access cells by their column and row
            table.getCell(0, rowClicked).text = values.get("editRow-fieldName");
            table.getCell(1, rowClicked).text = values.get("editRow-fieldType");

            // refresh SQL definition
            generateSQL();
        }
    }

    function deleteRow() {
        var table = tblClicked || diagram.activeItem;

        if (!table || !(table instanceof Diagramming.TableNode) || rowClicked < 0)
            return;

        table.deleteRow(rowClicked);

        rowClicked = -1;
        document.querySelector('#btnEditRow').innerHTML = "Edit row";
        document.querySelector('#btnDeleteRow').innerHTML = "Delete row";

        // refresh SQL definition
        generateSQL();
    }

    function createTable() {
        // create a new table with the specified extent
        var table = diagram.factory.createTableNode(
            15 + tableCount * 3, 15 + tableCount * 4, 50, 60);
        table.text = "Table" + tableCount++;
        table.redimTable(2, 0);
        table.scrollable = true;
        table.connectionStyle = Diagramming.ConnectionStyle.Rows;

        // set the first column to resize with the table
        table.getColumn(0).columnStyle = Diagramming.ColumnStyle.AutoWidth;

        generateSQL();
    }

    function deleteTable() {
        var table = tblClicked || diagram.activeItem;

        if (!table || !(table instanceof Diagramming.TableNode))
            return;

        diagram.removeItem(table);

        rowClicked = -1;
        document.querySelector('#btnEditRow').innerHTML = "Edit row";
        document.querySelector('#btnDeleteRow').innerHTML = "Delete row";

        // refresh SQL definition
        generateSQL();
    }

    function renameTableOpen() {
        var table = tblClicked || diagram.activeItem;

        if (!table || !(table instanceof Diagramming.TableNode))
            return;

        UI.Dialogs.showInputDialog("Rename Table", "Table name", renameTable, document.getElementById("content"), null, null, table.text);
    }

    function renameTable(result, value) {
        if (result == UI.ModalResult.OK) {
            var table = tblClicked || diagram.activeItem;

            if (!table || !(table instanceof Diagramming.TableNode))
                return;

            table.text = value;

            // refresh SQL definition
            generateSQL();
        }
    }

    function infoOpen() {
        var link = diagram.activeItem;

        if (!link || !(link instanceof Diagramming.DiagramLink))
            return;

        var dest = link.destination;
        var orgn = link.origin;
        var message = "Linking \ntable " + orgn.text + ", row " +
            link.originIndex + " to\n table " + dest.text +
            ", row " + link.destinationIndex;

        UI.Dialogs.showInfoDialog("Connection Info", message, null, document.getElementById("content"));
    }

    function generateSQL() {
        var text = '';

        // enumerate all tables in the current diagram
        diagram.nodes.forEach(function (table) {
            text += "CREATE TABLE " + table.text + "\r\n(";

            // enumerate all rows of a table
            for (var r = 0; r < table.cells.rows; ++r) {
                // get text of cells in current row
                text += "\t" + table.getCell(0, r).text + " " + table.getCell(1, r).text;
                if (r < table.cells.rows - 1)
                    text += ",\r\n";
            }
            text += "\r\n);\r\n\r\n";
        });
        document.querySelector('#generatedSql').innerHTML = text;
    }
}