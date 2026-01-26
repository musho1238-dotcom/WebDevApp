const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db.sqlite');

// שינוי האימייל למי שאתה רוצה למחוק
const emailToDelete = 'musho1238@gmail.com';

db.run("DELETE FROM users WHERE email = ?", [emailToDelete], function (err) {
    if (err) {
        return console.error(err.message);
    }
    console.log(`נמחקו ${this.changes} שורות`);
});

db.close();