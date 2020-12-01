/**
 * Return string for creating sql table named ITEM_MENU.
 * Table wont be created if table ITEM_MENU already exists.
 *
 * TABLE ITEM_MENU
 * ItemId		    INTEGER 		The unique id to identify the item.
 * Title		    VARCHAR(75)		The item title to be displayed.
 * Type		        VARCHAR(30)		The type to distinguish between the different item types.
 * Kitchen		    TINYINT(1)		The flag to identify if item needs to be prepared in kitchen.
 * Price		    SMALLINT(6)		The price the item is selling for.
 * Recipe		    TEXT		    The instructions required to cook the item.
 * Instructions		TEXT		    The instructions required to serve the item.
 * CreatorId  	    INTEGER  		The unique id to identify creator of the table.
 * CreatedAt		DATETIME		It stores the date and time at which the item is created.
 * UpdatedAt		DATETIME		It stores the date and time at which the item is updated.
 * Comment		    TEXT		    The comment about item.
 *
 */

export default function ItemMenuTable() {
	const sql = 'CREATE TABLE IF NOT EXISTS ITEM_MENU(\
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
                FOREIGN KEY(IngredientId) REFERENCES INGREDIENT(IngredientId)),\
                FOREIGN KEY(CreatorId) REFERENCES USER(UserId));'
	return sql
}
