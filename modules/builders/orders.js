/** @Module Orders */

/* Modules */
import { sqlInsert, sqlModify, sqlCreate, sqlGet } from '../sql/sql-module.js'
import restaurantOrderTable from '../sql/restaurant_order-table.js'
import todayDate from '../scripts/today-date.js'
import { stringLenghtChecker } from '../scripts/checkers.js'

const LCOMMENT = 1000

/**
 * @Object
 * Object Orders is ES6 module that handles creating and modifying orders.
 *
 */
class Orders {
	/**
     * @Constructor
     * Create an Order object.
     *
     * @Alert
     * Async.
     *
     * Optional:
     * @param {String} [dbName=":memory:"] - The name of the database file to use.
     *                                       On default runs in main memory.
     * @return {object} - Itself.
     *
     */
	constructor(dbName = ':memory:') {
		return (async() => sqlCreate(this,dbName,restaurantOrderTable()) )()
	}

    

	/**
	 * @Method
     * Get sorted orders. From newest to oldest.
     *
     * @Alert
     * Async.
     *
     * Optional:
     * @param {number} [option] - Return specified orders based on status
     *                          - On default "all" - returns all orders.
     *
     * @return {array} [ORDERS] - Contain orders data.
     *
     */
	async GetOrders(option = 'all') {
		try{
			if (option === 'all') option = '"Placed", "Prepared", "Served","Failed","Paid"'
			const orders = []
			await this.db.each(`SELECT * FROM RESTAURANT_ORDER WHERE Status IN(${option})`, (err, row) => {
				if (err === 0) throw new Error('Cannot open database')
				orders.push(row)
			})
			return orders.sort().reverse()
		}catch(err) {
			throw new Error(`Could not retrieve tables => ${err.message}`)
		}
	}

    
    
    async GetUpdatedData(body){ 
         const SPECIAL = `SELECT count(OrderId) AS count FROM 'RESTAURANT_ORDER' WHERE TableId
         = '${body.TableId}' AND (Status = 'Placed' OR Status = 'Served' OR Status = 'Prepared');`
         const COUNT = await this.db.get(SPECIAL)
         const TABLE = await this.Get({TableId: body.TableId},'TableName,InUse','RESTAURANT_TABLE')
         const NAME = await this.Get({UserId: body.CreatorId},'UserName','USER')
         return {
            CreatorName: NAME.UserName,
            TableName: TABLE.TableName,
            InUse: TABLE.InUse,
            Diners: COUNT.count
        }       
    }

   
    
    async Get(body,select = "*",dbname = "RESTAURANT_ORDER") {
		try{
			const SQL = await sqlGet(body,dbname,select)
			return await this.db.get(SQL)
		}catch(err) {
			throw new Error(`Orders => Get(): ${err.message}`)
		}
	}

    
    
   	/**
	 * @Method
     * Create item.
     *
     * @Alert
     * Async. Not pure method, using  LCOMMENT
     *
     * @param {object} [body] - Object with new order data.
     *
     * @return {boolean} - True if order was created.
     *
     */
	async Create(body) {
		try{
			stringLenghtChecker(body['Comment'],LCOMMENT)
			const SQL = await sqlInsert(body,'RESTAURANT_ORDER')
			await this.db.run(SQL)
			return true
		}catch(err) {
			throw new Error(`Order was not created => ${err.message}`)
		}
	}


    
 	/**
	 * @Method
     * Modify order.
     *
     * @Alert
     * Async. Not pure method, using  LCOMMENT
     *
     * @param {object} [body]   - Object with new order data.
     * @param {string} [OrderId] - Id of order to change
     *
     * @return {boolean} - True if order was modified.
     *
     */
	async Modify(body, OrderId) {
		try{
			stringLenghtChecker(body['Comment'],LCOMMENT)
			body.UpdatedAt = await todayDate()
			const SQL = await sqlModify(body,'RESTAURANT_ORDER','OrderId',OrderId)
			await this.db.run(SQL)
			return true
		}catch(err) {
			throw new Error(`Order was not modified => ${err.message}`)
		}
	}

    

	/**
	 * @Method
     * Close.
     *
     * @Alert
     * Async.
     *
     */
	async Close() {
		await this.db.close()
	}

}

/** @Export For Orders */
export default Orders
