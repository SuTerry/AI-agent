import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

interface PropsType {
  parentWidth: number;
}


const LineChart = ({parentWidth}: PropsType) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const data = [
      { date: '0am', value: 10 },
      { date: '2am', value: 11 },
      { date: '4am', value: 10 },
      { date: '6am', value: 12 },
      { date: '8am', value: 13 },
      { date: '10am', value: 12 },
      { date: '12pm', value: 15 },
      { date: '14pm', value: 12 },
      { date: '16pm', value: 12 },
      { date: '18pm', value: 11 },
      { date: '20pm', value: 10 },
      { date: '22pm', value: 11 },
      { date: '0am ', value: 13 }
    ];

    const clientWidth = parentWidth
    const margin = { top: 20, right: 0, bottom: 30, left: 0 };
    const side = (clientWidth * 0.04) < 28 ? 28 : (clientWidth * 0.04)
    const width = clientWidth - side;
    const height = convertRemToPixels(6);

    const x = d3.scaleBand()
      .domain(data.map(d => d.date))
      .range([0, width])
      .padding(0.1);

    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.value) as number])
      .nice()
      .range([height, 0]);

    const svg = d3.select(svgRef.current);

    svg.selectAll('*').remove(); // 清空SVG内容

    svg.attr('width', '100%')
      .attr('height', height + margin.top + margin.bottom)
      .style('display', 'block'); // 设置SVG容器为块级元素

    const g = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // 添加渐变
    const gradient = g.append("defs")
      .append("linearGradient")
      .attr("id", "line-gradient")
      .attr("gradientUnits", "userSpaceOnUse")
      .attr("x1", 0).attr("y1", height)
      .attr("x2", 0).attr("y2", 0);

    gradient.append("stop")
      .attr("offset", "0%")
      .attr("stop-color", "white");

    gradient.append("stop")
      .attr("offset", "100%")
      .attr("stop-color", "#037990");

    // 添加填充路径
    const area = d3.area<{ date: string, value: number }>()
      .x(d => x(d.date)! + x.bandwidth() / 2)
      .y0(height)
      .y1(d => y(d.value));

    g.append('path')
      .datum(data)
      .attr('fill', 'url(#line-gradient)')
      .attr('d', area);

    // 添加折线路径
    const line = d3.line<{ date: string, value: number }>()
      .x(d => x(d.date)! + x.bandwidth() / 2)
      .y(d => y(d.value));

    g.append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', '#037990')
      .attr('stroke-width', 4)
      .attr('d', line);

    const xAxis = d3.axisBottom(x)
      .tickValues(data.filter(d => ['0am', '6am', '12pm', '18pm', '0am '].includes(d.date)).map(d => d.date))
      .tickSize(0); // 去掉 X 轴刻度线

    g.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(xAxis)
      .select('.domain')
      .remove(); // 去掉 X 轴边线

    const yAxis = d3.axisLeft(y)
      .ticks(5)
      .tickSize(0); // 去掉 Y 轴刻度线

    g.append('g')
      .call(yAxis)
      .select('.domain')
      .remove(); // 去掉 Y 轴边线

    // 找到最高点的数据项
    const maxYDatum = data.reduce((prev, current) => prev.value > current.value ? prev : current);

    // 添加圆环
    g.append('circle')
      .attr('cx', x(maxYDatum.date)! + x.bandwidth() / 2)
      .attr('cy', y(maxYDatum.value))
      .attr('r', 6)
      .attr('fill', 'white')
      .attr('stroke', '#037990')
      .attr('stroke-width', 4);

  }, [parentWidth]);

  // 将 rem 转换为像素
  const convertRemToPixels = (rem: number) => {
    return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
  }

  return <div ref={chartRef}><svg ref={svgRef}></svg></div>;
};

export default LineChart;
