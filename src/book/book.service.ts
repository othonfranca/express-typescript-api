import type { Author } from "../author/author.service";
import { db } from "../utils/db.server";

type BookRead = {
  id: number;
  title: string;
  datePublished: Date;
  isFiction: boolean;
  author: Author; // TYPE CREATED IN AUTHOR.SERVICE
  // authorId: number;
};

type BookWrite = {
  title: string;
  datePublished: Date;
  authorId: number;
  isFiction: boolean;
};

export const listBooks = async (): Promise<BookRead[]> => {
  return db.book.findMany({
    select: {
      id: true,
      title: true,
      datePublished: true,
      isFiction: true,
      author: { // USED AS A FOREIGN KEY
        select: {
          id: true,
          firstName: true,
          lastName: true,
        },
      },
      // authorId: true,
    },
  });
};

export const getBook = async (id: number): Promise<BookRead | null> => {
  return db.book.findUnique({
    where: {
      id: id,
    },
    select: {
      id: true,
      title: true,
      datePublished: true,
      isFiction: true,
      author: { // USED AS A FOREIGN KEY
        select: {
          id: true,
          firstName: true,
          lastName: true,
        },
      },
      // authorId: true,
    },
  });
};

export const createBook = async (book: BookWrite): Promise<BookRead> => {
  const { title, authorId, datePublished, isFiction } = book;
  const parsedDate: Date = new Date(datePublished);

  return db.book.create({
    data: {
      title,
      authorId,
      datePublished: parsedDate,
      isFiction,
    },
    select: {
      id: true,
      title: true,
      datePublished: true,
      isFiction: true,
      author: { // USED AS A FOREIGN KEY
        select: {
          id: true,
          firstName: true,
          lastName: true,
        },
      },
      // authorId: true,
    },
  });
};

export const updateBook = async (book: BookWrite, id: number): Promise<BookRead> => {
  const { title, datePublished, authorId, isFiction } = book;
  return db.book.update({
    where: {
      id: id,
    },
    data: {
      title,
      datePublished,
      isFiction,
      authorId,
    },
    select: {
      id: true,
      title: true,
      datePublished: true,
      isFiction: true,
      author: { // USED AS A FOREIGN KEY
        select: {
          id: true,
          firstName: true,
          lastName: true,
        },
      },
      // authorId: true,
    },
  });
};

export const deleteBook = async (id: number): Promise<void> => {
  await db.book.delete({
    where: {
      id: id,
    },
  });
};