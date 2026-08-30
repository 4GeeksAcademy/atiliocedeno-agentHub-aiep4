import { createContext, useContext, useState, type ReactNode } from 'react';
import { DEFAULT_AGENTS, type Agent } from '../data/mockData';

interface AgentsContextType {
  agents: Agent[];
  removeAgent: (id: string) => void;
}

const AgentsContext = createContext<AgentsContextType | undefined>(undefined);

export function AgentsProvider({ children }: { children: ReactNode }) {
  const [agents, setAgents] = useState<Agent[]>(DEFAULT_AGENTS);

  const removeAgent = (id: string) => {
    setAgents((prev) => prev.filter((agent) => agent.id !== id));
  };

  return (
    <AgentsContext.Provider value={{ agents, removeAgent }}>
      {children}
    </AgentsContext.Provider>
  );
}

export function useAgents() {
  const context = useContext(AgentsContext);
  if (!context) throw new Error('useAgents must be used within AgentsProvider');
  return context;
}