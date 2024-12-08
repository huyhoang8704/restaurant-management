const Order = require('../../models/order.model')
const User = require('../../models/user.model')

const index = async (req, res) => {
    try {
        const orders = await Order.find({ deleted: false })
            .sort({ createdAt: -1 }) // Sắp xếp theo thời gian mới nhất

        // Truy xuất thông tin khách hàng song song với Promise.all
        const customerPromises = orders.map(order => 
            User.findById(order.customer_id).select("fullname") // Chỉ lấy trường fullname
        );
        const customers = await Promise.all(customerPromises);

        // Định dạng lại dữ liệu đơn hàng
        const formattedOrders = orders.map((order, index) => ({
            orderCode: order.orderCode,
            customer: customers[index]?.fullname,
            menuItems: order.items.map(item => item.name).join(", "),
            totalPayment: `${order.totalAmount}`,
            status: order.status,
        }));

        res.status(200).json({ orders: formattedOrders });
    } catch (error) {
        res.status(500).json({
            message: "Failed to retrieve order report",
            error: error.message,
        });
    }
};




module.exports = {
    index,
}