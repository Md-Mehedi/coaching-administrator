package coaching.administrator.classes.Coaching;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CoachingRepository extends JpaRepository<Coaching, Integer> {

    Coaching findByName(String name);

    Coaching findByEmail(String email);
}

// {
// "id":3,
// "password":"abc,
// "permanent_adrs_id": 3,
// "present_adrs_id": 3,
// "father_ocptn_id": 3,
// "mother_ocptn_id": 3,
// "religion_id": 1,
// "fullName": "Full name nai",
// "nick_name": "nickname nai",
// "gender": "other",
// "email": "email@nai.com",
// "father_name": "baba nai",
// "mother_name": "ma nai",
// "date_of_birth": "2012-04-23T18:25:43.511Z",
// "joining_date":"2012-04-23T18:25:43.511Z",
// "blood_group": "XY+",
// "nationality": "chakma",
// "person_type": "admin"
// }
