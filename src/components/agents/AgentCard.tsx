import { useState } from 'react';
import type { Agent } from '../../data/mockData';
import Badge from '../ui/Badge';
import ActionsDropdown from '../ui/ActionsDropdown';
import Modal from '../ui/Modal';

interface AgentCardProps {
  agent: Agent;
  onDelete: (id: string) => void;
}

const statusColors = {
  active: 'bg-tertiary',
  inactive: 'bg-gray-400',
};

const skillColors = ['primary', 'secondary', 'tertiary', 'yellow'] as const;

export default function AgentCard({ agent, onDelete }: AgentCardProps) {
  const [detailOpen, setDetailOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const actions = [
    { label: 'Ver detalle', onClick: () => setDetailOpen(true) },
    { label: 'Eliminar', onClick: () => setConfirmOpen(true), variant: 'danger' as const },
  ];

  return (
    <>
      <div className="card flex flex-col gap-4 hover:border-primary/30 transition-all duration-300 group">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center text-2xl">
              {agent.icon}
            </div>
            <div>
              <h3 className="text-white font-semibold">{agent.name}</h3>
              <div className="flex items-center gap-1.5 mt-1">
                <span className={`w-2 h-2 rounded-full ${statusColors[agent.status]}`} />
                <span className="text-xs text-gray-400 capitalize">{agent.status}</span>
              </div>
            </div>
          </div>
          <ActionsDropdown actions={actions} />
        </div>

        {/* Description */}
        <p className="text-sm text-gray-400 line-clamp-2">{agent.description}</p>

        {/* Skills / Tags */}
        <div className="flex flex-wrap gap-2">
          {agent.skills.map((skill, i) => (
            <Badge key={skill} color={skillColors[i % skillColors.length]}>
              {skill}
            </Badge>
          ))}
        </div>
      </div>

      {/* Detail Modal */}
      <Modal open={detailOpen} onClose={() => setDetailOpen(false)} title={agent.name}>
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center text-3xl">
              {agent.icon}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className={`w-2.5 h-2.5 rounded-full ${statusColors[agent.status]}`} />
                <span className="text-sm text-gray-400 capitalize">{agent.status}</span>
              </div>
              <p className="text-gray-400 text-sm mt-1">{agent.description}</p>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white mb-2">Skills</h4>
            <div className="flex flex-wrap gap-2">
              {agent.skills.map((skill, i) => (
                <Badge key={skill} color={skillColors[i % skillColors.length]}>
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </Modal>

      {/* Confirm Delete Modal */}
      <Modal open={confirmOpen} onClose={() => setConfirmOpen(false)} title="Eliminar agente">
        <p className="text-gray-400 mb-6">
          ¿Estás seguro de que deseas eliminar a <strong className="text-white">{agent.name}</strong>? Esta acción no se puede deshacer.
        </p>
        <div className="flex gap-3 justify-end">
          <button
            onClick={() => setConfirmOpen(false)}
            className="px-4 py-2 rounded-lg bg-[#334155] text-gray-300 hover:bg-[#475569] transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={() => {
              onDelete(agent.id);
              setConfirmOpen(false);
            }}
            className="px-4 py-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors"
          >
            Eliminar
          </button>
        </div>
      </Modal>
    </>
  );
}