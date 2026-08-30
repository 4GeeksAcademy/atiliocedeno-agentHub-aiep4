import AgentGrid from '../components/agents/AgentGrid';

export default function AgentsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white font-montserrat">Agentes</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Gestiona tus agentes de IA contratados</p>
      </div>
      <AgentGrid />
    </div>
  );
}