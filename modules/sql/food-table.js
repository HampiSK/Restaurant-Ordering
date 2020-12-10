/** @SQL Food Table */

/**
 * @Function
 * Return string for creating sql table named FOOD.
 * Table wont be created if table FOOD already exists.
 *
 * @return {string} [SQL] - Sql statement for table creation.
 *
 * TABLE FOOD
 * FoodId		    INTEGER 		The unique id to identify the food.
 * Title		    VARCHAR(75)		The item title to be displayed.
 * Type             VARCHAR(30)     Type of food, i.e.: Main, Drink, Side.
 * Kitchen          TINYINT(1)      Flag if food needs to be prepared in kitchen.
 * Price            FLOAT           Food price for customers.
 * Recipe           TEXT            Recipe for food.
 * Instructions     TEXT            Instructions how to cook food.
 * CreatorId  	    INTEGER  		The unique id to identify creator of the table.
 * CreatedAt		DATETIME		It stores the date and time at which the item is created.
 * UpdatedAt		DATETIME		It stores the date and time at which the item is updated.
 * Comment		    TEXT		    The comment about item.
 *
 */
const foodTable = () => {
	const SQL = 'CREATE TABLE IF NOT EXISTS FOOD(\
                \'FoodId\' INTEGER PRIMARY KEY AUTOINCREMENT,\
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
                FOREIGN KEY(CreatorId) REFERENCES USER(UserId));'
	return SQL
}

/** @Food Table Export */
export default foodTable
