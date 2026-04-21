const express = require('express');
const cors = require('cors');
const { execFile } = require('child_process');
const path = require('path');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.post('/withdraw', (req, res) => {
    const { amount } = req.body;

    if (amount === undefined) {
        return res.status(400).json({ error: "Amount is required." });
    }

    const exePath = path.join(__dirname, 'atm.exe');

    execFile(exePath, [amount.toString()], (error, stdout, stderr) => {
        if (stderr) {
            console.error("C program stderr:", stderr);
        }

        try {
            // The C program outputs JSON
            const result = JSON.parse(stdout);
            
            if (result.error) {
                // If the C program returned an error message
                return res.status(400).json(result);
            }
            
            res.json(result);
        } catch (parseError) {
            console.error("Failed to parse output:", stdout);
            res.status(500).json({ error: "Internal server error: Invalid output from backend." });
        }
    });
});

app.listen(PORT, () => {
    console.log(`ATM API running on http://localhost:${PORT}`);
});
