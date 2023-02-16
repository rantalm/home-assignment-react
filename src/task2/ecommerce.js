////////////////////////////////////////////// Helper code, do not edit /////////////////////////////////////////
import { allIds, fetchOrderById } from "../api";

////////////////////////////////// Your code tasks is below //////////////////////////////////////////////////////

export const fetchAllOrders = () => {
    const ids = allIds;
    // .....
    //   1. TODO: fetch all ids using the "fetchOrderById" and the given ids, make it work as efficient and clean as possible.

    const allPromises = ids.map(id => fetchOrderById(id));
     return Promise.all(allPromises)
};

export const bucketOrdersByUsers = () => {
    let ordersByUsers = {};
    //   2. TODO: using the function from section 1 you should now bucket the orders by user.
    // each key in the object (ordersByUsers) represents a userId and each value is an array of the orders of that user.

    return new Promise((resolve, reject) => {
        fetchAllOrders()
        .then(orders => {
            orders.forEach(order => {
                if(!ordersByUsers[order.userId])
                    ordersByUsers[order.userId] = [order]
                else
                    ordersByUsers[order.userId].push(order)
            })

            resolve(ordersByUsers)
        })
        .catch(reject)
    })
};

export const getLast2WeeksOrders = () => {
    //   3. TODO: fetch all Ids and return array with only the last 2 weeks orders. make it work as efficient and clean as possible.
    
    return new Promise((resolve, reject) => {

        const fromTime = Date.now() - 1209600000 // 2 weeks in ms
          
        fetchAllOrders()
        .then(orders => {
            const last2Weeks = orders.filter(order => order.timestamp >= fromTime)

            resolve(last2Weeks)
        })
        .catch(reject)
    })
};

export const bucketOrdersByDate = () => {
    let ordersByDate = {};
    //   4. TODO: using the function from section 3 bucket the orders by date.
    // each key in the object (ordersByDate) represents a day and each value is an array of the orders in that date.

    return new Promise((resolve, reject)=> {
        getLast2WeeksOrders().
        then(orders => {
            orders.forEach(order => {
                 const day = new Date(order.timestamp).getDate()

                if(!ordersByDate[day]) 
                    ordersByDate[day] = [order]
                else 
                    ordersByDate[day].push(order)
            })

           resolve(ordersByDate)
        })
        .catch(reject)
    })
};

fetchAllOrders()
//.then(data => console.log('1:', data));

bucketOrdersByUsers()
//.then(data => console.log('2:', data));

getLast2WeeksOrders()
//.then(data => console.log('3:', data));

bucketOrdersByDate()
//.then(data => console.log('4:', data));

////////////////////////////////////////
