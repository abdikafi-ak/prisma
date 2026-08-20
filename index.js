import "dotenv/config";
import express from "express";
import prisma from "./lib/prisma.js";

const app = express();

app.use(express.json());

app.get("/", async (req, res) => {
    try {
        const users = await prisma.user.findMany({
            select: {
                email: true
            }
        });

        res.json({
            status: true,
            users,
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            status: false,
            message: "Failed to fetch users",
        });
    }
});

app.post("/create", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        await prisma.user.create({
            data: {
                name: name,
                email: email,
                password: password,
            },
        });

        return res.json({
            status: true,
            message: "User Created Successfully",
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            status: false,
            message: "Failed to Register a user",
        });
    }
});

app.listen(7000, () => {
    console.log("Server is running on port 7000");
});
