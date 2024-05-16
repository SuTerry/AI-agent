import { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import d3Tip from 'd3-tip'

interface PropsType {
  parentWidth: number;
}



const BarChart = ({parentWidth}: PropsType) => {
  const chartRef = useRef<SVGSVGElement>(null);
  const tipRef= useRef(0)
  const [dimensions, setDimensions] = useState({
    width: convertRemToPixels(20), // 20rem
    height: convertRemToPixels(12) // 15rem
  });

  useEffect(() => {
    // 清除之前绘制的图表
    d3.select(chartRef.current).selectAll('*').remove();

    // 数据
    const data = [
      { day: "Mon", value: 700 },
      { day: "Tue", value: 1100 },
      { day: "Wed", value: 300 },
      { day: "Thu", value: 900 },
      { day: "Fri", value: 550 },
      { day: "Sat", value: 1300 },
      { day: "Sun", value: 500 }
    ];

    // 设置图表的宽度和高度
    const clientWidth = parentWidth
    const side = (clientWidth * 0.14) < 64 ? 64 : (clientWidth * 0.14)
    const width = clientWidth - side;
    
    const height = dimensions.height;
    const margin = { top: 20, right: 36, bottom: 40, left: 0 };

    // 选择图表的容器
    const svg = d3.select(chartRef.current)
      .attr("width", '100%')
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // 设置x轴和y轴的比例尺
    const x = d3.scaleBand()
      .domain(data.map(d => d.day))
      .range([0, width])
      .padding(0.1);

    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.value) || 0]).nice()
      .range([height, 0]);

    // 添加x轴文字标签
    svg.append("g")
      .selectAll(".x-label")
      .data(data)
      .enter().append("text")
      .attr("class", "x-label")
      .attr("x", d => (x(d.day) || 0) + x.bandwidth() / 3)
      .attr("y", height + 20) // 调整位置
      .attr("text-anchor", "middle")
      .attr("font-size", `${convertRemToPixels(0.8)}px`) // 设置字体大小
      .text(d => d.day);

    // 在指定位置添加虚线
    svg.selectAll(".dash-line")
      .data([0, 200, 400, 600, 800, 1000, 1200])
      .enter().append("line")
      .attr("class", "dash-line")
      .attr("x1", 0)
      .attr("x2", width)
      .attr("y1", d => y(d))
      .attr("y2", d => y(d))
      .style("stroke-dasharray", "5, 5") // 设置虚线样式
      .style("stroke", "#017991");

    // 添加Y轴刻度数字
    svg.selectAll(".y-label")
      .data([0, 200, 400, 600, 800, 1000, 1200])
      .enter().append("text")
      .attr("x", width + 36) // 调整位置
      .attr("y", d => y(d))
      .attr("dy", 3) // 调整位置
      .attr("text-anchor", "end")
      .text(d => d);

    // 定义一个带有圆角的路径
    const barPath = (x: any, y: number, width: any, height: number, radius: number) => {
      return `M${x},${y + height} 
              L${x},${y + radius} 
              Q${x},${y} ${x + radius},${y} 
              L${x + width - radius},${y} 
              Q${x + width},${y} ${x + width},${y + radius} 
              L${x + width},${y + height} 
              Z`;
    }

    const tip = (d3Tip as any)()
      .attr('class', 'd3-tip')
      .offset([20, 56])
      .html((d: any) => {
        const value = d.target.__data__.value
        tipRef.current = value
        return `<div><p class="text-cyan-700 text-sm">周TOP</p> <p class="text-xs">计<span class="text-sm font-semibold">${value}</span>次发言</p></div>`
      });

    svg.call(tip);

    // 添加柱状图
    svg.selectAll(".bar")
      .data(data)
      .enter().append("path")
      .attr("class", "bar")
      .attr("d", d => barPath(x(d.day), y(d.value), x.bandwidth() * 0.7, height - y(d.value), (x.bandwidth() * 0.7) / 2))
      .attr("fill", "#017991")
      .on('click', function(e, b) {
        if (b.value === tipRef.current) {
          tip.hide.call(this, e, b)
          tipRef.current = 0
        }else {
          tip.show.call(this, e, b)
        }
      })

  }, [dimensions, parentWidth]);




  return (
    <svg ref={chartRef}></svg>
  );
}

// 将 rem 转换为像素
const convertRemToPixels = (rem: number) => {
  return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
}

export default BarChart;
