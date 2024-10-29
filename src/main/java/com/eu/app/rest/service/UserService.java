package com.eu.app.rest.service;
import com.eu.app.rest.dto.UserDTO;
import com.eu.app.rest.dto.UserGridDTO;
import com.eu.app.rest.entity.Address;
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

    public User createUser(UserDTO userDto) {
        User user = new User();
        user.setName(userDto.getName());
        user.setSurname(userDto.getSurname());
        user.setGender(userDto.getGender());
        user.setBirthDate(userDto.getBirthDate());

        Address address = new Address();
        address.setWorkAddress(userDto.getWorkAddress());
        address.setHomeAddress(userDto.getHomeAddress());
        user.setAddress(address);

        return userRepository.save(user);
    }

    public Page<UserGridDTO> getAllUsers(Pageable pageable) {
        return userRepository.findAllUsersWithLimitedFields(pageable);
    }

    public UserDTO getUserById(Long id) {
        return userRepository.getUserById(id);
    }

    public User updateUser(Long id, UserDTO newUser) {
        User existingUser = userRepository.findById(id).orElse(null);
        if (existingUser == null) {
            return null;
        }
        existingUser.setName(newUser.getName());
        existingUser.setSurname(newUser.getSurname());
        existingUser.setGender(newUser.getGender());
        existingUser.setBirthDate(newUser.getBirthDate());
        existingUser.getAddress().setWorkAddress(newUser.getWorkAddress());
        existingUser.getAddress().setHomeAddress(newUser.getHomeAddress());

        return userRepository.save(existingUser);
    }

    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }
}
