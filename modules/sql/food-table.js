/** @SQL Item Table */
// CREATE TABLE all_candy 
//    (candy_num SERIAL PRIMARY KEY,
//     candy_maker CHAR(25));

// CREATE TABLE hard_candy 
//    (candy_num INT, 
//     candy_flavor CHAR(20),
//     FOREIGN KEY (candy_num) REFERENCES all_candy
//     ON DELETE CASCADE)
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

/** @Item Table Export */
export default foodTable
