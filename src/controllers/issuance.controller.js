const prisma = require("../lib/prisma");

const issueBook = async (req, res) => {
  try {
    const { memberId, bookId } = req.body;

    const member = await prisma.member.findUnique({
      where: {
        id: Number(memberId),
      },
    });

    if (!member) {
      return res.status(404).json({
        message: "Member not found",
      });
    }

    const book = await prisma.book.findUnique({
      where: {
        id: Number(bookId),
      },
    });

    if (!book) {
      return res.status(404).json({
        message: "Book not found",
      });
    }

    if (book.availableCopies <= 0) {
      return res.status(400).json({
        message: "No available copies",
      });
    }

    const issuedDate = new Date();
    const targetReturnDate = new Date(issuedDate);
    targetReturnDate.setDate(targetReturnDate.getDate() + 14);

    await prisma.book.update({
      where: {
        id: Number(bookId),
      },
      data: {
        availableCopies: {
          decrement: 1,
        },
      },
    });

    const issuance = await prisma.issuance.create({
      data: {
        memberId: Number(memberId),
        bookId: Number(bookId),
        issuedDate,
        targetReturnDate,
        returned: false,
      },
      include: {
        member: true,
        book: true,
      },
    });

    return res.status(201).json(issuance);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

const returnBook = async (req, res) => {
  try {
    const { issuanceId } = req.body;

    const issuance = await prisma.issuance.findUnique({
      where: {
        id: Number(issuanceId),
      },
    });

    if (!issuance) {
      return res.status(404).json({
        message: "Issuance not found",
      });
    }

    if (issuance.returned) {
      return res.status(400).json({
        message: "Book already returned",
      });
    }

    const updatedIssuance = await prisma.issuance.update({
      where: {
        id: Number(issuanceId),
      },
      data: {
        returned: true,
      },
    });

    await prisma.book.update({
      where: {
        id: issuance.bookId,
      },
      data: {
        availableCopies: {
          increment: 1,
        },
      },
    });

    return res.status(200).json(updatedIssuance);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

const getIssuances = async (req, res) => {
  try {
    const issuances = await prisma.issuance.findMany({
      include: {
        member: true,
        book: true,
      },
      orderBy: {
        id: "asc",
      },
    });

    return res.status(200).json(issuances);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  issueBook,
  returnBook,
  getIssuances,
};