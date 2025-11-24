use [data_health_web]

create table carts(
	CartID int identity(1,1) primary key,
	UserID int not null,
	CreateAt datetime2 default getdate(),
	foreign key (UserID) references users(UserID) on delete cascade
);

create table cart_item(
	CartItemID int identity(1,1) primary key,
	CartID int not null,
	FunctionalFoodsID int not null,
	Quantity int not null check (Quantity > 0),
	Price decimal (18,2) not null,
	foreign key (CartID) references carts(CartID) on delete cascade,
	foreign key (FunctionalFoodsID) references functional_food(FunctionalFoodsID),
	unique(CartID, FunctionalFoodsID)
);