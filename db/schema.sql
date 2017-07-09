create database healthepetz_db;

use healthepetz_db;
create table users (
id integer(11) auto_increment not null,
email varchar(255) not null,
`password` varchar(20) not null,
role varchar(25) not null,
createdAt timestamp not null,
updatedAt timestamp not null,
primary key (id)
);


#drop table owners;
create table owners(
id integer(11) auto_increment not null,
usersId integer(11) not null,
owner_fname varchar(50) not null,
owner_lname varchar(100) not null,
owner_dob date, 
owner_sex varchar(1),
address varchar(100),
city varchar(100),
state varchar(2),
zip varchar(10),
phone varchar(15),
email varchar(255),
fax varchar(15),
createdAt timestamp not null,
updatedAt timestamp not null,
primary key (id),
key usersId (usersId), 
constraint fk_user_id_users foreign key (usersId) references users  (id)
);


#drop table pets;

create table pets (
id integer(11) auto_increment not null,
ownersId integer(11) not null,
pet_name varchar(50) not null,
pet_type varchar(50) not null,
pet_breed varchar(100) not null,
pet_color varchar(50) not null,
license_no varchar(25) not null,
microchip_no varchar(25) not null,
insur_name varchar(100),
insur_id varchar(25),
insur_phone varchar(15),
pet_dob date,
pet_dod date,
pet_age integer(11),
pet_sex integer(11),
spayed_neutered_ind boolean not null default 0,
pet_image_url varchar(255),
cond1 varchar(255),
cond2 varchar(255),
cond3 varchar(255),
med1 varchar(255),
med2 varchar(255),
med3 varchar(255),
vet1_name varchar(255),
vet1_specialty varchar(100),
vet1_address varchar(100),
vet1_city varchar(100),
vet1_state varchar(2),
vet1_zip varchar(10),
vet1_phone varchar(15),
vet1_email varchar(255),
vet1_fax varchar(15),
vet2_name varchar(255),
vet2_specialty varchar(100),
vet2_address varchar(100),
vet2_city varchar(100),
vet2_state varchar(2),
vet2_zip varchar(10),
vet2_phone varchar(15),
vet2_email varchar(255),
vet2_fax varchar(15),
createdAt timestamp not null,
updatedAt timestamp not null,
primary key (id),
key ownersId (ownersId), 
constraint fk_ownesId_owners foreign key (ownersId) references owners  (id)
);

#drop table medical_history;
create table medical_history (
id integer(11) auto_increment not null,
petsId integer(11) not null,
prov_name varchar(255) not null,
cond1 varchar(255),
svc_dt date not null,
total_billed_amt decimal(11,2) not null default 0,
total_paid_amt decimal(11,2) not null default 0,
notes varchar(500),
doc_type varchar(50),
doc_image_url varchar(255),
createdAt timestamp not null,
updatedAt timestamp not null,
primary key (id),
key petsId (petsId), 
constraint fk_petsId_pets foreign key (petsId) references pets  (id) 
);


#drop table vaccinations;
create table vaccinations (
id integer(11) auto_increment not null,
petsId integer(11) not null,
vacc_name varchar(255),
last_vacc_dt date not null,
next_vacc_dt date,
vacc_image_url varchar(255),
createdAt timestamp not null,
updatedAt timestamp not null,
primary key (id),
key petsId (petsId), 
constraint fk_vacc_petsId_pets foreign key (petsId) references pets  (id)
);












