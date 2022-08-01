package coaching.administrator.classes.ToDo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;


public interface ToDoRepository extends JpaRepository<ToDo, Integer>
{
    //Customer findById(Integer id);
    @Query(value = " select * " +
            " from todo t, customer c " +
            " where t.customer_id = c.id and c.id = :customerId", nativeQuery = true)
    List<ToDo> findAllToDoByCustomerId(@Param("customerId") Integer customerId);
}