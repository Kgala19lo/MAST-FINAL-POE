// navigation/types.ts
export type Course = 'Starter' | 'Main' | 'Dessert';

export type MenuItem = {
  id: string; // unique id
  name: string;
  description: string;
  price: string;
  imageKey?: string; // small string key that maps to local asset in app (see helper)
  course: Course;
};

export type RootStackParamList = {
  Home: undefined;
  Starter: undefined;
  Main: undefined;
  Dessert: undefined;
  Menu: undefined;
  Detail: { name: string; description: string; price: string; image: any };
  MenuEditor: undefined; // chef editor (add/remove)
  Filter: undefined; // guest filter page
};

