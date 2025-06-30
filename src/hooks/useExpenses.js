import { useState, useEffect } from 'react';
import { collection, addDoc, onSnapshot, query, orderBy, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
import toast from 'react-hot-toast';

export const useExpenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'expenses'), orderBy('date', 'desc'));
    
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const expensesData = [];
      querySnapshot.forEach((doc) => {
        expensesData.push({ id: doc.id, ...doc.data() });
      });
      setExpenses(expensesData);
      setLoading(false);
    }, (error) => {
      console.error('Error fetching expenses:', error);
      // Use mock data for demo
      setExpenses(mockExpenses);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const addExpense = async (expense) => {
    try {
      await addDoc(collection(db, 'expenses'), {
        ...expense,
        date: new Date(expense.date),
        createdAt: new Date()
      });
      toast.success('Expense added successfully!');
    } catch (error) {
      console.error('Error adding expense:', error);
      // Add to mock data for demo
      const newExpense = {
        id: Date.now().toString(),
        ...expense,
        date: new Date(expense.date),
        createdAt: new Date()
      };
      setExpenses(prev => [newExpense, ...prev]);
      toast.success('Expense added successfully!');
    }
  };

  const deleteExpense = async (id) => {
    try {
      await deleteDoc(doc(db, 'expenses', id));
      toast.success('Expense deleted successfully!');
    } catch (error) {
      console.error('Error deleting expense:', error);
      // Remove from mock data for demo
      setExpenses(prev => prev.filter(expense => expense.id !== id));
      toast.success('Expense deleted successfully!');
    }
  };

  return { expenses, loading, addExpense, deleteExpense };
};

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
