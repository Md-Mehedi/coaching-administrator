select
select * from fees


alter table student drop cascade
drop column end_date;

drop table student cascade

select *  from expense e where e.coaching_id = 1 and e.time

SELECT * from expense e where e.coaching_id = 1 and upper(to_char(e.time, 'Month')) = 'January' and to_char(e.time, 'Year') = 2018;

ALTER TABLE monthly_fees 
RENAME COLUMN std_id TO student_id;

-- select all connection to database
SELECT * from pg_stat_activity where usename = 'esnvxwgujgmyzy' and datname = 'dcet64lv7go83l';

-- set idle session timeout to 5 minutes
SET SESSION idle_in_transaction_session_timeout = '5min';

-- to delete all idle connections
SELECT 
    pg_terminate_backend(pid) 
FROM 
    pg_stat_activity 
WHERE 
    -- don't kill my own connection!
    pid <> pg_backend_pid()
    -- don't kill the connections to other databases
    AND datname = 'dcet64lv7go83l'
    ;

SELECT * from coaching;



select * from subject;

update person set nick_name='Ali' where id='4';
update person set nick_name='Akbar' where id='5';
update person set nick_name='Mehedi' where id='7';
update person set nick_name='Rupom' where id='12';
update person set nick_name='Sakib' where id='13';
update person set nick_name='Nafiz' where id='15';
update person set nick_name='Aman' where id='17';
update person set nick_name='Tanvir' where id='20';
select * from person;
update institution set name='City College' where id=8






------------------- Mehedi ----------------------
select
select * from student;
update person set coaching_id=5 
-- alter table person drop CONSTRAINT uk_ipuv2udv3fk0pcuq4yxwlw3yw
drop table edu_qualification cascade;

select *     from student st, person p  where st.person_id = p.id and p.coaching_id =3

select * from teacher;
delete from teacher where person_id = 26
update 

update batch set program_id=2 where program_id is null;
select * from batch

select * from admin 

alter table subject drop CONSTRAINT uk_jxc480634gv90rkb7pa0cx8tw;
SELECT con.*
       FROM pg_catalog.pg_constraint con
            INNER JOIN pg_catalog.pg_class rel
                       ON rel.oid = con.conrelid
            INNER JOIN pg_catalog.pg_namespace nsp
                       ON nsp.oid = connamespace
       WHERE nsp.nspname = 'public'
             AND rel.relname = 'person'
delete from class_time;

drop table class_time CASCADE;
drop table todo CASCADE;

<<<<<<< HEAD
<<<<<<< HEAD




=======
s

insert into occupation (name) values('Driver');
insert into occupation (name) values('Housewife');
insert into occupation (name) values('Businessman');
>>>>>>> 7c6c90ea135ef173d01e849da7f8993dd50e63ad
=======
select * from class_time;

insert into class_type (type) values('CLASS');
insert into class_type (type) values('EXAM');
insert into class_type (type) values('EVENT');
insert into class_type (type) values('CANCEL');

>>>>>>> 9e9ec4e42310cd3052a95b2b0d4287af70cfedbe
