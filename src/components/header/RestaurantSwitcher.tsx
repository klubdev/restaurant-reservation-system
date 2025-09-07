'use client';

import Image from "next/image";
import React, { useState } from "react";
import { Dropdown } from "../ui/dropdown/Dropdown";
import { DropdownItem } from "../ui/dropdown/DropdownItem";

interface Restaurant {
  id: string;
  name: string;
  avatar: string;
  location?: string;
}

const restaurants: Restaurant[] = [
  {
    id: '1',
    name: 'Restaurant Putaine',
    avatar: '/images/putaine.png',
    location: 'Amsterdam'
  },
  {
    id: '2',
    name: 'De Matroos en het Meisje',
    avatar: '/images/logo.svg',
    location: 'Rotterdam'
  },
  {
    id: '3',
    name: 'Restaurant Heroine',
    avatar: '/images/herooine.jpg',
    location: 'Utrecht'
  }
];

export default function RestaurantSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant>(restaurants[0]);

  function toggleDropdown() {
    setIsOpen(!isOpen);
  }

  function closeDropdown() {
    setIsOpen(false);
  }

  function selectRestaurant(restaurant: Restaurant) {
    setSelectedRestaurant(restaurant);
    closeDropdown();
    // In a real app, this would switch the restaurant context
    console.log('Switched to restaurant:', restaurant.name);
  }

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="flex items-center dropdown-toggle text-gray-700 dark:text-gray-400 dropdown-toggle"
      >
        <span className="mr-3 overflow-hidden rounded-full h-8 w-8">
          <Image
            width={32}
            height={32}
            src={selectedRestaurant.avatar}
            alt={selectedRestaurant.name}
            className="object-cover object-center w-full h-full rounded-full"
          />
        </span>

        <div className="flex flex-col items-start mr-1">
          <span className="block font-medium text-theme-sm">{selectedRestaurant.name}</span>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {selectedRestaurant.location}
          </span>
        </div>

        <svg
          className={`stroke-gray-500 dark:stroke-gray-400 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          width="18"
          height="20"
          viewBox="0 0 18 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4.3125 8.65625L9 13.3437L13.6875 8.65625"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <Dropdown
        isOpen={isOpen}
        onClose={closeDropdown}
        className="absolute right-0 mt-[17px] flex w-[280px] flex-col rounded-2xl border border-gray-200 bg-white p-3 shadow-theme-lg dark:border-gray-800 dark:bg-gray-dark"
      >
        <div className="mb-3">
          <span className="block font-medium text-gray-700 text-theme-sm dark:text-gray-400">
            Switch Restaurant
          </span>
          <span className="mt-0.5 block text-theme-xs text-gray-500 dark:text-gray-400">
            Select a restaurant to manage
          </span>
        </div>

        <ul className="flex flex-col gap-1">
          {restaurants.map((restaurant) => (
            <li key={restaurant.id}>
              <DropdownItem
                onItemClick={() => selectRestaurant(restaurant)}
                className={`flex items-center gap-3 px-3 py-3 font-medium rounded-lg group text-theme-sm transition-colors ${
                  selectedRestaurant.id === restaurant.id
                    ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300'
                    : 'text-gray-700 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300'
                }`}
              >
                <span className="overflow-hidden rounded-full h-8 w-8 flex-shrink-0">
                  <Image
                    width={32}
                    height={32}
                    src={restaurant.avatar}
                    alt={restaurant.name}
                    className="object-cover object-center w-full h-full rounded-full"
                  />
                </span>
                <div className="flex flex-col items-start">
                  <span className="font-medium">{restaurant.name}</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {restaurant.location}
                  </span>
                </div>
                {selectedRestaurant.id === restaurant.id && (
                  <svg
                    className="ml-auto w-4 h-4 text-blue-600 dark:text-blue-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </DropdownItem>
            </li>
          ))}
        </ul>

        <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-800">
          <DropdownItem
            onItemClick={closeDropdown}
            className="flex items-center gap-3 px-3 py-2 font-medium text-gray-700 rounded-lg group text-theme-sm hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
          >
            <svg
              className="w-5 h-5 text-gray-500 dark:text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            <span>Add New Restaurant</span>
          </DropdownItem>
        </div>
      </Dropdown>
    </div>
  );
}
