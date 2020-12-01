/**
 * Return string for creating sql table named MENU.
 * Table wont be created if table MENU already exists.
 *
 * TABLE MENU
 * MenuId		    INTEGER  		The unique id to identify the menu.
 * ItemId		    INTEGER	    	The unique id to identify the item.
 * CreatorId  	    INTEGER  		The unique id to identify creator of the table.
 * CreatedAt		DATETIME		It stores the date and time at which the menu is created.
 * UpdatedAt		DATETIME		It stores the date and time at which the menu is updated.
 * Comment	    	TEXT		    The comment about menu.
 *
 */

export default function MenuTable() {
	const sql = 'CREATE TABLE IF NOT EXISTS MENU(\
                \'MenuId\' INTEGER PRIMARY KEY AUTOINCREMENT,\
                \'ItemId\' INTEGER NOT NULL,\
                \'CreatorId\' INTEGER NOT NULL,\
                \'CreatedAt\' DATETIME NOT NULL DEFAULT (datetime(\'now\')),\
                \'UpdatedAt\' DATETIME NULL DEFAULT NULL,\
                \'Comment\' TEXT NULL DEFAULT NULL,\
                FOREIGN KEY(ItemId) REFERENCES ITEM_MENU(ItemId)),\
                FOREIGN KEY(CreatorId) REFERENCES USER(UserId));'
	return sql
}
