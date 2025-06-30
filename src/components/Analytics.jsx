import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, PieChart, TrendingUp, Calendar, Target, Award } from 'lucide-react';
import ExpenseChart from './ExpenseChart';
import { 
  calculateTotalExpenses, 
  calculateCategoryTotals, 
  getMonthlyExpenses,
  formatCurrency 
} from '../utils/analytics';

const Analytics = ({ expenses }) => {
  const [activeTab, setActiveTab] = useState('overview');
  
  const totalExpenses = calculateTotalExpenses(expenses);
  const categoryTotals = calculateCategoryTotals(expenses);
  const monthlyData = getMonthlyExpenses(expenses);
  
  const topCategory = Object.entries(categoryTotals).reduce((a, b) => 
    categoryTotals[a[0]] > categoryTotals[b[0]] ? a : b, ['', 0]
  );
  
  const averageMonthly = monthlyData.reduce((sum, month) => sum + month.total, 0) / monthlyData.length;
  const currentMonth = monthlyData[monthlyData.length - 1]?.total || 0;
  const previousMonth = monthlyData[monthlyData.length - 2]?.total || 0;
  const monthlyChange = previousMonth > 0 ? ((currentMonth - previousMonth) / previousMonth) * 100 : 0;

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'trends', label: 'Trends', icon: TrendingUp },
    { id: 'categories', label: 'Categories', icon: PieChart },
    { id: 'goals', label: 'Goals', icon: Target }
  ];

  const insights = [
    {
      title: 'Top Spending Category',
      value: topCategory[0],
      amount: formatCurrency(topCategory[1]),
      icon: Award,
      color: 'from-yellow-500 to-orange-500'
    },
    {
      title: 'Monthly Average',
      value: formatCurrency(averageMonthly),
      amount: `${monthlyData.length} months`,
      icon: Calendar,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Monthly Change',
      value: `${monthlyChange > 0 ? '+' : ''}${monthlyChange.toFixed(1)}%`,
      amount: 'vs last month',
      icon: TrendingUp,
      color: monthlyChange > 0 ? 'from-red-500 to-pink-500' : 'from-green-500 to-emerald-500'
    }
  ];

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-4xl font-bold gradient-text mb-2">Financial Analytics</h1>
        <p className="text-white/70">Deep insights into your spending patterns</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-card"
      >
        <div className="flex flex-wrap gap-2 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                  : 'bg-white/10 text-white/70 hover:bg-white/20'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {activeTab === 'overview' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {insights.map((insight, index) => (
                <motion.div
                  key={insight.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="glass rounded-2xl p-6"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-r ${insight.color}`}>
                      <insight.icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-1">{insight.value}</h3>
                  <p className="text-white/60 text-sm mb-1">{insight.title}</p>
                  <p className="text-white/40 text-xs">{insight.amount}</p>
                </motion.div>
              ))}
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ExpenseChart expenses={expenses} chartType="category" />
              <ExpenseChart expenses={expenses} chartType="doughnut" />
            </div>
          </motion.div>
        )}

        {activeTab === 'trends' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            <ExpenseChart expenses={expenses} chartType="monthly" />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="glass rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Monthly Breakdown</h3>
                <div className="space-y-3">
                  {monthlyData.slice(-6).map((month, index) => (
                    <div key={month.month} className="flex justify-between items-center">
                      <span className="text-white/70">{month.month}</span>
                      <span className="text-white font-semibold">{formatCurrency(month.total)}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="glass rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Spending Insights</h3>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-white/70">Highest Month</span>
                    <span className="text-red-400 font-semibold">
                      {formatCurrency(Math.max(...monthlyData.map(m => m.total)))}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">Lowest Month</span>
                    <span className="text-green-400 font-semibold">
                      {formatCurrency(Math.min(...monthlyData.map(m => m.total)))}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">Average</span>
                    <span className="text-white font-semibold">
                      {formatCurrency(averageMonthly)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'categories' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ExpenseChart expenses={expenses} chartType="doughnut" />
              <ExpenseChart expenses={expenses} chartType="category" />
            </div>
            
            <div className="glass rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Category Analysis</h3>
              <div className="space-y-3">
                {Object.entries(categoryTotals)
                  .sort(([,a], [,b]) => b - a)
                  .map(([category, amount]) => {
                    const percentage = (amount / totalExpenses) * 100;
                    return (
                      <div key={category} className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-white/70">{category}</span>
                          <span className="text-white font-semibold">
                            {formatCurrency(amount)} ({percentage.toFixed(1)}%)
                          </span>
                        </div>
                        <div className="w-full bg-white/10 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'goals' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            <div className="text-center py-12">
              <Target className="w-16 h-16 text-white/30 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Financial Goals</h3>
              <p className="text-white/60">Set and track your financial goals</p>
              <button className="mt-4 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all">
                Coming Soon
              </button>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default Analytics;
