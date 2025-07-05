import { useEffect, useRef } from "react";

function Chart({ title, type, data, xKey, yKey }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Set canvas size
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const padding = 40;
    const chartWidth = canvas.width - 2 * padding;
    const chartHeight = canvas.height - 2 * padding;

    if (type === "bar") {
      drawBarChart(ctx, data, xKey, yKey, padding, chartWidth, chartHeight);
    } else if (type === "line") {
      drawLineChart(ctx, data, xKey, yKey, padding, chartWidth, chartHeight);
    } else if (type === "doughnut") {
      drawDoughnutChart(
        ctx,
        data,
        yKey,
        canvas.width / 2,
        canvas.height / 2,
        Math.min(chartWidth, chartHeight) / 3
      );
    }
  }, [data, type, xKey, yKey]);

  const drawBarChart = (
    ctx,
    data,
    xKey,
    yKey,
    padding,
    chartWidth,
    chartHeight
  ) => {
    const maxValue = Math.max(...data.map((d) => Number.parseFloat(d[yKey])));
    const barWidth = (chartWidth / data.length) * 0.8;
    const barSpacing = (chartWidth / data.length) * 0.2;

    ctx.fillStyle = "#3B82F6";

    data.forEach((item, index) => {
      const barHeight =
        (Number.parseFloat(item[yKey]) / maxValue) * chartHeight;
      const x = padding + index * (barWidth + barSpacing) + barSpacing / 2;
      const y = padding + chartHeight - barHeight;

      ctx.fillRect(x, y, barWidth, barHeight);

      // Draw labels
      ctx.fillStyle = "#374151";
      ctx.font = "12px Arial";
      ctx.textAlign = "center";
      ctx.fillText(item[xKey], x + barWidth / 2, padding + chartHeight + 20);
      ctx.fillText(item[yKey], x + barWidth / 2, y - 5);
      ctx.fillStyle = "#3B82F6";
    });
  };

  const drawLineChart = (
    ctx,
    data,
    xKey,
    yKey,
    padding,
    chartWidth,
    chartHeight
  ) => {
    const maxValue = Math.max(...data.map((d) => d[yKey]));
    const stepX = chartWidth / (data.length - 1);

    ctx.strokeStyle = "#3B82F6";
    ctx.lineWidth = 2;
    ctx.beginPath();

    data.forEach((item, index) => {
      const x = padding + index * stepX;
      const y = padding + chartHeight - (item[yKey] / maxValue) * chartHeight;

      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }

      // Draw points
      ctx.fillStyle = "#3B82F6";
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, 2 * Math.PI);
      ctx.fill();
    });

    ctx.stroke();

    // Draw labels
    ctx.fillStyle = "#374151";
    ctx.font = "12px Arial";
    ctx.textAlign = "center";
    data.forEach((item, index) => {
      const x = padding + index * stepX;
      ctx.fillText(item[xKey], x, padding + chartHeight + 20);
    });
  };

  const drawDoughnutChart = (ctx, data, yKey, centerX, centerY, radius) => {
    const total = data.reduce((sum, item) => sum + item[yKey], 0);
    const colors = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6"];

    let currentAngle = -Math.PI / 2;

    data.forEach((item, index) => {
      const sliceAngle = (item[yKey] / total) * 2 * Math.PI;

      ctx.fillStyle = colors[index % colors.length];
      ctx.beginPath();
      ctx.arc(
        centerX,
        centerY,
        radius,
        currentAngle,
        currentAngle + sliceAngle
      );
      ctx.arc(
        centerX,
        centerY,
        radius * 0.6,
        currentAngle + sliceAngle,
        currentAngle,
        true
      );
      ctx.closePath();
      ctx.fill();

      currentAngle += sliceAngle;
    });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        {title}
      </h3>
      <canvas
        ref={canvasRef}
        className="w-full h-64"
        style={{ maxWidth: "100%" }}
      />
    </div>
  );
}

export default Chart;
