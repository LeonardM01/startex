import { prisma } from "../../lib/prisma.js";

export const exampleFunction = async (req, res) => {
    res.status(200).json("Hello world with Prisma!");
};

export const getUsers = async (req, res) => {
    try {
        const users = await prisma.user.findMany({
            include: {
                posts: true,
            },
        });
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch users" });
    }
};

export const createUser = async (req, res) => {
    try {
        const { email, name } = req.body;
        const user = await prisma.user.create({
            data: {
                email,
                name,
            },
        });
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ error: "Failed to create user" });
    }
};

export const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await prisma.user.findUnique({
            where: { id: parseInt(id) },
            include: {
                posts: true,
            },
        });

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch user" });
    }
};
