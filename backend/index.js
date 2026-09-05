import express from "express";
import cors from "cors";
import animeRoutes from "./routes/route.js";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Backend Express berhasil berjalan!",
  });
});

app.use("/api", animeRoutes);
app.use("/api/anime", animeRoutes);

app.listen(3000, () => {
  console.log("Server berjalan di http://localhost:3000");
});

