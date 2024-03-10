INSERT INTO electron_ecommerce.account_statuses (electron_ecommerce.account_statuses.id,
                                                 electron_ecommerce.account_statuses.status_type)
VALUES (1, 'ACTIVE'),
       (2, 'AWAITING ACTIVATION');

INSERT INTO electron_ecommerce.roles(electron_ecommerce.roles.id, electron_ecommerce.roles.role_name)
VALUES (1, 'ROLE_USER'),
       (2, 'ROLE_ADMIN');

INSERT INTO electron_ecommerce.users (electron_ecommerce.users.newsletter,
                                      electron_ecommerce.users.account_status_id,
                                      electron_ecommerce.users.id,
                                      electron_ecommerce.users.first_name,
                                      electron_ecommerce.users.last_name,
                                      electron_ecommerce.users.password,
                                      electron_ecommerce.users.email)
VALUES (0, 1, 1,
        'Test',
        'User',
        '$2a$10$uWaNecvstEDe1xKXWif4T.9K/768bluCXWKXgJtc8XsUxgCle8.9y',
        'user@test.com');

INSERT INTO electron_ecommerce.users_roles (electron_ecommerce.users_roles.role_id,
                                            electron_ecommerce.users_roles.user_id)
VALUES (1, 1);


