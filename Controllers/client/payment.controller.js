const PayOS = require("@payos/node");
require("dotenv").config();

const DEFAULT_CANCEL_URL = "http://localhost:3000/cancel.html";
const DEFAULT_RETURN_URL = "http://localhost:3000/success.html";

const payOS = new PayOS(
  process.env.PAYOS_CLIENT_ID,
  process.env.PAYOS_API_KEY,
  process.env.PAYOS_CHECKSUM_KEY
);

const createPayment = async (req, res) => {
  try {
    const { orderCode, amount, items} = req.body;

    if (!orderCode || !amount || !items || !items.length) {
      return res.status(400).json({ error: "Invalid input data" });
    }

    const body = {
      orderCode,
      amount,
      description: `Thanh toán đơn hàng ${orderCode}`,
      items,
      cancelUrl: cancelUrl || DEFAULT_CANCEL_URL,
      returnUrl: returnUrl || DEFAULT_RETURN_URL,
    };
    // const body = {
    //   orderCode: 1235,
    //   amount: 5000,
    //   description: `Thanh toán đơn hàng`,
    //   items: [
    //     {
    //       name: "Mi tom hao hao",
    //       quantity: 1,
    //       price : 5000
    //     },
    //   ],
    //   cancelUrl: "http://localhost:3000/cancel.html",
    //   returnUrl: "http://localhost:3000/success.html",
    // };

    const paymentLinkRes = await payOS.createPaymentLink(body);
    res.status(200).json(paymentLinkRes);
  } catch (error) {
    console.error("Error creating payment link:", error.message);
    res.status(500).json({ error: "Failed to create payment link" });
  }
};
const checkPaymentStatus = async (req, res) => {
  try {
    const { paymentId } = req.params;
    const paymentLink = await payOS.getPaymentLinkInformation(paymentId);
    res.status(200).json(paymentLink);
  } catch (error) {
    console.error("Error checking payment status:", error.message);
    res.status(500).json({ error: "Failed to check payment status" });
  }
};

module.exports = { 
    createPayment,
    checkPaymentStatus, 
};


/**
 * const body = {
  orderCode: 1234,
  amount: 2000,
  description: "Thanh toan don hang",
  items: [
    {
      name: "Mi tom hao hao",
      quantity: 1,
      price: 2000,
    },
  ],
  cancelUrl: "http://localhost:3000/cancel.html",
  returnUrl: "http://localhost:3000/success.html",
};

const paymentLinkRes = await payOS.createPaymentLink(body);
export type paymentLinkRes = {
  bin: string, // Mã BIN ngân hàng
  accountNumber: string, // Số tài khoản của kênh thanh toán
  accountName: string, // Tên chủ tài khoản của kênh thanh toán
  amount: number, // Số tiền của đơn hàng
  description: string, // Mô tả đơn hàng, được sử dụng làm nội dung chuyển khoản
  orderCode: number, // Mã đơn hàng
  currency: string, // Đơn vị tiền tệ
  paymentLinkId: string, // ID link thanh toán
  status: string, // Trạng thái của link thanh toán
  checkoutUrl: string, // Đường dẫn trang thanh toán
  qrCode: string, // Mã QR thanh toán
};

export type paymentLink = {
  id: string, // ID link thanh toán
  orderCode: number, // Mã đơn hàng
  amount: number, // Số tiền của đơn hàng
  amountPaid: number, // Số tiền đã thanh toán
  amountRemaining: number, // Số tiền cần thanh toán còn lại
  status: string, // Trạng thái của link thanh toán
  createdAt: string, // Thời gian tạo link thanh toán
  transactions: TransactionType[], // Danh sách các giao dịch của link thanh toán
  cancellationReason: string | null, // Lý do hủy link thanh toán nếu liên kết đã bị hủy/
  canceledAt: string | null, // Thời gian hủy link thanh toán
};

 */