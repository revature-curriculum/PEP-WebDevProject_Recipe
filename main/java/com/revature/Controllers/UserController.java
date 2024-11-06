package com.revature.Controllers;

import com.revature.models.User;
import com.revature.services.UserServices;

import io.javalin.http.Context;

public class UserController {
    static UserServices us = new UserServices();

    
    public void getAllUsers(Context ctx) {
        ctx.json(us.getAllUsers());
    };

    // public void getOneUser(Context ctx) {
    //     int id = Integer.parseInt(ctx.pathParam("id"));
    //     // User user = us.getOneById(id);
    //     if (user == null) {
    //         ctx.status(404);
    //     } else {
    //         ctx.json(user);
    //     }
    //     // this will throw an stacktrace because if null the id doesn't exist.
    //     // ctx.json(us.getOneById(id));
    // }

    // public void deleteUser(Context ctx) {
    //     int id = Integer.parseInt(ctx.queryParam("userId"));
    //     User u = us.getOneById(id);
    //     if (u == null) {
    //         ctx.result("User does not exist to delete");
    //     } else {
    //         us.deleteUser(id);
    //         ctx.result("Deleting user with id: " + id);
    //     }
    // }

    public void createUser(Context ctx) {
        // long way
        // ObjectMapper om = new ObjectMapper();
        // User user = om.readValue(ctx.body(), User.class);
        // // System.out.println(ctx.body()); don't need
        // User userFromDB = us.createUser(user);
        // ctx.json(userFromDB);
        // ctx.result("create user endpoint hit");

        // short way utilizing Jackson behind the scenes -.json and bodyAsClass is
        // Jackson so you need

        User user = ctx.bodyAsClass(User.class);//JSON
        User userFromDB = us.createUser(user);
        ctx.json(userFromDB);
    }

    // public void updateUser(Context ctx) {
    //     // getting the user id which comes off as a String - can remove this line for
    //     // responsebody
    //     // int id = Integer.parseInt(ctx.pathParam("id"));
    //     // converts the json from the request body into a Java object that can be used.
    //     User user = ctx.bodyAsClass(User.class);
    //     // need to set the id to the object we got from the request body so my service
    //     // can utilize it.
    //     // since id what not part of the user object we need to do this step --can
    //     // remove this step with requestbody
    //     // user.setId(id);
    //     // check if the user exists
    //     User updatedUser = us.updateUser(user);
    //     if (updatedUser == null) {
    //         // update id to user.getId()
    //         ctx.result("Updating user with id " + user.getId() + " was not successful");
    //     } else {
    //         ctx.json(updatedUser);
    //     }
    // }
}
