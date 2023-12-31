# SET FOREIGN_KEY_CHECKS=0;

# test123
INSERT INTO users(id, email, password, newsletter, account_status_id, created_on)
VALUES (999, 'test@test.com', '$2a$10$GyNmk3NsMPz7LzWUzquuY./vjwJSj9f6wMQlU4X46ZPkrFlgZqgfC', 0, 1, null);

#
# INSERT INTO users_roles(role_id, user_id)
# VALUES (1, 999);
#
