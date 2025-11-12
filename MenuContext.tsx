// context/MenuContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { MenuItem, Course } from './navigation/types';
import { v4 as uuidv4 } from 'uuid';

// If you don't have uuid installed, either `npm i uuid` or use simple id generator below.

const STORAGE_KEY = 'menu_items_v1';

type MenuContextType = {
  items: MenuItem[];
  addItem: (item: Omit<MenuItem, 'id'>) => Promise<void>;
  removeItem: (id: string) => Promise<void>;
  clearAll: () => Promise<void>;
  reload: () => Promise<void>;
};

const MenuContext = createContext<MenuContextType | undefined>(undefined);

export const MenuProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<MenuItem[]>([]);

  useEffect(() => {
    (async () => {
      await reload();
    })();
  }, []);

  const reload = async () => {
    try {
      const raw = await AsyncStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw));
      else setItems([]);
    } catch (e) {
      console.warn('Failed to load menu items', e);
    }
  };

  const persist = async (newItems: MenuItem[]) => {
    setItems(newItems);
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newItems));
    } catch (e) {
      console.warn('Failed to save menu items', e);
    }
  };

  const addItem = async (item: Omit<MenuItem, 'id'>) => {
    const newItem: MenuItem = { id: uuidv4 ? uuidv4() : String(Date.now()), ...item } as MenuItem;
    await persist([newItem, ...items]);
  };

  const removeItem = async (id: string) => {
    await persist(items.filter(i => i.id !== id));
  };

  const clearAll = async () => {
    await persist([]);
  };

  return (
    <MenuContext.Provider value={{ items, addItem, removeItem, clearAll, reload }}>
      {children}
    </MenuContext.Provider>
  );
};

export const useMenu = () => {
  const ctx = useContext(MenuContext);
  if (!ctx) throw new Error('useMenu must be used within a MenuProvider');
  return ctx;
};