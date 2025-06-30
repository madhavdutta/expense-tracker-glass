import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, X, Upload, Calendar, DollarSign, Tag, FileText } from 'lucide-react';
import toast from 'react-hot-toast';

const ExpenseForm = ({ onAddExpense, onClose }) => {
  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    category: 'Food',
    date: new Date().toISOString().split('T')[0],
    description: ''
  });

  const categories = [
    'Food', 'Transportation', 'Entertainment', 'Health', 
    'Education', 'Shopping', 'Bills', 'Other'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.title || !formData.amount) {
      toast.error('Please fill in all required fields');
      return;
    }

    const expense = {
      ...formData,
      amount: parseFloat(formData.amount),
      date: new Date(formData.date)
    };

    onAddExpense(expense);
    setFormData({
      title: '',
      amount: '',
      category: 'Food',
      date: new Date().toISOString().split('T')[0],
      description: ''
    });
    onClose();
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="glass-card max-w-md w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Add New Expense</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-white/70" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-white/70 text-sm font-medium mb-2">
              <FileText className="w-4 h-4 inline mr-2" />
              Title *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter expense title"
              required
            />
          </div>

          <div>
            <label className="block text-white/70 text-sm font-medium mb-2">
              <DollarSign className="w-4 h-4 inline mr-2" />
              Amount *
            </label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              step="0.01"
              min="0"
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="0.00"
              required
            />
          </div>

          <div>
            <label className="block text-white/70 text-sm font-medium mb-2">
              <Tag className="w-4 h-4 inline mr-2" />
              Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {categories.map(category => (
                <option key={category} value={category} className="bg-gray-800">
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-white/70 text-sm font-medium mb-2">
              <Calendar className="w-4 h-4 inline mr-2" />
              Date
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-white/70 text-sm font-medium mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              placeholder="Optional description"
            />
          </div>

          <div className="flex items-center justify-center p-4 border-2 border-dashed border-white/20 rounded-xl hover:border-white/40 transition-colors cursor-pointer">
            <div className="text-center">
              <Upload className="w-8 h-8 text-white/50 mx-auto mb-2" />
              <p className="text-white/70 text-sm">Upload Receipt (Optional)</p>
              <p className="text-white/50 text-xs">PNG, JPG up to 10MB</p>
            </div>
          </div>

          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-xl transition-all transform hover:scale-105 flex items-center justify-center"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Expense
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default ExpenseForm;
