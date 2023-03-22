# Library Management System

A typical online library management system built using Node JS and Mongo DB. The backend server is written using Express.js framework and the frontend UI is developed using React.js

The library system management comprises of mainly 4 entities: **Admin**, **User**, **Book** and **Transaction**


## Homepage for normal users
![user_homepage](https://user-images.githubusercontent.com/36193784/226744074-e24260fd-25dd-42e0-89a9-30e49f5f6ed3.png)

#### Features for normal users :
- View all the books present in the library 
- See **available** books (in GREEN) and **unavailable** books (in RED)
- Only registered users has access to the library
- For every available book, the borrow button is active while return button is disabled
- For every unavailable book, the return button is active while borrow button is disabled
- When user borrows a book the status changes to unavailable. Similarly, when user returns a book the status changes back to available
- A user can return only that book which is borrowed by him/her

#### A book entity has three properties :
![book_data_sample](https://user-images.githubusercontent.com/36193784/226751308-9e09c1a0-9cd5-4bcf-8ffa-b8b3cfb728f7.png)

#### While every user entity has below following properties :
![user_data_sample](https://user-images.githubusercontent.com/36193784/226750926-8189a017-8947-454d-b0de-c9db08e3c8e0.png)

## Register page for normal users
![register_page](https://user-images.githubusercontent.com/36193784/226751891-c905e785-055e-4b54-898a-d4c0f0b1d8f4.png)


From this page, any user can registered himself into the library. Only after successful registration he/she will be able to access library books. Every transaction made by user will be persisted to the database in the transaction records 

#### Below are the properties of a transaction entity :
![transaction_data_sample](https://user-images.githubusercontent.com/36193784/226753643-01cc614e-6de7-4bc0-bae7-8caea9c286ce.png)

## Login page for admin (Librarian)
![login_page](https://user-images.githubusercontent.com/36193784/226753927-64661101-68ac-49f0-8ff8-a0ded645b6fd.png)


Admin has to login from this page to perform additional functionalities over a normal user. After successful login he will be redirect to homepage where he/she will have additional options apart from all other capabilities available to a normal user

## Homepage for admin
![admin_homepage](https://user-images.githubusercontent.com/36193784/226754888-acf5641f-291b-43b1-a306-be6820b51606.png)


#### Additional features for an admin :
- Admin can add a new book in the library
- An admin can remove existing book from the library
- Also, admin can see the transaction records of all books and users (**NOTE:** *not implemented on UI but the backend API for the same is implemented*)

#### An admin entity has following properties :
![admin_data_sample](https://user-images.githubusercontent.com/36193784/226755819-e1c0f0b6-13e0-48d9-b358-e1b8511acd76.png)


# Backend APIs

Here are the list of APIs implemented as part of the backend server


### For books
- **GET** /v1/library/books 
- **GET** /v1/library/books/available 
- **GET** /v1/library/books/status/:bookname

### For admin
- **POST** /v1/library/admin/register 
- **POST** /v1/library/admin/login 
- **GET** /v1/library/admin/allbooks (*requires token auth*)
- **POST** / v1/library/admin/addbook (*requires token auth*)
- **DELETE** /v1/library/admin/removebook/:bookname (*requires token auth*)

### For user
- **POST** /v1/library/users/register 
- **POST** /v1/library/users/books/borrow 
- **PUT** /v1/library/users/books/return


# Steps to run the application code locally

#### Clone the project
```
git clone https://github.com/rahultiwarigithub/Library-Management-System.git
```

#### Go to the project directory
```
cd Library-Management-System
```

#### Install dependencies of backend
```
cd backend
npm install
```

#### Start the server
```
npm start
```

#### Install dependencies of frontend
```
cd ../frontend
npm install
```

#### Start the client
```
npm start
```

#### Launch the UI from your browser http://localhost:3000




*Author: https://github.com/rahultiwarigithub*

