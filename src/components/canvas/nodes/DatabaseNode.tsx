'use client';

import React from 'react';
import { NodeProps } from 'reactflow';
import { Database } from 'lucide-react';
import { BaseCustomNode } from './BaseCustomNode';
import { CustomNodeData } from '../../../types/canvas';

export const DatabaseNode: React.FC<NodeProps<CustomNodeData>> = (props) => {
  return (
    <BaseCustomNode
      {...props}
      icon={Database}
      colorClass="bg-gradient-to-tr from-amber-500 to-orange-600"
      borderColorClass="border-amber-500/30"
    />
  );
};
