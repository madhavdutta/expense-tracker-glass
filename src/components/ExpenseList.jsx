import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Trash2, Calendar, DollarSign, Tag } from 'lucide-react';
import { format } from 'date-fns';
import { formatCurrency, getCategoryColors } from '../utils/analytics';

const ExpenseList = ({ expenses, onDeleteExpense }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('date');

  const categories = ['All', ...new Set(expenses.map(expense => expense.category))];
  const categoryColors = getCategoryColors();

  const filteredExpenses = expenses
    .filter(expense => {
      const matchesSearch = expense.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           expense.description?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || expense.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'amount':
          return b.amount - a.amount;
        case 'title':
          return a.title.localeCompare(b.title);
        default:
          return new Date(b.date) - new Date(a.date);
      }
    });

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card"
      >
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5" />
            <input
              type="text"
              placeholder="Search expenses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div className="flex gap-3">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {categories.map(category => (
                <option key={category} value={category} className="bg-gray-800">
                  {category}
                </option>
              ))}
            </select>
            
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="date" className="bg-gray-800">Date</option>
              <option value="amount" className="bg-gray-800">Amount</option>
              <option value="title" className="bg-gray-800">Title</option>
            </select>
          </div>
        </div>

        <div className="text-white/70 mb-4">
          Showing {filteredExpenses.length} of {expenses.length} expenses
        </div>
      </motion.div>

      <div className="space-y-3">
        <AnimatePresence>
          {filteredExpenses.map((expense, index) => (
            <motion.div
              key={expense.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ delay: index * 0.05 }}
              className="glass-card hover:bg-white/15 transition-all duration-300 group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 flex-1">
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: categoryColors[expense.category] || '#6b7280' }}
                  >
                    <Tag className="w-6 h-6 text-white" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white font-semibold text-lg truncate">
                      {expense.title}
                    </h3>
                    <div className="flex items-center space-x-4 text-white/60 text-sm">
                      <span className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {format(new Date(expense.date), 'MMM dd, yyyy')}
                      </span>
                      <span className="flex items-center">
                        <Tag className="w-4 h-4 mr-1" />
                        {expense.category}
                      </span>
                    </div>
                    {expense.description && (
                      <p className="text-white/50 text-sm mt-1 truncate">
                        {expense.description}
                      </p>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <div className="text-white font-bold text-xl">
                      {formatCurrency(expense.amount)}
                    </div>
                  </div>
                  
                  <button
                    onClick={() => onDeleteExpense(expense.id)}
                    className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/20 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {filteredExpenses.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="glass-card text-center py-12"
          >
            <div className="text-white/50 text-lg mb-2">No expenses found</div>
            <div className="text-white/30">Try adjusting your search or filters</div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ExpenseList;
