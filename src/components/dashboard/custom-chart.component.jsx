import React from 'react';
import { HorizontalBar } from 'react-chartjs-2';

export const chartColors = [
  [255, 99, 132],
  [54, 162, 235],
  [255, 206, 86],
  [75, 192, 192],
  [153, 102, 255],
  [255, 159, 64],
];

const stringifyRGBA = ([red, green, blue], opacity) =>
  `rgba(${red}, ${green}, ${blue}, ${opacity})`;
const defaultOpacity = 0.2;

export const CustomChart = ({
  labels,
  frequencies,
  onBarSelect,
  preferredColor,
}) => {
  var colors = [];
  if (!preferredColor) {
    // Repeats values in chartColors to create a list of size labels.length
    while (colors.length < labels.length) {
      const nextColor = chartColors[colors.length % chartColors.length];
      colors.push(stringifyRGBA(nextColor, defaultOpacity));
    }
  } else {
    // If there's a preferred color, it alternates its opacity
    for (var i = 0; i < labels.length; i++) {
      const opacity = i % 2 === 1 ? 0.4 : 0.1;
      colors.push(stringifyRGBA(preferredColor, opacity));
    }
  }
  const data = {
    labels,
    datasets: [
      {
        data: frequencies,
        backgroundColor: colors,
        borderWidth: 1,
      },
    ],
  };
  const options = {
    legend: {
      display: false,
    },
    tooltips: {
      callbacks: {
        title: (tooltipItem, data) => {
          const { index } = tooltipItem[0];
          const count = data['datasets'][0]['data'][index];
          return `${count} ${count === 1 ? 'solución' : 'soluciones'} de ${
            data['labels'][index]
          }`;
        },
        label: (tooltipItem, data) => '',
        afterLabel: (tooltipItem, data) => 'Click para verla(s)',
      },
    },
    scales: {
      xAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
    onHover: (event, chartElement) => {
      event.target.style.cursor = chartElement[0] ? 'pointer' : 'default';
    },
  };

  return (
    <HorizontalBar
      data={data}
      width={80}
      height={50}
      options={options}
      onElementsClick={([elem]) => {
        if (elem) onBarSelect(elem._index);
      }}
    />
  );
};
