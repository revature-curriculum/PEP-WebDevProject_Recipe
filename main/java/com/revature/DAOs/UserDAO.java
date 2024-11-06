package com.revature.DAOs;

import java.util.List;

import com.revature.models.*;

public interface UserDAO {
    List<User> getAllUsers();

    User createUser(User user);

    User getOneById(int userId);

    boolean updateUser(User user);

    void deleteUser(int userId);

}