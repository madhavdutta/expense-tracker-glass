import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

// Mock data for demo purposes
const mockExpenses = [
  {
    id: '1',
    title: 'Grocery Shopping',
    amount: 85.50,
    category: 'Food',
    date: new Date('2024-01-15'),
    description: 'Weekly groceries from Whole Foods'
  },
  {
    id: '2',
    title: 'Gas Station',
    amount: 45.20,
    category: 'Transportation',
    date: new Date('2024-01-14'),
    description: 'Fuel for car'
  },
  {
    id: '3',
    title: 'Netflix Subscription',
    amount: 15.99,
    category: 'Entertainment',
    date: new Date('2024-01-13'),
    description: 'Monthly streaming subscription'
  },
  {
    id: '4',
    title: 'Coffee Shop',
    amount: 12.75,
    category: 'Food',
    date: new Date('2024-01-12'),
    description: 'Morning coffee and pastry'
  },
  {
    id: '5',
    title: 'Gym Membership',
    amount: 49.99,
    category: 'Health',
    date: new Date('2024-01-11'),
    description: 'Monthly gym membership fee'
  },
  {
    id: '6',
    title: 'Online Course',
    amount: 89.99,
    category: 'Education',
    date: new Date('2024-01-10'),
    description: 'React development course'
  },
  {
    id: '7',
    title: 'Restaurant Dinner',
    amount: 67.80,
    category: 'Food',
    date: new Date('2024-01-09'),
    description: 'Dinner with friends'
  },
  {
    id: '8',
    title: 'Uber Ride',
    amount: 18.50,
    category: 'Transportation',
    date: new Date('2024-01-08'),
    description: 'Ride to downtown'
  }
];


export const useExpenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching data by using the mock data
    setTimeout(() => {
      const sortedExpenses = mockExpenses.sort((a, b) => new Date(b.date) - new Date(a.date));
      setExpenses(sortedExpenses);
      setLoading(false);
    }, 500); // A small delay to show the loader
  }, []);

  const addExpense = async (expense) => {
    const newExpense = {
      id: Date.now().toString(),
      ...expense,
      date: new Date(expense.date),
      createdAt: new Date()
    };
    const updatedExpenses = [newExpense, ...expenses].sort((a, b) => new Date(b.date) - new Date(a.date));
    setExpenses(updatedExpenses);
    toast.success('Expense added successfully!');
  };

  const deleteExpense = async (id) => {
    setExpenses(prev => prev.filter(expense => expense.id !== id));
    toast.success('Expense deleted successfully!');
  };

  return { expenses, loading, addExpense, deleteExpense };
};
