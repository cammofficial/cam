import * as Charting from '@mindfusion/charting';
import * as Common from '@mindfusion/common';
import * as Controls from '@mindfusion/controls';

export class Patient
{
	public constructor(name: string, age: number, weight: number, bmindex: number)
	{
		this.name = name;
		this.age = age;
		this.weight = weight;
		this.bmindex = bmindex;
	}

	name: string;
	age: number;
	weight: number;
	bmindex: number;
	bmindexString() : string
	{
		if (this.bmindex < 18.5)
			return "BMI < 18.5";
		if (this.bmindex < 25)
			return "BMI < 25";
		if (this.bmindex < 30)
			return "BMI < 30";
		return "BMI > 30";
	}
}

export class PatientSeries
	implements Charting.Series
{
	public constructor(patients: Array<Patient>)
	{
		this.values = patients;
	}

	public getValue(index: number, dimension: number): number
	{
		if (dimension == 0)
			return this.values[index].age;
		else if (dimension == 1)
			return this.values[index].weight;
		else
			return this.values[index].bmindex * 2;
	}

	public getLabel(index: number, kind: Charting.LabelKinds): string
	{
		if (kind == Charting.LabelKinds.InnerLabel) return this.values[index].name;
		if (kind == Charting.LabelKinds.ToolTip) return `${this.values[index].name}(${this.values[index].bmindexString()})`;

		return null;
	}

	public isSorted(dimension: number): boolean
	{
		return false;
	}

	public isEmphasized(index: number): boolean
	{
		return false;
	}

	public get size(): number { return this.values.length; }

	public get dimensions(): number { return 3; }

	public get title(): string { return this.values[0].bmindexString(); }

	public get supportedLabels(): Charting.LabelKinds { return Charting.LabelKinds.InnerLabel | Charting.LabelKinds.ToolTip; }

	public toJson():any { }
	dataChanged = new Common.EventDispatcher<Controls.EventArgs>();

	values: Array<Patient>;
} 