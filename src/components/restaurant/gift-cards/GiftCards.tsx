'use client';

import React, { useMemo, useState } from 'react';
import { mockGiftCards, mockGiftCardSales } from '@/data/mockData';
import { GiftCard } from '@/types/restaurant';

const GiftCards: React.FC = () => {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState<'all' | GiftCard['status']>('all');

  const filtered = useMemo(() => {
    const term = search.toLowerCase();
    return mockGiftCards.filter(gc => {
      const matchesTerm =
        gc.code.toLowerCase().includes(term) ||
        (gc.purchaserName?.toLowerCase().includes(term) ?? false) ||
        (gc.purchaserEmail?.toLowerCase().includes(term) ?? false) ||
        (gc.issuedToGuest?.firstName?.toLowerCase().includes(term) ?? false) ||
        (gc.issuedToGuest?.lastName?.toLowerCase().includes(term) ?? false);
      const matchesStatus = status === 'all' || gc.status === status;
      return matchesTerm && matchesStatus;
    });
  }, [search, status]);

  const totals = useMemo(() => {
    const salesTotal = mockGiftCardSales.reduce((sum, s) => sum + s.saleAmount, 0);
    const outstanding = mockGiftCards.reduce((sum, g) => sum + g.remainingBalance, 0);
    const redeemedCount = mockGiftCards.filter(g => g.status === 'redeemed').length;
    const activeCount = mockGiftCards.filter(g => g.status === 'active').length;
    return { salesTotal, outstanding, redeemedCount, activeCount };
  }, []);

  const formatMoney = (v: number) => `€${v.toFixed(2)}`;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Gift Card Management</h1>
          <p className="text-gray-600 dark:text-gray-400">Sales and management of digital gift cards, including tracking and redemption</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Sell Gift Card</button>
          <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">Redeem</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <p className="text-sm text-gray-500">Total Sales</p>
          <p className="text-2xl font-semibold">{formatMoney(totals.salesTotal)}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <p className="text-sm text-gray-500">Outstanding Balance</p>
          <p className="text-2xl font-semibold text-purple-600">{formatMoney(totals.outstanding)}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <p className="text-sm text-gray-500">Active</p>
          <p className="text-2xl font-semibold text-green-600">{totals.activeCount}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <p className="text-sm text-gray-500">Redeemed</p>
          <p className="text-2xl font-semibold text-blue-600">{totals.redeemedCount}</p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
        <div className="flex flex-col md:flex-row md:items-center gap-3 mb-4">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by code, purchaser, or guest..."
            className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800"
          />
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as any)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800"
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="redeemed">Redeemed</option>
            <option value="expired">Expired</option>
            <option value="void">Void</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Code</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Balance</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Purchaser</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Issued</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {filtered.map(gc => (
                <tr key={gc.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4 whitespace-nowrap font-medium">{gc.code}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{formatMoney(gc.amount)}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{formatMoney(gc.remainingBalance)}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      gc.status === 'active' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                      gc.status === 'redeemed' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                      gc.status === 'expired' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                      'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
                    }`}>{gc.status}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm">
                      <div className="text-gray-900 dark:text-white">{gc.purchaserName || '-'}</div>
                      <div className="text-gray-500 dark:text-gray-400">{gc.purchaserEmail || '-'}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                    {new Date(gc.issuedDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex gap-2">
                      <button className="text-blue-600 dark:text-blue-400 hover:underline">View</button>
                      {gc.status === 'active' && (
                        <button className="text-green-600 dark:text-green-400 hover:underline">Redeem</button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
        <h3 className="font-semibold mb-3">Recent Gift Card Sales</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Code</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Payment</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Purchaser</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {mockGiftCardSales.map(s => (
                <tr key={s.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{new Date(s.saleDate).toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{mockGiftCards.find(g=>g.id===s.giftCardId)?.code || '-'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{formatMoney(s.saleAmount)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm capitalize">{s.paymentMethod.replace('_',' ')}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{s.purchaserName} ({s.purchaserEmail})</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default GiftCards;
