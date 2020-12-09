/** @SQL Restaurant Table */

/**
 * @Function
 * Return string for creating sql table named RESTAURANT_TABLE.
 * Table wont be created if table RESTAURANT_TABLE already exists.
 *
 * @return {string} [SQL] - Sql statement for table creation.
 *
 * TABLE RESTAURANT_TABLE
 * TableId  	   INTEGER  		The unique id to identify the table.
 * TableName       VARCHAR(50)      The name of table.
 * InUse	       TINYINT(1)		The flag to identify whether the table is use.
 * CreatorId  	   INTEGER  		The unique id to identify creator of the table.
 * CreatedAt	   DATETIME		    It stores the date and time at which the table is created.
 * UpdatedAt	   DATETIME		    It stores the date and time at which the table is updated.
 * Comment		   TEXT	     	    The comment about table.
 *
 */
const restaurantTable = () => {
	const SQL = 'CREATE TABLE IF NOT EXISTS RESTAURANT_TABLE(\
                \'TableId\' INTEGER PRIMARY KEY AUTOINCREMENT,\
                \'TableName\' VARCHAR(50) NULL DEFAULT NULL,\
                \'InUse\' TINYINT(1) NOT NULL DEFAULT 1,\
                \'Diners\' INTEGER NULL DEFAULT 0,\
                \'CreatorId\' INTEGER NOT NULL,\
                \'CreatedAt\' DATETIME NOT NULL DEFAULT (datetime(\'now\')),\
                \'UpdatedAt\' DATETIME NULL DEFAULT NULL,\
                \'Comment\' TEXT NULL DEFAULT NULL,\
                FOREIGN KEY(CreatorId) REFERENCES USER(UserId));'
	return SQL
}

/** @Restaraurant Table Export */
export default restaurantTable
