"use client";

import React from "react";
import { NodeProps } from "reactflow";
import { Network } from "lucide-react";
import { BaseCustomNode } from "./BaseCustomNode";
import { CustomNodeData } from "../../../types/canvas";

export const LoadBalancerNode: React.FC<NodeProps<CustomNodeData>> = (
  props,
) => {
  return (
    <BaseCustomNode
      {...props}
      icon={Network}
      colorClass="bg-gradient-to-tr from-violet-500 to-indigo-600"
      borderColorClass="border-violet-500/30"
    />
  );
};
