import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type TransactionType = 'income' | 'expense';

export interface Transaction {
  id: string;
  date: string;
  amount: number;
  category: string;
  type: TransactionType;
  description: string;
}

export type UserRole = 'viewer' | 'admin';

export interface User {
  name: string;
  email: string;
  role: UserRole;
}

interface AppContextType {
  user: User | null;
  transactions: Transaction[];
  login: (email: string, password: string) => boolean;
  signup: (name: string, email: string, password: string) => void;
  logout: () => void;
  switchRole: (role: UserRole) => void;
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  updateTransaction: (id: string, transaction: Partial<Transaction>) => void;
  deleteTransaction: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Mock data
const MOCK_TRANSACTIONS: Transaction[] = [
  { id: '1', date: '2026-04-01', amount: 5000, category: 'Salary', type: 'income', description: 'Monthly salary' },
  { id: '2', date: '2026-04-02', amount: 1200, category: 'Rent', type: 'expense', description: 'Apartment rent' },
  { id: '3', date: '2026-04-03', amount: 350, category: 'Groceries', type: 'expense', description: 'Weekly groceries' },
  { id: '4', date: '2026-04-03', amount: 150, category: 'Transportation', type: 'expense', description: 'Gas and metro' },
  { id: '5', date: '2026-04-04', amount: 80, category: 'Entertainment', type: 'expense', description: 'Movie and dinner' },
  { id: '6', date: '2026-03-28', amount: 200, category: 'Freelance', type: 'income', description: 'Design project' },
  { id: '7', date: '2026-03-25', amount: 500, category: 'Shopping', type: 'expense', description: 'Clothing and accessories' },
  { id: '8', date: '2026-03-20', amount: 5000, category: 'Salary', type: 'income', description: 'Monthly salary' },
  { id: '9', date: '2026-03-18', amount: 1200, category: 'Rent', type: 'expense', description: 'Apartment rent' },
  { id: '10', date: '2026-03-15', amount: 400, category: 'Groceries', type: 'expense', description: 'Weekly groceries' },
  { id: '11', date: '2026-03-10', amount: 120, category: 'Utilities', type: 'expense', description: 'Electricity and water' },
  { id: '12', date: '2026-03-05', amount: 300, category: 'Healthcare', type: 'expense', description: 'Doctor visit' },
  { id: '13', date: '2026-02-28', amount: 5000, category: 'Salary', type: 'income', description: 'Monthly salary' },
  { id: '14', date: '2026-02-25', amount: 1200, category: 'Rent', type: 'expense', description: 'Apartment rent' },
  { id: '15', date: '2026-02-20', amount: 380, category: 'Groceries', type: 'expense', description: 'Weekly groceries' },
  { id: '16', date: '2026-02-15', amount: 250, category: 'Entertainment', type: 'expense', description: 'Concert tickets' },
  { id: '17', date: '2026-02-10', amount: 600, category: 'Shopping', type: 'expense', description: 'Electronics' },
  { id: '18', date: '2026-02-05', amount: 150, category: 'Transportation', type: 'expense', description: 'Monthly metro pass' },
];

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    // Load data from localStorage
    const storedUser = localStorage.getItem('financeUser');
    const storedTransactions = localStorage.getItem('financeTransactions');

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    if (storedTransactions) {
      setTransactions(JSON.parse(storedTransactions));
    } else {
      setTransactions(MOCK_TRANSACTIONS);
      localStorage.setItem('financeTransactions', JSON.stringify(MOCK_TRANSACTIONS));
    }
  }, []);

  const login = (email: string, password: string): boolean => {
    // Admin credentials
    if (email === 'sood' && password === 'zorvyn') {
      const adminUser: User = { name: 'Admin User', email: 'sood', role: 'admin' };
      setUser(adminUser);
      localStorage.setItem('financeUser', JSON.stringify(adminUser));
      return true;
    }

    // Check regular users
    const storedUsers = localStorage.getItem('financeUsers');
    if (storedUsers) {
      const users = JSON.parse(storedUsers);
      const foundUser = users.find((u: any) => u.email === email && u.password === password);
      if (foundUser) {
        const newUser: User = { name: foundUser.name, email: foundUser.email, role: 'viewer' };
        setUser(newUser);
        localStorage.setItem('financeUser', JSON.stringify(newUser));
        return true;
      }
    }

    return false;
  };

  const signup = (name: string, email: string, password: string) => {
    const storedUsers = localStorage.getItem('financeUsers');
    const users = storedUsers ? JSON.parse(storedUsers) : [];
    users.push({ name, email, password });
    localStorage.setItem('financeUsers', JSON.stringify(users));

    const newUser: User = { name, email, role: 'viewer' };
    setUser(newUser);
    localStorage.setItem('financeUser', JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('financeUser');
  };

  const switchRole = (role: UserRole) => {
    if (user) {
      const updatedUser = { ...user, role };
      setUser(updatedUser);
      localStorage.setItem('financeUser', JSON.stringify(updatedUser));
    }
  };

  const addTransaction = (transaction: Omit<Transaction, 'id'>) => {
    const newTransaction: Transaction = {
      ...transaction,
      id: Date.now().toString(),
    };
    const updatedTransactions = [newTransaction, ...transactions];
    setTransactions(updatedTransactions);
    localStorage.setItem('financeTransactions', JSON.stringify(updatedTransactions));
  };

  const updateTransaction = (id: string, updates: Partial<Transaction>) => {
    const updatedTransactions = transactions.map(t =>
      t.id === id ? { ...t, ...updates } : t
    );
    setTransactions(updatedTransactions);
    localStorage.setItem('financeTransactions', JSON.stringify(updatedTransactions));
  };

  const deleteTransaction = (id: string) => {
    const updatedTransactions = transactions.filter(t => t.id !== id);
    setTransactions(updatedTransactions);
    localStorage.setItem('financeTransactions', JSON.stringify(updatedTransactions));
  };

  return (
    <AppContext.Provider
      value={{
        user,
        transactions,
        login,
        signup,
        logout,
        switchRole,
        addTransaction,
        updateTransaction,
        deleteTransaction,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
