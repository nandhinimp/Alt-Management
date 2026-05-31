const prisma = require("../lib/prisma");

const createMember = async (req, res) => {
  try {
    const { name, email, phone } = req.body;

    const member = await prisma.member.create({
      data: {
        name,
        email,
        phone,
      },
    });

    return res.status(201).json(member);
  } catch (error) {
    // Handle Prisma unique constraint error for email
    if (error && error.code === 'P2002') {
      const target = error.meta && error.meta.target;
      if (Array.isArray(target) ? target.includes('email') : String(target).includes('email')) {
        return res.status(409).json({ message: 'Member with this email already exists' });
      }
    }

    return res.status(500).json({
      message: error.message,
    });
  }
};

const getMembers = async (req, res) => {
  try {
    const members = await prisma.member.findMany({
      orderBy: {
        id: "asc",
      },
    });

    return res.status(200).json(members);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

const getMemberById = async (req, res) => {
  try {
    const { id } = req.params;

    const member = await prisma.member.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!member) {
      return res.status(404).json({
        message: "Member not found",
      });
    }

    return res.status(200).json(member);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

const updateMember = async (req, res) => {
  try {
    const { id } = req.params;

    const { name, email, phone } = req.body;

    const member = await prisma.member.update({
      where: {
        id: Number(id),
      },
      data: {
        name,
        email,
        phone,
      },
    });

    return res.status(200).json(member);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createMember,
  getMembers,
  getMemberById,
  updateMember,
};
