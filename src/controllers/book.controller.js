const prisma = require("../lib/prisma");

const createBook = async (req, res) => {
  try {
    const { title, author, isbn, availableCopies } = req.body;

    const book = await prisma.book.create({
      data: {
        title,
        author,
        isbn,
        availableCopies,
      },
    });

    return res.status(201).json(book);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

const getBooks = async (req, res) => {
  try {
    const books = await prisma.book.findMany({
      orderBy: {
        id: "asc",
      },
    });

    return res.status(200).json(books);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

const getBookById = async (req, res) => {
  try {
    const { id } = req.params;

    const book = await prisma.book.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!book) {
      return res.status(404).json({
        message: "Book not found",
      });
    }

    return res.status(200).json(book);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

const updateBook = async (req, res) => {
  try {
    const { id } = req.params;

    const { title, author, isbn, availableCopies } = req.body;

    const book = await prisma.book.update({
      where: {
        id: Number(id),
      },
      data: {
        title,
        author,
        isbn,
        availableCopies,
      },
    });

    return res.status(200).json(book);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createBook,
  getBooks,
  getBookById,
  updateBook,
};