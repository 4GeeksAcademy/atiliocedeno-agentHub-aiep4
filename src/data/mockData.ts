export interface Agent {
  id: string;
  name: string;
  icon: string;
  description: string;
  skills: string[];
  status: 'active' | 'inactive';
}

export interface Metric {
  id: string;
  label: string;
  value: string;
  icon: string;
  trend: 'up' | 'down' | 'neutral';
  color: string;
}

export const DEFAULT_AGENTS: Agent[] = [
  {
    id: 'agent-1',
    name: 'Navigator AI',
    icon: '🧭',
    description: 'Agente especializado en navegación web y extracción de datos',
    skills: ['Web Scraping', 'Navigation', 'Data Mining', 'Reporting'],
    status: 'active',
  },
  {
    id: 'agent-2',
    name: 'SearchPro',
    icon: '🔍',
    description: 'Búsqueda avanzada con filtros inteligentes y resultados precisos',
    skills: ['Deep Search', 'Filtering', 'Ranking', 'Semantic Search'],
    status: 'active',
  },
  {
    id: 'agent-3',
    name: 'DocMaster',
    icon: '📄',
    description: 'Gestión y procesamiento inteligente de documentos',
    skills: ['OCR', 'Parsing', 'Summarization', 'Translation'],
    status: 'active',
  },
  {
    id: 'agent-4',
    name: 'DataAnalyst',
    icon: '📊',
    description: 'Análisis de datos y generación automática de reportes',
    skills: ['Analytics', 'Visualization', 'Forecasting', 'ETL'],
    status: 'inactive',
  },
];

export const METRICS_DATA: Metric[] = [
  {
    id: 'metric-1',
    label: 'Ingresos Mensuales',
    value: '$12,450',
    icon: '💰',
    trend: 'up',
    color: 'tertiary',
  },
  {
    id: 'metric-2',
    label: 'Pérdidas por Descuentos',
    value: '$1,230',
    icon: '📉',
    trend: 'down',
    color: 'red',
  },
  {
    id: 'metric-3',
    label: 'Agentes Activos',
    value: '3',
    icon: '🤖',
    trend: 'up',
    color: 'secondary',
  },
  {
    id: 'metric-4',
    label: 'Agentes con ≥6 Fallos',
    value: '2',
    icon: '⚠️',
    trend: 'down',
    color: 'yellow',
  },
];