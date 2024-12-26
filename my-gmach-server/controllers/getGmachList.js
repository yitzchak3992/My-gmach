const connection = require("../SQL_config/sql") 


const getAllGmach =  async (req, res) => {
    try {
      const query = ` select  gmach_list.id, gmach_list.name, description, address, city, phone,email, latitude, longitude,
                      rating, image_url, opening_hours,  place_id, created_by,
                      categories.name as category from gmach_list
                      join gmach_categories 
                      on gmach_list.id = gmach_categories.gmach_id
                      join categories on gmach_categories.category_id = categories.id `;

      // const query =  `select  * ,categories.name as category from gmach_list
      //                 join gmach_categories 
      //                 on gmach_list.id = gmach_categories.gmach_id
      //                 join categories on gmach_categories.category_id = categories.id` ;
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
  };

  const getGmachList = (req, res) => {
    let { city, category, rating } = req.query;
  
    city = city || null;
    category = category || null;
    rating = rating || null;
    
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
  };
  
  

  module.exports = {
    getAllGmach,
    getGmachList,
  };