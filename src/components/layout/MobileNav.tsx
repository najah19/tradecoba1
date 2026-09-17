import React from 'react';
import { useMarket } from '../../context/MarketContext';
import { Home, BarChart2, Lightbulb, Calendar, User, Sparkles } from 'lucide-react';

export const MobileNav: React.FC = () => {
  const { activeTab, setActiveTab, setActiveModal } = useMarket();

  const items = [
    { id: 'home', label: 'HOME', icon: Home },
    { id: 'markets', label: 'MARKETS', icon: BarChart2 },
    { id: 'ideas', label: 'IDEAS', icon: Lightbulb },
    { id: 'calendar', label: 'CALENDAR', icon: Calendar },
    { id: 'dashboard', label: 'ACCOUNT', icon: User },
  ];

  return (
    <div id="mobile-bottom-nav" className="xl:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#080B12]/95 backdrop-blur-lg border-t border-white/10 py-1.5 px-2 safe-area-pb">
      <div className="flex items-center justify-around">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id || (item.id === 'ideas' && activeTab === 'analysis');
          return (
            <button
              key={item.id}
              id={`mobile-nav-${item.id}`}
              onClick={() => {
                if (item.id === 'ideas') {
                  setActiveTab('analysis');
                } else {
                  setActiveTab(item.id);
                }
              }}
              className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-sm transition cursor-pointer ${
                isActive ? 'text-yellow-500 font-bold' : 'text-gray-400 hover:text-white'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : 'stroke-2'}`} />
              <span className="text-[9px] mt-1 font-mono tracking-wider">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
