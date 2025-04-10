const con = require("../db");

exports.findoneuser = async (req, res) => {
    try{
        const user_id = req.params.user_id; 

        const query = `select * from users where user_id = $1`;

        const { rows } = await con.query(query, [user_id]);

        if(!rows || rows.length === 0 ){
            return res.status(404).json({ error: "User doesn't exist" });
        }

        res.status(200).json({ message: "User found successfully", user: rows[0] });
    }
    catch(error){
        console.error("Database Error:", error);
        res.status(500).json({ error: "Database query failed" });
    }
};

exports.updateuser = async (req, res) => {
    try{
        const user_id = req.params.user_id; 

        const { name, birthdate, gender, mbti } = req.body;

        const query = `UPDATE users 
                       SET name = $1, 
                           gender = $2, 
                           birth_date = $3, 
                           mbti = $4 
                        WHERE user_id = $5
                        RETURNING *`;

        const values = [name, gender, birthdate, mbti, user_id];

        const { rows } = await con.query(query, values);

        if(!rows){
            return res.status(404).json({ error: "User doesn't exist" });
        }

        res.status(200).json({ message: "Update user successfully", user: rows});
    }
    catch(error){
        console.error("Database Error:", error);
        res.status(500).json({ error: "Database query failed" });
    }
};

exports.updateemail = async (req, res) => {

};

exports.updatephone = async (req, res) => {

};
exports.updatepassword = async (req, res) => {

};

exports.deleteuser = async (req, res) => {
    try{
        const user_id = req.params.user_id; 

        const query = `delete from users
                        WHERE user_id = $1`;

        const { rows } = await con.query(query, [user_id]);

        if(!rows){
            return res.status(404).json({ error: "User doesn't exist" });
        }

        res.status(200).json({ message: "Delete user successfully", user: rows});
    }
    catch(error){
        console.error("Database Error:", error);
        res.status(500).json({ error: "Database query failed" });
    }
};

exports.findusers = async (req, res) => {
    try{
        const query = "select * from users";

        const { rows } = await con.query(query);

        if(!rows || rows.length === 0 ){
            return res.status(404).json({ error: "not found any user" });
        }

        res.status(200).json({ message: "Find users successfully", user: rows });
    }
    catch(error){
        console.error("Database Error:", error);
        res.status(500).json({ error: "Database query failed" });
    }
};

