'use client';

import React from 'react';
import {
  Shield,
  Network,
  Cpu,
  Database,
  HardDrive,
  Zap,
  Layers,
  Globe,
  Lock,
  Bell,
  Search,
  MessageSquare,
  Box,
} from 'lucide-react';
import { ComponentDefinition } from '../../types/canvas';

const AVAILABLE_COMPONENTS: ComponentDefinition[] = [
  { type: 'api-gateway', label: 'API Gateway', category: 'network', description: 'Entrypoint router & auth', icon: 'Shield' },
  { type: 'load-balancer', label: 'Load Balancer', category: 'network', description: 'Traffic distribution', icon: 'Network' },
  { type: 'microservice', label: 'Microservice', category: 'compute', description: 'Business logic worker', icon: 'Cpu' },
  { type: 'database', label: 'Database', category: 'storage', description: 'Relational DB instance', icon: 'Database' },
  { type: 'postgresql', label: 'PostgreSQL', category: 'storage', description: 'ACID RDBMS engine', icon: 'Database' },
  { type: 'mysql', label: 'MySQL', category: 'storage', description: 'Popular relational DB', icon: 'Database' },
  { type: 'redis', label: 'Redis', category: 'cache', description: 'In-memory key-value store', icon: 'Zap' },
  { type: 'cache', label: 'In-Memory Cache', category: 'cache', description: 'High-speed data cache', icon: 'Zap' },
  { type: 'kafka', label: 'Kafka Stream', category: 'messaging', description: 'Distributed event log', icon: 'Layers' },
  { type: 'rabbitmq', label: 'RabbitMQ', category: 'messaging', description: 'Message broker queue', icon: 'MessageSquare' },
  { type: 'cdn', label: 'Global CDN', category: 'network', description: 'Edge content caching', icon: 'Globe' },
  { type: 'authentication-service', label: 'Auth Service', category: 'service', description: 'OAuth & JWT issuer', icon: 'Lock' },
  { type: 'notification-service', label: 'Notification Service', category: 'service', description: 'Push & email worker', icon: 'Bell' },
  { type: 'search-service', label: 'Search Engine', category: 'service', description: 'Elasticsearch cluster', icon: 'Search' },
  { type: 'object-storage', label: 'Object Storage', category: 'storage', description: 'S3 blob storage', icon: 'Box' },
];

const getIcon = (name: string) => {
  switch (name) {
    case 'Shield': return Shield;
    case 'Network': return Network;
    case 'Cpu': return Cpu;
    case 'Database': return Database;
    case 'Zap': return Zap;
    case 'Layers': return Layers;
    case 'Globe': return Globe;
    case 'Lock': return Lock;
    case 'Bell': return Bell;
    case 'Search': return Search;
    case 'MessageSquare': return MessageSquare;
    case 'Box': return Box;
    default: return HardDrive;
  }
};

export const NodePalette: React.FC = () => {
  const onDragStart = (event: React.DragEvent, nodeType: string, label: string) => {
    event.dataTransfer.setData('application/reactflow/type', nodeType);
    event.dataTransfer.setData('application/reactflow/label', label);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <aside className="w-64 border-r border-slate-800 bg-slate-950/90 backdrop-blur-md p-4 flex flex-col h-full select-none">
      <div className="mb-4">
        <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider">Infrastructure Palette</h3>
        <p className="text-[11px] text-slate-500">Drag components onto the canvas</p>
      </div>

      <div className="flex-1 overflow-y-auto space-y-2 pr-1">
        {AVAILABLE_COMPONENTS.map((item) => {
          const Icon = getIcon(item.icon);
          return (
            <div
              key={item.type}
              draggable
              onDragStart={(e) => onDragStart(e, item.type, item.label)}
              className="flex items-center gap-3 p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 hover:border-cyan-500/40 hover:bg-slate-800/60 cursor-grab active:cursor-grabbing transition-all group"
            >
              <div className="w-7 h-7 rounded-md bg-slate-800 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
                <Icon className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-semibold text-slate-200 group-hover:text-cyan-400 transition-colors leading-tight">
                  {item.label}
                </h4>
                <p className="text-[10px] text-slate-500 leading-tight">{item.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </aside>
  );
};
