export const initialReviews = [
  {
    id: 1,
    productid: 1,
    username: "Khubair Ali",
    date: "14 Feb 2026",
    rating: 5.0,
    review: "Hands down the best beef burger in town! Perfectly juicy patty, melted cheddar, and the sauce is phenomenal.",
    isApproved: true
  },
  {
    id: 2,
    productid: 1,
    username: "Ayesha Malik",
    date: "20 Jan 2026",
    rating: 4.0,
    review: "Delicious and filling burger. Arrived warm and fresh with crispy fries.",
    isApproved: true
  },
  {
    id: 3,
    productid: 2,
    username: "Zainab Tariq",
    date: "10 Feb 2026",
    rating: 5.0,
    review: "Extra crispy zinger fillet! Super crunchy outside and tender inside. Loved the spicy kick.",
    isApproved: true
  },
  {
    id: 4,
    productid: 2,
    username: "Ali Raza",
    date: "02 Feb 2026",
    rating: 4.5,
    review: "Great value for money. The combo with cold Pepsi was spot on.",
    isApproved: true
  },
  {
    id: 5,
    productid: 3,
    username: "Bilal Sheikh",
    date: "18 Feb 2026",
    rating: 4.5,
    review: "Authentic garlic sauce and tender seasoned chicken wrapped tightly. Highly recommended!",
    isApproved: true
  },
  {
    id: 6,
    productid: 4,
    username: "Hamza Khan",
    date: "05 Feb 2026",
    rating: 5.0,
    review: "The Arabic shawarma platter with garlic dip is top tier. 10/10 flavor!",
    isApproved: true
  },
  {
    id: 7,
    productid: 5,
    username: "Fatima Noor",
    date: "12 Feb 2026",
    rating: 5.0,
    review: "Loaded with pepperoni and cheesy goodness. Thin and crispy crust just how I like it.",
    isApproved: true
  },
  {
    id: 8,
    productid: 6,
    username: "Usman Ghani",
    date: "08 Feb 2026",
    rating: 4.0,
    review: "Spicy chicken fajita toppings were super flavorful with generous mozzarella.",
    isApproved: true
  },
  {
    id: 9,
    productid: 7,
    username: "Saad Farooq",
    date: "16 Feb 2026",
    rating: 5.0,
    review: "Smoky BBQ flavor with double smashed beef patties! A meat lover's dream come true.",
    isApproved: true
  },
  {
    id: 10,
    productid: 8,
    username: "Mariam Khalid",
    date: "03 Feb 2026",
    rating: 4.8,
    review: "Slow-roasted beef in shawarma is tender and flavorful. Great tahini balance.",
    isApproved: true
  },
  {
    id: 11,
    productid: 9,
    username: "Danish Ahmed",
    date: "15 Jan 2026",
    rating: 4.0,
    review: "Simple, fresh basil aroma with delicious melted mozzarella cheese.",
    isApproved: true
  }
];

export const reviews = initialReviews;

export const countReviews = (productID) => {
  let sum = 0;
  reviews.forEach((review) => {
    if (review.productid === productID) sum++;
  });
  return sum;
};

export const getReviewsByProduct = (productID) => {
  return reviews.filter((r) => r.productid === productID);
};
