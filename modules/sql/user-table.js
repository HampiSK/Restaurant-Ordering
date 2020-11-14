export default function UserTable() {
	const sql = 'CREATE TABLE IF NOT EXISTS USER(\
                \'UserId\' INTEGER PRIMARY KEY AUTOINCREMENT,\
                \'UserName\' VARCHAR(50) NOT NULL,\
                \'FirstName\' VARCHAR(50) NOT NULL,\
                \'LastName\' VARCHAR(50) NOT NULL,\
                \'Gender\' VARCHAR(10) NOT NULL,\
                \'Birth\' DATETIME NOT NULL,\
                \'Email\' VARCHAR(50) NULL DEFAULT NULL,\
                \'Phone\' VARCHAR(50) NULL DEFAULT NULL,\
                \'Street\' VARCHAR(50) NULL DEFAULT NULL,\
                \'City\' VARCHAR(50) NULL DEFAULT NULL,\
                \'Zip\' VARCHAR(20) NULL DEFAULT NULL,\
                \'PasswordHash\' TEXT NOT NULL,\
                \'Admin\' TINYINT(1) NOT NULL DEFAULT 0,\
                \'Manager\' TINYINT(1) NOT NULL DEFAULT 0,\
                \'Waiter\' TINYINT(1) NOT NULL DEFAULT 0,\
                \'Chef\' TINYINT(1) NOT NULL DEFAULT 0,\
                \'CreatorId\' INTEGER NOT NULL,\
                \'Registered\' DATETIME NOT NULL DEFAULT (datetime(\'now\')),\
                \'LastLogin\' DATETIME NULL DEFAULT NULL,\
                \'Comment\' TEXT NULL DEFAULT NULL,\
                FOREIGN KEY(CreatorId) REFERENCES USER(UserId));'
	return sql
}


// "CREATE TABLE IF NOT EXISTS USER1\
// ('UserId' INTEGER PRIMARY KEY AUTOINCREMENT,\
// 'FirstName' VARCHAR(50) NOT NULL,\
// 'LastName' VARCHAR(50) NOT NULL,\
// 'Gender' VARCHAR(10) NOT NULL,\
// 'Birth' DATETIME NOT NULL,\
// 'Email' VARCHAR(50) NULL DEFAULT NULL,\
// 'Phone' VARCHAR(50) NULL DEFAULT NULL,\
// 'Street' VARCHAR(50) NULL DEFAULT NULL,\
// 'City' VARCHAR(50) NULL DEFAULT NULL,\
// 'Zip' VARCHAR(20) NULL DEFAULT NULL,\
// 'PasswordHash' TEXT NOT NULL,\
// 'Admin' TINYINT(1) NOT NULL DEFAULT 0,\
// 'Manager' TINYINT(1) NOT NULL DEFAULT 0,\
// 'Waiter' TINYINT(1) NOT NULL DEFAULT 0,\
// 'Chef' TINYINT(1) NOT NULL DEFAULT 0,\
// 'CreatorId' INTEGER NOT NULL,\
// 'Registered' DATETIME NOT NULL DEFAULT (datetime('now')),\
// 'LastLogin' DATETIME NULL DEFAULT NULL,\
// 'Comment' TEXT NULL DEFAULT NULL,\
// FOREIGN KEY(CreatorId) REFERENCES USER(UserId));"

// "CREATE TABLE IF NOT EXISTS USER2\
// (UserId INTEGER PRIMARY KEY AUTOINCREMENT,\
// FirstName VARCHAR(50) NOT NULL,\
// LastName VARCHAR(50) NOT NULL,\
// Gender VARCHAR(10) NOT NULL,\
// Birth DATETIME NOT NULL,\
// Email VARCHAR(50) NULL DEFAULT NULL,\
// Phone VARCHAR(50) NULL DEFAULT NULL,\
// Street VARCHAR(50) NULL DEFAULT NULL,\
// City VARCHAR(50) NULL DEFAULT NULL,\
// Zip VARCHAR(20) NULL DEFAULT NULL,\
// PasswordHash TEXT NOT NULL,\
// Admin TINYINT(1) NOT NULL DEFAULT 0,\
// Manager TINYINT(1) NOT NULL DEFAULT 0,\
// Waiter TINYINT(1) NOT NULL DEFAULT 0,\
// Chef TINYINT(1) NOT NULL DEFAULT 0,\
// CreatorId INTEGER NOT NULL,\
// Registered DATETIME NOT NULL DEFAULT (datetime('now')),\
// LastLogin DATETIME NULL DEFAULT NULL,\
// Comment TEXT NULL DEFAULT NULL,\
// FOREIGN KEY(CreatorId) REFERENCES USER(UserId));"
