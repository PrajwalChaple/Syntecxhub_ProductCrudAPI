# 📦 Syntecxhub Product CRUD API

A production-ready RESTful API for managing Products — built with **Node.js**, **Express**, and **MongoDB (Mongoose)**.

> Supports full CRUD, category/price filtering, pagination, sorting, and centralized error handling.

---

## 🚀 Features

| Feature | Description |
| --- | --- |
| **CRUD Operations** | Create, Read (list + single), Update, Delete products |
| **Filtering** | Filter by `category`, `minPrice`, `maxPrice` |
| **Pagination** | Page-based pagination with metadata (`totalPages`, `hasNextPage`, etc.) |
| **Sorting** | Sort by any field in `asc` or `desc` order |
| **Error Handling** | Centralized middleware with custom `ApiError` class |
| **Validation** | Mongoose schema-level validation with meaningful error messages |
| **Logging** | HTTP request logging via Morgan |
| **CORS** | Cross-Origin Resource Sharing enabled |

---

## 📁 Project Structure

```
Syntecxhub_ProductCrudAPI/
├── src/
│   ├── config/
│   │   └── db.js                  # MongoDB connection
│   ├── controllers/
│   │   └── productController.js   # CRUD + filter + pagination logic
│   ├── middlewares/
│   │   └── errorHandler.js        # Centralized error handler
│   ├── models/
│   │   └── Product.js             # Mongoose schema & indexes
│   ├── routes/
│   │   └── productRoutes.js       # Express router
│   ├── utils/
│   │   └── ApiError.js            # Custom error class
│   └── app.js                     # Express app assembly
├── server.js                      # Entry point
├── .env.example                   # Environment variable template
├── .gitignore
├── package.json
└── README.md
```

---

## ⚙️ Getting Started

### Prerequisites

- **Node.js** v16 or higher
- **MongoDB** (local or [MongoDB Atlas](https://www.mongodb.com/atlas))

### 1. Clone the Repository

```bash
git clone https://github.com/PrajwalChaple/Syntecxhub_ProductCrudAPI.git
cd Syntecxhub_ProductCrudAPI
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Copy the example file and fill in your values:

```bash
cp .env.example .env
```

| Variable | Description | Default |
| --- | --- | --- |
| `PORT` | Server port | `5000` |
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/syntecxhub_products` |
| `NODE_ENV` | Environment (`development` / `production`) | — |

### 4. Start the Server

**Development** (with auto-restart via nodemon):

```bash
npm run dev
```

**Production**:

```bash
npm start
```

The API will be available at `http://localhost:5000`.

---

## 📡 API Endpoints

Base URL: `/api/products`

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/api/products` | List all products (with filtering + pagination) |
| `GET` | `/api/products/:id` | Get a single product by ID |
| `POST` | `/api/products` | Create a new product |
| `PUT` | `/api/products/:id` | Update an existing product |
| `DELETE` | `/api/products/:id` | Delete a product |

---

## 🔍 Query Parameters (GET /api/products)

| Parameter | Type | Default | Description |
| --- | --- | --- | --- |
| `category` | `string` | — | Filter by category (case-insensitive) |
| `minPrice` | `number` | — | Minimum price filter |
| `maxPrice` | `number` | — | Maximum price filter |
| `page` | `number` | `1` | Page number |
| `limit` | `number` | `10` | Items per page (max 100) |
| `sort` | `string` | `createdAt` | Field to sort by |
| `order` | `string` | `desc` | Sort order (`asc` or `desc`) |

### Example Queries

```
GET /api/products?category=electronics
GET /api/products?minPrice=100&maxPrice=500
GET /api/products?page=2&limit=5
GET /api/products?sort=price&order=asc
GET /api/products?category=electronics&minPrice=50&maxPrice=1000&page=1&limit=10&sort=price&order=asc
```

---

## 📋 Request & Response Examples

### Create a Product

**Request:**

```http
POST /api/products
Content-Type: application/json

{
  "name": "Wireless Bluetooth Headphones",
  "price": 79.99,
  "description": "Premium noise-cancelling headphones with 30-hour battery life.",
  "category": "electronics"
}
```

**Response (201):**

```json
{
  "success": true,
  "message": "Product created successfully",
  "data": {
    "_id": "665f1a2b3c4d5e6f7a8b9c0d",
    "name": "Wireless Bluetooth Headphones",
    "price": 79.99,
    "description": "Premium noise-cancelling headphones with 30-hour battery life.",
    "category": "electronics",
    "createdAt": "2026-05-28T00:00:00.000Z",
    "updatedAt": "2026-05-28T00:00:00.000Z"
  }
}
```

### List Products (with Pagination)

**Request:**

```http
GET /api/products?page=1&limit=2
```

**Response (200):**

```json
{
  "success": true,
  "count": 2,
  "pagination": {
    "currentPage": 1,
    "totalPages": 5,
    "totalItems": 10,
    "itemsPerPage": 2,
    "hasNextPage": true,
    "hasPrevPage": false
  },
  "data": [
    { "...product1..." },
    { "...product2..." }
  ]
}
```

### Error Response (404)

```json
{
  "success": false,
  "status": "fail",
  "message": "Product not found with id: 665f1a2b3c4d5e6f7a8b9c0d"
}
```

### Validation Error (400)

```json
{
  "success": false,
  "status": "fail",
  "message": "Validation failed: Product name is required. Product price is required"
}
```

---

## 🛡️ Error Handling

The API uses a centralized error handler that gracefully handles:

| Error Type | Status Code | Description |
| --- | --- | --- |
| Validation Error | `400` | Missing or invalid fields |
| Cast Error | `400` | Invalid MongoDB ObjectId |
| Duplicate Key | `400` | Duplicate unique field value |
| Not Found | `404` | Resource or route not found |
| Server Error | `500` | Unexpected internal error |

In **development** mode, error responses include a `stack` trace for debugging.

---

## 🗂️ Product Schema

| Field | Type | Required | Constraints |
| --- | --- | --- | --- |
| `name` | String | ✅ | Max 200 chars, trimmed |
| `price` | Number | ✅ | Min 0 |
| `description` | String | ✅ | Max 2000 chars, trimmed |
| `category` | String | ✅ | Max 100 chars, trimmed, lowercase |
| `createdAt` | Date | Auto | Mongoose timestamp |
| `updatedAt` | Date | Auto | Mongoose timestamp |

---

## 🛠️ Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose ODM
- **Logging:** Morgan
- **Environment:** dotenv

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

Made with ❤️ by [Prajwal Chaple](https://github.com/PrajwalChaple)
