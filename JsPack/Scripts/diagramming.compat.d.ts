import { ImageAlign, Thickness, Font, DashStyle, Point, Rect, FontStyle, GraphicsUnit, Size } from "@mindfusion/drawing";
import { EventArgs } from "@mindfusion/controls";
import
{
    MarkStyle, Alignment, LinkShape, LinkTextStyle, ShowAnchors, AutoResize, GridStyle,
    LinkCrossings, ExpandButtonAction, ShadowsStyle, AdjustmentHandles, HandlesStyle,
    SimpleShape, CellFrameStyle, ConnectionStyle, Orientation, ScaleMode,
    DelKeyAction, Behavior, ModificationStart, MouseButtonActions,
    Factory, Theme, SvgContent, Shape, LinkLabel, XmlPersistContext, NodeEffect, Selection, Router, ModifierKeyActions
} from "@mindfusion/diagramming";
import Header from "Diagramming/Lanes/Header";

declare module "@mindfusion/diagramming"
{

    interface AnchorPoint
    {
        /** Gets the horizontal position of this point expressed as percentage of a node's width. */
        getX(): number;
        /** Sets the horizontal position of this point expressed as percentage of a node's width. */
        setX(value: number): void;
        /** Gets the vertical position of this point expressed as percentage of a node's height. */
        getY(): number;
        /** Sets the vertical position of this point expressed as percentage of a node's height. */
        setY(value: number): void;
        /** Gets the column index of a cell with which this anchor point is associated. */
        getColumn(): number;
        /** Sets the column index of a cell with which this anchor point is associated. */
        setColumn(value: number): void;
        /** Gets whether incoming links can be connected to this point. */
        getAllowIncoming(): boolean;
        /** Sets whether incoming links can be connected to this point. */
        setAllowIncoming(value: boolean): void;
        /** Gets whether this point accepts outgoing connections. */
        getAllowOutgoing(): boolean;
        /** Sets whether this point accepts outgoing connections. */
        setAllowOutgoing(value: boolean): void;
        /** Gets the appearance of the anchor point mark. */
        getMarkStyle(): MarkStyle;
        /** Sets the appearance of the anchor point mark. */
        setMarkStyle(value: MarkStyle): void;
        /** Gets the color of the anchor point mark. */
        getColor(): string;
        /** Sets the color of the anchor point mark. */
        setColor(value: string): void;
        /** Gets user-defined data associated with the anchor point. */
        getTag(): any;
        /** Sets user-defined data associated with the anchor point. */
        setTag(value: any): void;
        /** Gets tooltip text that should be displayed when the mouse hovers over an anchor point mark. */
        getToolTip(): string;
        /** Sets tooltip text that should be displayed when the mouse hovers over an anchor point mark. */
        setToolTip(value: string): void;
        /** Gets the size of the anchor point mark. */
        getSize(): number;
        /** Sets the size of the anchor point mark. */
        setSize(value: number): void;
    }

    interface AnchorPattern
    {
        /** Gets the collection of anchor points in this pattern. */
        getPoints(): Array<AnchorPoint>;
        /** Sets the collection of anchor points in this pattern. */
        setPoints(value: Array<AnchorPoint>): void;
        /** Gets the AnchorPattern's unique identifier.
         * @return The AnchorPattern id.
        */
        getId(): string;
    }

    interface Grid
    {
        /** Gets the collection with the topmost column headers. The returned array should not be modified directly. To add and remove column headers to the grid, use the addColumnHeader and removeColumnHeader methods respectively.
             * @return An array containing the topmost column headers.
            */
        getColumnHeaders(): Array<Header>;
        /** Gets the collection with the topmost row headers. The returned array should not be modified directly. To add and remove row headers to the grid, use the addRowHeader and removeRowHeader methods respectively.
         * @return An array containing the topmost row headers.
        */
        getRowHeaders(): Array<Header>;
        /** Gets the number of columns in the grid. */
        getColumnCount(): number;
        /** Sets the number of columns in the grid. */
        setColumnCount(value: number): void;
        /** Gets the number of rows in the grid. */
        getRowCount(): number;
        /** Sets the number of rows in the grid. */
        setRowCount(value: number): void;
        /** Gets the offset of the lane grid from the left side of the document bounds. */
        getLeftMargin(): number;
        /** Sets the offset of the lane grid from the left side of the document bounds. */
        setLeftMargin(value: number): void;
        /** Gets the offset of the lane grid from the top side of the document bounds. */
        getTopMargin(): number;
        /** Sets the offset of the lane grid from the top side of the document bounds. */
        setTopMargin(value: number): void;
        /** Gets the minimum size of a header. */
        getMinHeaderSize(): number;
        /** Sets the minimum size of a header. */
        setMinHeaderSize(value: number): void;
        /** Gets the style of the area above all row headers and to the left of all column headers. */
        getTopLeftAreaStyle(): Style;
        /** Sets the style of the area above all row headers and to the left of all column headers. */
        setTopLeftAreaStyle(value: Style): void;
        /** Gets the text displayed in the top left area. */
        getTopLeftAreaText(): string;
        /** Sets the text displayed in the top left area. */
        setTopLeftAreaText(value: string): void;
        /** Gets a value indicating whether headers will be anchored to the corresponding side (that is, the column header anchored to the top side and the row header anchored to the left side). */
        getHookHeaders(): boolean;
        /** Sets a value indicating whether headers will be anchored to the corresponding side (that is, the column header anchored to the top side and the row header anchored to the left side). */
        setHookHeaders(value: boolean): void;
        /** Gets a value indicating whether lane headers appear at the top of the z-order above all other items. */
        getHeadersOnTop(): boolean;
        /** Sets a value indicating whether lane headers appear at the top of the z-order above all other items. */
        setHeadersOnTop(value: boolean): void;
        /** Gets an array with float values specifying the widths of individual row levels. If a value is non-positive or does not exist because the array has less arguments than the number of rows, then the width is calculated as the maximum width of the rows in that level. */
        getRowHeadersWidths(): Array<number>;
        /** Sets an array with float values specifying the widths of individual row levels. If a value is non-positive or does not exist because the array has less arguments than the number of rows, then the width is calculated as the maximum width of the rows in that level. */
        setRowHeadersWidths(value: Array<number>): void;
        /** Gets an array with float values specifying the heights of individual column levels. If a value is non-positive or does not exist because the array has less arguments than the number of columns, then the height is calculated as the maximum height of the columns in that level. */
        getColumnHeadersHeights(): Array<number>;
        /** Sets an array with float values specifying the heights of individual column levels. If a value is non-positive or does not exist because the array has less arguments than the number of columns, then the height is calculated as the maximum height of the columns in that level. */
        setColumnHeadersHeights(value: Array<number>): void;
        /** Gets a value indicating whether grid cells' text can be in-place edited. */
        getAllowInplaceEdit(): boolean;
        /** Sets a value indicating whether grid cells' text can be in-place edited. */
        setAllowInplaceEdit(value: boolean): void;
        /** Gets a value indicating whether users can resize the headers of the grid interactively. */
        getAllowResizeHeaders(): boolean;
        /** Sets a value indicating whether users can resize the headers of the grid interactively. */
        setAllowResizeHeaders(value: boolean): void;
        /** Gets the total height of all column headers.
         * @return A number representing the height.
        */
        getTotalColumnHeight(): number;
        /** Gets the total width of all row headers.
         * @return A number representing the width.
        */
        getTotalRowWidth(): number;
        /** Gets the number of levels of the column headers.
         * @return A number representing the column depth.
        */
        /** Gets the default style of the grid.
        * @return A Style object representing the style of all grid elements, which do not have an explicitly assigned style.
        */
        getStyle(): Style;
    }

    interface Diagram
    {
        /** Gets a Factory instance that lets you add programmatically new items to the diagram.
         * @return A Factory instance
        */
        getFactory(): Factory;
        /** Gets the nodes contained in this NodeListView.
        * @return An array of all DiagramNodes in this NodeListView.
        */
        getNodes(): Array<DiagramNode>;
        /** Gets The object used for painting the background. */
        getBackBrush(): any;
        /** Sets The object used for painting the background. */
        setBackBrush(value: any): void;
        /** Gets the default shape of shape nodes. */
        getDefaultShape(): Shape;
        /** Sets the default shape of shape nodes. */
        setDefaultShape(value: Shape): void;
        /** Gets an array of Shape objects used to replace FreeFormNode instances with ShapeNode ones when Behavior is set to LinkFreeShapes or DrawFreeShapes. */
        getFreeFormTargets(): Array<Shape>;
        /** Sets an array of Shape objects used to replace FreeFormNode instances with ShapeNode ones when Behavior is set to LinkFreeShapes or DrawFreeShapes. */
        setFreeFormTargets(value: Array<Shape>): void;
        /** Gets the maximum distance between first and last points of a FreeFormNode for which the node's outline is closed automatically. */
        getAutoCloseDistance(): number;
        /** Sets the maximum distance between first and last points of a FreeFormNode for which the node's outline is closed automatically. */
        setAutoCloseDistance(value: number): void;
        /** Gets the radius around dragged free-form adjustment handle in which other points of FreeFormNode are modified too. */
        getFreeFormAttractDistance(): number;
        /** Sets the radius around dragged free-form adjustment handle in which other points of FreeFormNode are modified too. */
        setFreeFormAttractDistance(value: number): void;
        /** Gets the default fill of shape nodes. */
        getShapeBrush(): any;
        /** Sets the default fill of shape nodes. */
        setShapeBrush(value: any): void;
        /** Gets the default fill of links. */
        getLinkBrush(): any;
        /** Sets the default fill of links. */
        setLinkBrush(value: any): void;
        /** Gets the initial shape assigned to new links. */
        getLinkShape(): LinkShape;
        /** Sets the initial shape assigned to new links. */
        setLinkShape(value: LinkShape): void;
        /** Gets the shape displayed as head of new links. */
        getLinkHeadShape(): Shape;
        /** Sets the shape displayed as head of new links. */
        setLinkHeadShape(value: Shape): void;
        /** Gets the shape displayed at the base of new links. */
        getLinkBaseShape(): Shape;
        /** Sets the shape displayed at the base of new links. */
        setLinkBaseShape(value: Shape): void;
        /** Gets the default size of arrowheads. */
        getLinkHeadShapeSize(): number;
        /** Sets the default size of arrowheads. */
        setLinkHeadShapeSize(value: number): void;
        /** Gets the default size of the base shape of new links. */
        getLinkBaseShapeSize(): number;
        /** Sets the default size of the base shape of new links. */
        setLinkBaseShapeSize(value: number): void;
        /** Gets the default number of arrow segments. */
        getLinkSegments(): number;
        /** Sets the default number of arrow segments. */
        setLinkSegments(value: number): void;
        /** Gets a value indicating how the background image is positioned relatively to diagram's boundaries. */
        getBackgroundImageAlign(): ImageAlign;
        /** Sets a value indicating how the background image is positioned relatively to diagram's boundaries. */
        setBackgroundImageAlign(value: ImageAlign): void;
        /** Gets the URL of the Image painted as diagram's background. */
        getBackgroundImageUrl(): string;
        /** Sets the URL of the Image painted as diagram's background. */
        setBackgroundImageUrl(value: string): void;
        /** Gets the Base64-encoded data of the background image. */
        getBackgroundImageContent(): string;
        /** Sets the Base64-encoded data of the background image. */
        setBackgroundImageContent(value: string): void;
        /** Gets a value indicating whether links should avoid nodes by going the shortest path from their origin to their destination without crossing any other nodes. */
        getRouteLinks(): boolean;
        /** Sets a value indicating whether links should avoid nodes by going the shortest path from their origin to their destination without crossing any other nodes. */
        setRouteLinks(value: boolean): void;
        /** Gets the minimal distance between nodes and auto-routed links. */
        getRouteMargin(): number;
        /** Sets the minimal distance between nodes and auto-routed links. */
        setRouteMargin(value: number): void;
        /** Gets a value indicating whether the joints between segments of Polyline and Cascading links should be rounded. */
        getRoundedLinks(): boolean;
        /** Sets a value indicating whether the joints between segments of Polyline and Cascading links should be rounded. */
        setRoundedLinks(value: boolean): void;
        /** Gets the radius of joint arcs of rounded links' segments. */
        getRoundedLinksRadius(): number;
        /** Sets the radius of joint arcs of rounded links' segments. */
        setRoundedLinksRadius(value: number): void;
        /** Gets a value indicating whether the document area should be resized automatically so it fits the diagram contents. */
        getAutoResize(): AutoResize;
        /** Sets a value indicating whether the document area should be resized automatically so it fits the diagram contents. */
        setAutoResize(value: AutoResize): void;
        /** Gets a value indicating whether the alignment grid is visible. */
        getShowGrid(): boolean;
        /** Sets a value indicating whether the alignment grid is visible. */
        setShowGrid(value: boolean): void;
        /** Gets a value indicating whether the diagram items should be aligned to a grid. */
        getAlignToGrid(): boolean;
        /** Sets a value indicating whether the diagram items should be aligned to a grid. */
        setAlignToGrid(value: boolean): void;
        /** Gets the color of the grid points. */
        getGridColor(): string;
        /** Sets the color of the grid points. */
        setGridColor(value: string): void;
        /** Gets the horizontal distance between adjacent grid points. */
        getGridSizeX(): number;
        /** Sets the horizontal distance between adjacent grid points. */
        setGridSizeX(value: number): void;
        /** Gets the vertical distance between adjacent grid points. */
        getGridSizeY(): number;
        /** Sets the vertical distance between adjacent grid points. */
        setGridSizeY(value: number): void;
        /** Gets the horizontal offset of the first point of the alignment grid. */
        getGridOffsetX(): number;
        /** Sets the horizontal offset of the first point of the alignment grid. */
        setGridOffsetX(value: number): void;
        /** Gets the vertical offset of the first point of the alignment grid. */
        getGridOffsetY(): number;
        /** Sets the vertical offset of the first point of the alignment grid. */
        setGridOffsetY(value: number): void;
        /** Gets the visual style of the alignment grid. */
        getGridStyle(): GridStyle;
        /** Sets the visual style of the alignment grid. */
        setGridStyle(value: GridStyle): void;
        /** Gets the size of shapes used to represent grid points. */
        getGridPointSize(): number;
        /** Sets the size of shapes used to represent grid points. */
        setGridPointSize(value: number): void;
        /** Gets the style associated with this diagram. */
        getStyle(): Style;
        /** Sets the style associated with this diagram. */
        setStyle(value: Style): void;
        /** Gets the theme associated with this diagram. */
        getTheme(): Theme;
        /** Sets the theme associated with this diagram. */
        setTheme(value: Theme): void;
        /** Gets custom data associated with this diagram. */
        getTag(): any;
        /** Sets custom data associated with this diagram. */
        setTag(value: any): void;
        /** Gets a value indicating whether multiple selected nodes can be resized simultaneously. */
        getAllowMultipleResize(): boolean;
        /** Sets a value indicating whether multiple selected nodes can be resized simultaneously. */
        setAllowMultipleResize(value: boolean): void;
        /** Gets a value indicating whether users are allowed to draw links that are not connected to any node. */
        getAllowUnconnectedLinks(): boolean;
        /** Sets a value indicating whether users are allowed to draw links that are not connected to any node. */
        setAllowUnconnectedLinks(value: boolean): void;
        /** Gets the default placement and orientation for links' text. */
        getLinkTextStyle(): LinkTextStyle;
        /** Sets the default placement and orientation for links' text. */
        setLinkTextStyle(value: LinkTextStyle): void;
        /** Gets the size of adjustment handles that appear around selected items. */
        getAdjustmentHandlesSize(): number;
        /** Sets the size of adjustment handles that appear around selected items. */
        setAdjustmentHandlesSize(value: number): void;
        /** Gets a value indicating whether adjustment handles are painted when they are disabled. */
        getShowDisabledHandles(): boolean;
        /** Sets a value indicating whether adjustment handles are painted when they are disabled. */
        setShowDisabledHandles(value: boolean): void;
        /** Gets a value indicating whether and when anchor point marks are displayed. */
        getShowAnchors(): ShowAnchors;
        /** Sets a value indicating whether and when anchor point marks are displayed. */
        setShowAnchors(value: ShowAnchors): void;
        /** Gets a value indicating how the control responds to user actions. */
        /** Gets a value indicating whether the lane grid is visible. */
        getShowLaneGrid(): boolean;
        /** Sets a value indicating whether the lane grid is visible. */
        setShowLaneGrid(value: boolean): void;
        /** Gets the lane grid.
        * @return An instance of the MindFusion.Diagramming.Lanes.Grid class.
        */
        getLaneGrid(): Grid;
        /** Gets a value indicating the link direction in which tree branches are expanded. */
        getExpandOnIncoming(): boolean;
        /** Sets a value indicating the link direction in which tree branches are expanded. */
        setExpandOnIncoming(value: boolean): void;
        /** Gets a value indicating whether newly created nodes can be collapsed and expanded by users. */
        getNodesExpandable(): boolean;
        /** Sets a value indicating whether newly created nodes can be collapsed and expanded by users. */
        setNodesExpandable(value: boolean): void;
        /** Gets a value indicating what should happen when a user clicks the +/- button that is displayed near expandable nodes. */
        getExpandButtonAction(): ExpandButtonAction;
        /** Sets a value indicating what should happen when a user clicks the +/- button that is displayed near expandable nodes. */
        setExpandButtonAction(value: ExpandButtonAction): void;
        /** Gets a value specifying how far from a link a click is still considered a hit. */
        getLinkHitDistance(): number;
        /** Sets a value specifying how far from a link a click is still considered a hit. */
        setLinkHitDistance(value: number): void;
        /** Gets a value indicating how to render the intersection points where two links cross each other. */
        getLinkCrossings(): LinkCrossings;
        /** Sets a value indicating how to render the intersection points where two links cross each other. */
        setLinkCrossings(value: LinkCrossings): void;
        /** Gets the radius length of decorations displayed at link intersection points. */
        getCrossingRadius(): number;
        /** Sets the radius length of decorations displayed at link intersection points. */
        setCrossingRadius(value: number): void;
        /** Gets true if undo is enabled, otherwise false. */
        getUndoEnabled(): boolean;
        /** Sets true if undo is enabled, otherwise false. */
        setUndoEnabled(value: boolean): void;
        /** Gets the horizontal offset of diagram items' shadows. */
        getShadowOffsetX(): number;
        /** Sets the horizontal offset of diagram items' shadows. */
        setShadowOffsetX(value: number): void;
        /** Gets the vertical offset of diagram items' shadows. */
        getShadowOffsetY(): number;
        /** Sets the vertical offset of diagram items' shadows. */
        setShadowOffsetY(value: number): void;
        /** Gets a value specifying how diagram items' shadows should be rendered. */
        getShadowsStyle(): ShadowsStyle;
        /** Sets a value specifying how diagram items' shadows should be rendered. */
        setShadowsStyle(value: ShadowsStyle): void;
        /** Gets the location of a shape library file containing custom shape definitions. */
        getShapeLibraryLocation(): string;
        /** Sets the location of a shape library file containing custom shape definitions. */
        setShapeLibraryLocation(value: string): void;
        /** Gets the type of a MindFusion.Diagramming.DiagramNode derived class whose instance should be created when a user starts drawing. */
        getCustomNodeType(): any;
        /** Sets the type of a MindFusion.Diagramming.DiagramNode derived class whose instance should be created when a user starts drawing. */
        setCustomNodeType(value: any): void;
        /** Gets the object used to find paths for auto-routed links when diagram nodes are added or their positions change. */
        getLinkRouter(): Router;
        /** Sets the object used to find paths for auto-routed links when diagram nodes are added or their positions change. */
        setLinkRouter(value: Router): void;
        /** Gets a value indicating whether users are allowed to draw reflexive links. */
        getAllowSelfLoops(): boolean;
        /** Sets a value indicating whether users are allowed to draw reflexive links. */
        setAllowSelfLoops(value: boolean): void;
        /** Gets the underlying Canvas element's bounds. */
        getBounds(): Rect;
        /** Sets the underlying Canvas element's bounds. */
        setBounds(value: Rect): void;
		/** Gets the active diagram element.
		 * @return The active item; null if no item is active.
		*/
		getActiveItem(): DiagramItem;
		/** Gets a Selection instance that represents the selection of items in this diagram.
		 * @return An instance of the Selection class representing the current selection.
		*/
		getSelection(): Selection;
    }

    interface DiagramItem
    {
        /** Gets a string containing the DiagramItem's text. */
        getText(): string;
        /** Sets a string containing the DiagramItem's text. */
        setText(value: string): void;
        /** Gets a string specifying the color of the text of this item. */
        getTextColor(): string;
        /** Sets a string specifying the color of the text of this item. */
        setTextColor(value: string): void;
        /** Gets a string specifying the color of the text outline of this item. */
        getTextStroke(): string;
        /** Sets a string specifying the color of the text outline of this item. */
        setTextStroke(value: string): void;
        /** Gets the width of the text outline of this item. */
        getTextStrokeThickness(): number;
        /** Sets the width of the text outline of this item. */
        setTextStrokeThickness(value: number): void;
        /** Gets the spacing between the item boundaries and its text. */
        getTextPadding(): Thickness;
        /** Sets the spacing between the item boundaries and its text. */
        setTextPadding(value: Thickness): void;
        /** Gets the font used to render this item's text. */
        getFont(): Font;
        /** Sets the font used to render this item's text. */
        setFont(value: Font): void;
        /** Gets an object that specifies how to paint the interior of the DiagramItem. */
        getBrush(): any;
        /** Sets an object that specifies how to paint the interior of the DiagramItem. */
        setBrush(value: any): void;
        /** Gets a string specifying the color used to stroke the item's frame. */
        getStroke(): string;
        /** Sets a string specifying the color used to stroke the item's frame. */
        setStroke(value: string): void;
        /** Gets the line width applied when stroking the item's frame. */
        getStrokeThickness(): number;
        /** Sets the line width applied when stroking the item's frame. */
        setStrokeThickness(value: number): void;
        /** Gets the line dash pattern applied when stroking the item's frame. */
        getStrokeDashStyle(): DashStyle;
        /** Sets the line dash pattern applied when stroking the item's frame. */
        setStrokeDashStyle(value: DashStyle): void;
        /** Gets a custom value associated with this item. */
        getTag(): any;
        /** Sets a custom value associated with this item. */
        setTag(value: any): void;
        /** Gets a custom value associated with this item. */
        getId(): any;
        /** Sets a custom value associated with this item. */
        setId(value: any): void;
        /** Gets the tooltip text that should be displayed when the mouse hovers over this item. */
        getTooltip(): string;
        /** Sets the tooltip text that should be displayed when the mouse hovers over this item. */
        setTooltip(value: string): void;
        /** Gets a weight value used in layout and path-finding algorithms. */
        getWeight(): number;
        /** Sets a weight value used in layout and path-finding algorithms. */
        setWeight(value: number): void;
        /** Gets a value indicating whether the position of this item should not be changed by automatic layout methods. */
        getIgnoreLayout(): boolean;
        /** Sets a value indicating whether the position of this item should not be changed by automatic layout methods. */
        setIgnoreLayout(value: boolean): void;
        /** Gets an object containing properties of the node, used by some layout algorithms.
         * @return An object containing the layout properties.
        */
        getLayoutTraits(): any;
        /** Gets the z-order position of the object. */
        getZIndex(): number;
        /** Sets the z-order position of the object. */
        setZIndex(value: number): void;
        /** Gets a value indicating whether a diagram item is selected. */
        getSelected(): boolean;
        /** Sets a value indicating whether a diagram item is selected. */
        setSelected(value: boolean): void;
        /** Gets the hyperlink associated with this diagram item. */
        getHyperLink(): string;
        /** Sets the hyperlink associated with this diagram item. */
        setHyperLink(value: string): void;
        /** Gets a value indicating whether this item is visible. */
        getVisible(): boolean;
        /** Sets a value indicating whether this item is visible. */
        setVisible(value: boolean): void;
        /** Gets a value indicating whether users are allowed to modify this item. */
        getLocked(): boolean;
        /** Sets a value indicating whether users are allowed to modify this item. */
        setLocked(value: boolean): void;
        /** Gets the color used to draw the shadow of this item. */
        getShadowColor(): string;
        /** Sets the color used to draw the shadow of this item. */
        setShadowColor(value: string): void;
        /** Gets the horizontal offset of the item's shadow. */
        getShadowOffsetX(): number;
        /** Sets the horizontal offset of the item's shadow. */
        setShadowOffsetX(value: number): void;
        /** Gets the vertical offset of the item's shadow. */
        getShadowOffsetY(): number;
        /** Sets the vertical offset of the item's shadow. */
        setShadowOffsetY(value: number): void;
        /** Gets the style associated with this item. */
        getStyle(): Style;
        /** Sets the style associated with this item. */
        setStyle(value: Style): void;
        /** Gets how the text should be aligned inside the ShapeNode's bounding rectangle. */
        getTextAlignment(): Alignment;
        /** Sets how the text should be aligned inside the ShapeNode's bounding rectangle. */
        setTextAlignment(value: Alignment): void;
        /** Gets how the text should be vertically aligned inside the ShapeNode's bounding rectangle. */
        getLineAlignment(): Alignment;
        /** Sets how the text should be vertically aligned inside the ShapeNode's bounding rectangle. */
        setLineAlignment(value: Alignment): void;
    }

    interface DiagramNode
    {
        getIncomingLinks(): Array<DiagramLink>;
        /** Gets the outgoing links collection of this node.
         * @return An array containing outgoing DiagramLink objects.
        */
        getOutgoingLinks(): Array<DiagramLink>;
        /** Gets a value indicating whether users are allowed to draw incoming links to this node. */
        getAllowIncomingLinks(): boolean;
        /** Sets a value indicating whether users are allowed to draw incoming links to this node. */
        setAllowIncomingLinks(value: boolean): void;
        /** Gets a value indicating whether users are allowed to draw outgoing links from this node. */
        getAllowOutgoingLinks(): boolean;
        /** Sets a value indicating whether users are allowed to draw outgoing links from this node. */
        setAllowOutgoingLinks(value: boolean): void;
        /** Gets the angle at which this node is rotated. */
        getRotationAngle(): number;
        /** Sets the angle at which this node is rotated. */
        setRotationAngle(value: number): void;
        /** Gets the kinds of modifications that end-users are permitted to perform on the node. */
        getEnabledHandles(): AdjustmentHandles;
        /** Sets the kinds of modifications that end-users are permitted to perform on the node. */
        setEnabledHandles(value: AdjustmentHandles): void;
        /** Gets a value indicating how the node adjustment handles behave and what do they look like. */
        getHandlesStyle(): HandlesStyle;
        /** Sets a value indicating how the node adjustment handles behave and what do they look like. */
        setHandlesStyle(value: HandlesStyle): void;
        /** Gets a value indicating whether this node is considered an obstacle by the link-routing algorithm. */
        getObstacle(): boolean;
        /** Sets a value indicating whether this node is considered an obstacle by the link-routing algorithm. */
        setObstacle(value: boolean): void;
        /** Gets a value indicating whether users are allowed to expand or collapse the tree branch that starts at this node. */
        getExpandable(): boolean;
        /** Sets a value indicating whether users are allowed to expand or collapse the tree branch that starts at this node. */
        setExpandable(value: boolean): void;
        /** Gets a value indicating whether the tree branch that starts at this node is expanded or collapsed. */
        getExpanded(): boolean;
        /** Sets a value indicating whether the tree branch that starts at this node is expanded or collapsed. */
        setExpanded(value: boolean): void;
        /** Gets the anchor points to which links are attached when connected to the node. */
        getAnchorPattern(): AnchorPattern;
        /** Sets the anchor points to which links are attached when connected to the node. */
        setAnchorPattern(value: AnchorPattern): void;
        /** Gets a list containing all effects applied to the nodes of this diagram. */
        getNodeEffects(): Array<any>;
        /** Sets a list containing all effects applied to the nodes of this diagram. */
        setNodeEffects(value: Array<any>): void;
        /** Gets the rectangle that defines the position of the diagram node. */
		getBounds(): Rect;
    }

    interface DiagramLink extends DiagramItem
    {
        /** Gets the type of link segments and how they are positioned relatively to each other. */
        getShape(): LinkShape;
        /** Sets the type of link segments and how they are positioned relatively to each other. */
        setShape(value: LinkShape): void;
        /** Gets the control points of this link. */
        getControlPoints(): Array<Point>;
        /** Sets the control points of this link. */
        setControlPoints(value: Array<Point>): void;
        /** Gets the link's text placement and orientation. */
        getTextStyle(): LinkTextStyle;
        /** Sets the link's text placement and orientation. */
        setTextStyle(value: LinkTextStyle): void;
        /** Gets the link's text alignment. */
        getTextAlignment(): Alignment;
        /** Sets the link's text alignment. */
        setTextAlignment(value: Alignment): void;
        /** Gets the origin node of this DiagramLink. */
        getOrigin(): DiagramNode;
        /** Sets the origin node of this DiagramLink. */
        setOrigin(value: DiagramNode): void;
        /** Gets the destination node of this DiagramLink. */
        getDestination(): DiagramNode;
        /** Sets the destination node of this DiagramLink. */
        setDestination(value: DiagramNode): void;
        /** Gets the anchor point to which a link is connected at its origin. */
        getOriginAnchor(): number;
        /** Sets the anchor point to which a link is connected at its origin. */
        setOriginAnchor(value: number): void;
        /** Gets the anchor point to which a link is connected at its destination. */
        getDestinationAnchor(): number;
        /** Sets the anchor point to which a link is connected at its destination. */
        setDestinationAnchor(value: number): void;
        /** Gets the origin table row of this DiagramLink. */
        getOriginIndex(): number;
        /** Sets the origin table row of this DiagramLink. */
        setOriginIndex(value: number): void;
        /** Gets the destination table row of this DiagramLink. */
        getDestinationIndex(): number;
        /** Sets the destination table row of this DiagramLink. */
        setDestinationIndex(value: number): void;
        /** Updates the link's internal state after the link's control points have been changed. */
        updateFromPoints(): void;
        /** Gets the first control point of this link. */
        getStartPoint(): Point;
        /** Sets the first control point of this link. */
        setStartPoint(value: Point): void;
        /** Gets the last control point of this link. */
        getEndPoint(): Point;
        /** Sets the last control point of this link. */
        setEndPoint(value: Point): void;
        /** Gets the shape to display at the beginning of this link. */
        getBaseShape(): Shape;
        /** Sets the shape to display at the beginning of this link. */
        setBaseShape(value: Shape): void;
        /** Gets the size of the shape displayed at the beginning of this link. */
        getBaseShapeSize(): number;
        /** Sets the size of the shape displayed at the beginning of this link. */
        setBaseShapeSize(value: number): void;
        /** Gets the shape to display at the end of this link. */
        getHeadShape(): Shape;
        /** Sets the shape to display at the end of this link. */
        setHeadShape(value: Shape): void;
        /** Gets the size of the shape displayed at the end of this link. */
        getHeadShapeSize(): number;
        /** Sets the size of the shape displayed at the end of this link. */
        setHeadShapeSize(value: number): void;
        /** Gets an object that specifies how to paint the interior of the link's base shape. */
        getBaseBrush(): any;
        /** Sets an object that specifies how to paint the interior of the link's base shape. */
        setBaseBrush(value: any): void;
        /** Gets an object that specifies how to paint the interior of the link's arrowhead shape. */
        getHeadBrush(): any;
        /** Sets an object that specifies how to paint the interior of the link's arrowhead shape. */
        setHeadBrush(value: any): void;
        /** Gets a value indicating whether a link should avoid nodes by going the shortest path from its origin to its destination without crossing any other nodes. */
        getAutoRoute(): boolean;
        /** Sets a value indicating whether a link should avoid nodes by going the shortest path from its origin to its destination without crossing any other nodes. */
        setAutoRoute(value: boolean): void;
        /** Gets a value indicating whether a link automatically adjusts its end points' positions in order to keep pointing to the centers of nodes that it connects. */
        getDynamic(): boolean;
        /** Sets a value indicating whether a link automatically adjusts its end points' positions in order to keep pointing to the centers of nodes that it connects. */
        setDynamic(value: boolean): void;
        /** Gets the color of arrowhead outlines. */
        getHeadStroke(): string;
        /** Sets the color of arrowhead outlines. */
        setHeadStroke(value: string): void;
        /** Gets the line width of arrowhead outlines. */
        getHeadStrokeThickness(): number;
        /** Sets the line width of arrowhead outlines. */
        setHeadStrokeThickness(value: number): void;
        /** Gets the dash pattern of arrowhead outlines. */
        getHeadStrokeDashStyle(): DashStyle;
        /** Sets the dash pattern of arrowhead outlines. */
        setHeadStrokeDashStyle(value: DashStyle): void;
    }

    interface ShapeNode extends DiagramNode
    {
        /** Gets a value indicating whether text is rotated when the node is rotated. */
        getRotateText(): boolean;
        /** Sets a value indicating whether text is rotated when the node is rotated. */
        setRotateText(value: boolean): void;
        /** Gets a value indicating whether the image is rotated when the node is rotated. */
        getRotateImage(): boolean;
        /** Sets a value indicating whether the image is rotated when the node is rotated. */
        setRotateImage(value: boolean): void;
        /** Gets the HTMLImageElement displayed inside this node. */
        getImage(): any;
        /** Sets the HTMLImageElement displayed inside this node. */
        setImage(value: any): void;
        /** Gets the alignment for the image of this node. */
        getImageAlign(): ImageAlign;
        /** Sets the alignment for the image of this node. */
        setImageAlign(value: ImageAlign): void;
        /** Gets the padding distance between node borders and image. */
        getImagePadding(): Thickness;
        /** Sets the padding distance between node borders and image. */
        setImagePadding(value: Thickness): void;
        /** Gets a value indicating whether this shape node is transparent. */
        getTransparent(): boolean;
        /** Sets a value indicating whether this shape node is transparent. */
        setTransparent(value: boolean): void;
        /** Gets a reference to the node's geometric shape definition. */
        getShape(): Shape;
        /** Sets a reference to the node's geometric shape definition. */
        setShape(value: Shape): void;
        /** Gets the URL of the image displayed in this ShapeNode. */
        getImageLocation(): string;
        /** Sets the URL of the image displayed in this ShapeNode. */
        setImageLocation(value: string): void;
        /** Gets the Base64-encoded data of the image displayed in this ShapeNode. */
        getImageContent(): string;
        /** Sets the Base64-encoded data of the image displayed in this ShapeNode. */
        setImageContent(value: string): void;
        /** Gets a value indicating whether styled text rendering is enabled. */
        getEnableStyledText(): boolean;
        /** Sets a value indicating whether styled text rendering is enabled. */
        setEnableStyledText(value: boolean): void;
        /** Gets a value indicating whether the node's shape flips when an edge is dragged over its opposite edge. */
        getAllowFlip(): boolean;
        /** Sets a value indicating whether the node's shape flips when an edge is dragged over its opposite edge. */
        setAllowFlip(value: boolean): void;
        /** Gets a value indicating whether the node's shape is flipped horizontally. */
        getFlipX(): boolean;
        /** Sets a value indicating whether the node's shape is flipped horizontally. */
        setFlipX(value: boolean): void;
        /** Gets a value indicating whether the node's shape is flipped vertically. */
        getFlipY(): boolean;
        /** Sets a value indicating whether the node's shape is flipped vertically. */
        setFlipY(value: boolean): void;
    }

    interface TableNode extends DiagramNode
    {
        /** Gets the shape of the table's outline. */
        getShape(): SimpleShape;
        /** Sets the shape of the table's outline. */
        setShape(value: SimpleShape): void;
        /** Gets the height of the table's caption area. */
        getCaptionHeight(): number;
        /** Sets the height of the table's caption area. */
        setCaptionHeight(value: number): void;
        /** Gets the style of the cell frame lines. */
        getCellFrameStyle(): CellFrameStyle;
        /** Sets the style of the cell frame lines. */
        setCellFrameStyle(value: CellFrameStyle): void;
        /** Gets a value indicating whether drawing a link from/to this table should connect a row of the table, or the whole table as an integral entity. */
        getConnectionStyle(): ConnectionStyle;
        /** Sets a value indicating whether drawing a link from/to this table should connect a row of the table, or the whole table as an integral entity. */
        setConnectionStyle(value: ConnectionStyle): void;
        /** Gets the number of rows in the table. */
        getRowCount(): number;
        /** Sets the number of rows in the table. */
        setRowCount(value: number): void;
        /** Gets the number of columns in the table. */
        getColumnCount(): number;
        /** Sets the number of columns in the table. */
        setColumnCount(value: number): void;
        /** Gets a value indicating whether the user is allowed to scroll the table rows. */
        getScrollable(): boolean;
        /** Sets a value indicating whether the user is allowed to scroll the table rows. */
        setScrollable(value: boolean): void;
        /** Gets an object that specifies how to fill the caption bar. */
        getCaptionBackBrush(): any;
        /** Sets an object that specifies how to fill the caption bar. */
        setCaptionBackBrush(value: any): void;
        /** Gets the font used to render the table's caption text. */
        getCaptionFont(): Font;
        /** Sets the font used to render the table's caption text. */
        setCaptionFont(value: Font): void;
        /** Gets a value indicating whether styled text rendering is enabled. */
        getEnableStyledText(): boolean;
        /** Sets a value indicating whether styled text rendering is enabled. */
        setEnableStyledText(value: boolean): void;
        /** Gets a value indicating whether users are allowed to resize table columns. */
        getAllowResizeColumns(): boolean;
        /** Sets a value indicating whether users are allowed to resize table columns. */
        setAllowResizeColumns(value: boolean): void;
        /** Gets a value indicating whether users are allowed to resize table rows. */
        getAllowResizeRows(): boolean;
        /** Sets a value indicating whether users are allowed to resize table rows. */
        setAllowResizeRows(value: boolean): void;
        /** Gets the table's current scroll position. */
        getCurrentScrollRow(): number;
        /** Sets the table's current scroll position. */
        setCurrentScrollRow(value: number): void;
    }

    interface ContainerNode extends DiagramNode
    {
        /** Gets a value indicating whether child items should be clipped by container boundaries. */
        getClipChildren(): boolean;
        /** Sets a value indicating whether child items should be clipped by container boundaries. */
        setClipChildren(value: boolean): void;
        /** Gets the shape of the container's outline. */
        getShape(): SimpleShape;
        /** Sets the shape of the container's outline. */
        setShape(value: SimpleShape): void;
        /** Gets the height of the container's caption area. */
        getCaptionHeight(): number;
        /** Sets the height of the container's caption area. */
        setCaptionHeight(value: number): void;
        /** Gets a value indicating whether users are allowed to fold this container. */
        getFoldable(): boolean;
        /** Sets a value indicating whether users are allowed to fold this container. */
        setFoldable(value: boolean): void;
        /** Gets a value indicating whether the container is folded. */
        getFolded(): boolean;
        /** Sets a value indicating whether the container is folded. */
        setFolded(value: boolean): void;
        /** Gets a value indicating the size of the fold/unfold icon. */
        getFoldIconSize(): number;
        /** Sets a value indicating the size of the fold/unfold icon. */
        setFoldIconSize(value: number): void;
        /** Gets a value indicating whether users are allowed to add child nodes to this container. */
        getAllowAddChildren(): boolean;
        /** Sets a value indicating whether users are allowed to add child nodes to this container. */
        setAllowAddChildren(value: boolean): void;
        /** Gets a value indicating whether users are allowed to remove child nodes from the container. */
        getAllowRemoveChildren(): boolean;
        /** Sets a value indicating whether users are allowed to remove child nodes from the container. */
        setAllowRemoveChildren(value: boolean): void;
        /** Gets an object that specifies how to fill the caption bar. */
        getCaptionBackBrush(): any;
        /** Sets an object that specifies how to fill the caption bar. */
        setCaptionBackBrush(value: any): void;
        /** Gets a value indicating whether styled caption text rendering is enabled. */
        getEnableStyledText(): boolean;
        /** Sets a value indicating whether styled caption text rendering is enabled. */
        setEnableStyledText(value: boolean): void;
        /** Gets the size of the container in unfolded state.
         * @return The size of the container in unfolded state.
        */
        getUnfoldedSize(): Size;
    }

    interface SvgNode extends DiagramNode
    {
        /** Gets an SvgContent instance representing the SVG drawing rendered in this node. */
        getContent(): SvgContent;
        /** Sets an SvgContent instance representing the SVG drawing rendered in this node. */
        setContent(value: SvgContent): void;
    }

    interface VideoNode extends DiagramNode
    {
        /** Gets the URL of the video stream displayed in this VideoNode. */
        getVideoLocation(): string;
        /** Sets the URL of the video stream displayed in this VideoNode. */
        setVideoLocation(value: string): void;
    }

    interface FreeFormNode extends DiagramNode
    {
        /** Gets a value indicating whether the node's shape is closed. */
        getClosed(): boolean;
        /** Sets a value indicating whether the node's shape is closed. */
        setClosed(value: boolean): void;
        /** Gets the node's outline points. */
        getPoints(): Array<Point>;
        /** Sets the node's outline points. */
        setPoints(value: Array<Point>): void;
    }

    interface CompositeNode extends DiagramNode
    {
        /** Gets a value specifying whether contents will clip to outline, when an outline component is used. */
        getClipToOutline(): boolean;
        /** Sets a value specifying whether contents will clip to outline, when an outline component is used. */
        setClipToOutline(value: boolean): void;
    }

    interface ControlNode extends DiagramNode
    {
        /** Gets the content element of this node.
        * @return The div element hosting HTML content generated from Template.
        */
        getContent(): any;
        /** Gets the HTML string representing the DOM content rendered in this node. */
        getTemplate(): string;
        /** Sets the HTML string representing the DOM content rendered in this node. */
        setTemplate(value: string): void;
    }

    interface Cell
    {
        /** Gets a string containing the cell's text. */
        getText(): string;
        /** Sets a string containing the cell's text. */
        setText(value: string): void;
        /** Gets how the text should be aligned inside the cell's bounding rectangle. */
        getTextAlignment(): Alignment;
        /** Sets how the text should be aligned inside the cell's bounding rectangle. */
        setTextAlignment(value: Alignment): void;
        /** Gets how the text should be vertically aligned inside the cell's bounding rectangle. */
        getLineAlignment(): Alignment;
        /** Sets how the text should be vertically aligned inside the cell's bounding rectangle. */
        setLineAlignment(value: Alignment): void;
        /** Gets the HTMLImageElement displayed inside this cell. */
        getImage(): any;
        /** Sets the HTMLImageElement displayed inside this cell. */
        setImage(value: any): void;
        /** Gets the alignment for the image of this cell. */
        getImageAlign(): ImageAlign;
        /** Sets the alignment for the image of this cell. */
        setImageAlign(value: ImageAlign): void;
        /** Gets the padding distance between cell borders and image. */
        getImagePadding(): Thickness;
        /** Sets the padding distance between cell borders and image. */
        setImagePadding(value: Thickness): void;
        /** Gets the URL of the image displayed inside this cell. */
        getImageLocation(): string;
        /** Sets the URL of the image displayed inside this cell. */
        setImageLocation(value: string): void;
        /** Gets the Base64-encoded data of the image displayed inside this cell. */
        getImageContent(): string;
        /** Sets the Base64-encoded data of the image displayed inside this cell. */
        setImageContent(value: string): void;
        /** Gets the font used to render this cell's text. */
        getFont(): Font;
        /** Sets the font used to render this cell's text. */
        setFont(value: Font): void;
        /** Gets an object that specifies how to paint the interior of this cell. */
        getBrush(): any;
        /** Sets an object that specifies how to paint the interior of this cell. */
        setBrush(value: any): void;
        /** Gets A string value identifying the color of the text. */
        getTextColor(): string;
        /** Sets A string value identifying the color of the text. */
        setTextColor(value: string): void;
        /** Gets the number of columns spanned by this cell. */
        getColumnSpan(): number;
        /** Sets the number of columns spanned by this cell. */
        setColumnSpan(value: number): void;
        /** Gets the number of rows spanned by this cell. */
        getRowSpan(): number;
        /** Sets the number of rows spanned by this cell. */
        setRowSpan(value: number): void;
        /** Gets the tooltip text that should be displayed when the mouse hovers over this table cell. */
        getTooltip(): string;
        /** Sets the tooltip text that should be displayed when the mouse hovers over this table cell. */
        setTooltip(value: string): void;
    }

    interface Style
    {
        /** Gets the brush used to fill the interior of diagram items. */
        getBrush(): any;
        /** Sets the brush used to fill the interior of diagram items. */
        setBrush(value: any): void;
        /** Gets the brush used to fill the diagram background. */
        getBackBrush(): any;
        /** Sets the brush used to fill the diagram background. */
        setBackBrush(value: any): void;
        /** Gets the color used to stroke the frame of diagram items. */
        getStroke(): string;
        /** Sets the color used to stroke the frame of diagram items. */
        setStroke(value: string): void;
        /** Gets the line width applied when stroking the frame of diagram items. */
        getStrokeThickness(): number;
        /** Sets the line width applied when stroking the frame of diagram items. */
        setStrokeThickness(value: number): void;
        /** Gets the line dash pattern applied when stroking the frame of diagram items. */
        getStrokeDashStyle(): DashStyle;
        /** Sets the line dash pattern applied when stroking the frame of diagram items. */
        setStrokeDashStyle(value: DashStyle): void;
        /** Gets the color used to draw text of diagram items. */
        getTextColor(): string;
        /** Sets the color used to draw text of diagram items. */
        setTextColor(value: string): void;
        /** Gets the name of the font used to draw text of diagram items. */
        getFontName(): string;
        /** Sets the name of the font used to draw text of diagram items. */
        setFontName(value: string): void;
        /** Gets the size of the font used to draw text of diagram items. */
        getFontSize(): number;
        /** Sets the size of the font used to draw text of diagram items. */
        setFontSize(value: number): void;
        /** Gets the style of the font used to draw text of diagram items. */
        getFontStyle(): FontStyle;
        /** Sets the style of the font used to draw text of diagram items. */
        setFontStyle(value: FontStyle): void;
        /** Gets the color used to draw shadows of diagram items. */
        getShadowColor(): string;
        /** Sets the color used to draw shadows of diagram items. */
        setShadowColor(value: string): void;
        /** Gets a list containing all effects applied to the nodes of this diagram. */
        getNodeEffects(): Array<NodeEffect>;
        /** Sets a list containing all effects applied to the nodes of this diagram. */
        setNodeEffects(value: Array<NodeEffect>): void;
    }

    interface DiagramView
    {
        /** Gets a value indicating whether in-place editing of the text of objects is enabled. */
        getAllowInplaceEdit(): boolean;
        /** Sets a value indicating whether in-place editing of the text of objects is enabled. */
        setAllowInplaceEdit(value: boolean): void;
        /** Gets a value that specifies what action should be performed when the user hits the Del key. */
        getDelKeyAction(): DelKeyAction;
        /** Sets a value that specifies what action should be performed when the user hits the Del key. */
        setDelKeyAction(value: DelKeyAction): void;
        /** Gets a value indicating whether handling of mouse events is enabled. */
        getEnabled(): boolean;
        /** Sets a value indicating whether handling of mouse events is enabled. */
        setEnabled(value: boolean): void;
        /** Gets a value indicating whether virtual scroll mode is enabled. */
        getVirtualScroll(): boolean;
        /** Sets a value indicating whether virtual scroll mode is enabled. */
        setVirtualScroll(value: boolean): void;
        /** Gets a value indicating how the control responds to user actions. */
        getBehavior(): Behavior;
        /** Sets a value indicating how the control responds to user actions. */
        setBehavior(value: Behavior): void;
        /** Gets the HTML string representing the DOM content, rendered by default in newly created ControlNode objects. */
        getDefaultControlTemplate(): string;
        /** Sets the HTML string representing the DOM content, rendered by default in newly created ControlNode objects. */
        setDefaultControlTemplate(value: string): void;
        /** Gets how users can start modifying diagram items. */
        getModificationStart(): ModificationStart;
        /** Sets how users can start modifying diagram items. */
        setModificationStart(value: ModificationStart): void;
        /** Gets the delay in milliseconds before a tooltip is shown. */
        getTooltipDelay(): number;
        /** Sets the delay in milliseconds before a tooltip is shown. */
        setTooltipDelay(value: number): void;
        /** Gets a value indicating whether the magnifier tool is currently enabled. */
        getMagnifierEnabled(): boolean;
        /** Sets a value indicating whether the magnifier tool is currently enabled. */
        setMagnifierEnabled(value: boolean): void;
        /** Gets the zoom factor of the magnifier tool. */
        getMagnifierFactor(): number;
        /** Sets the zoom factor of the magnifier tool. */
        setMagnifierFactor(value: number): void;
        /** Gets the width of the magnifier tool. */
        getMagnifierWidth(): number;
        /** Sets the width of the magnifier tool. */
        setMagnifierWidth(value: number): void;
        /** Gets the height of the magnifier tool. */
        getMagnifierHeight(): number;
        /** Sets the height of the magnifier tool. */
        setMagnifierHeight(value: number): void;
        /** Gets the thickness of the magnifier frame. */
        getMagnifierFrameThickness(): number;
        /** Sets the thickness of the magnifier frame. */
        setMagnifierFrameThickness(value: number): void;
        /** Gets a value indicating whether to enhance the effect of a magnifier lense by using a gradient shading. */
        getMagnifierShading(): boolean;
        /** Sets a value indicating whether to enhance the effect of a magnifier lense by using a gradient shading. */
        setMagnifierShading(value: boolean): void;
        /** Gets a reference to the geometric shape definition of the magnifier tool. */
        getMagnifierShape(): Shape;
        /** Sets a reference to the geometric shape definition of the magnifier tool. */
        setMagnifierShape(value: Shape): void;
        /** Gets the color of the magnifier tool's frame. */
        getMagnifierFrameColor(): string;
        /** Sets the color of the magnifier tool's frame. */
        setMagnifierFrameColor(value: string): void;
        /** Gets the color of the magnifier tool's secondary frame. */
        getMagnifierSecondaryFrameColor(): string;
        /** Sets the color of the magnifier tool's secondary frame. */
        setMagnifierSecondaryFrameColor(value: string): void;
        /** Gets an object that allows changing the function of keyboard modifier keys such as Ctrl and Alt.
         * @return An instance of the ModifierKeyActions class.
        */
        getModifierKeyActions(): ModifierKeyActions;
        /** Gets a combination of flags that specify what actions can be performed via the left mouse button. */
        getLeftButtonActions(): MouseButtonActions;
        /** Sets a combination of flags that specify what actions can be performed via the left mouse button. */
        setLeftButtonActions(value: MouseButtonActions): void;
        /** Gets a combination of flags that specify what actions can be performed via the middle mouse button. */
        getMiddleButtonActions(): MouseButtonActions;
        /** Sets a combination of flags that specify what actions can be performed via the middle mouse button. */
        setMiddleButtonActions(value: MouseButtonActions): void;
        /** Gets a combination of flags that specify what actions can be performed via the right mouse button. */
        getRightButtonActions(): MouseButtonActions;
        /** Sets a combination of flags that specify what actions can be performed via the right mouse button. */
        setRightButtonActions(value: MouseButtonActions): void;
        /** Gets a value indicating whether auto scrolling of the document area is enabled. */
        getAutoScroll(): boolean;
        /** Sets a value indicating whether auto scrolling of the document area is enabled. */
        setAutoScroll(value: boolean): void;
        /** Gets the size of the auto scroll zone near the edges of the control. */
        getScrollZoneSize(): number;
        /** Sets the size of the auto scroll zone near the edges of the control. */
        setScrollZoneSize(value: number): void;
        /** Gets the amount by which to auto-scroll the view when the mouse leaves the view boundaries while drawing. */
        getAutoScrollAmount(): number;
        /** Sets the amount by which to auto-scroll the view when the mouse leaves the view boundaries while drawing. */
        setAutoScrollAmount(value: number): void;
        /** Gets the zoom factor. */
        getZoomFactor(): number;
        /** Sets the zoom factor. */
        setZoomFactor(value: number): void;
        /** Gets the unit of measure used for logical coordinates. */
        getMeasureUnit(): GraphicsUnit;
        /** Sets the unit of measure used for logical coordinates. */
        setMeasureUnit(value: GraphicsUnit): void;
		/** Returns the visible portion of the view area.
		 * @return A Rect instance specifying the viewport coordinates.
		*/
		getViewport(): Rect;
    }

    interface Overview
    {
        getViewport(): Rect;
        /** Gets whether mouse events are enabled */
        getEnabled(): boolean;
        /** Sets whether mouse events are enabled */
        setEnabled(value: boolean): void;
        /** Gets a value indicating whether to fit the whole diagram inside the overview control. */
        getScaleMode(): ScaleMode;
        /** Sets a value indicating whether to fit the whole diagram inside the overview control. */
        setScaleMode(value: ScaleMode): void;
        /** Gets a fixed scale factor to be used when FitAll is disabled. */
        getScaleFactor(): number;
        /** Sets a fixed scale factor to be used when FitAll is disabled. */
        setScaleFactor(value: number): void;
        /** Gets a value indicating whether users are allowed to zoom the diagram by resizing the overview's viewport tracker rectangle. */
        getAllowZoom(): boolean;
        /** Sets a value indicating whether users are allowed to zoom the diagram by resizing the overview's viewport tracker rectangle. */
        setAllowZoom(value: boolean): void;
        /** Gets the amount by which to auto-scroll the view when the mouse leaves the view boundaries while drawing. */
        getAutoScrollAmount(): number;
        /** Sets the amount by which to auto-scroll the view when the mouse leaves the view boundaries while drawing. */
        setAutoScrollAmount(value: number): void;
        /** Gets the background color of the control. */
        getBackColor(): string;
        /** Sets the background color of the control. */
        setBackColor(value: string): void;
        /** Sets the DiagramView shown by this Overview.*/
        setDiagramView(diagramView: DiagramView): void;
    }

    interface NodeListView
    {
        /** Gets the nodes contained in this NodeListView.
         * @return An array of all DiagramNodes in this NodeListView.
        */
        getNodes(): Array<DiagramNode>;
        /** Gets the default size of the nodes in the list view. */
        getDefaultNodeSize(): Size;
        /** Sets the default size of the nodes in the list view. */
        setDefaultNodeSize(value: Size): void;
        /** Gets the default size of the icons in the list view. */
        getIconSize(): Size;
        /** Sets the default size of the icons in the list view. */
        setIconSize(value: Size): void;
        /** Gets the orientation of the nodes' layout. */
        getOrientation(): Orientation;
        /** Sets the orientation of the nodes' layout. */
        setOrientation(value: Orientation): void;
        /** Gets the space left between NodeListView borders and its contents. */
        getPadding(): number;
        /** Sets the space left between NodeListView borders and its contents. */
        setPadding(value: number): void;
        /** Gets the location of a shape library file containing custom shape definitions. */
        getShapeLibraryLocation(): string;
        /** Sets the location of a shape library file containing custom shape definitions. */
        setShapeLibraryLocation(value: string): void;
        /** Gets a value indicating whether handling of mouse events is possible. */
        getEnabled(): boolean;
        /** Sets a value indicating whether handling of mouse events is possible. */
        setEnabled(value: boolean): void;
        /** Gets the delay before a tooltip is shown. */
        getTooltipDelay(): number;
        /** Sets the delay before a tooltip is shown. */
        setTooltipDelay(value: number): void;
        /** Gets the currently dragged from the node list diagram node.
         * @return The dragged diagram node.
        */
        getDraggedNode(): DiagramNode;
    }

    interface Ruler
    {
        /** Gets the measure units displayed in the ruler scales. */
        getUnit(): GraphicsUnit;
        /** Sets the measure units displayed in the ruler scales. */
        setUnit(value: GraphicsUnit): void;
        /** Gets the background color of the control. */
        getBackColor(): string;
        /** Sets the background color of the control. */
        setBackColor(value: string): void;
        /** Gets the foreground color of the control. */
        getForeColor(): string;
        /** Sets the foreground color of the control. */
        setForeColor(value: string): void;
        /** Gets the color used to paint the projection of the active node. */
        getProjectionColor(): string;
        /** Sets the color used to paint the projection of the active node. */
        setProjectionColor(value: string): void;
        /** Gets the color of the alignment guide lines. */
        getGuideColor(): string;
        /** Sets the color of the alignment guide lines. */
        setGuideColor(value: string): void;
        /** Gets the color used to paint text in the ruler. */
        getTextColor(): string;
        /** Sets the color used to paint text in the ruler. */
        setTextColor(value: string): void;
        /** Gets the color of the mouse pointer's projections. */
        getPointerColor(): string;
        /** Sets the color of the mouse pointer's projections. */
        setPointerColor(value: string): void;
        /** Gets a value indicating whether the alignment guides are enabled. */
        getEnableGuides(): boolean;
        /** Sets a value indicating whether the alignment guides are enabled. */
        setEnableGuides(value: boolean): void;
        /** Gets a value indicating whether the horizontal ruler scale is visible. */
        getHorizontalScaleVisible(): boolean;
        /** Sets a value indicating whether the horizontal ruler scale is visible. */
        setHorizontalScaleVisible(value: boolean): void;
        /** Gets a value indicating whether the vertical ruler scale is visible. */
        getVerticalScaleVisible(): boolean;
        /** Sets a value indicating whether the vertical ruler scale is visible. */
        setVerticalScaleVisible(value: boolean): void;
        /** Gets whether the horizontal scale should show negated values, simulating that the coordinate system's X axis grows to the left. */
        getNegatedX(): boolean;
        /** Sets whether the horizontal scale should show negated values, simulating that the coordinate system's X axis grows to the left. */
        setNegatedX(value: boolean): void;
        /** Gets whether the vertical scale should show negated values, simulating that the coordinate system's X axis grows to the top. */
        getNegatedY(): boolean;
        /** Sets whether the vertical scale should show negated values, simulating that the coordinate system's X axis grows to the top. */
        setNegatedY(value: boolean): void;
        /** Gets whether the projection of nodes on ruler's scales rotates with them. */
        getProjectRotatedBounds(): boolean;
        /** Sets whether the projection of nodes on ruler's scales rotates with them. */
        setProjectRotatedBounds(value: boolean): void;
        /** Sets the DiagramView attached to this Ruler.*/
        setDiagramView(diagramView: DiagramView): void;
    }

    interface ItemEventArgs extends EventArgs
    {
		/** Gets the current mouse pointer position.
		 * @return A Point instance.
		*/
		getMousePosition(): Point;
		/** Gets which mouse button has been pressed.
		 * @return An integer mouse button id.
		*/
		getMouseButton(): number;
		/** Get the adjustment handle being moved by the user.
		 * @return One of the AdjustmentHandles enumeration values.
		*/
		getAdjustmentHandle(): AdjustmentHandles;
		/** Gets the text that has just been entered by the user.
		 * @return A string specifying the new text of the node.
		*/
		getNewText(): string;
		/** Gets the original text of the node.
		 * @return A string specifying the old text of the node.
		*/
		getOldText(): string;
		/** Gets the canvas rendering context.
		 * @return A CanvasRenderingContext2D used to draw on the Canvas element.
		*/
		getContext(): any;
		/** Gets a value indicating whether the event has been handled. */
		getHandled(): boolean;
		/** Sets a value indicating whether the event has been handled. */
		setHandled(value: boolean): void;
		/** Gets a value indicating whether to allow the current operation. */
		getCancel(): boolean;
		/** Sets a value indicating whether to allow the current operation. */
		setCancel(value: boolean): void;
    }

	interface NodeEventArgs extends ItemEventArgs
	{
		/** Gets the node for which the event was raised.
		 * @return An instance of the DiagramNode class.
		*/
		getNode(): DiagramNode;
		/** Gets the container a node has been added to or removed from.
		 * @return A ContainerNode instance.
		*/
		getContainer(): ContainerNode;
		/** Gets the hyperlink that was clicked inside a node.
		 * @return The hyperlink that was clicked.
		*/
		getHyperlink(): string;
	}

	interface LinkEventArgs extends ItemEventArgs
	{
		/** Gets the link for which the event was raised.
		 * @return A DiagramLink instance.
		*/
		getLink(): DiagramLink;
		/** Gets the link label for which the event was raised.
		 * @return A LinkLabel instance.
		*/
		getLabel(): LinkLabel;
	}

	interface SelectionEventArgs extends EventArgs
	{
		/** Gets the current mouse pointer position.
		 * @return A Point instance.
		*/
		getMousePosition(): Point;
		/** Get the adjustment handle being moved by the user.
		 * @return One of the AdjustmentHandles enumeration values.
		*/
		getAdjustmentHandle(): AdjustmentHandles;
		/** Gets a value indicating whether to allow the current operation. */
		getCancel(): boolean;
		/** Sets a value indicating whether to allow the current operation. */
		setCancel(value: boolean): void;
	}

	interface DiagramEventArgs extends EventArgs
	{
		/** Gets the current mouse pointer position.
		 * @return A Point instance.
		*/
		getMousePosition(): Point;
		/** Gets which mouse button has been pressed.
		 * @return An integer mouse button id.
		*/
		getMouseButton(): number;
	}

	interface InplaceEditEventArgs extends EventArgs
	{
		/** Gets a reference to the item being edited.
		 * @return A DiagramItem instance.
		*/
		getItem(): DiagramItem;
		/** Gets the DOM Element used to edit the item's text. */
		getControl(): any;
		/** Sets the DOM Element used to edit the item's text. */
		setControl(value: any): void;
		/** Gets the bounds of the item being edited.
		 * @return A Rect instance.
		*/
		getBounds(): Rect;
	}

	interface CellEventArgs extends EventArgs
	{
		/** Gets the cell related to the event.
		 * @return A Cell instance.
		*/
		getCell(): Cell;
		/** Gets which mouse button has been pressed.
		 * @return An integer mouse button id.
		*/
		getMouseButton(): number;
		/** Gets the text that has just been entered by the user.
		 * @return A string specifying the new text of the cell.
		*/
		getNewText(): string;
		/** Gets the original text of the cell.
		 * @return A string specifying the old text of the cell.
		*/
		getOldText(): string;
		/** Gets the canvas rendering context.
		 * @return A CanvasRenderingContext2D used to draw on the Canvas element.
		*/
		getContext(): any;
		/** Gets a value indicating whether the event has been handled. */
		getHandled(): boolean;
		/** Sets a value indicating whether the event has been handled. */
		setHandled(value: boolean): void;
		/** Gets a value indicating whether to allow the current operation. */
		getCancel(): boolean;
		/** Sets a value indicating whether to allow the current operation. */
		setCancel(value: boolean): void;
	}

    interface SerializeTagEventArgs extends EventArgs
	{
		/** Gets the object whose property is being serialized or deserialized. */
		getObject(): any;
		/** Gets the tag value being serialized or deserialized. */
		getTag(): any;
		/** Sets the tag value being serialized or deserialized. */
		setTag(value: any): void;
		/** Gets the XML element where the tag value should be serialized to or deserialized from. */
		getElement(): any;
		/** Gets an XmlPersistContext object providing helper read and write methods for various value types. */
		getContext(): XmlPersistContext;
		/** Gets the name of the property being serialized. */
		getPropertyName(): string;
		/** Gets a value indicating whether the event has been handled. */
		getHandled(): boolean;
		/** Sets a value indicating whether the event has been handled. */
		setHandled(value: boolean): void;
	}

	interface HeaderEventArgs extends EventArgs
	{
		/** Gets the header related to the event.
		 * @return The header related to the event.
		*/
		getHeader(): Header;
	}

	interface HeaderResizeEventArgs extends HeaderEventArgs
	{
		getHorizontal(): boolean;
		/** Gets a value indicating whether to allow the current operation. */
		getCancel(): boolean;
		/** Sets a value indicating whether to allow the current operation. */
		setCancel(value: boolean): void;
	}										 
}