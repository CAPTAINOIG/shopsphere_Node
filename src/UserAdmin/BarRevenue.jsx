import React, { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { FaSquare } from "react-icons/fa";

const BarRevenue = () => {
  const svgRef = useRef();
  const containerRef = useRef();
  const [selectedRange, setSelectedRange] = useState(12); // ✅ Default is 12 months

  const fullData = [
    { month: 'Jan', profit: 25000, loss: 32000 },
    { month: 'Feb', profit: 52000, loss: 15000 },
    { month: 'Mar', profit: 47000, loss: 11000 },
    { month: 'Jun', profit: 55000, loss: 16000 },
    { month: 'Jul', profit: 49000, loss: 13000 },
    { month: 'Aug', profit: 58000, loss: 14000 },
    { month: 'Sep', profit: 43000, loss: 9000 },
    { month: 'Oct', profit: 62000, loss: 19000 },
    { month: 'Nov', profit: 51000, loss: 12000 },
    { month: 'Dec', profit: 67000, loss: 21000 },
  ];

  const getData = () => fullData.slice(-selectedRange);

  const drawChart = () => {
    const data = getData();

    const container = containerRef.current;
    const fullWidth = container.clientWidth;
    const fullHeight = container.clientHeight;

    const margin = { top: 10, right: 20, bottom: 25, left: 50 };
    const width = fullWidth - margin.left - margin.right;
    const height = fullHeight - margin.top - margin.bottom;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();
    svg.attr('width', fullWidth).attr('height', fullHeight);

    const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);

    // X and Y scales
    const xScale = d3.scaleBand()
      .domain(data.map((d) => d.month))
      .range([0, width])
      .padding(0.6);

    const maxTotal = d3.max(data, (d) => d.profit + d.loss);
    const yScale = d3.scaleLinear()
      .domain([0, maxTotal * 1.2])
      .range([height, 0]);

    // Gridlines
    g.append('g')
      .call(d3.axisLeft(yScale)
        .tickValues([0, 20000, 40000, 60000, 80000])
        .tickSize(-width)
        .tickFormat(''))
      .selectAll('line')
      .attr('stroke', '#d1d5db')
      .attr('stroke-dasharray', '3,3');

    g.select('.domain').remove();

    // Bars
    const bars = g.selectAll('.bar-group')
      .data(data)
      .enter()
      .append('g')
      .attr('class', 'bar-group')
      .attr('transform', (d) => `translate(${xScale(d.month)}, 0)`);

    // Profit bars
    bars.append('rect')
      .attr('x', 0)
      .attr('y', (d) => yScale(d.profit))
      .attr('width', xScale.bandwidth())
      .attr('height', (d) => height - yScale(d.profit))
      .attr('fill', '#027840')
      .attr('stroke', '#027840');

    // Loss bars
    bars.append('rect')
      .attr('x', 0)
      .attr('y', (d) => yScale(d.profit + d.loss))
      .attr('width', xScale.bandwidth())
      .attr('height', (d) => yScale(d.profit) - yScale(d.profit + d.loss))
      .attr('fill', '#BB8232')
      .attr('stroke', '#BB8232');

    // X-axis
    const xAxis = g.append('g')
      .attr('transform', `translate(0, ${height})`)
      .call(d3.axisBottom(xScale).tickSize(0));

    xAxis.select('.domain').remove();
    xAxis.selectAll('text')
      .style('text-anchor', 'middle')
      .attr('dy', '1.2em')
      .style('font-size', '10px')
      .attr('fill', '#027840');

    // Y-axis
    const yAxis = g.append('g').call(
      d3.axisLeft(yScale)
        .tickValues([0, 20000, 40000, 60000, 80000])
        .tickFormat((d, i) => {
          const labels = ['$500', '$1000', '$1500', '$2000', '$2500'];
          return labels[i] || '$0';
        })
        .tickSize(0)
    );

    yAxis.select('.domain').remove();
    yAxis.selectAll('text').style('font-size', '10px').attr('fill', '#027840');

    // Tooltip
    bars.selectAll('rect')
      .on('mouseover', function (event, d) {
        const tooltip = d3.select('body')
          .append('div')
          .attr('class', 'tooltip')
          .style('position', 'absolute')
          .style('background', 'rgba(0,0,0,0.8)')
          .style('color', 'white')
          .style('padding', '8px 12px')
          .style('border-radius', '4px')
          .style('font-size', '12px')
          .style('pointer-events', 'none')
          .style('z-index', '1000')
          .html(`
            <strong>${d.month}</strong><br/>
            Profit: $${d.profit.toLocaleString()}<br/>
            Loss: $${d.loss.toLocaleString()}<br/>
            Total: $${(d.profit + d.loss).toLocaleString()}
          `);

        tooltip.style('left', `${event.pageX + 10}px`)
          .style('top', `${event.pageY - 10}px`);

        d3.select(this).style('opacity', 0.8);
      })
      .on('mouseout', function () {
        d3.selectAll('.tooltip').remove();
        d3.select(this).style('opacity', 1);
      });
  };

  useEffect(() => {
    drawChart();

    const resizeObserver = new ResizeObserver(() => {
      drawChart();
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => resizeObserver.disconnect();
  }, [selectedRange]);

  return (
    <div className="w-full mx-auto mb-5 bg-white rounded-[8px]">
      <div className="p-6 pb-0">
        <div className="flex justify-between">
          {/* Revenue Info */}
          <div>
            <h3 className="font-bold">Total Revenue</h3>
            <p className="text-xl">$36,245.29</p>
            <p className="text-sm text-[#027840] font-semibold">
              2.1% vs last month
            </p>
          </div>

          {/* Legend & Dropdown */}
          <div className='relative'>
            <div className='absolute top-[25px] md:right-[220px] right-[10px] flex gap-4'>
              <span className='flex justify-center items-center gap-2 text-[#027840]'><FaSquare /> Profit</span>
              <span className='flex justify-center items-center gap-2 text-[#BB8232]'><FaSquare /> Loss</span>
            </div>
            <select
              value={selectedRange}
              onChange={(e) => setSelectedRange(Number(e.target.value))}
              className="px-3 py-1 text-sm font-medium border border-gray-300 focus:outline-none rounded bg-white text-gray-700"
            >
              <option value={12}>Last 12 Months</option>
              <option value={6}>Last 6 Months</option>
              <option value={3}>Last 3 Months</option>
              <option value={1}>Last 1 Month</option>
            </select>
          </div>
        </div>
      </div>

      {/* Chart Container */}
      <div ref={containerRef} className="w-full h-[250px]">
        <svg ref={svgRef} className="w-full h-full" />
      </div>
    </div>
  );
};

export default BarRevenue;
