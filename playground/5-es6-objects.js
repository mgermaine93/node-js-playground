// Object property shorthand

const city = "Cheyenne";
const state = "Wyoming";

const location = {
  city,
  state,
  country: "United States",
};

console.log(location);

// Object destructuring

const book = {
  title: "Say Nothing",
  author: "Patrick Radden Keefe",
  publicationYear: "2019",
  price: 25,
};

// const title = book.title;
// const author = book.author;

// const { title: bookTitle, author, salePrice = "20" } = book;
// console.log(bookTitle);
// console.log(author);
// console.log(salePrice);

const transaction = (type, { title, author } = {}) => {
  console.log(type, title, author);
};

transaction("order", book);
