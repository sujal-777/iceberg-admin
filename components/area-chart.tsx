"use client"

import { useEffect, useRef } from "react"
import { Chart, type ChartConfiguration, registerables } from "chart.js"

Chart.register(...registerables)

export function AreaChart() {
  const chartRef = useRef<HTMLCanvasElement>(null)
  const chartInstance = useRef<Chart | null>(null)

  useEffect(() => {
    if (!chartRef.current) return

    const ctx = chartRef.current.getContext("2d")
    if (!ctx) return

    // Destroy existing chart
    if (chartInstance.current) {
      chartInstance.current.destroy()
    }

    const gradient1 = ctx.createLinearGradient(0, 0, 0, 400)
    gradient1.addColorStop(0, "rgba(173, 216, 230, 0.8)")
    gradient1.addColorStop(1, "rgba(173, 216, 230, 0.1)")

    const gradient2 = ctx.createLinearGradient(0, 0, 0, 400)
    gradient2.addColorStop(0, "rgba(144, 238, 144, 0.8)")
    gradient2.addColorStop(1, "rgba(144, 238, 144, 0.1)")

    const config: ChartConfiguration = {
      type: "line",
      data: {
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        datasets: [
          {
            label: "This Week",
            data: [120, 130, 125, 140, 160, 220, 210],
            borderColor: "rgb(75, 192, 192)",
            backgroundColor: gradient2,
            tension: 0.4,
            fill: true,
          },
          {
            label: "Last Week",
            data: [100, 110, 120, 110, 130, 140, 130],
            borderColor: "rgb(54, 162, 235)",
            backgroundColor: gradient1,
            tension: 0.4,
            fill: true,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              display: true,
              color: "rgba(0, 0, 0, 0.05)",
            },
            ticks: {
              stepSize: 50,
            },
          },
          x: {
            grid: {
              display: false,
            },
          },
        },
        plugins: {
          legend: {
            display: false,
          },
        },
        elements: {
          point: {
            radius: 0,
          },
        },
      },
    }

    chartInstance.current = new Chart(ctx, config)

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }
    }
  }, [])

  return (
    <div className="h-[300px] w-full">
      <canvas ref={chartRef} />
    </div>
  )
}
