/** @SQL Menu Table */

/**
 * @Function
 * Return string for creating sql table named MENU.
 * Table wont be created if table MENU already exists.
 *
 * @return {string} [SQL] - Sql statement for table creation.
 *
 * TABLE MENU
 * MenuId		    INTEGER  		The unique id to identify the menu.
 * FoodId	        INTEGER	    	The unique id to identify the Food.
 * CreatorId  	    INTEGER  		The unique id to identify creator of the table.
 * CreatedAt		DATETIME		It stores the date and time at which the menu is created.
 * UpdatedAt		DATETIME		It stores the date and time at which the menu is updated.
 * Comment	    	TEXT		    The comment about menu.
 *
 */
const menuTable = () => {
	const SQL = 'CREATE TABLE IF NOT EXISTS MENU(\
                \'MenuId\' INTEGER PRIMARY KEY AUTOINCREMENT,\
                \'FoodId\' INTEGER NOT NULL,\
                \'CreatorId\' INTEGER NOT NULL,\
                \'CreatedAt\' DATETIME NOT NULL DEFAULT (datetime(\'now\')),\
                \'UpdatedAt\' DATETIME NULL DEFAULT NULL,\
                \'Comment\' TEXT NULL DEFAULT NULL,\
                FOREIGN KEY(FoodId) REFERENCES FOOD(FoodId),\
                FOREIGN KEY(CreatorId) REFERENCES USER(UserId));'
	return SQL
}

/** @Menu Export */
export default menuTable
