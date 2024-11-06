package com.revature.services;

import java.util.List;

import com.revature.DAOs.UserDAO;
import com.revature.DAOs.UserDAOImplementation;
import com.revature.models.User;

public class UserServices{

    UserDAO userDAO = null;

    public UserServices(){
        this.userDAO = new UserDAOImplementation();
    }
    
    public List<User> getAllUsers() {
        return this.userDAO.getAllUsers();
    }

    public User createUser(User user) {
        return this.userDAO.createUser(user);
    }

    public User updateUser(User user) {
        boolean success = userDAO.updateUser(user);
        if(success == true){
            return user;
        }else{
            return null;
        }
    }

    
}
