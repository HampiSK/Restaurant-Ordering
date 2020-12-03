/** @SQL Payment Table */

/**
 * @Function
 * Return string for creating sql table named PAYMENT.
 * Table wont be created if table PAYMENT already exists.
 *
 * @return {string} [SQL] - Sql statement for table creation.
 *
 * TABLE PAYMENT
 * PaymentId		INTEGER		    The unique id to identify the payment.
 * OrderId		    INTEGER		    The unique id to identify the order.
 * PaymentMethod	VARCHAR(10)		The payment method. I.e.: cash,card,missing..
 * TotalAmount		FLOAT		    The amount of end bill.
 * CustomerPayed	FLOAT		    The amount customer payed with.
 * CustomerTip		FLOAT		    Customer tip.
 * Discount		    FLOAT		    The amount discounted from TotalAmount.
 * CreatorId  	    INTEGER  		The unique id to identify creator of the table.
 * CreatedAt		DATETIME		It stores the date and time at which the payment is created.
 * UpdatedAt		DATETIME		It stores the date and time at which payment is updated.
 * Comment		    TEXT	    	The comment about payment.
 *
 */
const paymentTable = () => {
	const SQL = 'CREATE TABLE IF NOT EXISTS PAYMENT(\
                \'PaymentId\' INTEGER PRIMARY KEY AUTOINCREMENT,\
                \'OrderId\' INTEGER NOT NULL,\
                \'PaymentMethod\' VARCHAR(10) NOT NULL DEFAULT NULL,\
                \'TotalAmount\' FLOAT NOT NULL,\
                \'CustomerPayed\' FLOAT NOT NULL,\
                \'CustomerTip\' FLOAT NULL DEFAULT NULL,\
                \'Discount\' FLOAT NULL DEFAULT NULL,\
                \'CreatorId\' INTEGER NOT NULL,\
                \'CreatedAt\' DATETIME NOT NULL DEFAULT (datetime(\'now\')),\
                \'UpdatedAt\' DATETIME NULL DEFAULT NULL,\
                \'Comment\' TEXT NULL DEFAULT NULL,\
                FOREIGN KEY(OrderId) REFERENCES RESTAURANT_ORDER(OrderId));\
                FOREIGN KEY(CreatorId) REFERENCES USER(UserId));'
	return SQL
}

/** @Payment Export */
export default paymentTable
