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
const containTable = () => {
	const SQL = 'CREATE TABLE IF NOT EXISTS CONTAIN(\
                \'FoodId\' INTEGER NOT NULL,\
                \'IngredientId\' INTEGER NOT NULL,\
                \'Quantity\' FLOAT NOT NULL DEFAULT 0,\
                \'CreatorId\' INTEGER NOT NULL,\
                \'CreatedAt\' DATETIME NOT NULL DEFAULT (datetime(\'now\')),\
                \'UpdatedAt\' DATETIME NULL DEFAULT NULL,\
                \'Comment\' TEXT NULL DEFAULT NULL,\
                FOREIGN KEY(FoodId) REFERENCES FOOD(FoodId) ON DELETE CASCADE,\
                FOREIGN KEY(IngredientId) REFERENCES INGREDIENT(IngredientId),\
                FOREIGN KEY(CreatorId) REFERENCES USER(UserId));'
	return SQL
}

/** @Item Menu Table Export */
export default containTable
