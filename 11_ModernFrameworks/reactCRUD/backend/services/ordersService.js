const fsPromises = require("fs/promises");
const path = require("path");

const ORDERS_FILE = path.join(__dirname, "..", "comenzi.json");

async function readOrders() {
    try {
        const fileContent = await fsPromises.readFile(ORDERS_FILE, "utf-8");
        const orders = JSON.parse(fileContent);
        return Array.isArray(orders) ? orders : [];
    } catch (error) {
        if (error.code === "ENOENT") {
            await fsPromises.writeFile(ORDERS_FILE, "[]", "utf-8");
            return [];
        }

        throw error;
    }
}

async function writeOrders(orders) {
    await fsPromises.writeFile(ORDERS_FILE, JSON.stringify(orders, null, 2), "utf-8");
}

module.exports = {
    readOrders,
    writeOrders,
};
