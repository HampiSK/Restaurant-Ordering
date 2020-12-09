/** @Scripts For Table Buttons */

/**
  * @Function
  * Actions for buttons in table
  *
  * @Alert
  * Async function
  *
  * @param {string} [option] - Button action
  *
  */
const orderButton = option => {
    switch (option){
        case "Admin":
        case "Manager":
            return ['Placed','Prepared','Served','Paid']
        case "Chef":
            return ['Served']
        case "Waiter":
            return ['Prepared']
    }
}

export default orderButton
