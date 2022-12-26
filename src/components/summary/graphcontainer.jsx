import { GraphContainer } from "../styles/graphcontainer.styles";
import { ResponsiveBar } from "@nivo/bar";

const legends = [
  {
    dataFrom: "keys",
    anchor: "bottom-right",
    direction: "column",
    justify: false,
    translateX: 120,
    translateY: 0,
    itemsSpacing: 2,
    itemWidth: 100,
    itemHeight: 20,
    itemDirection: "left-to-right",
    itemOpacity: 0.85,
    itemTextColor: "#81EF9A",
    symbolSize: 20,
    effects: [
      {
        on: "hover",
        style: {
          itemOpacity: 1,
        },
      },
    ],
  },
];
const theme = {
  background: "#0D0E14",
  axis: {
    fontSize: "14px",
    tickColor: "#81EF9A",
    ticks: {
      line: {
        stroke: "#41784D",
      },
      text: {
        fill: "#81EF9A",
      },
    },
    legend: {
      text: {
        fill: "#81EF9A",
      },
    },
  },
  grid: {
    line: {
      stroke: "#41784D",
    },
  },
  tooltip: {
    "container": {
        "background": "#0D0E14",
        "color": "#81EF9A",
        "fontSize": 12
    },
    "basic": {},
    "chip": {},
    "table": {},
    "tableCell": {},
    "tableCellValue": {}
}
};
const colors = {
  carbsColor: "#81EF9A",
  fatsColor: "#6cba7e",
  proteinColor: "#487552",
};

// color={({ id, data }) => String(data[`${id}Color`])}
// #E8C1A0
// defs={[
//     {
//       id: "dots",
//       type: "patternDots",
//       background: "inherit",
//       color: "#38bcb2",
//       size: 4,
//       padding: 1,
//       stagger: true,
//     },
//     {
//       id: "lines",
//       type: "patternLines",
//       background: "inherit",
//       color: "#eed312",
//       rotation: -45,
//       lineWidth: 6,
//       spacing: 10,
//     },
//   ]}
// fill={[
//     {
//       match: {
//         id: "null",
//       },
//       id: "dots",
//     },
//     {
//       match: {
//         id: "anchovy",
//       },
//       id: "lines",
//     },
//   ]}
const GraphContainerDiv = ({ data }) => {
  return (
    <GraphContainer>
      Caloric trends
      <ResponsiveBar
        data={data}
        theme={theme}
        colorBy={({ id }) => {
          switch (id) {
            case "carbs":
              return colors.carbsColor;
            case "fats":
              return colors.fatsColor;
            case "protein":
              return colors.proteinColor;
            default:
              return "#FFFFFF";
          }
        }}
        keys={["carbs", "fats", "protein"]}
        indexBy="date"
        margin={{ top: 10, right: 130, bottom: 50, left: 60 }}
        padding={0.3}
        borderColor={{
          from: "color",
          modifiers: [["darker", 1.6]],
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Date",
          legendPosition: "middle",
          legendOffset: 32,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Calories",
          legendPosition: "middle",
          legendOffset: -40,
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{
          from: "color",
          modifiers: [["darker", 3.0]],
        }}
        legends={legends}
        role="application"
        ariaLabel="Trends in macronutrient consumption"
        barAriaLabel={function (e) {
          return e.id + ": " + e.formattedValue + " in date: " + e.indexValue;
        }}
      />
    </GraphContainer>
  );
};

export default GraphContainerDiv;
