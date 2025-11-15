import express from "express";
import cors from "cors";
import { exec } from "child_process";
import { writeFileSync } from "fs";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/run", (req, res) => {
  const code = req.body.code;

  const file = "temp_code.R";
  writeFileSync(file, code);

  exec(`Rscript ${file}`, (err, stdout, stderr) => {
    if (err) {
      res.json({ output: stderr || err.message });
    } else {
      res.json({ output: stdout });
    }
  });
});

app.listen(3000, () => {
  console.log("Backend running at http://localhost:3000");
});
