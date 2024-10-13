package com.eu.app.rest.service;
import com.eu.app.rest.dto.UserDTO;
import com.eu.app.rest.entity.User;
import com.eu.app.rest.repository.UserRepository;

import lombok.AllArgsConstructor;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;


@Service
@AllArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    public User createUser(User user) {
        return userRepository.save(user);
    }

    public Page<UserDTO> getAllUsers(Pageable pageable) {
        return userRepository.findAllUsersWithLimitedFields(pageable);
    }

    public User getUserById(Long id) {
        return userRepository.findById(id).orElse(null);
    }

    public User updateUser(Long id, User newUser) {
        User existingUser = getUserById(id);
        if (existingUser == null) {
            return null;
        }
        existingUser.setName(newUser.getName());
        existingUser.setSurname(newUser.getSurname());
        existingUser.setGender(newUser.getGender());
        existingUser.setBirthDate(newUser.getBirthDate());
        existingUser.setWorkAddress(newUser.getWorkAddress());
        existingUser.setHomeAddress(newUser.getHomeAddress());
        return userRepository.save(existingUser);
    }

    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }
}
