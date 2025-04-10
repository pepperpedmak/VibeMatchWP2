const con = require("../db");

exports.findUserLifeStyle = async (req, res) => {
    try{
        const user_id = req.params.user_id; 

        const query = `select * from user_lifestyle inner join lifestyles using(lifestyle_id) where user_id = $1`;

        const { rows } = await con.query(query, [user_id]);

        if(!rows || rows.length === 0 ){
            return res.status(404).json({ error: "LifeStyle of user doesn't exist" });
        }

        res.status(200).json({ message: "LifeStyle of user found successfully", rows});
    }
    catch(error){
        console.error("Database Error:", error);
        res.status(500).json({ error: "Database query failed" });
    }
};

exports.createUserLifeStyle = async (req, res) => {
    try {
        const user_id = req.params.user_id;
        const { lifestyle_ids } = req.body; // รับ lifestyle_ids จาก body (เป็น array)

        if (!Array.isArray(lifestyle_ids) || lifestyle_ids.length === 0) {
            return res.status(400).json({ error: "lifestyle_ids shoude be array and not null value" });
        }

        const query = `INSERT INTO user_lifestyle (user_id, lifestyle_id) 
                       SELECT $1, unnest($2::int[])
                       RETURNING *;`;

        const values = [user_id,lifestyle_ids];

        const { rows } = await con.query(query, values);

        res.status(201).json({ message: "Insert lifestyle of user successfully", data: rows });
    } catch (error) {
        console.error("Database Error:", error);
        res.status(500).json({ error: "Database query failed" });
    }
};


exports.editUserLifeStyle = async (req, res) => {
    try {
        const user_id = req.params.user_id;
        const { lifestyle_ids } = req.body; 

        if (!Array.isArray(lifestyle_ids) || lifestyle_ids.length === 0) {
            return res.status(400).json({ error: "lifestyle_ids should be an array and not empty" });
        }

        await con.query("BEGIN");

        await con.query(`DELETE FROM user_lifestyle WHERE user_id = $1`, [user_id]);

        const insertQuery = `INSERT INTO user_lifestyle (user_id, lifestyle_id)
                             SELECT $1, unnest($2::int[])
                             RETURNING *;`;
        const values = [user_id, lifestyle_ids];
        const { rows } = await con.query(insertQuery, values);

        await con.query("COMMIT");

        res.status(201).json({ message: "Updated lifestyle of user successfully", data: rows });

    } catch (error) {
        if (con) await con.query("ROLLBACK");
        console.error("Database Error:", error);
        res.status(500).json({ error: "Database query failed" });

    } finally {
        if (con) con.release();
    }
};

