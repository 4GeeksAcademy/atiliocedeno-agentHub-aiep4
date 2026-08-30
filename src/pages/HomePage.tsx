import { useState } from 'react';
import SearchBar from '../components/ui/SearchBar';
import AgentGrid from '../components/agents/AgentGrid';

export default function HomePage() {
  const [search, setSearch] = useState('');

  return (
    <div className="flex flex-col gap-8">
      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-12">
        <div className="flex-1">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white font-montserrat leading-tight">
            Alquila <span className="text-primary">Agentes de IA</span>
            <br />
            para tu Negocio
          </h1>
          <p className="mt-4 text-gray-400 text-base md:text-lg leading-relaxed">
            AgentHub es una plataforma donde puedes alquilar y tener asesorías asociadas a agentes de IA.
            Implementa skills de IA para llevar a cabo diferentes tareas como navegación,
            búsqueda y gestión de documentos.
          </p>
        </div>
        <div className="w-full md:w-auto">
          <SearchBar value={search} onChange={setSearch} placeholder="Buscar agentes por skill, nombre..." />
        </div>
      </section>

      {/* Agent Grid */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-white">Tus Agentes</h2>
          <span className="text-sm text-gray-400">4 agentes contratados</span>
        </div>
        <AgentGrid />
      </section>
    </div>
  );
}