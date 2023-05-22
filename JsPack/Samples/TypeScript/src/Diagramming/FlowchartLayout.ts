import * as acorn from "acorn";
import * as walk from "acorn-walk";

import * as Diagramming from '@mindfusion/diagramming';
import * as Graphs from '@mindfusion/graphs';
import * as Drawing from '@mindfusion/drawing';


namespace FlowchartLayout
{
	const Rect = Drawing.Rect;
	const Font = Drawing.Font;

	let diagramSyntaxView = Diagramming.DiagramView.create(<HTMLCanvasElement>document.getElementById("diagramSyntax"));
	let diagramSyntax = diagramSyntaxView.diagram;
	diagramSyntaxView.addEventListener(Diagramming.Events.mouseWheel, onMouseWheel);
	diagramSyntax.linkHeadShapeSize = 2;

	let diagramFlowchartView = Diagramming.DiagramView.create(<HTMLCanvasElement>document.getElementById("diagramFlowchart"));
	let diagramFlowchart = diagramFlowchartView.diagram;
	diagramFlowchartView.addEventListener(Diagramming.Events.mouseWheel, onMouseWheel)
	diagramFlowchart.linkHeadShapeSize = 2;

	document.getElementById("bParse").addEventListener("click", () =>
	{
		let codeText = (document.getElementById("codeText") as HTMLTextAreaElement).value;

		new SyntaxTreeBuilder(codeText, diagramSyntax);
		new FlowchartBuilder(codeText, diagramFlowchart);

		let treeLayout = new Graphs.TreeLayout();
		diagramSyntax.arrange(treeLayout);
		diagramSyntax.resizeToFitItems(10);

		let flowchartLayout = new Graphs.FlowchartLayout();
		flowchartLayout.orientation = Graphs.Orientation.Vertical;
		diagramFlowchart.arrange(flowchartLayout);
		diagramFlowchart.resizeToFitItems(10);
	});

	function onMouseWheel(view: Diagramming.DiagramView, e: any)
	{
		let zoom = view.zoomFactor;
		zoom -= (e.delta) / 100;
		zoom = Math.max(10, Math.min(zoom, 500));
		view.setZoomFactorPivot(zoom, e.mousePosition);
		e.handled = true;
	}

	const SyntaxTreeBuilder = function (code, diagram)
	{
		diagram.clearAll();
		this.code = code;
		this.diagram = diagram;
		this.parentNodes = [];

		function createDelegate(instance, method)
		{
			return function () { return method.apply(instance, arguments); }
		}

		walk.recursive(acorn.parse(code, {ecmaVersion: 2020}), {},
			{
				FunctionDeclaration: createDelegate(this, this.onFunctionDeclaration),
				IfStatement: createDelegate(this, this.onIfStatement),
				SwitchStatement: createDelegate(this, this.onSwitchStatement),
				WhileStatement: createDelegate(this, this.onIterationStatement),
				ForStatement: createDelegate(this, this.onIterationStatement),
				ForInStatement: createDelegate(this, this.onIterationStatement),
				ExpressionStatement: createDelegate(this, this.onExpressionStatement)
			});
	};

	SyntaxTreeBuilder.prototype.onFunctionDeclaration = function (node, state, visitor)
	{
		this.onEnterFunctionDeclaration(node);
		visitor(node.body, state);
		this.onLeaveFunctionDeclaration(node);
	};
	SyntaxTreeBuilder.prototype.onIfStatement = function (node, state, visitor)
	{
		this.onEnterIfStatement();
		this.onEnterBranch();
		visitor(node.consequent, state);
		this.onLeaveBranch();
		if (node.alternate)
		{
			this.onEnterBranch();
			visitor(node.alternate, state);
			this.onLeaveBranch();
		}
		this.onLeaveIfStatement();
	};
	SyntaxTreeBuilder.prototype.onSwitchStatement = function (node, state, visitor)
	{
		this.onEnterSwitchStatement();
		for (let i = 0; i < node.cases.length; i++)
			visitor(node.cases[i], state);
		this.onLeaveSwitchStatement();
	};
	SyntaxTreeBuilder.prototype.onIterationStatement = function (node, state, visitor)
	{
		this.onEnterIterationStatement();
		visitor(node.body, state);
		this.onLeaveIterationStatement();
	};

	SyntaxTreeBuilder.prototype.onExpressionStatement = function (node, state, visitor)
	{
		let expression = node.expression;
		this.onLeaveExpressionStatement(this.code.substr(expression.start, expression.end - expression.start));
	}

	SyntaxTreeBuilder.prototype.onEnterFunctionDeclaration = function (node)
	{
		let functionNode = Notation.createStartTerminatorNode(this.diagram, "function " + node.id.name);

		if (this.parentNodes.length > 0)
			this.diagram.factory.createDiagramLink(this.parentNodes[this.parentNodes.length - 1], functionNode);

		this.parentNodes.push(functionNode);
	};

	SyntaxTreeBuilder.prototype.onLeaveFunctionDeclaration = function ()
	{
		this.parentNodes.pop();
	};

	SyntaxTreeBuilder.prototype.onLeaveExpressionStatement = function (text)
	{
		let functionNode = Notation.createProcessNode(this.diagram, text);

		if (this.parentNodes.length > 0)
			this.diagram.factory.createDiagramLink(this.parentNodes[this.parentNodes.length - 1], functionNode);
	};

	SyntaxTreeBuilder.prototype.onEnterIfStatement = function ()
	{
		let ifNode = Notation.createDecisionNode(this.diagram, "if / else");

		if (this.parentNodes.length > 0)
			this.diagram.factory.createDiagramLink(this.parentNodes[this.parentNodes.length - 1], ifNode);

		this.parentNodes.push(ifNode);
	};

	SyntaxTreeBuilder.prototype.onLeaveIfStatement = function ()
	{
		this.parentNodes.pop();
	};

	SyntaxTreeBuilder.prototype.onEnterIterationStatement = function ()
	{
		let iterationNode = Notation.createLoopNode(this.diagram, "iteration");

		if (this.parentNodes.length > 0)
			this.diagram.factory.createDiagramLink(this.parentNodes[this.parentNodes.length - 1], iterationNode);

		this.parentNodes.push(iterationNode);
	};

	SyntaxTreeBuilder.prototype.onLeaveIterationStatement = function ()
	{
		this.parentNodes.pop();
	};

	SyntaxTreeBuilder.prototype.onEnterSwitchStatement = function ()
	{
		let switchNode = Notation.createDecisionNode(this.diagram, "switch");

		if (this.parentNodes.length > 0)
			this.diagram.factory.createDiagramLink(this.parentNodes[this.parentNodes.length - 1], switchNode);

		this.parentNodes.push(switchNode);
	};

	SyntaxTreeBuilder.prototype.onLeaveSwitchStatement = function ()
	{
		this.parentNodes.pop();
	};

	SyntaxTreeBuilder.prototype.onEnterBranch = function ()
	{
		let branchNode = Notation.createDecisionNode(this.diagram, "branch");

		if (this.parentNodes.length > 0)
			this.diagram.factory.createDiagramLink(this.parentNodes[this.parentNodes.length - 1], branchNode);

		this.parentNodes.push(branchNode);
	};

	SyntaxTreeBuilder.prototype.onLeaveBranch = function ()
	{
		this.parentNodes.pop();
	};

	const FlowchartBuilder = function (code, diagram)
	{
		diagram.clearAll();
		this.diagram = diagram;
		this.current = new Flowchart(this.diagram);
		this.code = code;

		function createDelegate(instance, method)
		{
			return function () { return method.apply(instance, arguments); }
		}

		walk.recursive(acorn.parse(this.code, {ecmaVersion: 2020}), {},
			{
				FunctionDeclaration: createDelegate(this, this.onFunctionDeclaration),
				IfStatement: createDelegate(this, this.onIfStatement),
				SwitchStatement: createDelegate(this, this.onSwitchStatement),
				WhileStatement: createDelegate(this, this.onIterationStatement),
				ForStatement: createDelegate(this, this.onIterationStatement),
				ForInStatement: createDelegate(this, this.onIterationStatement),
				ExpressionStatement: createDelegate(this, this.onExpressionStatement),
				ReturnStatement: createDelegate(this, this.onReturnStatement)
			});
	};

	FlowchartBuilder.prototype.onFunctionDeclaration = function (node, state, visitor)
	{
		this.onEnterFunctionDeclaration(node);
		visitor(node.body, state);
		this.onLeaveFunctionDeclaration(node);
	};
	FlowchartBuilder.prototype.onIfStatement = function (node, state, visitor)
	{
		this.onEnterIfStatement();
		this.onEnterBranch();
		visitor(node.consequent, state);
		this.onLeaveBranch();
		if (node.alternate)
		{
			this.onEnterBranch();
			visitor(node.alternate, state);
			this.onLeaveBranch();
		}
		this.onLeaveIfStatement();
	};
	FlowchartBuilder.prototype.onSwitchStatement = function (node, state, visitor)
	{
		this.onEnterSwitchStatement();
		for (let i = 0; i < node.cases.length; i++)
			visitor(node.cases[i], state);
		this.onLeaveSwitchStatement();
	};
	FlowchartBuilder.prototype.onIterationStatement = function (node, state, visitor)
	{
		this.onEnterIterationStatement();
		visitor(node.body, state);
		this.onLeaveIterationStatement();
	};
	FlowchartBuilder.prototype.onExpressionStatement = function (node, state, visitor)
	{
		let expression = node.expression;
		this.onLeaveExpressionStatement(this.code.substr(expression.start, expression.end - expression.start));
	}
	FlowchartBuilder.prototype.onReturnStatement = function (node, state, visitor)
	{
		this.onLeaveReturnStatement(this.code.substr(node.start, node.end - node.start));
	};

	FlowchartBuilder.prototype.onEnterFunctionDeclaration = function (node)
	{
		this.current.enterFunction("function " + node.id.name);
	}

	FlowchartBuilder.prototype.onLeaveFunctionDeclaration = function (node)
	{
		if (this.current.leaveFunction("endfunction " + node.id.name))
			this.current = new Flowchart(this.diagram);
	}

	FlowchartBuilder.prototype.onLeaveExpressionStatement = function (text)
	{
		this.current.addExpression(text);
	}

	FlowchartBuilder.prototype.onLeaveReturnStatement = function (text)
	{
		this.current.addReturnStatement(text);
	}

	FlowchartBuilder.prototype.onEnterIfStatement = function ()
	{
		this.current.enterChoice("if");
	}

	FlowchartBuilder.prototype.onLeaveIfStatement = function ()
	{
		this.current.leaveChoice("endif");
	}

	FlowchartBuilder.prototype.onEnterIterationStatement = function ()
	{
		this.current.enterLoop("iteration");
	}

	FlowchartBuilder.prototype.onLeaveIterationStatement = function ()
	{
		this.current.leaveLoop("enditeration");
	}

	FlowchartBuilder.prototype.onEnterSwitchStatement = function ()
	{
		this.current.enterChoice("switch");
	}

	FlowchartBuilder.prototype.onLeaveSwitchStatement = function ()
	{
		this.current.leaveChoice("endswitch");
	}

	FlowchartBuilder.prototype.onEnterBranch = function ()
	{
		this.current.enterBranch();
	}

	FlowchartBuilder.prototype.onLeaveBranch = function ()
	{
		this.current.leaveBranch();
	}

	const Flowchart = function (diagram)
	{
		this.diagram = diagram;
		this.sequences = [];
	};

	Flowchart.prototype.enterFunction = function (text)
	{
		let functionStartNode = Notation.createStartTerminatorNode(this.diagram, text);
		this.sequences.push([functionStartNode]);
	};

	Flowchart.prototype.leaveFunction = function (text)
	{
		if (this.sequences.length == 0)
			throw new Error("Invalid operation");

		let ends = this.sequences.pop();
		if (ends.length == 0)
			throw new Error("Invalid operation");

		// Sequences end with 'null' if they are terminated by a return statement
		if (ends[0] == null)
			return this.sequences.length == 0;

		let functionEndNode = Notation.createEndTerminatorNode(this.diagram, text);

		for (let i = 0; i < ends.length; i++)
			this.diagram.factory.createDiagramLink(ends[i], functionEndNode);

		return this.sequences.length == 0;
	};

	Flowchart.prototype.addExpression = function (text)
	{
		if (this.sequences.length == 0)
			throw new Error("Invalid operation");

		let top = this.sequences[this.sequences.length - 1];
		if (top.length == 0)
			throw new Error("Invalid operation");

		// Sequences end with 'null' if they are terminated by a return statement
		if (top[0] == null)
			return;

		let expressionNode = Notation.createProcessNode(this.diagram, text);

		this.diagram.factory.createDiagramLink(top[0], expressionNode);
		top[0] = expressionNode;
	};

	Flowchart.prototype.addReturnStatement = function (text)
	{
		if (this.sequences.length == 0)
			throw new Error("Invalid operation");

		let top = this.sequences[this.sequences.length - 1];
		if (top.length == 0)
			throw new Error("Invalid operation");

		// Sequences end with 'null' if they are terminated by a return statement
		if (top[0] == null)
			return;

		let returnNode = Notation.createEndTerminatorNode(this.diagram, text);

		this.diagram.factory.createDiagramLink(top[0], returnNode);
		top[0] = null;
	};

	Flowchart.prototype.enterChoice = function (text)
	{
		if (this.sequences.length == 0)
			throw new Error("Invalid operation");

		let top = this.sequences[this.sequences.length - 1];
		if (top.length == 0)
			throw new Error("Invalid operation");

		let choiceStartNode = Notation.createDecisionNode(this.diagram, text);

		this.diagram.factory.createDiagramLink(top[0], choiceStartNode);
		top[0] = choiceStartNode;

		this.sequences.push([choiceStartNode]);
	};

	Flowchart.prototype.enterBranch = function ()
	{
		if (this.sequences.length == 0)
			throw new Error("Invalid operation");

		let top = this.sequences[this.sequences.length - 1];
		if (top.length == 0)
			throw new Error("Invalid operation");

		top.splice(0, 0, top[top.length - 1]);
	};

	Flowchart.prototype.leaveBranch = function ()
	{
	}

	Flowchart.prototype.leaveChoice = function (text)
	{
		if (this.sequences.length == 0)
			throw new Error("Invalid operation");

		let top = this.sequences.pop();
		if (top.length == 0)
			throw new Error("Invalid operation");

		let choiceEndNode = Notation.createConnectorNode(this.diagram, text);

		for (let i = 0; i < top.length - 1; i++)
		{
			// Sequences end with 'null' if they are terminated by a return statement
			if (top[i] != null)
				this.diagram.factory.createDiagramLink(top[i], choiceEndNode);
		}

		// If it's an 'if' choice and there was only one branch, add
		// a direct link from the choice start node to the choice end node
		if (choiceEndNode.text == "endif")
		{
			if (top.length == 2)
				this.diagram.factory.createDiagramLink(top[top.length - 1], choiceEndNode);
		}

		// It it's a 'switch' choice and there are no branches at all,
		// add a link from the choice start node to the choice end node
		if (choiceEndNode.text == "endswitch")
		{
			if (top.length == 1)
				this.diagram.factory.createDiagramLink(top[top.length - 1], choiceEndNode);
		}

		// Replace the choice start node with the choice end node
		// in the current sequence
		if (this.sequences.length == 0)
			throw new Error("Invalid operation");

		top = this.sequences[this.sequences.length - 1];
		if (top.length == 0)
			throw new Error("Invalid operation");

		top[0] = choiceEndNode;
	};

	Flowchart.prototype.enterLoop = function (text)
	{
		if (this.sequences.length == 0)
			throw new Error("Invalid operation");

		let top = this.sequences[this.sequences.length - 1];
		if (top.length == 0)
			throw new Error("Invalid operation");

		let loopStartNode = Notation.createLoopNode(this.diagram, text);

		this.diagram.factory.createDiagramLink(top[0], loopStartNode);
		top[0] = loopStartNode;

		this.sequences.push([loopStartNode]);
	};

	Flowchart.prototype.leaveLoop = function (text)
	{
		if (this.sequences.length == 0)
			throw new Error("Invalid operation");

		let top = this.sequences.pop();
		if (top.length == 0)
			throw new Error("Invalid operation");

		let loopEndNode = Notation.createEndLoopNode(this.diagram, text);

		this.diagram.factory.createDiagramLink(top[0], loopEndNode);

		// Replace the choice start node with the choice end node
		// in the current sequence
		if (this.sequences.length == 0)
			throw new Error("Invalid operation");

		top = this.sequences[this.sequences.length - 1];
		if (top.length == 0)
			throw new Error("Invalid operation");

		this.diagram.factory.createDiagramLink(loopEndNode, top[0]);

		top[0] = loopEndNode;
	};

	const Notation =
	{
		createStartTerminatorNode: function (diagram, text)
		{
			let node = diagram.factory.createShapeNode(new Rect(0, 0, 30, 10));
			node.shape = ("RoundRect");
			node.brush = (this.createGradientBrush("rgb(0, 0, 99)"));
			node.text = (text);
			node.enableStyledText = (true);
			node.font = (new Font("sans-serif", 3, true));
			node.tooltip = (text);

			return node;
		},

		createEndTerminatorNode: function (diagram, text)
		{
			let node = diagram.factory.createShapeNode(new Rect(0, 0, 30, 10));
			node.shape = ("RoundRect");
			node.brush = (this.createGradientBrush("rgb(206, 0, 0)"));
			node.text = (text);
			node.enableStyledText = (true);
			node.font = (new Font("sans-serif", 3, true));
			node.tooltip = (text);

			return node;
		},

		createConnectorNode: function (diagram, text)
		{
			let node = diagram.factory.createShapeNode(new Rect(0, 0, 5, 5));
			node.shape = "Ellipse";
			node.brush = this.createGradientBrush("white");
			node.text = text;
			node.enableStyledText = true;
			node.font = new Font("sans-serif", 3);
			node.tooltip = text;

			return node;
		},

		createProcessNode: function (diagram, text)
		{
			let node = diagram.factory.createShapeNode(new Rect(0, 0, 30, 10));
			node.shape = ("Rectangle");
			node.brush = (this.createGradientBrush("rgb(97, 106, 127)"));
			node.text = (text);
			node.enableStyledText = (true);
			node.font = (new Font("sans-serif", 3));
			node.tooltip = (text);

			return node;
		},

		createDecisionNode: function (diagram, text)
		{
			let node = diagram.factory.createShapeNode(new Rect(0, 0, 30, 10));
			node.shape = ("Decision");
			node.brush = (this.createGradientBrush("rgb(192, 192, 192)"));
			node.text = (text);
			node.enableStyledText = (true);
			node.font = (new Font("sans-serif", 3));
			node.tooltip = (text);

			return node;
		},

		createLoopNode: function (diagram, text)
		{
			let node = diagram.factory.createShapeNode(new Rect(0, 0, 30, 10));
			node.shape = ("BeginLoop");
			node.brush = (this.createGradientBrush("goldenrod"));
			node.text = (text);
			node.enableStyledText = (true);
			node.font = (new Font("sans-serif", 3));
			node.tooltip = (text);

			return node;
		},

		createEndLoopNode: function (diagram, text)
		{
			let node = diagram.factory.createShapeNode(new Rect(0, 0, 30, 10));
			node.shape = ("EndLoop");
			node.brush = (this.createGradientBrush("goldenrod"));
			node.text = (text);
			node.enableStyledText = (true);
			node.font = (new Font("sans-serif", 3));
			node.tooltip = (text);

			return node;
		},


		createGradientBrush: function (color)
		{
			return { type: "LinearGradientBrush", color1: color, color2: "white", angle: 90 };
		}
	};
}