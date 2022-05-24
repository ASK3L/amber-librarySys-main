Drop Database if exists `bookloansystemdb`;

create database `bookloansystemdb` CHARSET latin1 COLLATE latin1_bin;

use `bookloansystemdb`;

create table students(
	id int auto_increment not null,
    fname varchar(50) not null,
    lname varchar(50) not null,
    email varchar(50) not null ,
    PRIMARY KEY(id)
);

insert into students (fname, lname, email)
values ("Peter", "Thomas", "pthomas@mailme.com"),
		("Vandyke", "James", "vjames@mailme.com");
        
create table librarians(
	id int auto_increment not null, 
    email varchar(50) not null,
    password varchar(60) not null, 
	PRIMARY KEY(id)
);

insert into librarians (email, password)
values("shawnaS@stonyhillprimary.com", "password123");

create table bookcategory(
	id int auto_increment not null,
    category varchar(50) not null,
    PRIMARY KEY (id)
);

insert into bookcategory(category)
values ('Fiction'),("Non-Fiction"),("Action"),("Adventure");

create table books(
	id int auto_increment not null, 
    name varchar(255) not null,
    author varchar(50) not null default "Anonymous",
    description text,
    category_id int not null,
    status varchar(50) not null default "available",
    PRIMARY KEY(id),
    FOREIGN KEY (category_id)
    REFERENCES bookcategory (id)
);

insert into books(name, author, description, category_id)
values("Head First SQL: Your Brain on SQL -- A Learner's Guide", "Lynn Beighley",
		"Using the latest research in neurobiology, cognitive science, and learning theory to craft a multi-sensory SQL learning experience, Head First SQL has a visually rich format designed for the way your brain works, not a text-heavy approach that puts you to sleep. Maybe you've written some simple SQL queries to interact with databases.",
        2
        ),
        ("Percy Jackson & the Olympians 1 - The Lightning Thief", "Rick Riordan",
		"Percy Jackson is a good kid, but he can't seem to focus on his schoolwork or control his temper. And lately, being away at boarding school is only getting worse-Percy could have sworn his pre-algebra teacher turned into a monster and tried to kill him. When Percy's mom finds out, she knows it's time that he knew the truth about where he came from, and that he needs to go to the one place where he'll be safe.",
        4
        ),
        ("My Brother the Killer", "Alix Sharkey",
		"At 8.00am on Monday 18th June 2001, Danielle Jones left home dressed in her schoolgirl uniform—and promptly vanished. The 15-year old's body was never recovered, but Danielle's parents soon learned that her 'Uncle Stuart', a close family friend, had concealed a decades-long history of sexual violence against teenage girls.",
        3
        ),
        ("Green Eggs and Ham", "Dr. Seuss",
		"This highly collectible edition of the beloved Seuss classic (the story of Sam-I-Am’s determined campaign to convince another Seussian character to eat a plate of green eggs and ham) makes a perfect gift that will be cherished by young and old alike.",
        1
        );

create table loanedBooks(
	id int auto_increment not null,
    book_id int not null references books(id),
    student_id int not null references students(id),
    loan_date date not null default now(),
    due_date date not null default now(),
    PRIMARY KEY(id)
);