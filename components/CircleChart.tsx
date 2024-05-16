"use client";

// components/CircleChart.tsx

import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface DataItem {
  value: number;
  color: string;
}

interface CircleChartProps {
  data: DataItem[];
}

const CircleChart: React.FC<CircleChartProps> = ({ data }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const updateChart = () => {
      const fontSize = parseFloat(getComputedStyle(document.documentElement).fontSize); // 获取根元素字体大小
      const rem = fontSize * 7; // 假设环形图大小为根元素字体大小的 0.8 倍

      const svg = d3.select(svgRef.current);
      const width = rem; // SVG 宽度为 rem
      const height = rem; // SVG 高度为 rem

      const radius = rem / 2; // 半径为 rem 的一半
      const innerRadius = radius * 0.7;
      const outerRadius = radius; // 外半径为半径的 1 倍

      svg.selectAll('*').remove(); // 清空 SVG


      const pie = d3.pie<DataItem>().value(d => d.value).sort(null);
      svg.attr('width', width).attr('height', height);

      [{ value: 100, color: '#f0f3fa' }, ...data].forEach(item => {
        // 计算起始角度和结束角度
        const startAngle = Math.PI; // 从底部开始
        const endAngle = startAngle - Math.PI * (item.value / 50); // 根据数据值计算结束角度

        const arc = d3.arc<DataItem>()
          .innerRadius(innerRadius)
          .outerRadius(outerRadius)
          .startAngle(startAngle)
          .endAngle(endAngle)
          .cornerRadius(10);


        svg.append('path')
          .attr('d', arc as any)
          .attr('fill', d => item.color)
          .attr('transform', `translate(${width / 2}, ${height / 2})`); // 将底色圆环移动到 SVG 中心

      })
    };


    updateChart(); // 初次渲染图表

    window.addEventListener('resize', updateChart); // 监听窗口大小变化

    return () => {
      window.removeEventListener('resize', updateChart); // 移除事件监听
    };
  }, [data]);

  return <svg ref={svgRef}></svg>;
};

export default CircleChart;
