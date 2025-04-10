const con = require("../db");

exports.categories = async(req,res) => {
    try{

        const query = `SELECT * 
                       FROM categories`;

    const { rows } = await con.query(query);

    if (rows.length === 0) {
    return res.status(404).json({ message: "No categoriess found" });
    }

    return res.status(200).json(rows);

    }catch(err){
        console.error("Database Error:", error);
        return res.status(500).json({ error: "Database query failed" });
    }
}