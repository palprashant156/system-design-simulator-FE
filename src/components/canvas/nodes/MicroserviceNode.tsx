"use client";

import React from "react";
import { NodeProps } from "reactflow";
import { Cpu } from "lucide-react";
import { BaseCustomNode } from "./BaseCustomNode";
import { CustomNodeData } from "../../../types/canvas";

export const MicroserviceNode: React.FC<NodeProps<CustomNodeData>> = (
  props,
) => {
  return (
    <BaseCustomNode
      {...props}
      icon={Cpu}
      colorClass="bg-gradient-to-tr from-emerald-500 to-teal-600"
      borderColorClass="border-emerald-500/30"
    />
  );
};
