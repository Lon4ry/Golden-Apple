import {
    int,
    json,
    mysqlEnum,
    mysqlTable,
    timestamp,
    varchar,
} from "drizzle-orm/mysql-core";

export const users = mysqlTable("Users", {
    id: varchar("id", { length: 255 }).primaryKey().notNull(),
    name: varchar("name", { length: 255 }).notNull(),
    lastName: varchar("lastName", { length: 255 }).notNull().default(""),
    email: varchar("email", { length: 255 }).notNull().unique(),
    address: varchar("address", { length: 255 }),
    phone: varchar("phone", { length: 20 }).default(""),
    password: varchar("password", { length: 255 }).notNull(),
    favorites: json("favorites").default("[]"),
    role: mysqlEnum("role", [
        "CLIENT",
        "SALES_MANAGER",
        "CEO",
        "STORAGE_MANAGER",
    ]).notNull(),
    createdAt: timestamp("created_at").defaultNow(),
});

export const products = mysqlTable("Products", {
    id: varchar("id", { length: 255 }).primaryKey().notNull(),
    name: varchar("name", { length: 255 }).notNull(),
    description: varchar("description", { length: 1000 }).notNull(),
    image: varchar("image", { length: 1000 }).default(""),
    price: int("price").notNull(),
    category: varchar("category", { length: 255 }).notNull(),
    createdAt: timestamp("created_at").defaultNow(),
    stock: int("stock"),
    manufacturer: varchar("manufacturer", { length: 255 }).default(
        "ООО КСТ-ИНДАСТРИС",
    ),
});

export const orders = mysqlTable("Orders", {
    id: varchar("id", { length: 255 }).primaryKey().notNull(),
    userId: varchar("user_id", { length: 255 }).notNull(),
    total: int("total").notNull(),
    createdAt: timestamp("created_at").defaultNow(),
    status: mysqlEnum("status", ["DELIVERED", "PROCESSED", "FAILED"]).notNull(),
});

export const orderItems = mysqlTable("OrderItems", {
    id: varchar("id", { length: 255 }).primaryKey().notNull(),
    orderId: varchar("order_id", { length: 255 }).notNull(),
    productId: varchar("product_id", { length: 255 }).notNull(),
    quantity: int("quantity").notNull(),
    price: int("price").notNull(),
});
export const carts = mysqlTable("Carts", {
    id: varchar("id", { length: 255 }).primaryKey().notNull(),
    userId: varchar("user_id", { length: 255 }).notNull().unique(),
});

export const cartItems = mysqlTable("CartItems", {
    id: varchar("id", { length: 255 }).primaryKey().notNull(),
    cartId: varchar("cart_id", { length: 255 }).notNull(),
    productId: varchar("product_id", { length: 255 }).notNull(),
    quantity: int("quantity").notNull(),
});
// Relations

// Types
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type Product = typeof products.$inferSelect;
export type NewProduct = typeof products.$inferInsert;
export type Order = typeof orders.$inferSelect;
export type NewOrder = typeof orders.$inferInsert;
export type OrderItem = typeof orderItems.$inferSelect;
export type NewOrderItem = typeof orderItems.$inferInsert;
export type Cart = typeof carts.$inferSelect;
export type NewCart = typeof carts.$inferInsert;
export type CartItem = typeof cartItems.$inferSelect;
export type NewCartItem = typeof cartItems.$inferInsert;
