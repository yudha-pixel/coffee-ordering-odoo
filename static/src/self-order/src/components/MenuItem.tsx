// Menu Item Component for Navigation
export default function MenuItem({ icon, title, onClick }: { icon: React.ReactNode; title: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="w-full px-6 py-4 flex items-center space-x-4 text-white hover:bg-white/10 transition-colors duration-200"
    >
      <div className="flex-shrink-0">{icon}</div>
      <span className="text-left font-medium">{title}</span>
    </button>
  );
}