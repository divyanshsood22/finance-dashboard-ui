import { useMemo } from 'react';
import { TrendingUp, TrendingDown, Calendar, AlertCircle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useApp } from '../contexts/AppContext';
import { format, parseISO, startOfMonth, endOfMonth, subMonths, isWithinInterval } from 'date-fns';

export default function InsightsSection() {
  const { transactions } = useApp();

  const insights = useMemo(() => {
    if (transactions.length === 0) {
      return null;
    }

    // Highest spending category
    const categorySpending = new Map<string, number>();
    transactions
      .filter(t => t.type === 'expense')
      .forEach(t => {
        const current = categorySpending.get(t.category) || 0;
        categorySpending.set(t.category, current + t.amount);
      });

    const highestCategory = Array.from(categorySpending.entries())
      .sort((a, b) => b[1] - a[1])[0];

    // Monthly comparison (current month vs last month)
    const now = new Date();
    const currentMonthStart = startOfMonth(now);
    const currentMonthEnd = endOfMonth(now);
    const lastMonthStart = startOfMonth(subMonths(now, 1));
    const lastMonthEnd = endOfMonth(subMonths(now, 1));

    const currentMonthExpenses = transactions
      .filter(t => {
        const date = parseISO(t.date);
        return t.type === 'expense' && isWithinInterval(date, { start: currentMonthStart, end: currentMonthEnd });
      })
      .reduce((sum, t) => sum + t.amount, 0);

    const lastMonthExpenses = transactions
      .filter(t => {
        const date = parseISO(t.date);
        return t.type === 'expense' && isWithinInterval(date, { start: lastMonthStart, end: lastMonthEnd });
      })
      .reduce((sum, t) => sum + t.amount, 0);

    const expenseChange = lastMonthExpenses > 0
      ? ((currentMonthExpenses - lastMonthExpenses) / lastMonthExpenses) * 100
      : 0;

    // Average transaction amount
    const expenseTransactions = transactions.filter(t => t.type === 'expense');
    const avgExpense = expenseTransactions.length > 0
      ? expenseTransactions.reduce((sum, t) => sum + t.amount, 0) / expenseTransactions.length
      : 0;

    // Largest single transaction
    const largestExpense = expenseTransactions.length > 0
      ? expenseTransactions.reduce((max, t) => t.amount > max.amount ? t : max, expenseTransactions[0])
      : null;

    // Monthly trend (last 4 months)
    const months = [3, 2, 1, 0].map((offset, idx) => {
      const month = subMonths(now, offset);
      const monthStart = startOfMonth(month);
      const monthEnd = endOfMonth(month);

      const income = transactions
        .filter(t => {
          const date = parseISO(t.date);
          return t.type === 'income' && isWithinInterval(date, { start: monthStart, end: monthEnd });
        })
        .reduce((sum, t) => sum + t.amount, 0);

      const expenses = transactions
        .filter(t => {
          const date = parseISO(t.date);
          return t.type === 'expense' && isWithinInterval(date, { start: monthStart, end: monthEnd });
        })
        .reduce((sum, t) => sum + t.amount, 0);

      return {
        id: `insight-month-${idx}-${format(month, 'yyyy-MM')}`,
        month: format(month, 'MMM yyyy'),
        income,
        expenses,
        savings: income - expenses,
      };
    });

    return {
      highestCategory,
      currentMonthExpenses,
      lastMonthExpenses,
      expenseChange,
      avgExpense,
      largestExpense,
      monthlyTrend: months,
    };
  }, [transactions]);

  if (!insights || transactions.length === 0) {
    return (
      <div className="text-center py-12">
        <AlertCircle className="w-16 h-16 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">No insights available</h3>
        <p className="text-gray-500 dark:text-gray-400">Add more transactions to see financial insights</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Financial Insights</h2>

      {/* Key Insights Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Highest Spending Category */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-lg">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white">Top Spending Category</h3>
          </div>
          <p className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-1">
            {insights.highestCategory[0]}
          </p>
          <p className="text-gray-600 dark:text-gray-400">
            ${insights.highestCategory[1].toLocaleString()} spent
          </p>
        </div>

        {/* Monthly Comparison */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-lg">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
              <Calendar className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white">Month Comparison</h3>
          </div>
          <div className="flex items-baseline gap-2">
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              ${insights.currentMonthExpenses.toLocaleString()}
            </p>
            <div className={`flex items-center gap-1 text-sm ${
              insights.expenseChange > 0 ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'
            }`}>
              {insights.expenseChange > 0 ? (
                <TrendingUp className="w-4 h-4" />
              ) : (
                <TrendingDown className="w-4 h-4" />
              )}
              <span>{Math.abs(insights.expenseChange).toFixed(1)}%</span>
            </div>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            vs ${insights.lastMonthExpenses.toLocaleString()} last month
          </p>
        </div>

        {/* Average Expense */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:shadow-lg">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center">
              <TrendingDown className="w-5 h-5 text-orange-600 dark:text-orange-400" />
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white">Average Expense</h3>
          </div>
          <p className="text-2xl font-bold text-orange-600 dark:text-orange-400 mb-1">
            ${insights.avgExpense.toFixed(2)}
          </p>
          <p className="text-gray-600 dark:text-gray-400">per transaction</p>
        </div>
      </div>

      {/* Monthly Trend Chart */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 transition-all duration-300">
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">4-Month Trend</h3>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={insights.monthlyTrend}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
            <XAxis dataKey="month" stroke="#9ca3af" />
            <YAxis stroke="#9ca3af" />
            <Tooltip
              formatter={(value) => `$${Number(value).toLocaleString()}`}
              contentStyle={{
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
              labelStyle={{ color: '#111827' }}
            />
            <Legend />
            <Bar dataKey="income" fill="#10b981" name="Income" />
            <Bar dataKey="expenses" fill="#ef4444" name="Expenses" />
            <Bar dataKey="savings" fill="#3b82f6" name="Savings" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Observations */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 transition-all duration-300">
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Key Observations</h3>
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-blue-600 dark:text-blue-400 text-xs font-medium">1</span>
            </div>
            <p className="text-gray-700 dark:text-gray-300">
              Your highest spending category is <strong className="text-gray-900 dark:text-white">{insights.highestCategory[0]}</strong> with a total of{' '}
              <strong className="text-gray-900 dark:text-white">${insights.highestCategory[1].toLocaleString()}</strong>.
            </p>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-blue-600 dark:text-blue-400 text-xs font-medium">2</span>
            </div>
            <p className="text-gray-700 dark:text-gray-300">
              Your expenses this month are{' '}
              <strong className={insights.expenseChange > 0 ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'}>
                {insights.expenseChange > 0 ? 'up' : 'down'} {Math.abs(insights.expenseChange).toFixed(1)}%
              </strong>{' '}
              compared to last month.
            </p>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-blue-600 dark:text-blue-400 text-xs font-medium">3</span>
            </div>
            <p className="text-gray-700 dark:text-gray-300">
              Your average expense per transaction is <strong className="text-gray-900 dark:text-white">${insights.avgExpense.toFixed(2)}</strong>.
            </p>
          </div>

          {insights.largestExpense && (
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-blue-600 dark:text-blue-400 text-xs font-medium">4</span>
              </div>
              <p className="text-gray-700 dark:text-gray-300">
                Your largest single expense was <strong className="text-gray-900 dark:text-white">${insights.largestExpense.amount.toLocaleString()}</strong> for{' '}
                <strong className="text-gray-900 dark:text-white">{insights.largestExpense.description}</strong> in the{' '}
                <strong className="text-gray-900 dark:text-white">{insights.largestExpense.category}</strong> category.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
