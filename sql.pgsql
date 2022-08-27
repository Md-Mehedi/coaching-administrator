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

-- to delete all idle connections'
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

-- alternate only idle are deleted
SELECT pg_terminate_backend(pid) FROM pg_stat_activity
WHERE datname = 'dcet64lv7go83l'
AND pid <> pg_backend_pid()
AND state in ('idle');

-- ilde connections are removed every 2 minutes
alter system set idle_in_transaction_session_timeout='2min';

-- see current connections
SELECT * FROM pg_stat_activity where datname='dcet64lv7go83l';

SELECT * from coaching;
pg_stat_activity
-- admin home page utility

drop table monthly_fees cascade;

select count(*) teacherCount, p.coaching_id coachingId  
from teacher t, person p 
group by coachingId, t.person_id, p.id
having t.person_id = p.id 
and p.coaching_id = 5 

select count(*) teacherCount, p.coaching_id
from teacher t
Inner JOIN person p
on p.id = t.person_id
where p.coaching_id = 5
group by p.coaching_id

-- batch count
select count(*) count,p.coaching_id coachingId
from batch b,program p
where b.program_id = p.id and p.coaching_id = 5
group by p.coaching_id

-- program count
select coaching_id,count(*)
from program 
group by coaching_id

select * from exam;



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



select * from exam_subject;
select email from person


------------------- Mehedi ----------------------
select
select * from student;
drop table teacher_payment cascade
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

DROP TABLE EXAM CASCADE;
DROP TABLE EXAM_SUBJECT CASCADE;
DROP TABLE EXAM_MARK CASCADE;


insert into occupation (name) values('Driver');
insert into occupation (name) values('Housewife');
insert into occupation (name) values('Businessman');

DROP TABLE BOARD CASCADE;
DROP TABLE INSTITUTION CASCADE;



insert into board (name) values('Barisal');
insert into board (name) values('Chittagong');
insert into board (name) values('Comilla');
insert into board (name) values('Dhaka');
insert into board (name) values('Dinajpur');
insert into board (name) values('Jessore');
insert into board (name) values('Mymensingh');
insert into board (name) values('Rajshahi');
insert into board (name) values('Sylhet');
insert into board (name) values('Madrasah');
insert into board (name) values('Technical');

select * from institution


insert into institution (name,board_id) values('Barisal Cadet College',1);
insert into institution (name,board_id) values('Barisal Government Women’s College',1);
insert into institution (name,board_id) values('Shaheed Abdur Rob Serniabat Degree College',1);
insert into institution (name,board_id) values('Amritalal Dey College',1);
insert into institution (name,board_id) values('Perojpur Government Girls’ College',1);
insert into institution (name,board_id) values('Patuakhali Government Mahila College',1);
insert into institution (name,board_id) values('Daulatkhan Abu Abdullah College',1);
insert into institution (name,board_id) values('Government Syed Hatem Ali College',1);
insert into institution (name,board_id) values('Maukaran B. L. P. Degree College',1);
insert into institution (name,board_id) values('Nizamuddin College',1);


insert into institution (name,board_id) values('Faujdarhat Cadet College',2);
insert into institution (name,board_id) values('Chittagong Govt. City College',2);
insert into institution (name,board_id) values('Commerce College',2);
insert into institution (name,board_id) values('Chittagong Public School And College',2);
insert into institution (name,board_id) values('Chittagong Govt. Girls’ College',2);
insert into institution (name,board_id) values('Ispahani Public School And College',2);
insert into institution (name,board_id) values('Haji Muhammad Mohsin College',2);
insert into institution (name,board_id) values('Chittagong College',2);
insert into institution (name,board_id) values('Cantonment English School And College',2);
insert into institution (name,board_id) values('Cox’s Bazar Govt. College',2);
insert into institution (name,board_id) values('Chittagong Collegiate School And College',2);
insert into institution (name,board_id) values('Bandarban Cantonment Public School And College',2);
insert into institution (name,board_id) values('BAF Shaheen College',2);
insert into institution (name,board_id) values('Chittagong Urea Fertilizer College',2);



insert into institution (name,board_id) values('Comilla Cadet College',3);
insert into institution (name,board_id) values('Feni Girls’ Cadet College',3);
insert into institution (name,board_id) values('Comilla Victoria Govt. College',3);
insert into institution (name,board_id) values('Ispahani Public School And College',3);
insert into institution (name,board_id) values('Ibn Taimia High School And College',3);
insert into institution (name,board_id) values('Comilla Education Board Model College',3);
insert into institution (name,board_id) values('Feni Govt. College',3);
insert into institution (name,board_id) values('Brahmanbaria Govt. College',3);
insert into institution (name,board_id) values('Noakhali Govt. College',3);
insert into institution (name,board_id) values('Comilla Commerce College',3);
insert into institution (name,board_id) values('Comilla cantonment board school and college',3);
insert into institution (name,board_id) values('Principal Abdul Majid College',3);
insert into institution (name,board_id) values('Comilla Women College',3);
insert into institution (name,board_id) values('Al-Amin Academy',3);
insert into institution (name,board_id) values('Laxmipur Govt. College and Cantonment College',3);


insert into institution (name,board_id) values('Rajuk Uttara Model College',4);
insert into institution (name,board_id) values('Notre Dame College',4);
insert into institution (name,board_id) values('Dhaka City College',4);
insert into institution (name,board_id) values('Holycross College',4);
insert into institution (name,board_id) values('Dhaka College',4);
insert into institution (name,board_id) values('Abdul Kadir Molla City College',4);
insert into institution (name,board_id) values('Dhaka Residential Model College',4);
insert into institution (name,board_id) values('Viqarunnisa Noon College',4);
insert into institution (name,board_id) values('Mirzapur Cadet College',4);
insert into institution (name,board_id) values('Shaheed Birottom Lt. Anowar Girls’ College',4);
insert into institution (name,board_id) values('Adamjee Cantonment College, Dhaka',4);
insert into institution (name,board_id) values('Shamsul Haque Khan School And College',4);
insert into institution (name,board_id) values('National Ideal College',4);
insert into institution (name,board_id) values('Birsrestha Noor Mohammad Public College',4);

insert into institution (name,board_id) values('Rangpur Cadet College',5);
insert into institution (name,board_id) values('Syedpur Govt. Technical College',5);
insert into institution (name,board_id) values('Dinajpur Govt. College',5);
insert into institution (name,board_id) values('Rangpur Govt. College',5);
insert into institution (name,board_id) values('Thakurgaon Govt. College',5);
insert into institution (name,board_id) values('Gaibandha Govt. College',5);
insert into institution (name,board_id) values('Cantonment Public School And College',5);
insert into institution (name,board_id) values('Nilphamari Govt. College',5);
insert into institution (name,board_id) values('Kurigram Govt. Women’s College',5);
insert into institution (name,board_id) values('Police Lines School And College',5);


insert into institution (name,board_id) values('Jessore Cantonment College',6);
insert into institution (name,board_id) values('Jhenidah Cadet College',6);
insert into institution (name,board_id) values('M M City College',6);
insert into institution (name,board_id) values('Military Collegiate College',6);
insert into institution (name,board_id) values('Khulna Govt. Girls’ College',6);
insert into institution (name,board_id) values('Kushtia Govt. College',6);
insert into institution (name,board_id) values('Chuadanga Govt. College',6);
insert into institution (name,board_id) values('Satkhira Govt. Colleg',6);
insert into institution (name,board_id) values('Kushtia Govt. College',6);
insert into institution (name,board_id) values('Khulna Collegiate Girls’ school and college',6);
insert into institution (name,board_id) values('Khulna Public College',6);


insert into institution (name,board_id) values('Govt. Ananda Mohan College',7);
insert into institution (name,board_id) values('Govt. Muminunnesa Mohila College',7);
insert into institution (name,board_id) values('Mymensingh Govt. College',7);
insert into institution (name,board_id) values('Shahid Syed Nazrul Islam College',7);
insert into institution (name,board_id) values('Notre Dame College Mymensingh',7);
insert into institution (name,board_id) values('Cantonment Public School & College',7);
insert into institution (name,board_id) values('Agricultural University College',7);
insert into institution (name,board_id) values('Alamgir Monsur Memorial College',7);
insert into institution (name,board_id) values('Advanced Residential Model College',7);
insert into institution (name,board_id) values('Royal Media College',7);


insert into institution (name,board_id) values('Rajshahi Cadet College',8);
insert into institution (name,board_id) values('Rajshahi Govt. City College',8);
insert into institution (name,board_id) values('Pabna Cadet College',8);
insert into institution (name,board_id) values('Bogra Cantonment Public School College',8);
insert into institution (name,board_id) values('Joypurhat Girls’ Cadet College',8);
insert into institution (name,board_id) values('Rajshahi College',8);
insert into institution (name,board_id) values('Shaheed Bulbul Govt. College',8);
insert into institution (name,board_id) values('Jooypurhat Govt. College',8);
insert into institution (name,board_id) values('Naogaon Govt. College',8);
insert into institution (name,board_id) values('Sirajganj Govt. College',8);
insert into institution (name,board_id) values('Pabna Govt. Women’s College',8);
insert into institution (name,board_id) values('Armed Police Battalion Public School And College',8);
insert into institution (name,board_id) values('Quadirabad Cantonment Sapper College',8);
insert into institution (name,board_id) values('A S College',8);



insert into institution (name,board_id) values('Jalalabad Cantonment Public School And College',8);
insert into institution (name,board_id) values('Sylhet Cadet College',8);
insert into institution (name,board_id) values('Sylhet Govt. College',8);
insert into institution (name,board_id) values('Sylhet MC College',8);
insert into institution (name,board_id) values('Sylhet Govt. Women’s College',8);
insert into institution (name,board_id) values('Moulavibazar Govt. College',8);
insert into institution (name,board_id) values('Srimongol Govt. College',8);
insert into institution (name,board_id) values('Sunamganj Govt. College',8);
insert into institution (name,board_id) values('Modonmohon College',8);
insert into institution (name,board_id) values('Sylhet Commerce College',8);



select * from expense e order by e.expense_date;

insert into class_type (type) values('CLASS');
insert into class_type (type) values('EXAM');
insert into class_type (type) values('EVENT');
insert into class_type (type) values('CANCEL');

select * from institution;
select * from edu_qualification;
update edu_qualification set institution_id=14 where institution_id<14
select * from coaching where id =1;
delete from enrolled_program where id = 3;

update person set person_type='ROLE_COACHING_ADMIN' where id=1
select * from person;

 select *
 from class_time ct,teacher t 
 where ct.teacher_id = t.person_id and t.person_id = 86

 select * from coaching where id = 1
 select * from person
 select * from edu_qualification where id = 106

select * from occupation;
select * from program

select * from student_batch sb, student s, person p, batch b, program pr where sb.student_id = s.person_id and s.person_id = p.id and sb.batch_id = b.id and b.program_id = pr.id and pr.id = 1 and s.person_id = 1;

select * from enrolled_program ep, student s, person p where ep.student_id = s.person_id and s.person_id = p.id and p.id = 1

select * from enrolled_program;

select ep.id, ep.enrolled_date, ep.program_id, ep.student_id from enrolled_program ep, student s, person p where ep.student_id = s.person_id and s.person_id = p.id and p.id = 20


select * from enrolled_program ep  where ep.student_id = 20;


UPDATE Person set email = 'asifahmedutsha@gmail.com' where email = 'asifahmedutsa@gmail.com';

0

delete from person where email like '%kaziwasif%' cascade



select * from coaching
delete from room cascade

select * from coaching
delete from room cascade

select * from person;
select * from admin;
insert into person (id, email, password, person_type) values(1, '66.mehedi@gmail.com', 'password', 'ROLE_COACHING_ADMIN');
insert into admin (person_id) values(1);
select * from student_batch

select max(obtained_mark) highestMark from result r where r.exam_mark_id = 1 Group By r.exam_mark_id


select * from exam;

select * from exam_subject;

select * from subject;

insert into exam(name, program_id) values('Physics Exam', 2);
insert into exam_subject(description,exam_id,subject_id) values ('Physics 1st Paper',3,9);

insert into exam_mark(exam_subject_mark,exam_type,exam_subject_id) values (20,'CQ',4);
insert into exam_mark(exam_subject_mark,exam_type,exam_subject_id) values (10,'MCQ',4);

insert into result(exam_mark_id,student_id,obtained_mark) values (1,62,18);
insert into result(exam_mark_id,student_id,obtained_mark) values (2,62,8);

insert into result(exam_mark_id,student_id,obtained_mark) values (1,63,18);
insert into result(exam_mark_id,student_id,obtained_mark) values (2,63,8);

select * from result;

select * from person,student where person.id = student.person_id;

select * from exam;
select * from exam_subject;
select * from exam_mark;
select * from result;
drop table result;
drop table exam_mark;
drop table exam_exam_subjects ;
drop table exam CASCADE;
update exam_subject set description=''

select * from program where id = 2;