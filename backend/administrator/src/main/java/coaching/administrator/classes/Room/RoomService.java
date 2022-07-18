package coaching.administrator.classes.Room;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RoomService {

    @Autowired
    private RoomRepository repository;

    public Room saveRoom(Room room) {
        return repository.save(room);
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

    public String deleteRoom(Integer id) {
        repository.deleteById(id);
        return "Room with id : " + id + " deleted";
    }

}