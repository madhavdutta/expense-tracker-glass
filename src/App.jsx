import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import { useExpenses } from './hooks/useExpenses';
import Dashboard from './components/Dashboard';
import Analytics from './components/Analytics';
import ExpenseList from './components/ExpenseList';
import ExpenseForm from './components/ExpenseForm';
import Navigation from './components/Navigation';
import { Wallet, Sparkles } from 'lucide-react';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showExpenseForm, setShowExpenseForm] = useState(false);
  const { expenses, loading, addExpense, deleteExpense } = useExpenses();

  const handleAddExpense = () => {
    setShowExpenseForm(true);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'analytics':
        return <Analytics expenses={expenses} />;
      case 'expenses':
        return <ExpenseList expenses={expenses} onDeleteExpense={deleteExpense} />;
      case 'settings':
        return (
          <div className="text-center py-12">
            <div className="glass-card max-w-md mx-auto">
              <Sparkles className="w-16 h-16 text-white/30 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Settings</h3>
              <p className="text-white/60">Customize your expense tracking experience</p>
              <button className="mt-4 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all">
                Coming Soon
              </button>
            </div>
          </div>
        );
      default:
        return <Dashboard expenses={expenses} />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-float" style={{ animationDelay: '4s' }} />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass border-b border-white/10 sticky top-0 z-30"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl">
                  <Wallet className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold gradient-text">ExpenseTracker Pro</h1>
                  <p className="text-xs text-white/60">Smart Financial Management</p>
                </div>
              </div>
              
              <div className="hidden md:block">
                <Navigation 
                  activeTab={activeTab} 
                  setActiveTab={setActiveTab}
                  onAddExpense={handleAddExpense}
                />
              </div>
            </div>
          </div>
        </motion.header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-24 md:pb-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </main>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <Navigation 
            activeTab={activeTab} 
            setActiveTab={setActiveTab}
            onAddExpense={handleAddExpense}
          />
        </div>

        {/* Expense Form Modal */}
        <AnimatePresence>
          {showExpenseForm && (
            <ExpenseForm
              onAddExpense={addExpense}
              onClose={() => setShowExpenseForm(false)}
            />
          )}
        </AnimatePresence>

        {/* Toast Notifications */}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: 'rgba(0, 0, 0, 0.8)',
              color: 'white',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              backdropFilter: 'blur(10px)',
            },
          }}
        />
      </div>
    </div>
  );
}

export default App;
