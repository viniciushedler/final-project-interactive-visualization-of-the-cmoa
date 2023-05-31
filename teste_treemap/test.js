var dataset = [10, 20, 30, 40, 50];

// Configuração do tamanho do gráfico
var width = 400;
var height = 200;

// Criação do SVG
var svg = d3.select("#chart")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

// Criação das barras do gráfico
svg.selectAll("rect")
  .data(dataset)
  .enter()
  .append("rect")
  .attr("x", function(d, i) {
    return i * (width / dataset.length);
  })
  .attr("y", function(d) {
    return height - d;
  })
  .attr("width", width / dataset.length - 1)
  .attr("height", function(d) {
    return d;
  })
  .attr("fill", "steelblue");