const con = require("../db");
const bcrypt = require("bcryptjs");

exports.loginUser = async (req, res) => {
    try {
        const { phone, password } = req.body;

        const query = `SELECT * FROM USERS WHERE phone = $1`;
        const { rows } = await con.query(query, [phone]);

        if (rows.length === 0) {
            return res.status(401).json({ message: "Invalid phone or password" });
        }

        const user = rows[0];

        const isMatch = await bcrypt.compare(password , user.password);

        if (!isMatch) {
            return res.status(401).json({ message: "password not match"});
        }else{
            res.json({ message: "Login successful" , userId : user.user_id});
        }
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

exports.registerUser = async (req, res) => {
    const { name, email, phone, password, birthdate, gender, mbti } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const query = `INSERT INTO users (email, phone, password, name, gender, birth_date, mbti)
                       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING user_id`;

        const values = [
            email,
            phone,
            hashedPassword,
            name,
            gender,
            birthdate,
            mbti,
        ];

        const { rows } = await con.query(query, values);
        res.json({ message: "User registered successfully", userId: rows[0].id });
    } catch (error) {
        console.error("Database Error:", error);
        res.status(500).json({ error: "Database query failed" });
    }
};
