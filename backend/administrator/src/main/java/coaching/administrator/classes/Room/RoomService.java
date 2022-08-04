package coaching.administrator.classes.Room;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.node.ObjectNode;

import coaching.administrator.classes.Global.Global;

@Service
public class RoomService {

    @Autowired
    private RoomRepository repository;

    public ObjectNode saveRoom(Room room) {
        repository.save(room);
        return Global.createSuccessMessage("Subject save successfully");
    }

    public ObjectNode updateRoom(Room room) {
        repository.save(room);
        return Global.createSuccessMessage("Subject update successfully");
    }

    public Room getRoomById(Integer id) {
        return repository.findById(id).orElse(null);
    }

    public Room getRoomByName(String name) {
        return repository.findByName(name);
    }

    public List<Room> getRooms() {
        return repository.findAll();
    }

    public ObjectNode deleteRoom(Integer id) {
        repository.deleteById(id);
        return Global.createSuccessMessage("Subject delete successfully");
    }

}