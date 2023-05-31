function treemap() {
    // set the dimensions and margins of the graph
    const margin = {top: 30, right: 20, bottom: 30, left: 20};
    const width = 450 - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;
  
    // append the svg object to the body of the page
    const svg = d3.select("#raul")
      .append("svg")
        .attr("width", "100%")
        .attr("height", "100%")
        .attr("viewBox", "0 0 450 300")
        .attr("preserveAspectRatio", "xMinYMin")
      .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);
  
    // parse the Data
    d3.csv("cmoa_english.csv")
    .then(function(data){
  
    data.forEach(function(d) {
        d.value = +d.value;
        d.enabled = true;
      });
  
    const total = d3.sum(data.map(function(d) {
      return (d.enabled) ? d.value : 0;  }));
  
    // reshape data
    const treeData = d3.stratify()
      .id(d => d.img_url)
      .parentId(d => d.department)
      (data);
  
    treeData.sum(d => d.value)
  
    d3.treemap()
      .size([width, height])
      .padding(1)
      (treeData);
  
    // create a tooltip
    const tooltip = d3.select("body")
      .append("div")
        .attr("class", "tooltip");
  
    // tooltip events
    const mouseover = function(d) {
      tooltip
          .style("opacity", 1)
      d3.select(this)
          .style("opacity", .5)
    };
    const mousemove = function(event,d) {
      f = d3.format(",")
      tooltip
      .html("Numero de obras: " + `${(d.data.department)}<br> oi`)
        .style("top", event.pageY  + "px")
        .style("left", event.pageX + 10 + "px")
    };
  
    const mouseleave = function(d) {
      tooltip
        .style("opacity", 0)
      d3.select(this)
        .style("stroke", "none")
        .style("opacity", 1)
    };
  
    // create rectangle
    svg
      .selectAll("rect")
      .data(treeData.leaves())
      .join("rect")
        .attr('x', d => d.x0)
        .attr('y', d => d.y0)
        .attr('width', d => d.x1 - d.x0)
        .attr('height', d=> d.y1 - d.y0)
        .style("stroke", "none")
        .style("fill", "#0072BC")
      .on("mouseover", mouseover)
      .on("mousemove", mousemove)
      .on("mouseleave", mouseleave);
  
    // add labels to the graph
    // svg
    //   .selectAll("text-number")
    //   .data(treeData.leaves())
    //   .join("text")
    //     .attr("class", "tree-label")
    //     .attr("x", d => d.x0+5)
    //     .attr("y", d => d.y0+15)
    //     .text(d => Math.round(1000 * d.data.value / total) / 10 + "%")
    //     .attr("font-size", "10px")
    //     .attr("fill", "#ffffff");
  
    // svg
    //   .selectAll("text-department")
    //   .data(treeData.leaves())
    //   .join("text")
    //     .attr("class", "tree-label")
    //     .attr("x", d => d.x0+5)
    //     .attr("y", d => d.y0+30)
    //     .text(d => d.data.img_url)
    //     .attr("font-size", "10px")
    //     .attr("fill", "#ffffff");
  
    // set title
    svg
      .append("text")
        .attr("class", "chart-title")
        .attr("x", 0)
        .attr("y", -(margin.top)/10)
        .attr("text-anchor", "start")
        .text("Treemap");
  
  
    })
  
  }
  