import { useAgents } from '../../contexts/AgentsContext';
import AgentCard from './AgentCard';

export default function AgentGrid() {
  const { agents, removeAgent } = useAgents();

  return (
    <section className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {agents.map((agent) => (
          <AgentCard key={agent.id} agent={agent} onDelete={removeAgent} />
        ))}
      </div>
    </section>
  );
}