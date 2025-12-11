import type { ViewType } from '../types/types'

interface HeaderProps {
  currentView: ViewType;
  onViewChange: (view: ViewType) => void;
}

function Header({ currentView, onViewChange }: HeaderProps) {
  const buttons: Array<{ label: string; view: ViewType; gradient: string }> = [
    { label: 'Home', view: 'home', gradient: 'hover:bg-gradient-to-b hover:from-blue-200 hover:to-blue-700' },
    { label: 'Map', view: 'map', gradient: 'hover:bg-gradient-to-b hover:from-green-200 hover:to-green-700' },
    { label: 'Table', view: 'table', gradient: 'hover:bg-gradient-to-b hover:from-purple-200 hover:to-purple-700' },
    { label: 'About', view: 'about', gradient: 'hover:bg-gradient-to-b hover:from-orange-200 hover:to-orange-700' },
  ];

  return (
    <header className="bg-[#253031] text-[#FCFAF0] py-6 px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-start items-start gap-2 mb-4">
          {buttons.map((btn) => (
            <button
              key={btn.label}
              onClick={() => onViewChange(btn.view)}
              className={`px-5 py-0.5 text-xs font-sans border border-gray-400 rounded transition-all duration-300 ${
                currentView === btn.view 
                  ? 'bg-gradient-to-b from-gray-400 to-gray-600 text-white font-semibold' 
                  : `text-gray-300 ${btn.gradient}`
              }`}
            >
              {btn.label}
            </button>
          ))}
        </div>
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-serif font-bold">MassSave & Regional Environmental Justice</h1>
            <p className="text-lg mt-2 opacity-90">Energy Efficiency Participation in Massachusetts</p>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
