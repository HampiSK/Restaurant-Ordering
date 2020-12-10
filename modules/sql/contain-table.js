/** @SQL Contain Table */

/**
 * @Function
 * Return string for creating sql table named CONTAIN.
 * Table wont be created if table CONTAIN already exists.
 *
 * @return {string} [SQL] - Sql statement for table creation.
 *
 * TABLE CONTAIN
 * FoodId	     	INTEGER 		The unique id to identify the food.
 * IngredientId	    INTEGER 		The unique id to identify the Ingredient used.
 * Quantity		    FLOAT		    Number of Ingredients used for food.
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

/** @Contain Table Export */
export default containTable
