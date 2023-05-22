"use strict";

const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");

let mainEntry = {
	main: './src/main.ts',
	scripts: './src/samples.ts',
	styles: './src/samples.css'
};

let pack_samples = ['Activities', 'Chat', 'DomInspector', 'FlipMatch', 'Observatories', 'ServerLoad', 'TemperatureLog', 'WorldPopulation'];
pack_samples.map(name => {
	mainEntry["pack_" + name] = `./src/Pack/${name}.ts`;
});
mainEntry["pack_samples"] = './src/Pack/samples.ts';
let pack_plugins = pack_samples.map(name => {
	return new HtmlWebpackPlugin({
		template: `./src/Pack/${name}.html`,
		filename: `Pack/${name}.html`,
		chunks: [`${"pack_" + name}`, 'styles', 'scripts', 'pack_samples']
	})
});

let diagramming_samples = ['Anchors', 'Animations', 'Containers', 'ControlNodes', 'Controls', 'DBDesign', 'DomTree', 'DragDrop', 'Flowcharter', 'FlowchartLayout', 'FractalLayout',
	'Inheritance', 'Lanes', 'LayeredLayout', 'MultipleViews', 'PathFinder', 'SpanningCells', 'StockShapes', 'SvgNodes', 'Themes', 'TreeLayout', 'TreeMap', 'TreeViewNodes',
	'Tutorial1', 'Tutorial2', 'Tutorial3', 'Tutorial4'];
diagramming_samples.map(name => {
	mainEntry["diagramming_" + name] = `./src/Diagramming/${name}.ts`;
});
mainEntry["diagramming_samples"] = './src/Diagramming/samples.ts';
let diagramming_plugins = diagramming_samples.map(name => {
	return new HtmlWebpackPlugin({
		template: `./src/Diagramming/${name}.html`,
		filename: `Diagramming/${name}.html`,
		chunks: [`${"diagramming_" + name}`, 'styles', 'scripts', 'diagramming_samples']
	})
});

let charting_samples = ['AreaChart', 'BarChart', 'BarChart3D', 'BubbleChart', 'CandlestickChart', 'CustomData', 'Dashboard', 'DateTimeSeries', 'DateTimeSeriesTooltips', 'FunnelChart',
	'GroupLabels', 'Interactivity', 'LineChart', 'ListBinding', 'MultipleAxes', 'MultiplePlots', 'PieChart', 'RadarChart', 'SynchronizedScroll', 'Tutorial1', 'CarGauges', 'Clock',
	'Compass', 'Equalizer', 'Functions', 'Thermometer', 'TowerChart']
charting_samples.map(name => {
	mainEntry["charting_" + name] = `./src/Charting/${name}.ts`;
});
mainEntry["charting_samples"] = './src/Charting/samples.ts';
let charting_plugins = charting_samples.map(name => {
	return new HtmlWebpackPlugin({
		template: `./src/Charting/${name}.html`,
		filename: `Charting/${name}.html`,
		chunks: [`${"charting_" + name}`, 'styles', 'scripts', 'charting_samples']
	})
});


let scheduling_samples = ['Booking', 'CustomItem', 'DualView', 'GardenCalendar', 'Interactions', 'Items', 'ListView', 'MinApp', 'MonthView', 'Resources',
	'ResourceView', 'Timetable', 'Views', 'WeekView'];
scheduling_samples.map(name => {
	mainEntry["scheduling_" + name] = `./src/Scheduling/${name}.ts`;
});
mainEntry["scheduling_samples"] = './src/Scheduling/samples.ts';
let scheduling_plugins = scheduling_samples.map(name => {
	return new HtmlWebpackPlugin({
		template: `./src/Scheduling/${name}.html`,
		filename: `Scheduling/${name}.html`,
		chunks: [`${"scheduling_" + name}`, 'styles', 'scripts', 'scheduling_samples']
	})
});

let mapping_samples = ['CanvasLayer', 'Coordinates', 'Decorations', 'Interactions', 'MinApp'];
mapping_samples.map(name => {
	mainEntry["mapping_" + name] = `./src/Mapping/${name}.ts`;
});
mainEntry["mapping_samples"] = './src/Mapping/samples.ts';
let mapping_plugins = mapping_samples.map(name => {
	return new HtmlWebpackPlugin({
		template: `./src/Mapping/${name}.html`,
		filename: `Mapping/${name}.html`,
		chunks: [`${"mapping_" + name}`, 'styles', 'scripts', 'mapping_samples']
	})
});

let dataviews_samples = ['Columns', 'CRUD', 'CustomDraw', 'CustomModel', 'Events', 'Localization', 'Navigation'
, 'Selection', 'Validation', 'DynamicColumn', 'PropertyGrid'];
dataviews_samples.map(name => {
	mainEntry["dataviews_" + name] = `./src/DataViews/${name}.ts`;
});
mainEntry["dataviews_samples"] = './src/DataViews/samples.ts';
let dataviews_plugins = dataviews_samples.map(name => {
	return new HtmlWebpackPlugin({
		template: `./src/DataViews/${name}.html`,
		filename: `DataViews/${name}.html`,
		chunks: [`${"dataviews_" + name}`, 'styles', 'scripts', 'dataviews_samples']
	})
});

let keyboard_samples = ['Custom', 'Demo', 'HiddenKeyboard'];
keyboard_samples.map(name => {
	mainEntry["keyboard_" + name] = `./src/Keyboard/${name}.ts`;
});
mainEntry["keyboard_samples"] = './src/Keyboard/samples.ts';
let keyboard_plugins = keyboard_samples.map(name => {
	return new HtmlWebpackPlugin({
		template: `./src/Keyboard/${name}.html`,
		filename: `Keyboard/${name}.html`,
		chunks: [`${"keyboard_" + name}`, 'styles', 'scripts', 'keyboard_samples']
	})
});

let ui_samples = ['CheckListBox','CustomDialog', 'DataForm', 'DateTimePicker', 'DragDrop', 'DragDrop2', 'DragDrop3', 'ImagePicker',
	'InteractiveTree', 'Menu', 'Tabs', 'ThemedDialogs', 'ToolStrip', 'Tree', 'Windows'];
ui_samples.map(name => {
	mainEntry["ui_" + name] = `./src/UI/${name}.ts`;
});
mainEntry["ui_samples"] = './src/UI/samples.ts';
let ui_plugins = ui_samples.map(name => {
	return new HtmlWebpackPlugin({
		template: `./src/UI/${name}.html`,
		filename: `UI/${name}.html`,
		chunks: [`${"ui_" + name}`, 'styles', 'scripts', 'ui_samples']
	})
});

module.exports = {
	entry: mainEntry,
	output: {
		filename: '[name].js',
		chunkFilename: 'vendor.js',
		path: path.resolve(__dirname, 'dist')
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js', '.html']
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: 'ts-loader',
				exclude: /node_modules/
			},
			{
				test: /\.css$/i,
				use: ["style-loader", "css-loader"],
			},
			{
				test: /\.(png|svg|jpg|jpeg|gif)$/i,
				dependency: { not: ['url'] },
				type: 'asset/resource',
			},
			{
				test: /\.txt/,
				type: 'asset'
			},
			{
				test: /\.xml$/i,
				use: ['xml-loader'],
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './src/main.html',
			chunks: ['main', 'styles']
		}),
		new CopyPlugin({
			patterns: [
				{ from: './src/data', to: './data', noErrorOnMissing: true },
				{ from: './src/assets', to: './assets' },
				{ from: './src/Scheduling/localization', to: './Scheduling/localization' },
				{ from: './src/UI/page.html', to: './UI/page.html' },
				{ from: './src/UI/form.html', to: './UI/form.html' },
				{ from: './src/Pack/chatWindow.html', to: './Pack/chatWindow.html' },
				{ from: './src/Pack/thermometer.html', to: './Pack/thermometer.html' },
				{ from: './src/pack_lic.txt', to: './Pack' },
				{ from: './src/pack_lic.txt', to: './Diagramming' },
				{ from: './src/pack_lic.txt', to: './Charting' },
				{ from: './src/pack_lic.txt', to: './Scheduling' },
				{ from: './src/pack_lic.txt', to: './Mapping' },
				{ from: './src/pack_lic.txt', to: './Keyboard' },
				{ from: './src/pack_lic.txt', to: './DataViews' },
				{ from: './src/pack_lic.txt', to: './UI' }
			],
		})
	].concat(pack_plugins).concat(diagramming_plugins).concat(charting_plugins).concat(scheduling_plugins).concat(mapping_plugins).concat(keyboard_plugins).concat(dataviews_plugins).concat(ui_plugins),
	optimization: {
		runtimeChunk: 'single',
		splitChunks: {
			chunks: 'all'
		}
	},
	mode: 'development',
	devtool: 'source-map'
};