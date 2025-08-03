# Leather Store

Live: https://leather-store.netlify.app/

##

### Stack

#### Frontend: `React`, `TypeScript`, `Redux Toolkit`, `SCSS`, `Axios`, `Chart.js`

#### Backend: `Node.js`, `Express`, `MongoDB`, `Cloudinary`

##

## Features

- **Product catalog** with filtering by category and sorting by price
- **Custom product configuration** (leather type, leather/thread color)
- **Cart** with persistent storage per user, price and quantity calculation
- **Checkout** with address selection
- **Authentication** via JWT (login, signup)
- **User profile** with address management, order history, personal data

### Admin Dashboard

- **Product management**: create, edit, delete items with image upload (Cloudinary)
- **Order management**: track and update order statuses
- **Analytics / Reports**:
  - Monthly revenue (bar chart)
  - Revenue by product category (doughnut chart)
  - Quantity sold by category (doughnut chart)

##

<img width="914" alt="leather-store-main" src="https://github.com/user-attachments/assets/5dc2b427-52c9-454d-a24e-ca064d8bdbea" />

##

### Catalog

<img width="917" alt="dropdown" src="https://github.com/user-attachments/assets/5bd4cb19-763b-4ab4-b993-5372e2a88565" /><img width="917" alt="filter-sort" src="https://github.com/user-attachments/assets/1754eec5-0835-47a3-b54e-7fbbfc879ee3" />

##

### Item

<img width="769" alt="item" src="https://github.com/user-attachments/assets/d9c8247b-7aa8-407a-8832-37296949c068" />

##

### Cart

<img width="866" alt="cart" src="https://github.com/user-attachments/assets/a3d929e6-372b-4f5b-aab6-9bfc9ba5f58b" />

##

### Client orders

<img width="866" alt="my-orders" src="https://github.com/user-attachments/assets/f5b21ee3-223c-4760-a811-6dbea1595725" />

##

### Addresses

<img width="866" alt="addresses" src="https://github.com/user-attachments/assets/9d15ac71-ed48-4a57-8239-ca9a6f540a2b" />

##

### Info

<img width="866" alt="my-info" src="https://github.com/user-attachments/assets/a226d68a-8e14-4be8-bea3-5e8638ff0f02" />

##

### Login

<img width="263" alt="login" src="https://github.com/user-attachments/assets/75648add-e2e0-4363-9b4c-9cfcd19418ca" />

##

### All orders (in Admin page)

<img width="909" alt="orders" src="https://github.com/user-attachments/assets/7016b3f2-2066-48ee-9b9d-10f56357aa76" />

##

### All items

<img width="909" alt="items-management" src="https://github.com/user-attachments/assets/f30852f3-fbd6-497b-8519-e60cb379a493" />

##

### Add new item

<img width="460" alt="add-item" src="https://github.com/user-attachments/assets/fd93c31a-7cc8-4ab7-a2fc-84572d152d73" />

##

### Analytics

<img width="909" alt="analytics" src="https://github.com/user-attachments/assets/f8054b3f-c44b-485d-a181-453d14fd3426" />

##

## Usage

### Set Environment Variables

Rename the .envexample to .env and add your [MongoDB](https://www.mongodb.com/) database URL, password and your JWT secret

### Backend

```bash
cd backend
npm install
npm run server
```

### Frontend

```bash
cd frontend
npm install
npm run start
```

### To run Storybook

```bash
npm run storybook
```
