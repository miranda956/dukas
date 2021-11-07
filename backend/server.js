import express from "express";

const app =express();

const port = process.env.PORT || 5000;

app.listen(port, () => `Server running on port ${port} 🔥`);
