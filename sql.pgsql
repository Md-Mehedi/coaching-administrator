Abdul Kadir Mollah City College
Adamjee Cantonment College
Adhyapak Abdul Majid College
Aeronautical College of Bangladesh
Aeronautical Institute of Bangladesh
Agricultural University College, Mymensingh
Agriculture Training Institute
Ahammad Uddin Shah Shishu Niketon School & College
Amrita Lal Dey College
Alekanda Govt College
Ananda Mohan College
Atomic Energy Research Establishment School and College
Azam Khan Govt. Commerce College
Bangla College
Bangladesh Air Force Shaheen College
Bangladesh Air Force Shaheen College, Dhaka
Bangladesh Institute of Glass and Ceramics
Bangladesh Institute of Marine Technology
Bangladesh Marine Academy
Bangladesh Navy College Dhaka
Bangladesh Sweden Polytechnic Institute
Barisal Government Model School and College [bn]
Barisal Engineering College
Barisal Government Women's College
Barisal Polytechnic Institute
BCIC College
Bhandaria Government College
Bijoy Smarani University College
BPATC School and College
Brahmanbaria Government College
Brajalal College
Brindaban Government College
Brojomohun College
Cambrian School and College
Cantonment Public School and College, Rangpur
Carmichael College
Chandpur Polytechnic Institute
Charfasson Degree College
Chittagong College
Chittagong Ideal School & College
Chittagong Model School and College
Chittagong Pali College
Chowmuhani Government S.A College
College of Aviation & Technology
College of Development Alternative
Comilla Government College
Comilla Government Women's College
Comilla Victoria Government College
Dania College
Dhaka City College
Dhaka College
Dhaka Commerce College
Dhaka Imperial College
Dhaka Polytechnic Institute
Dhaka Residential Model College
Dinajpur Government College
Dinajpur Polytechnique Institute
Eden Mohila College
Engineering University School & College[10]
Faridpur Engineering College
Faridpur Polytechnic Institute
Feni Government College
Feni Polytechnic Institute
Gazipur Cantonment College
Gohira Degree College
Gole Afroz College
Gopaldi Nazrul Islam Babu College
Government Akbar Ali College
Government Azizul Haque College
Government Barisal College
Government City College, Chittagong
Government College of Commerce, Chittagong
Government Debendra College
Government Hazi Mohammad Mohshin College
Government K. M. H. College
Government K.C. College Jhenaidah
Government P.C. College, Bagerhat
Government Physical Education College, Dhaka
Government Rajendra College
Government Shaheed Suhrawardy College
Government Science College, Dhaka
Government Syed Hatem Ali College
Government Tolaram College
Government Titumir College
Govt. Sheikh Fazilatunnesa Mujib Mohila College
Gunabati College
Haji Abul Hossain Institute of Technology
Hathazari Government University College
Hazera Taju University College
Heyako Banani University College
Holy Cross College, Dhaka
Ibne Taimiya School and College[11]
Ideal School and College
Ideal College
Institute of Leather Engineering and Technology, University of Dhaka
Ishwarganj Degree College
Islamia Government College
Ispahani Public School & College, Comilla
Jahangirpur Govt. College
Jamalpur Government College
Jatir Janak Bangabandhu Sheikh Mujibur Rahman Govt. College
Joypurhat Government College
Kabi Nazrul Government College
Khulna Govt. Girls College
Khulna Public College
Kurigram Government College
M. E. H. Arif College
Madan Mohan College
Madhupur College
Madhupur Shahid Smrity Higher Secondary School
Maulana Mohammad Ali College
Mohammadpur Government College
Mirpur Bangla High School and College
Mohammadpur Model School & College
Mohammadpur Preparatory School & College
Muminunnesa Women's College
Murari Chand College
Mymensingh Polytechnic Institute
Naogaon Government College
Narail Victoria College
Narayanganj Government Mohila College
Nawab Faizunnesa Government College
Nazipur Government College
Nazirhat College
New Government Degree College, Rajshahi
Noakhali Government College
Noakhali Government Women's College
Noakhali Science and Commerce School and College
Notre Dame College, Mymensingh
Pakundia Adarsha Mohila College
Perdana College of Malaysia
Police Lines School and College
Polli Sree College
Rahmat Iqbal College
Rajshahi College
RAJUK Uttara Model College
Rangpur Government College
Rangpur Engineering College[12]
Rangpur Public School And College
Rangunia College
Raozan Government University College
Royal Media College
Safiuddin Sarker Academy and College
Saidpur College
Sapahar Government College
Shyamoli Textile Engineering College
Shaheed Abdur Rab Serniabat Textile Engineering College
Shahidul Chowdhury Engineering College[13]
Shahid A.H.M. Kamaruzzaman Govt. Degree College
Shahid Syed Nazrul Islam College
Shaikh Burhanuddin Post Graduate College
Sherpur Government College
Sonapur Degree College
SOS Hermann Gmeiner College
Sylhet Cadet College
Sylhet Engineering College[14]
Sylhet Government Women's College
Sylhet Science And Technology College
Tangail Polytechnic Institute
Tejgaon College
Tejgaon Mohila College
Tetulia B. M. C. College
Textile Engineering College, Chittagong
Thakurgaon Government College
Ullapara Science College
United College of Aviation, Science & Management
University Laboratory School and College
Uttar Kattoli Alhaz Mostafa Hakim University College
Uttara Town College



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

s

insert into occupation (name) values('Driver');
insert into occupation (name) values('Housewife');
<<<<<<< HEAD
insert into occupation (name) values('Businessman');
select * from class_time;

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
