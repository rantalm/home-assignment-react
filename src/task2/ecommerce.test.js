import { fetchOrderById, allIds } from "../api";
import { fetchAllOrders, getLast2WeeksOrders, bucketOrdersByDate } from './ecommerce'


const ORDER_ID = "70ef599e5eca171b2bce84d1"
test("Ecommerce - fetchOrderById", async () => {
    let orders = await fetchOrderById(ORDER_ID);
    expect(orders).toBeTruthy();
});

test("Ecommerce - fetchAllOrders", async () => {
    let orders = await fetchAllOrders();
    expect(orders.length).toBe(allIds.length);
});

test("Ecommerce - getLast2WeeksOrders", async () => {
    let orders = await getLast2WeeksOrders();
    expect(orders.length).toBeTruthy()

    const notFromTime = Date.now() - 1209600000
    expect(orders.filter(order => order.timestamp < notFromTime).length)
    .toBe(0)
});

test("Ecommerce - bucketOrdersByDate", async () => {
    let orders = await bucketOrdersByDate();
    expect(orders).toBeTruthy()

    expect(Object.keys(orders).length)
    .toBeLessThanOrEqual(14)
});
