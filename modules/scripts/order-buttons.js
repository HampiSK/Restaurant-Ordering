/** @Scripts For Table Buttons */

/**
  * @Function
  * Actions for buttons in order
  *
  * @Alert
  * Async function
  *
  * @param {string} [option] - Order action
  *
  */
const orderButton = option => {
	switch (option) {
		case 'Admin':
		case 'Manager':
			return ['Placed','Prepared','Served','Paid']
		case 'Chef':
			return ['Served']
		case 'Waiter':
			return ['Prepared']
	}
}

/** @Scripts For Order Buttons */
export default orderButton
