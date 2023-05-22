/// <reference path="../Scripts/jspack-vsdoc.js" />

var Patient = (function ()
{
	function Patient(name, age, weight, bmindex)
	{
		this.name = name;
		this.age = age;
		this.weight = weight;
		this.bmindex = bmindex;
	};
	Patient.prototype.bmindexString = function ()
	{
		if (this.bmindex < 18.5)
			return "BMI < 18.5";
		if (this.bmindex < 25)
			return "BMI < 25";
		if (this.bmindex < 30)
			return "BMI < 30";
		return "BMI > 30";
	};
	return Patient;
})();

var PatientSeries = (function ()
{
	function PatientSeries(patients)
	{
		this.dataChanged = new MindFusion.Common.EventDispatcher();
		this.values = patients;
	}
	PatientSeries.prototype.getValue = function (index, dimension)
	{
		if (dimension == 0)
			return this.values[index].age;
		else if (dimension == 1)
			return this.values[index].weight;
		else
			return this.values[index].bmindex * 2;
	};
	PatientSeries.prototype.getLabel = function (index, kind)
	{
		if (kind == MindFusion.Charting.LabelKinds.InnerLabel)
			return this.values[index].name;
		if (kind == MindFusion.Charting.LabelKinds.ToolTip)
			return this.values[index].name + "(" + this.values[index].bmindexString() + ")";
		return null;
	};
	PatientSeries.prototype.isSorted = function (dimension)
	{
		return false;
	};
	PatientSeries.prototype.isEmphasized = function (index)
	{
		return false;
	};
	Object.defineProperty(PatientSeries.prototype, "size", {
		get: function () { return this.values.length; }
	});
	Object.defineProperty(PatientSeries.prototype, "dimensions", {
		get: function () { return 3; }
	});
	Object.defineProperty(PatientSeries.prototype, "title", {
		get: function () { return this.values[0].bmindexString(); }
	});
	Object.defineProperty(PatientSeries.prototype, "supportedLabels", {
		get: function () { return MindFusion.Charting.LabelKinds.InnerLabel | MindFusion.Charting.LabelKinds.ToolTip; }
	});
	return PatientSeries;
})();