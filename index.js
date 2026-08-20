import express from "express";

const app = express();

app.use(express.json());

app.get("/", async (req, res) => {

});

app.listen(7000, () => {
    console.log("Server is running on port 7000");
});