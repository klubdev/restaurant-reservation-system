"use client";

import React from "react";
import { mockReservations } from "@/data/mockData";

export default function RecentReservations() {
  const recent = [...mockReservations]
    .sort((a, b) => (a.date + a.time > b.date + b.time ? -1 : 1))
    .slice(0, 5);

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
      <div className="flex items-start justify-between">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
          Most Recent Reservations
        </h3>
      </div>

      <div className="mt-4 divide-y divide-gray-100 dark:divide-gray-800">
        <div className="grid grid-cols-12 text-gray-400 text-theme-xs py-2">
          <span className="col-span-4">Guest</span>
          <span className="col-span-3">Date</span>
          <span className="col-span-2">Time</span>
          <span className="col-span-1">Pax</span>
          <span className="col-span-2 text-right">Status</span>
        </div>
        {recent.map((r) => (
          <div key={r.id} className="grid grid-cols-12 items-center py-3">
            <div className="col-span-4 text-gray-700 dark:text-gray-300">
              {r.guest.firstName} {r.guest.lastName}
            </div>
            <div className="col-span-3 text-gray-600 dark:text-gray-400">
              {new Date(r.date).toLocaleDateString()}
            </div>
            <div className="col-span-2 text-gray-600 dark:text-gray-400">{r.time}</div>
            <div className="col-span-1 text-gray-600 dark:text-gray-400">{r.partySize}</div>
            <div className="col-span-2 text-right">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                r.status === 'confirmed' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                r.status === 'pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                r.status === 'cancelled' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
                'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
              }`}>{r.status}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
