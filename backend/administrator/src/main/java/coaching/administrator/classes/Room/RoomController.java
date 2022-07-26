
package coaching.administrator.classes.Room;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RoomController {

    @Autowired
    private RoomService service;

    @Autowired
    private RoomRepository repository;

    @PostMapping("/add-room")
    public Room addRoom(@RequestBody Room room) {
        System.out.println("\033[31minside add room\033[0m");

        return service.saveRoom(room);
    }

    @GetMapping("/get-room-by-id/{id}")
    public Room getRoomById(@PathVariable Integer id) {
        return service.getRoomById(id);
    }

    @GetMapping("/get-all-room-by-coachingId/{id}")
    public List<Room> getAllRoomByCoachingId(@PathVariable Integer id) {
        return repository.findAllByCoachingId(id);
    }

    @GetMapping("/get-all-rooms")
    public List<Room> getRooms() {
        return service.getRooms();
    }

    @GetMapping("/get-room-by-name/{name}")
    public Room getRoomByName(@PathVariable String name) {
        return service.getRoomByName(name);
    }

    @DeleteMapping("/delete-room-by-id")
    public String deleteRoom(@PathVariable Integer id) {
        return service.deleteRoom(id);
    }
}
