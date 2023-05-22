namespace QuickSort
{
export var QuickSort = `// from http://www.the-art-of-web.com/javascript/quicksort/
var col = 0;
var parent = null;
var items = new Array();
var N = 0;

function quicksort(m, n, desc)
{
	if (n <= m + 1) return;

	if ((n - m) == 2)
	{
		if (compare(get(n - 1), get(m), desc)) exchange(n - 1, m);
		return;
	}

	i = m + 1;
	j = n - 1;

	if (compare(get(m), get(i), desc)) exchange(i, m);
	if (compare(get(j), get(m), desc)) exchange(m, j);
	if (compare(get(m), get(i), desc)) exchange(i, m);

	pivot = get(m);

	while (true)
	{
		j--;
		while (compare(pivot, get(j), desc)) j--;
		i++;
		while (compare(get(i), pivot, desc)) i++;
		if (j <= i) break;
		exchange(i, j);
	}

	exchange(m, j);

	if ((j - m) < (n - j))
	{
		quicksort(m, j, desc);
		quicksort(j + 1, n, desc);
	} else
	{
		quicksort(j + 1, n, desc);
		quicksort(m, j, desc);
	}
}

function sortTable(tableid, n, desc)
{
	parent = document.getElementById(tableid);
	col = n;

	if (parent.nodeName != "TBODY")
		parent = parent.getElementsByTagName("TBODY")[0];
	if (parent.nodeName != "TBODY")
		return false;

	items = parent.getElementsByTagName("TR");
	N = items.length;

	// quick sort
	quicksort(0, N, desc);
}`;

	}