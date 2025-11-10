package um.edu.pizzum.burgum.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class CreationNotFoundException extends RuntimeException {
    public CreationNotFoundException(String resource, String field, Object value) {
        super(String.format("%s not found with %s : '%s'", resource, field, value));
    }

    public CreationNotFoundException(String message) {
        super(message);
    }
}

