CREATE TABLE Users(
    Id int IDENTITY PRIMARY KEY,
    Name nvarchar(255) NOT NULL,
    Email nvarchar(255) NOT NULL,
    Password nvarchar(255) Not Null,
    Role nvarchar(255) Not Null
    );


CREATE TABLE Books(
    Id int IDENTITY PRIMARY KEY ,
    Name nvarchar(255) NOT NULL,
    Author nvarchar(255) NOT NULL,
    Publisher nvarchar(255) Not Null,
    Price decimal (10,2) Not Null,
    PublishDate date Not Null ,
    BookLink nvarchar(255) Not Null
    );

CREATE TABLE Carts(
Id int IDENTITY PRIMARY KEY,
BookId int FOREIGN KEY REFERENCES Books(Id),
UserId int FOREIGN KEY REFERENCES Users(Id),
Quantity int NOT NULL,
BookPrice decimal NOT NULL 
);

 CREATE TABLE Orders(
    Id int IDENTITY PRIMARY KEY,
    UserId int FOREIGN KEY REFERENCES Users(Id),
    BookId int FOREIGN KEY REFERENCES Books(Id),
    CartId int FOREIGN KEY REFERENCES Carts(Id) ,
    PaymentStatus bit,
    TotalPrice decimal(10,2) Not Null,
    OrderDate date Not null,
    );

-- Insert data into Users table
    INSERT INTO Users (Name, Email, Password, Role)
VALUES 
    ('John Smith', 'johnsmith@example.com', 'password1', 'User'),
    ('Jane Doe', 'janedoe@example.com', 'password2', 'Admin')
    

 

 

 

-- Insert data into Books table
INSERT INTO Books (Name, Author, Publisher, Price, PublishDate,BookLink)
VALUES
    ('The Great Gatsby', 'F. Scott Fitzgerald', 'Scribner', 12.99, '2022-01-15','https://www.thebookcollector.co.uk/sites/default/files/the-book-collector-example-2018-04.pdf'),
    ('To Kill a Mockingbird', 'Harper Lee', 'J. B. Lippincott & Co.', 9.99, '2021-05-20','https://www.thebookcollector.co.uk/sites/default/files/the-book-collector-example-2018-04.pdf')
   


   select *from Carts
   select *from Orders
   select *from Users
   select *from Books

   select *from Orders