package coaching.administrator.classes.Room;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface RoomRepository extends JpaRepository<Room, Integer> {

    Room findByName(String name);

    List<Room> findAll();

    // @Query(value =
    // " select * from room where coaching_id = :coachingId "
    // ,nativeQuery = true)
    List<Room> findAllByCoachingId(Integer coachingId);

}