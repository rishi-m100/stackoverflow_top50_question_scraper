const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const UserModel = require("./models/Users");
const { exec } = require("child_process");

const app = express();

// Apply CORS middleware globally before defining routes
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/stackoverflow");

app.post("/run-scraper", (req, res) => {
  exec(
    "cd /Users/rishimulchandani/github/stackoverflow_question_scraper/web_scraping/stack && scrapy crawl stack",
    (error, stdout, stderr) => {
      if (error) {
        console.error(`Error: ${error.message}`);
        return res.status(500).send("Error running scraper");
      }
      console.log(`Scraper output: ${stdout}`);
      res.send("Scraper executed successfully");
    }
  );
});

app.get("/getQuestions", (req, res) => {
  UserModel.find()
    .then((questions) => res.json(questions))
    .catch((err) => res.json(err));
});

app.listen(3001, () => {
  console.log("server is running");
});

// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const UserModel = require("./models/Users");
// const { exec } = require("child_process");
// const _ = require("lodash");

// const app = express();

// app.use(cors());
// app.use(express.json());

// mongoose.connect("mongodb://127.0.0.1:27017/stackoverflow");

// app.get("/getQuestions", (req, res) => {
//   UserModel.find()
//     .then((questions) => res.json(questions))
//     .catch((err) => res.json(err));
// });

// // Middleware to handle OPTIONS requests
// app.options("*", (req, res) => {
//   res.sendStatus(200);
// });

// // Variable to track whether the scraper is currently running
// let isScraperRunning = false;

// // Debounce the scraper endpoint with increased duration and loading indicator
// const debouncedScraper = _.debounce(async (req, res) => {
//   // Check if the scraper is already running
//   if (isScraperRunning) {
//     console.log("Scraper is already running");
//     return res.status(400).send("Scraper is already running");
//   }

//   isScraperRunning = true;

//   const mongoScript = `
//     use stackoverflow;
//     db.questions.remove({});
//   `;

//   try {
//     console.log("Running scraper...");

//     await execAsync("cd ~ && brew services restart mongodb-community");
//     await execAsync(`echo "${mongoScript}" | mongosh`);
//     await execAsync("cd - && cd /Users/rishimulchandani/github/stackoverflow_question_scraper/web_scraping/stack && scrapy crawl stack");

//     console.log("Scraper executed successfully");
//     res.send("Scraper executed successfully");
//   } catch (error) {
//     console.error(`Error: ${error.message}`);
//     res.status(500).send("Error running scraper");
//   } finally {
//     isScraperRunning = false;
//   }
// }, 5000); // Increased debounce duration (5 seconds)

// // Helper function to promisify exec
// function execAsync(command) {
//   return new Promise((resolve, reject) => {
//     exec(command, (error, stdout, stderr) => {
//       if (error) {
//         reject(error);
//       } else {
//         resolve(stdout);
//       }
//     });
//   });
// }

// app.post("/run-scraper", (req, res) => {
//   debouncedScraper(req, res);
// });

// app.listen(3001, () => {
//   console.log("server is running");
// });
