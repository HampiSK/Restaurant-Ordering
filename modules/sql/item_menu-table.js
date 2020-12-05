/** @SQL Item Menu Table */

/**
 * @Function
 * Return string for creating sql table named ITEM_MENU.
 * Table wont be created if table ITEM_MENU already exists.
 *
 * @return {string} [SQL] - Sql statement for table creation.
 *
 * TABLE ITEM_MENU
 * ItemMenuId		INTEGER 		The unique id to identify the item menu.
 * ItemId		    INTEGER 		The unique id to identify the ngredients used.
 * Title		    VARCHAR(75)		The item title to be displayed.
 * Type		        VARCHAR(30)		The type to distinguish between the different item menu types.
 * Kitchen		    TINYINT(1)		The flag to identify if item needs to be prepared in kitchen.
 * Price		    SMALLINT(6)		The price the item is selling for.
 * Recipe		    TEXT		    The instructions required to cook the item menu.
 * Instructions		TEXT		    The instructions required to serve the item menu.
 * CreatorId  	    INTEGER  		The unique id to identify creator of the table.
 * CreatedAt		DATETIME		It stores the date and time at which the item is created.
 * UpdatedAt		DATETIME		It stores the date and time at which the item is updated.
 * Comment		    TEXT		    The comment about item.
 *
 */
const itemMenuTable = () => {
	const SQL = 'CREATE TABLE IF NOT EXISTS ITEM_MENU(\
                \'ItemMenuId\' INTEGER PRIMARY KEY AUTOINCREMENT,\
                \'ItemId\' INTEGER NOT NULL,\
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
                FOREIGN KEY(ItemId) REFERENCES ITEM(ItemId),\
                FOREIGN KEY(CreatorId) REFERENCES USER(UserId));'
	return SQL
}

/** @Item Menu Table Export */
export default itemMenuTable
