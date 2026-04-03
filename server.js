const express = require("express");
const app = express();
app.use(express.json());

let orders = []; // temporary DB

// place order
app.post("/order", (req, res) => {
  const order = {
    ...req.body,
    createdAt: Date.now(),
    status: "processing"
  };

  orders.push(order);

  res.json({ message: "Order placed", order });
});

// get orders
app.get("/orders", (req, res) => {
  res.json(orders);
});

app.listen(3000, () => console.log("Server running"));
setInterval(() => {
  const now = Date.now();

  orders.forEach(order => {
    const diff = (now - order.createdAt) / 1000;

    // 20 seconds = delivered (demo purpose)
    if (diff > 20 && order.status !== "delivered") {
      order.status = "delivered";

      console.log("Order delivered:", order.id);

      sendNotification(order);
    }
  });

}, 5000);
function sendNotification(order) {
  console.log("🔔 Notify customer: Order " + order.id + " delivered");
}