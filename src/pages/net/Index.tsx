import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import G6, { Graph } from "@antv/g6";
import "./index.scss";

const data = {
  nodes: [
    {
      id: "0",
      label: "0",
    },
    {
      id: "1",
      label: "1",
    },
    {
      id: "2",
      label: "2",
    },
    {
      id: "3",
      label: "3",
    },
    {
      id: "4",
      label: "4",
    },
    {
      id: "5",
      label: "5",
    },
    {
      id: "6",
      label: "6",
    },
    {
      id: "7",
      label: "7",
    },
    {
      id: "8",
      label: "8",
    },
    {
      id: "9",
      label: "9",
    },
    {
      id: "10",
      label: "10",
    },
    {
      id: "11",
      label: "11",
    },
    {
      id: "12",
      label: "12",
    },
    {
      id: "13",
      label: "13",
    },
    {
      id: "14",
      label: "14",
    },
    {
      id: "15",
      label: "15",
    },
    {
      id: "16",
      label: "16",
    },
  ],
  edges: [
    // 25.28 13.42 9.54 20.74 6.195
    {
      id: "edge-0001",
      source: "0",
      target: "1",
    },
    {
      source: "0",
      target: "2",
    },
    {
      source: "0",
      target: "3",
    },
    {
      source: "0",
      target: "4",
    },
    {
      source: "0",
      target: "5",
    },
    {
      source: "0",
      target: "7",
    },
    {
      source: "0",
      target: "8",
    },
    {
      source: "0",
      target: "9",
    },
    {
      source: "0",
      target: "10",
    },
    {
      source: "0",
      target: "11",
    },
    {
      source: "0",
      target: "13",
    },
    {
      source: "0",
      target: "14",
    },
    {
      source: "0",
      target: "15",
    },
    {
      source: "0",
      target: "16",
    },
    {
      source: "2",
      target: "3",
    },
    {
      source: "4",
      target: "5",
    },
    {
      source: "4",
      target: "6",
    },
    {
      source: "5",
      target: "6",
    },
    {
      source: "7",
      target: "13",
    },
    {
      source: "8",
      target: "14",
    },
    {
      source: "9",
      target: "10",
    },
    {
      source: "10",
      target: "14",
    },
    {
      source: "10",
      target: "12",
    },
    {
      source: "11",
      target: "14",
    },
    {
      source: "14",
      target: "11",
    },
    {
      source: "12",
      target: "13",
    },
  ],
};

const Net: React.FC = () => {
  const ref = React.useRef(null);
  const graphRef = React.useRef<Graph | null>(null);

  G6.registerNode(
    "circle-animate",
    {
      afterDraw(cfg, group) {
        // 获取该节点上的第一个图形
        const shape = group && group.get("children")[0];
        // 该图形的动画
        shape.animate(
          (ratio: number) => {
            // 每一帧的操作，入参 ratio：这一帧的比例值（Number）。返回值：这一帧需要变化的参数集（Object）。
            // 先变大、再变小
            const diff = ratio <= 0.5 ? ratio * 10 : (1 - ratio) * 10;
            let radius = (cfg && cfg.size) || 0;
            let rr: number;
            if (typeof radius == "object") {
              rr = radius[0];
            } else {
              rr = radius;
            }
            // 返回这一帧需要变化的参数集，这里只包含了半径
            return {
              r: rr / 2 + diff,
            };
          },
          {
            // 动画重复
            repeat: true,
            duration: 3000,
            easing: "easeCubic",
          },
        ); // 一次动画持续的时长为 3000，动画效果为 'easeCubic'
      },
    },
    "circle",
  );

  G6.registerEdge(
    "line-running",
    {
      afterDraw(cfg, group) {
        if (!cfg) return;
        const source = cfg.source;
        if (source !== "0") return;
        // 获得当前边的第一个图形，这里是边本身的 path
        const shape = group && group.get("children")[0];
        // 边 path 的起点位置
        const startPoint = shape.getPoint(0);

        // 添加红色 circle 图形
        const circle =
          group &&
          group.addShape("circle", {
            attrs: {
              x: startPoint.x,
              y: startPoint.y,
              fill: "red",
              r: 3,
            },
            // must be assigned in G6 3.3 and later versions. it can be any value you want
            name: "circle-shape",
          });

        if (!circle) return;
        // 对红色圆点添加动画
        circle.animate(
          (ratio: number) => {
            // 每一帧的操作，入参 ratio：这一帧的比例值（Number）。返回值：这一帧需要变化的参数集（Object）。
            // 根据比例值，获得在边 path 上对应比例的位置。
            const tmpPoint = shape.getPoint(ratio);
            // 返回需要变化的参数集，这里返回了位置 x 和 y
            return {
              x: tmpPoint.x,
              y: tmpPoint.y,
            };
          },
          {
            repeat: true, // 动画重复
            duration: 3000,
          },
        ); // 一次动画的时间长度
      },
    },
    "line",
  ); // 该自定义边继承内置三阶贝塞尔曲线 cubic

  useEffect(() => {
    if (!graphRef.current) {
      graphRef.current = new G6.Graph({
        container: ReactDOM.findDOMNode(ref.current) as HTMLElement,
        // width: 800,
        // height: 800,
        modes: {
          default: ["drag-canvas", "drag-node"],
        },
        layout: {
          type: "circular",
          ordering: "degree",
          radius: 350,
        },
        animate: true,
        animateCfg: {
          duration: 500, // Number，一次动画的时长
          // easing: "linearEasing", // String，动画函数
        },
        defaultNode: {
          type: "circle-animate",
          size: 70,
          style: {
            fill: "cyan"
          },
          labelCfg: {
            style: {
              fill: "#000",
              fontSize: "20"
            }
          }
        },
        defaultEdge: {
          type: "line-running",
          style: {
            stroke: "lightgray",
            lineWidth: 3
          },
        },
      });
    }
    graphRef.current.data(data);
    graphRef.current.render();
  });

  return <div className="node-link" ref={ref}></div>;
};

export default Net;
