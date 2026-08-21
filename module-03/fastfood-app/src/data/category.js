export const categories = [
  {
    id: 1,
    title: "Burger",
    description: "Juicy, flame-grilled gourmet patties loaded with fresh toppings & artisan sauces.",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80",
    badge: "Most Popular",
    count: 3
  },
  {
    id: 2,
    title: "Shawarma",
    description: "Authentic slow-roasted tender meats rolled in fresh pita with garlic cream.",
    image: "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=800&q=80",
    badge: "Chef's Pick",
    count: 3
  },
  {
    id: 3,
    title: "Pizza",
    description: "Crispy wood-fired sourdough crust topped with bubbly mozzarella & savory meats.",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&q=80",
    badge: "Cheesy Goodness",
    count: 3
  },
];

// get array of category title i.e, ['Burger', 'Shawarma', 'Pizza']
export const categoryTitle = categories.map((category) => category.title);
