'use client';
import { useState, useEffect } from 'react';

export const defaultContent = {
  hero: {
    title: 'Rumi',
    subtitle: 'Persian Cuisine',
    tagline: 'Where ancient flavors meet modern elegance',
    description:
      'Inspired by the poetry of Rumi, our kitchen tells stories through saffron-kissed rice, slow-braised stews, and the warmth of Persian hospitality.',
    image: '',
  },
  about: {
    title: 'Our Story',
    subtitle: 'A Labor of Love',
    image: '',
    body: 'Rumi Restaurant was born from a deep reverence for Persian culture and the belief that food is the most honest form of poetry. Our chefs draw on generations of culinary tradition, using heirloom spices sourced directly from the bazaars of Tehran, Isfahan, and Tabriz.',
    body2:
      'Every dish on our menu is a love letter to the land of Persia — earthy, fragrant, generous. We invite you to slow down, share a table, and let the flavors transport you.',
    values: [
      { icon: '🌿', label: 'Authentic Ingredients' },
      { icon: '🔥', label: 'Traditional Techniques' },
      { icon: '🌹', label: 'Warm Hospitality' },
    ],
  },
  menu: {
    categories: [
      {
        name: 'Starters',
        items: [
          { id: 1, name: 'Mast-o-Khiar', description: 'Strained yogurt with Persian cucumber, dried rose petals & mint', price: '9' },
          { id: 2, name: 'Mirza Ghassemi', description: 'Flame-roasted eggplant with saffron tomato & eggs', price: '13' },
          { id: 3, name: 'Kashk-e Bademjan', description: 'Smoky eggplant with whey, caramelized onion & walnuts', price: '12' },
          { id: 4, name: 'Dolmeh', description: 'Grape leaves stuffed with herbed rice & ground lamb', price: '14' },
        ],
      },
      {
        name: 'Main Courses',
        items: [
          { id: 5, name: 'Ghormeh Sabzi', description: 'Slow-braised herb stew with lamb & kidney beans over saffron rice', price: '29' },
          { id: 6, name: 'Fesenjan', description: 'Pomegranate-walnut stew with braised duck leg', price: '34' },
          { id: 7, name: 'Chelo Kabab Koobideh', description: 'Ground lamb & beef kabab with saffron rice & grilled tomato', price: '27' },
          { id: 8, name: 'Zereshk Polo Morgh', description: 'Barberry rice with saffron-poached chicken & crispy tahdig', price: '26' },
          { id: 9, name: 'Baghali Polo Mahiche', description: 'Fava bean & dill rice with slow-braised lamb shank', price: '38' },
        ],
      },
      {
        name: 'Desserts',
        items: [
          { id: 10, name: 'Bastani Sonnati', description: 'Persian saffron ice cream with rose water & pistachios', price: '10' },
          { id: 11, name: 'Sholeh Zard', description: 'Saffron rice pudding with cardamom, cinnamon & almond slivers', price: '9' },
          { id: 12, name: 'Zoolbia & Bamieh', description: 'Persian fritters in rose syrup — crispy, golden, irresistible', price: '8' },
        ],
      },
    ],
  },
  contact: {
    address: '1247 Persian Garden Ave, San Francisco, CA 94103',
    phone: '+1 (415) 555-0194',
    email: 'hello@rumirestaurant.com',
    hoursWeekdays: 'Mon – Thu: 11:00 AM – 10:00 PM',
    hoursWeekends: 'Fri – Sun: 10:00 AM – 11:00 PM',
  },
};

const STORAGE_KEY = 'rumi_content';

export function useContent() {
  const [content, setContent] = useState(defaultContent);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setContent(JSON.parse(stored));
    } catch {}
  }, []);

  const saveContent = (updated) => {
    setContent(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  return { content, saveContent };
}
