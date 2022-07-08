
package coaching.administrator.classes.Board;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class BoardController {

    @Autowired
    private BoardService service;

    @PostMapping("/add-board")
    public Board addBoard(@RequestBody Board board) {
        System.out.println("\033[31minside add board\033[0m");

        return service.saveBoard(board);
    }

    @GetMapping("/get-board-by-id/{id}")
    public Board getBoardById(@PathVariable Integer id) {
        return service.getBoardById(id);
    }

    @GetMapping("/get-board-by-name/{name}")
    public Board getBoardByName(@PathVariable String name) {
        return service.getBoardByName(name);
    }

    @DeleteMapping("/delete-board-by-id")
    public String deleteBoard(@PathVariable Integer id) {
        return service.deleteBoard(id);
    }
}
