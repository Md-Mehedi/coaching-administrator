package coaching.administrator.classes.Board;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BoardService {

    @Autowired
    private BoardRepository repository;

    public Board saveBoard(Board board) {
        return repository.save(board);
    }

    public Board getBoardById(Integer id) {
        return repository.findById(id).orElse(null);
    }

    public Board getBoardByName(String name) {
        return repository.findByName(name);
    }

    public String deleteBoard(Integer id) {
        repository.deleteById(id);
        return "Board with id : " + id + " deleted";
    }

}