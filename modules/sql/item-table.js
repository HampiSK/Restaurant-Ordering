/** @SQL Item Table */

/**
 * @Function
 * Return string for creating sql table named ITEM.
 * Table wont be created if table ITEM already exists.
 *
 * @return {string} [SQL] - Sql statement for table creation.
 *
 * TABLE ITEM_MENU
 * ItemId		    INTEGER 		The unique id to identify the item.
 * Title		    VARCHAR(75)		The item title to be displayed.
 * IngredientId     INTEGER         The ingredient used for item.
 * CreatorId  	    INTEGER  		The unique id to identify creator of the table.
 * CreatedAt		DATETIME		It stores the date and time at which the item is created.
 * UpdatedAt		DATETIME		It stores the date and time at which the item is updated.
 * Comment		    TEXT		    The comment about item.
 *
 */
const itemTable = () => {
	const SQL = 'CREATE TABLE IF NOT EXISTS ITEM(\
                \'ItemId\' INTEGER PRIMARY KEY AUTOINCREMENT,\
                \'IngredientId\' INTEGER NOT NULL,\
                \'Title\' VARCHAR(75) NOT NULL UNIQUE,\
                \'Type\' VARCHAR(30) NOT NULL,\
                \'Kitchen\' TINYINT(1) NOT NULL DEFAULT 0,\
                \'Price\' FLOAT NOT NULL DEFAULT 0,\
                \'Recipe\' TEXT NULL DEFAULT NULL,\
                \'Instructions\' TEXT NULL DEFAULT NULL,\
                \'CreatorId\' INTEGER NOT NULL,\
                \'CreatedAt\' DATETIME NOT NULL DEFAULT (datetime(\'now\')),\
                \'UpdatedAt\' DATETIME NULL DEFAULT NULL,\
                \'Comment\' TEXT NULL DEFAULT NULL,\
                FOREIGN KEY(IngredientId) REFERENCES INGREDIENT(IngredientId),\
                FOREIGN KEY(CreatorId) REFERENCES USER(UserId));'
	return SQL
}

/** @Item Table Export */
export default itemTable
