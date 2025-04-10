const con = require("../db");

exports.findAllLifeStyle = async (req, res) => {
    try {
        const query = `SELECT * 
                       FROM lifestyles`;

        const { rows } = await con.query(query);

        if (rows.length === 0) {
            return res.status(404).json({ message: "No lifestyles found" });
        }

        return res.status(200).json(rows);

    } catch (error) {
        console.error("Database Error:", error);
        return res.status(500).json({ error: "Database query failed" });
    }
};

exports.findCategoryLifeStyle = async (req, res) => {

    const category_id = req.params.category_id;

    try {
        const query = `SELECT * 
                       FROM lifestyles
                       where category_id = $1`;

        const { rows } = await con.query(query , [category_id]);

        if (rows.length === 0) {
            return res.status(404).json({ message: "No lifestyles found" });
        }

        return res.status(200).json(rows);

    } catch (error) {
        console.error("Database Error:", error);
        return res.status(500).json({ error: "Database query failed" });
    }
};