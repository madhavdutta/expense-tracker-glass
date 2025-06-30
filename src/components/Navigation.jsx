import React from 'react';
import { motion } from 'framer-motion';
import { Home, BarChart3, List, Plus, Settings } from 'lucide-react';

const Navigation = ({ activeTab, setActiveTab, onAddExpense }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'expenses', label: 'Expenses', icon: List },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 md:relative md:bottom-auto">
      <div className="glass-card rounded-t-3xl md:rounded-3xl border-t border-white/20 md:border">
        <div className="flex items-center justify-around md:justify-center md:space-x-8 p-4">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col md:flex-row items-center space-y-1 md:space-y-0 md:space-x-2 p-2 md:px-4 md:py-2 rounded-xl transition-all ${
                activeTab === item.id
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-xs md:text-sm font-medium">{item.label}</span>
            </button>
          ))}
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onAddExpense}
            className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white p-3 rounded-full shadow-lg transition-all"
          >
            <Plus className="w-6 h-6" />
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
