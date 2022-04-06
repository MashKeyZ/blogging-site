CREATE database UsersData;

CREATE TABLE UsersList(
	PersonID int IDENTITY(1,1) PRIMARY KEY,
	Name varchar(255),
	Surname varchar(225) NOT NULL,
	Country varchar(225),
	Color varchar(5),
	Contact varchar(10) NOT NULL,
	Email varchar(50) NOT NULL,
	Password varchar(20) NOT NULL,
	Comments varchar(225),
	Date  varchar(19),
)

INSERT INTO UsersList
VALUES('Vutlhari','Mashimbyi','South Africa','Red','0716548524','vutlhari@gmail.com','Vut@1234','Software Engineer',SYSUTCDATETIME());

INSERT INTO UsersList
VALUES('Tiyani','Baloyi','South Africa','Blue','0816548524','baloyi@gmail.com','Vut@1234','BSc in Geology, University of Limpopo',SYSUTCDATETIME())

INSERT INTO UsersList
VALUES('Bongile','Nkanyane','South Africa','Red','0735216548','nkanyane@gmail.com','Vut@1234','BSc in Computer Science',SYSUTCDATETIME())

INSERT INTO UsersList
VALUES('Neliswa','Mphakani','South Africa','Blue','0735246854','neliswa@gmail.com','Vut@1234','React native developer',SYSUTCDATETIME())

INSERT INTO UsersList
VALUES('Daniel','Shimange','United States','Red','0715428569','shimange@gmail.com','Vut@1234','BEng Tech Electrical Engineering',SYSUTCDATETIME())


