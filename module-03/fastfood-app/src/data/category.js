export const categories = [
  {
    id: 1,
    title: "Burger",
    image: "",
  },
  {
    id: 2,
    title: "Shawarma",
    image: "",
  },
  {
    id: 3,
    title: "Pizza",
    image: "",
  },
];

// get array of category title i.e, ['Burger', 'Shawarma'. 'Pizza']
export const categoryTitle = categories.map((category) => category.title);
