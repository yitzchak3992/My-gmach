const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const axios = require('axios');

require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 3005;

// Setting up the connection to the database
const connection = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "my_gmach",
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    process.exit(1);
  }
  console.log("Database connection successful!");
});

// path to display all gmach
app.get("/all-gmach", async (req, res) => {
  try {
    const query = ` select  * ,categories.name as category from gmach_list
                    join gmach_categories 
                    on gmach_list.id = gmach_categories.gmach_id
                    join categories on gmach_categories.category_id = categories.id `;
    connection.query(query, (error, results) => {
      if (error) {
        console.error("Error retrieving data:", error);
        res
          .status(500)
          .json({ error: "Error retrieving data from the server" });
        return;
      }
      res.json(results);
      console.log("Data sent successfully!");

    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

app.get("/categories-and-city-option", async (req, res) => {
  try {
    const query1 = `SELECT DISTINCT name FROM categories
      ORDER BY name`;

    connection.query(query1, (error1, resultsCategories) => {
      if (error1) {
        console.error("Error retrieving data:", error1);
        res
          .status(500)
          .json({ error1: "Error retrieving data from the server" });
        return;
      }

      const query2 = `SELECT DISTINCT city FROM gmach_list
      ORDER BY city`;
      connection.query(query2, (error2, resultsCity) => {
        if (error2) {
          console.error("Error retrieving data:", error2);
          res
            .status(500)
            .json({ error2: "Error retrieving data from the server" });
          return;
        }
        res.json({ resultsCategories, resultsCity });
        console.log("Data 'option' sent successfully!");
      });
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// // נתיב להבאת גמח לפי ID
// app.get("/gmach-filters/:city/:category/rating", async (req, res) => {

// מסלול ב-Express
app.get("/getGmachList", (req, res) => {
  let { city, category, rating } = req.query;

  city = city || null;
  category = category || null;
  rating = rating || null;
  // console.log(city);
  // console.log(category);
  // console.log(rating);
  const sqlQuery = `
                  SELECT *, categories.name AS category
                  FROM gmach_list
                  JOIN gmach_categories ON gmach_list.id = gmach_categories.gmach_id
                  JOIN categories ON gmach_categories.category_id = categories.id
                  WHERE
                    (? IS NULL OR ? = gmach_list.city)
                    AND (? IS NULL OR ? = categories.name)
                    AND (? IS NULL OR ? <= gmach_list.rating)
                `;

  // Running the query with parameters
  connection.execute(
    sqlQuery,
    [city, city, category, category, rating, rating],
    (error, results) => {
      if (error) {
        return res.status(500).json({ error: "Database query error" });
      }
      res.json(results);
      
    }
  );
});


// // נתיב להוספת גמח חדש
// app.post("/add-gmach", express.json(), async (req, res) => {
//   try {
//     const { name, description, phone, address } = req.body;
//     const query =
//       "INSERT INTO gmachim (name, description, phone, address) VALUES (?, ?, ?, ?)";

//     connection.query(
//       query,
//       [name, description, phone, address],
//       (error, results) => {
//         if (error) {
//           console.error("שגיאה בהוספת גמח:", error);
//           res.status(500).json({ error: "שגיאה בהוספת גמח" });
//           return;
//         }

//         res.status(201).json({
//           message: "גמח נוסף בהצלחה",
//           id: results.insertId,
//         });
//       }
//     );
//   } catch (error) {
//     console.error("שגיאה:", error);
//     res.status(500).json({ error: "שגיאה בשרת" });
//   }
// });


app.listen(port, () => {
  console.log(`The server is running on port ${port} !!!`);
});

// Handle closing the connection when the server shuts down
process.on("SIGINT", () => {
  connection.end((err) => {
    console.log("החיבור למסד הנתונים נסגר");
    process.exit(err ? 1 : 0);
  });
});
