"use client";

import React from "react";

const cities = [
  { name: "Amsterdam", customers: 1230 },
  { name: "Rotterdam", customers: 860 },
  { name: "The Hague", customers: 740 },
  { name: "Utrecht", customers: 520 },
  { name: "Eindhoven", customers: 410 },
];

export default function CitiesInNetherlands() {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
      <div className="flex items-start justify-between">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
          Cities in Netherlands
        </h3>
      </div>

      <div className="my-6">
        <div className="h-40 w-full rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/10 dark:to-blue-800/10 flex items-center justify-center text-blue-700 dark:text-blue-300 text-sm">
          Simple map placeholder
        </div>
      </div>

      <div className="space-y-3">
        {cities.map((c) => (
          <div key={c.name} className="flex items-center justify-between">
            <span className="text-gray-600 dark:text-gray-400">{c.name}</span>
            <div className="flex items-center gap-4">
              <div className="w-40 bg-gray-100 dark:bg-gray-800 h-2 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-600 dark:bg-blue-500"
                  style={{ width: `${Math.min(100, (c.customers / 1230) * 100)}%` }}
                />
              </div>
              <span className="text-sm text-gray-700 dark:text-gray-300">{c.customers}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
