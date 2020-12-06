/** @SQL Ingredient Table */

/**
 * @Function
 * Return string for creating sql table named INGREDIENT.
 * Table wont be created if table INGREDIENT already exists.
 *
 * @return {string} [SQL] - Sql statement for table creation.
 *
 * TABLE INGREDIENT
 * IngredientId		INTEGER 		The unique id to identify the ingredient.
 * Title		    VARCHAR(75)		The ingredient title to be displayed.
 * Type		        VARCHAR(30)		The type to distinguish between the different ingredient types.
 * Quantity		    FLOAT	    	The available quantity of the ingredient.
 * Unit		        SMALLINT(6)		The Units of Measure assigned to the ingredient. (in grams)
 * Price		    FLOAT		    The price the ingredient was bought for.
 * CreatorId  	    INTEGER  		The unique id to identify creator of the table.
 * CreatedAt		DATETIME		It stores the date and time at which the ingredient is created.
 * UpdatedAt		DATETIME		It stores the date and time at which the ingredient is updated.
 * Comment		    TEXT		    The comment about ingredient.
 *
 */
const ingredientTable = () => {
	const SQL = 'CREATE TABLE IF NOT EXISTS INGREDIENT(\
                \'IngredientId\' INTEGER PRIMARY KEY AUTOINCREMENT,\
                \'Title\' VARCHAR(75) NOT NULL UNIQUE,\
                \'Type\' VARCHAR(30) NOT NULL,\
                \'Quantity\' FLOAT NOT NULL DEFAULT 0,\
                \'Unit\'  SMALLINT(6) NOT NULL DEFAULT 0,\
                \'Price\' FLOAT NOT NULL DEFAULT 0,\
                \'CreatorId\' INTEGER NOT NULL,\
                \'CreatedAt\' DATETIME NOT NULL DEFAULT (datetime(\'now\')),\
                \'UpdatedAt\' DATETIME NULL DEFAULT NULL,\
                \'Comment\' TEXT NULL DEFAULT NULL,\
                FOREIGN KEY(CreatorId) REFERENCES USER(UserId));'
	return SQL
}

/** @Ingredient Table Export */
export default ingredientTable
