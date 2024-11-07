package com.revature.util;

import io.javalin.http.Context;
import io.javalin.http.Handler;
import io.javalin.http.UnauthorizedResponse;
import com.revature.model.Chef;
import com.revature.service.ChefService;

/**
 * Middleware for enforcing admin access control on protected HTTP methods.
 * This class checks if the user is an admin before allowing access to certain routes.
 */
public class AdminMiddleware implements Handler {

    /** Array of HTTP methods that require admin access. */
    private String[] protectedMethods;

    /** Service for managing Chef entities. */
    private ChefService chefService;

    /**
     * Constructs an AdminMiddleware instance with the specified ChefService and protected methods.
     *
     * @param chefService the ChefService used to retrieve Chef details.
     * @param protectedMethods variable-length argument list of HTTP methods that require admin access.
     */
    public AdminMiddleware(ChefService chefService, String... protectedMethods) {
        this.protectedMethods = protectedMethods;
        this.chefService = chefService;
    }

    /**
     * Handles the HTTP request, checking for admin access based on the HTTP method and user session.
     *
     * @param ctx the Javalin context containing the request and response information.
     * @throws Exception if an error occurs while processing the request or if access is denied.
     */
    @Override
    public void handle(Context ctx) throws Exception {
        if (isProtectedMethod(ctx.method().name())) {
            boolean isAdmin = isAdmin(ctx.sessionAttribute("chefId"));

            if (isAdmin) {
                // Chef is an admin, allow access to the route
            } else {
                // Chef is not an admin, deny access
                throw new UnauthorizedResponse("Access denied");
            }
        }
    }

    /**
     * Checks if the specified HTTP method is among the protected methods.
     *
     * @param method the HTTP method to check.
     * @return true if the method is protected; false otherwise.
     */
    private boolean isProtectedMethod(String method) {
        for (String protectedMethod : protectedMethods) {
            if (protectedMethod.toString().equalsIgnoreCase(method)) {
                return true;
            }
        }
        return false;
    }

    /**
     * Determines if the chef with the specified ID has admin privileges.
     *
     * @param chefId the unique identifier of the chef.
     * @return true if the chef is an admin; false otherwise.
     */
    private boolean isAdmin(int chefId) {
        Chef chef = chefService.findChef(chefId).get();
        return chef.isAdmin();

    }
}