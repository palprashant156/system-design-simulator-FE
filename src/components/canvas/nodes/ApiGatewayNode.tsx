'use client';

import React from 'react';
import { NodeProps } from 'reactflow';
import { Shield } from 'lucide-react';
import { BaseCustomNode } from './BaseCustomNode';
import { CustomNodeData } from '../../../types/canvas';

export const ApiGatewayNode: React.FC<NodeProps<CustomNodeData>> = (props) => {
  return (
    <BaseCustomNode
      {...props}
      icon={Shield}
      colorClass="bg-gradient-to-tr from-cyan-500 to-blue-600"
      borderColorClass="border-cyan-500/30"
    />
  );
};
