export default function ChatPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-white font-montserrat">Chat</h1>
        <p className="text-gray-400 mt-1">Conversa con tus agentes de IA</p>
      </div>
      <div className="card flex items-center justify-center py-16">
        <div className="text-center">
          <span className="text-5xl">💬</span>
          <p className="text-gray-400 mt-4">Próximamente — Chat con agentes de IA</p>
        </div>
      </div>
    </div>
  );
}