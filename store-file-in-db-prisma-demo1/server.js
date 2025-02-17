const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { PrismaClient } = require("@prisma/client");

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(bodyParser.json());

// API to upload file
app.post("/upload", async (req, res) => {
  const { filename, content } = req.body;

  try {
    const newFile = await prisma.file.create({
      data: { filename, content },
    });
    res.json({ message: "File saved successfully!", file: newFile });
  } catch (error) {
    res.status(500).json({ message: "Error saving file", error });
    console.error(`Error : ${error}`);
  }
});

// API to fetch all uploaded files
app.get("/files", async (req, res) => {
  const files = await prisma.file.findMany();
  res.json(files);
});

// Start server
app.listen(5000, () => console.log("Server running on port 5000"));
