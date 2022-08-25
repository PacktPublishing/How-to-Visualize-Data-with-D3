// Original stripes visualization by Ed Hawkins: https://twitter.com/ed_hawkins

function readData(file, id) {
	d3.csv(file, processData)
        .then((data) => graph(data, id))
        .catch((error) => console.log("Error: ", error.message));
}
function processData(datum) {
    let dataItem = {
        year: parseFloat(datum.Year) || 0.00,
        avg: parseFloat(datum["J-D"]) || 0.00
    };
    return dataItem;
}
function graph(data, id) {
	let colors = ["#023858", "#045a8d", "#0570b0", "#3690c0", "#74a9cf", "#a6bddb", "#d0d1e6", "#ece7f2", "#fff7fb", "#fff7ec", "#fee8c8", "#fdd49e", "#fdbb84", "#fc8d59", "#ef6548", "#d7301f", "#b30000", "#7f0000"];
	let stripeWidth = 4;
	let stripeHeight = 300;
	let avgData = data.map((d) => d.avg);
	let linearScaleForData =
            d3.scaleLinear()
				.domain([d3.min(avgData), d3.max(avgData)])
				.range([0, colors.length-1]);
	let svg = d3.select(id).append("svg")
            .attr("width", data.length * stripeWidth)
            .attr("height", stripeHeight);
	let stripes = svg.selectAll("rect")
            .data(data).enter()
                .append("rect")
				.attr("width", stripeWidth)
                .attr("height", stripeHeight)
				.attr("x", (d, i) => i * stripeWidth)
                .attr("y", 0)
				.style("fill", (d, i) => colors[Math.round(linearScaleForData(d.avg))])
				.on("mouseover", (d) => console.log(d.year));
}












