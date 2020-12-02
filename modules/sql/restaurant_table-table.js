/**
 * Return string for creating sql table named RESTAURANT_TABLE.
 * Table wont be created if table RESTAURANT_TABLE already exists.
 *
 * TABLE RESTAURANT_TABLE
 * TableId  	   INTEGER  		The unique id to identify the table.
 * InUse	       TINYINT(1)		The flag to identify whether the table is use.
 * CreatorId  	   INTEGER  		The unique id to identify creator of the table.
 * CreatedAt	   DATETIME		    It stores the date and time at which the table is created.
 * UpdatedAt	   DATETIME		    It stores the date and time at which the table is updated.
 * Comment		   TEXT	     	    The comment about table.
 *
 */
export default function RestaraurantTable() {
	const sql = 'CREATE TABLE IF NOT EXISTS RESTAURANT_TABLE(\
                \'TableId\' INTEGER PRIMARY KEY AUTOINCREMENT,\
                \'InUse\' TINYINT(1) NOT NULL DEFAULT 1,\
                \'CreatorId\' INTEGER NOT NULL,\
                \'CreatedAt\' DATETIME NOT NULL DEFAULT (datetime(\'now\')),\
                \'UpdatedAt\' DATETIME NULL DEFAULT NULL,\
                \'Comment\' TEXT NULL DEFAULT NULL,\
                FOREIGN KEY(CreatorId) REFERENCES USER(UserId));'
	return sql
}

