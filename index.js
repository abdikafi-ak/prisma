import express from "express";
import { PrismaClient } from "./generated/prisma/client.js";


const app = express();
const prisma = new PrismaClient();

app.use(express.json());

app.get("/", async (req, res) => {
    try {
        const users = await prisma.user.findMany();

        if (users.length === 0) {
            return res.status(200).json({
                status: false,
                message: "No data in the table",
                data: []
            });
        }

        return res.status(200).json({
            status: true,
            data: users
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            status: false,
            message: "Internal server error"
        });
    }
});

app.listen(7000, () => {
    console.log("Server is running on port 7000");
});