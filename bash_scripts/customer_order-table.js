// /** @SQL Restaurant Order Table */

// /**
//  * @Function
//  * Return string for creating sql table named RESTAURANT_ORDER.
//  * Table wont be created if table RESTAURANT_ORDER already exists.
//  *
//  * @return {string} [sql] - Sql statement for table creation.
//  *
//  * TABLE RESTAURANT_ORDER
//  * OrderId		    INTEGER 		The unique id to identify the order.
//  * ItemId		    INTEGER 		The ID item associated with order
//  * TableId		    INTEGER 		The ID table associated with order
//  * UserId		    INTEGER      	The ID user associated with order
//  * Status		    VARCHAR(15)		The status of the order can be:
//  *                                  New, Paid, Failed, Placed, Prepared, Returned, and Complete.
//  * CreatedAt		DATETIME		It stores the date and time at which the order is created.
//  * UpdatedAt		DATETIME		It stores the date and time at which the order is updated.
//  * Comment		    TEXT		    The comment about order.
//  * CreatorId  	    INTEGER  		The unique id to identify creator of the table.
//  *
//  */
// const restaurantOrderTable = () => {
// 	const SQL = 'CREATE TABLE IF NOT EXISTS RESTAURANT_ORDER(\
//                 \'OrderId\' INTEGER AUTOINCREMENT,\
//                 \'FoodId\' INTEGER NOT NULL,\
//                 \'TableId\' INTEGER NOT NULL,\
//                 \'UserId\' INTEGER NOT NULL,\
//                 \'Status\' VARCHAR(15) NOT NULL,\
//                 \'CreatorId\' INTEGER NOT NULL,\
//                 \'CreatedAt\' DATETIME NOT NULL DEFAULT (datetime(\'now\')),\
//                 \'UpdatedAt\' DATETIME NULL DEFAULT NULL,\
//                 \'Comment\' TEXT NULL DEFAULT NULL,\
//                 FOREIGN KEY(FoodId) REFERENCES FOOD(FoodId),\
//                 FOREIGN KEY(TableId) REFERENCES RESTAURANT_TABLE(TableId),\
//                 FOREIGN KEY(UserId,CreatorId) REFERENCES USER(UserId,UserId));'
// 	return SQL
// }

// /** @Restaurant Order Export */
// export default restaurantOrderTable
