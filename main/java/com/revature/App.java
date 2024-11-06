package com.revature;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.revature.Controllers.UserController;
import com.revature.models.User;
import com.revature.services.UserServices;

import io.javalin.Javalin;

public class App {

    static UserServices us = new UserServices();
    static UserController uc = new UserController();

    public static void main(String[] args) {
        Javalin app = Javalin.create().start(8080);

        app.post("/user", uc::createUser);


    }
}
