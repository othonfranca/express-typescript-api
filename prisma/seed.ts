// IMPORTS
import { db } from "../src/utils/db.server";

//TYPES
type Author = {
  firstName: string;
  lasName: string;
};

type Book = {
  title: string;
  isFiction: boolean;
  datePublished: Date;
};

//CALLS
// como foi declarado como function, podemos chamar ela antes de declarar, pois as funcations são sempre rodados primeiro
seed();

//FUNCTIONS
async function seed() {
  const authors = getAuthors().map((author) => {
    return db.author.create({
      data: {
        firstName: author.firstName,
        lastName: author.lasName,
      }
    })
  })

  await Promise.all(authors);

  const author = await db.author.findFirst({
    where: {
      firstName: "Yuval Noah"
    }
  });

  const books = getBooks().map((book) => {
    const { title, isFiction, datePublished } = book;
    if (author) {
      return db.book.create({
        data: {
          title,
          isFiction,
          datePublished,
          authorId: author.id,
        }
      })
    }
  })

  await Promise.all(books);
}


function getAuthors(): Array<Author> {
  return [
    {
      firstName: "John",
      lasName: "Doe",
    },
    {
      firstName: "William",
      lasName: "Shakespere",
    },
    {
      firstName: "Yuval Noah",
      lasName: "Harari",
    },
  ];
}
function getBooks(): Array<Book> {
  return [
    {
      title: "Sapiens",
      isFiction: false,
      datePublished: new Date(),
    },
    {
      title: "Homo Deus",
      isFiction: false,
      datePublished: new Date(),
    },
    {
      title: "The Ugly Duckling",
      isFiction: true,
      datePublished: new Date(),
    },
  ];
}