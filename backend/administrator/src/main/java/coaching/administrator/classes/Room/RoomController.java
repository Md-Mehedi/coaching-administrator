
package coaching.administrator.classes.Room;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.node.ObjectNode;

import coaching.administrator.classes.Coaching.Coaching;
import coaching.administrator.classes.Coaching.CoachingRepository;
import coaching.administrator.classes.Coaching.CoachingService;
import coaching.administrator.classes.Global.Global;
import coaching.administrator.classes.Security.jwt.JwtUtils;

@RestController
public class RoomController {

    @Autowired
    private RoomService service;
    @Autowired
    private CoachingService coachingService;

    @Autowired
    private RoomRepository repository;

    @PreAuthorize("hasRole('COACHING_ADMIN')")
    @PostMapping("/add-room")
    public ObjectNode addRoom(@RequestBody Room room) {
        room.setCoaching(coachingService.getCoachingById(JwtUtils.getCoachingId()));
        return service.saveRoom(room);
    }

    @PreAuthorize("hasRole('COACHING_ADMIN')")
    @GetMapping("/get-room-by-id/{id}")
    public ObjectNode getRoomById(@PathVariable Integer id) {
        Room fetchedRoom = service.getRoomById(id);
        if (fetchedRoom == null) {
            return Global.createErrorMessage("Room not found");
        }
        if (fetchedRoom.getCoaching().getId() == JwtUtils.getCoachingId()) {
            return Global.createSuccessMessage("Room found")
                    .putPOJO("object", fetchedRoom);
        }
        return Global.createErrorMessage("Not authorized to get room");

    }

    // @GetMapping("/get-all-room-by-coachingId/{id}")
    // public List<Room> getAllRoomByCoachingId(@PathVariable Integer id) {
    // return repository.findAllByCoachingId(id);
    // }

    @PreAuthorize("hasRole('COACHING_ADMIN')")
    @GetMapping("/get-all-rooms")
    public List<Room> getRooms() {
        return repository.findByCoachingId(JwtUtils.getCoachingId());
    }

    // @GetMapping("/get-room-by-name/{name}")
    // public Room getRoomByName(@PathVariable String name) {
    // return service.getRoomByName(name);
    // }

    @PreAuthorize("hasRole('COACHING_ADMIN')")
    @DeleteMapping("/delete-room-by-id/{id}")
    public ObjectNode deleteRoom(@PathVariable Integer id) {
        Room fetchedRoom = service.getRoomById(id);
        if (fetchedRoom == null) {
            return Global.createErrorMessage("Room not found");
        }
        if (fetchedRoom.getCoaching().getId() == JwtUtils.getCoachingId()) {
            repository.delete(fetchedRoom);
            return Global.createSuccessMessage("Room deleted");
        }
        return Global.createErrorMessage("Not authorized to delete room");
    }

    @PreAuthorize("hasRole('COACHING_ADMIN')")
    @PutMapping("/update-room")
    public ObjectNode updateRoom(@RequestBody Room room) {
        Room fetchedRoom = service.getRoomById(room.getId());
        if (fetchedRoom == null) {
            return Global.createErrorMessage("Room not found");
        }
        if (fetchedRoom.getCoaching().getId() == JwtUtils.getCoachingId()) {
            return service.updateRoom(room);
        }
        return Global.createErrorMessage("Not authorized to update room");
    }
}
