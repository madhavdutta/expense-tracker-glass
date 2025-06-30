import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, DollarSign, Target, PieChart, BarChart3 } from 'lucide-react';
import { formatCurrency, calculateTotalExpenses, calculateSavingsRate } from '../utils/analytics';

const Dashboard = ({ expenses }) => {
  const totalExpenses = calculateTotalExpenses(expenses);
  const monthlyIncome = 5000; // Mock income
  const savingsRate = calculateSavingsRate(monthlyIncome, expenses);
  const remainingBudget = monthlyIncome - totalExpenses;

  const stats = [
    {
      title: 'Total Expenses',
      value: formatCurrency(totalExpenses),
      icon: DollarSign,
      color: 'from-red-500 to-pink-500',
      trend: -12.5
    },
    {
      title: 'Monthly Income',
      value: formatCurrency(monthlyIncome),
      icon: TrendingUp,
      color: 'from-green-500 to-emerald-500',
      trend: 8.2
    },
    {
      title: 'Savings Rate',
      value: `${savingsRate.toFixed(1)}%`,
      icon: Target,
      color: 'from-blue-500 to-cyan-500',
      trend: 15.3
    },
    {
      title: 'Remaining Budget',
      value: formatCurrency(remainingBudget),
      icon: PieChart,
      color: 'from-purple-500 to-indigo-500',
      trend: remainingBudget > 0 ? 5.7 : -23.1
    }
  ];

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-4xl font-bold gradient-text mb-2">Financial Dashboard</h1>
        <p className="text-white/70">Track your expenses and achieve your financial goals</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass-card hover:scale-105 transition-transform duration-300"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl bg-gradient-to-r ${stat.color}`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div className="flex items-center space-x-1">
                {stat.trend > 0 ? (
                  <TrendingUp className="w-4 h-4 text-green-400" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-red-400" />
                )}
                <span className={`text-sm ${stat.trend > 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {Math.abs(stat.trend)}%
                </span>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-white mb-1">{stat.value}</h3>
            <p className="text-white/60 text-sm">{stat.title}</p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="glass-card"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-white">Budget Progress</h2>
          <BarChart3 className="w-5 h-5 text-white/60" />
        </div>
        
        <div className="space-y-4">
          <div className="flex justify-between text-sm">
            <span className="text-white/70">Spent: {formatCurrency(totalExpenses)}</span>
            <span className="text-white/70">Budget: {formatCurrency(monthlyIncome)}</span>
          </div>
          
          <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${Math.min((totalExpenses / monthlyIncome) * 100, 100)}%` }}
              transition={{ duration: 1, delay: 0.5 }}
              className={`h-full rounded-full ${
                totalExpenses > monthlyIncome 
                  ? 'bg-gradient-to-r from-red-500 to-red-600' 
                  : 'bg-gradient-to-r from-blue-500 to-purple-500'
              }`}
            />
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-white/70 text-sm">
              {((totalExpenses / monthlyIncome) * 100).toFixed(1)}% of budget used
            </span>
            <span className={`text-sm font-medium ${
              remainingBudget > 0 ? 'text-green-400' : 'text-red-400'
            }`}>
              {remainingBudget > 0 ? 'Under budget' : 'Over budget'}
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;
