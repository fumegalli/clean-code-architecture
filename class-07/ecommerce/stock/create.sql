drop table if exists ccca_stock.stock_entry;
drop schema if exists ccca_stock;

create schema ccca_stock;
create table ccca_stock.stock_entry (
	id_stock_entry serial primary key,
	id_item integer,
	operation text,
	quantity integer
);
