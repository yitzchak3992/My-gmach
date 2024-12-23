const connection = require("../SQL_config/sql") 



const getOption = async (req, res) => {
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
  };

  module.exports = {
    getOption
  }