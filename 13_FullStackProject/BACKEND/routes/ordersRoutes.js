const express = require("express");

const authenticateToken = require("../middleware/authenticateToken");
const authorizeRole = require("../middleware/authorizeRole");
const { readUsers } = require("../services/usersService");
const { readOrders, writeOrders } = require("../services/ordersService");

const router = express.Router();

router.get("/all", authenticateToken, authorizeRole("admin"), async (_req, res, next) => {
    try {
        const orders = await readOrders();
        return res.json(orders);
    } catch (error) {
        return next(error);
    }
});

router.get("/mine", authenticateToken, async (req, res, next) => {
    try {
        const userId = Number(req.user?.sub);

        if (!Number.isInteger(userId)) {
            return res.status(401).json({ message: "Autentificare necesara." });
        }

        const orders = await readOrders();
        const userOrders = orders.filter((order) => Number(order.user?.id) === userId);

        return res.json(userOrders);
    } catch (error) {
        return next(error);
    }
});

router.post("/", authenticateToken, async (req, res, next) => {
    try {
        const cartItems = Array.isArray(req.body.items) ? req.body.items : null;

        if (!cartItems || cartItems.length === 0) {
            return res.status(400).json({ message: "Cosul este gol." });
        }

        const users = await readUsers();
        const userId = Number(req.user?.sub);
        const user = users.find((item) => item.id === userId);

        if (!user) {
            return res.status(404).json({ message: "Utilizatorul nu a fost gasit." });
        }

        const normalizedItems = cartItems.map((item) => ({
            id: Number(item.id),
            image: typeof item.image === "string" ? item.image : "",
            name: typeof item.name === "string" ? item.name : "",
            price: typeof item.price === "string" ? item.price : String(item.price ?? ""),
            rating: Number(item.rating) || 0,
            quantity: Math.max(1, Number(item.quantity) || 1),
        }));

        const totalPrice = normalizedItems.reduce((sum, item) => {
            const itemPrice = Number.parseFloat(item.price) || 0;
            return sum + itemPrice * item.quantity;
        }, 0);

        const orders = await readOrders();
        const orderId = `ORD-${Date.now()}-${Math.floor(Math.random() * 100000)}`;
        const newOrder = {
            orderId,
            user: {
                id: user.id,
                name: user.name,
                surname: user.surname,
                email: user.email,
            },
            items: normalizedItems,
            totalPrice: Number(totalPrice.toFixed(2)),
            createdAt: new Date().toISOString(),
        };

        orders.push(newOrder);
        await writeOrders(orders);

        return res.status(201).json({
            message: "Comanda a fost salvata cu succes.",
            order: newOrder,
        });
    } catch (error) {
        return next(error);
    }
});

module.exports = router;
