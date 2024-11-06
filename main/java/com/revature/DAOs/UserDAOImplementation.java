package com.revature.DAOs;

import java.sql.Connection;
import java.sql.Driver;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import com.revature.models.User;

public class UserDAOImplementation implements UserDAO {
    // Driver
    // URL to the database
    // Username and Password

    // common to see no suitable driver available. If you see this:
    // connection String is incorrect
    // Driver dependency not added to pom.xml.

    String URL = "jdbc:postgresql://localhost:5432/postgres";
    String username = "postgres";
    String password = "85949";

    // Connection - object representing an active connection to a DB
    // DriverManager - Creates the active connection
    // Statements - object representing the SQL statement we want to execute
    // ResultSet - object representing the data we get back from DQL statements.

    @Override
    public List<User> getAllUsers() {
        List<User> users = new ArrayList<>();

        try (Connection connection = DriverManager.getConnection(URL, username, password)) {
            // this will throw an exception if not in a try catch block because of the
            // URL,username, and
            // password being incorrect when trying to connect to the database
            // moved this into try() to close resource once block is done.

            String sql = "SELECT * FROM users;";
            
            PreparedStatement ps = connection.prepareStatement(sql);

            // Now we need to create our resultset object
            ResultSet rs = ps.executeQuery();

            // Now we need to iterate through the ResultSet
            // This excludes the header row.
            while (rs.next()) {
                users.add(new User(rs.getInt("id"), rs.getString("firstName"), rs.getString("lastName")));
            }
        } catch (SQLException sq) {
            sq.printStackTrace();
        }
        return users;
    }

    @Override
    public User getOneById(int userId) {
        User user = null;
        // need an active connection
        try (Connection connection = DriverManager.getConnection(URL, username, password)) {
            String sql = "SELECT * FROM users WHERE id = ?;";

            PreparedStatement ps = connection.prepareStatement(sql);

            ps.setInt(1, userId);

            ResultSet rs = ps.executeQuery();
            while (rs.next()) {
                user = new User(rs.getInt("id"), rs.getString("firstName"), rs.getString("lastName"));
            }
            // close the active connection.
            // connection.close();
        } catch (SQLException sq) {
            sq.printStackTrace();
        }
        return user;

    }

    @Override
    public boolean updateUser(User user) {
        boolean isSuccessful = false;
        try (Connection connection = DriverManager.getConnection(URL, username, password)) {
            String sql = "UPDATE users SET firstname = ?, lastname = ? WHERE id = ?;";

            PreparedStatement ps = connection.prepareStatement(sql);

            ps.setString(1, user.getFirstName());
            ps.setString(2, user.getLastName());
            ps.setInt(3, user.getId());

            isSuccessful = ps.executeUpdate() == 1;
            
        } catch (SQLException sq) {
            sq.printStackTrace();
        }
        return isSuccessful;
    }

    @Override
    public void deleteUser(int userId) {
        try (Connection connection = DriverManager.getConnection(URL, username, password)) {
            String sql = "DELETE FROM users WHERE id = ?;";

            PreparedStatement ps = connection.prepareStatement(sql);
            ps.setInt(1, userId);
            ps.executeUpdate();

        } catch (SQLException sq) {
            sq.printStackTrace();
        }

    }

    @Override
    public User createUser(User user) {
        String sql = "insert into users values(default, ?,?);";

        try(Connection conn = DriverManager.getConnection(URL, username, password)){

            PreparedStatement ps = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);

            ps.setString(1, user.getFirstName());
            ps.setString(2, user.getLastName());

            ps.execute();
            ResultSet rs = ps.getGeneratedKeys();

            while(rs.next()){
                user.setId(rs.getInt("id"));
            }
            return user;

        }catch(SQLException e){
            e.printStackTrace();
        }

        return null;
    }

}
