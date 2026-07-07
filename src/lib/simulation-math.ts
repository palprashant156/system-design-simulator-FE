/**
 * Helper to estimate baseline latency client-side before running full backend simulation
 */
export const estimateBaselineLatency = (nodeType: string): number => {
  const baselineMap: Record<string, number> = {
    'api-gateway': 2.0,
    'load-balancer': 1.0,
    microservice: 8.0,
    database: 15.0,
    postgresql: 12.0,
    mysql: 14.0,
    redis: 0.5,
    cache: 0.8,
    kafka: 4.0,
    rabbitmq: 5.0,
    cdn: 1.5,
    'authentication-service': 6.0,
    'notification-service': 10.0,
    'search-service': 18.0,
    'object-storage': 25.0,
  };

  return baselineMap[nodeType] || 5.0;
};

/**
 * Format RPS numbers into human readable strings (e.g. 10.5k rps)
 */
export const formatRps = (rps: number): string => {
  if (rps >= 1000000) {
    return `${(rps / 1000000).toFixed(1)}M rps`;
  }
  if (rps >= 1000) {
    return `${(rps / 1000).toFixed(1)}k rps`;
  }
  return `${Math.round(rps)} rps`;
};

/**
 * Format milliseconds into human readable strings (e.g. 1.25s or 45ms)
 */
export const formatLatency = (ms: number): string => {
  if (ms >= 1000) {
    return `${(ms / 1000).toFixed(2)}s`;
  }
  return `${ms.toFixed(1)}ms`;
};
