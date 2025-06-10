"use client";

import React, { useCallback, useState, useEffect } from "react";
import { ReactFlowProvider } from "reactflow";
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  useEdgesState,
  useNodesState,
  Node,
  Edge,
} from "reactflow";
import { useReactFlow } from "reactflow";
import "reactflow/dist/style.css";
import dagre from "dagre";
import elements from "@/data/ontology/LocD.json";

const nodeWidth = 150;
const nodeHeight = 50;

const getLayoutedElements = (nodes: Node[], edges: Edge[]) => {
  const dagreGraph = new dagre.graphlib.Graph();
  dagreGraph.setDefaultEdgeLabel(() => ({}));
  dagreGraph.setGraph({
    rankdir: "RL",
    nodesep: 10, // horizontal spacing between nodes
    ranksep: 10, // vertical spacing between ranks
    marginx: 5,
    marginy: 5,
  });

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  const jitterAmount = 10;

  const layoutedNodes = nodes.map((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    return {
      ...node,
      position: {
        x: nodeWithPosition.x - nodeWidth / 2 + (Math.random() - 0.5) * jitterAmount,
        y: nodeWithPosition.y - nodeHeight / 2 + (Math.random() - 0.5) * jitterAmount,
      },
      // React Flow needs this flag to avoid overwriting position by internal logic
      targetPosition: "top",
      sourcePosition: "bottom",
    };
  });

  return { nodes: layoutedNodes, edges };
};

export function OntologyPage() {
  const initialNodes: Node[] = elements.nodes.map((node: any) => ({
    ...node,
    type: "default",
    data: {
      ...node.data,
      expanded: true,
    },
    hidden: !!node.data.parent,
  }));

  const initialEdges: Edge[] = elements.edges;

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const { setViewport } = useReactFlow();

  useEffect(() => {
    const { nodes: layoutedNodes } = getLayoutedElements(nodes, edges);
    setNodes(layoutedNodes);
      setViewport({
        x: 20,
        y: 20,
        zoom: 2.5,
      });
  }, []);

  return (
    <div className="w-full h-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        fitView
        fitViewOptions={{ padding: 0.5 }}
        defaultViewport={{ x: 0, y: 0, zoom: 15 }}
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable={false}
      >
        <MiniMap />
        <Controls />
        <Background />
      </ReactFlow>
    </div>
  );
}

export default function OntologyPageWrapper() {
  return (
    <ReactFlowProvider>
      <OntologyPage />
    </ReactFlowProvider>
  );
}