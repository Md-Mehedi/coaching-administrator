package coaching.administrator.classes.Board;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

public interface BoardRepository extends JpaRepository<Board, Integer> {

    Board findByName(String name);

}