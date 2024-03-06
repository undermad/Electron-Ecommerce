INSERT INTO electron_ecommerce.categories (electron_ecommerce.categories.id, electron_ecommerce.categories.name)
VALUES (1, 'memory'),
       (2, 'graphic card'),
       (3, 'monitor'),
       (4, 'keyboard');

INSERT INTO electron_ecommerce.variation (electron_ecommerce.variation.id,
                                          electron_ecommerce.variation.category_id,
                                          electron_ecommerce.variation.name)
VALUES (1, 1, 'Brand'),
       (2, 1, 'Module type'),
       (3, 1, 'Memory capacity'),
       (4, 1, 'Heatsink'),

       (5, 2, 'Brand'),
       (6, 2, 'Memory'),
       (7, 2, 'Reference Card Brand'),
       (8, 2, 'Features'),
       (9, 2, 'Number of fans'),

       (10, 3, 'Brand'),
       (11, 3, 'Screen size'),
       (12, 3, 'Refresh rate'),
       (13, 3, 'Response time'),
       (14, 3, 'Panel type'),

       (15, 4, 'Brand'),
       (16, 4, 'Connectivity'),
       (17, 4, 'Mechanical switch type');

INSERT INTO electron_ecommerce.variation_option (electron_ecommerce.variation_option.id,
                                                 electron_ecommerce.variation_option.variation_id,
                                                 electron_ecommerce.variation_option.value)
VALUES (1, 1, 'Crucial'),
       (2, 1, 'Corsair'),
       (3, 2, 'DDR4'),
       (4, 2, 'DDR5'),
       (5, 3, '16GB'),
       (6, 3, '32GB'),
       (7, 3, '8GB'),
       (8, 4, 'Without heatsink'),
       (9, 4, 'With heatsink'),


       (10, 5, 'Gigabyte'),
       (11, 5, 'Asus'),
       (12, 5, 'MSI'),
       (13, 5, 'Palit'),
       (14, 6, '16GB'),
       (15, 6, '12GB'),
       (16, 6, '8GB'),
       (17, 7, 'NVIDIA'),
       (18, 7, 'AMD'),
       (19, 8, 'Ray tracing'),
       (20, 9, '3'),
       (21, 9, '2'),

       (22, 10, 'BENQ'),
       (23, 10, 'LG'),
       (24, 10, 'SAMSUNG'),
       (25, 10, 'ACER'),
       (26, 11, '32"'),
       (27, 11, '27"'),
       (28, 11, '24"'),
       (29, 11, '22"'),
       (30, 12, '120hz'),
       (31, 12, '100hz'),
       (32, 12, '144hz'),
       (33, 12, '60hz'),
       (34, 13, 'Fast(4ms and less)'),
       (35, 13, 'Standard(5ms and more)'),
       (36, 14, 'IPS'),
       (37, 14, 'VA'),

       (38, 15, 'LOGITECH'),
       (39, 15, 'CORSAIR'),
       (40, 15, 'RAZER'),
       (41, 16, 'Bluetooth'),
       (42, 16, 'USB wierd'),
       (43, 17, 'Clicky'),
       (44, 17, 'Linear'),
       (45, 17, 'Membrane'),
       (46, 17, 'Tactile');


INSERT INTO electron_ecommerce.products_details (products_details.id,
                                                 electron_ecommerce.products_details.product_information,
                                                 electron_ecommerce.products_details.sku,
                                                 electron_ecommerce.products_details.visits)
VALUES (1,
        'Give your laptop a boost with 16 GB of DDR4 RAM – with speeds up to 3200 MHz you''ll be able to multitask and game without a hiccup',
        'CD432161', 11),
       (2,
        'Give your PC a boost with 16 GB of RAM – with speeds up to 3200 MHz you''ll be able to multitask and game without a hiccup',
        'CD432162', 8),
       (3,
        'Give your PC a boost with 16 GB of DDR4 RAM – with speeds up to 3200 MHz you''ll be able to multitask and game without a hiccup',
        'Cd43216', 9),
       (4,
        'Power up your gaming PC with this Corsair DDR5 RAM - it speeds up to 5600 MHz, pushing your PC to new hights of performance',
        'CVRD556A164', 124),
       (5,
        'Power up your gaming PC with this Corsair DDR5 RAM - it speeds up to 5200 MHz, pushing your PC to new hights of performance',
        'CVD552165', 243),
       (6,
        'Get ready for the upcoming generation of gaming - this DDR5 memory speeds up to 5200 MHz, pushing new heights of performance',
        'CDPD552326', 212),
       (7,
        'Give your PC a boost with 8 GB of DDR5 RAM – with speeds up to 4800 MHz you''ll be able to multitask and game without a hiccup',
        'CD548R87', 99),
       (8,
        'Give your laptop a boost with 8 GB of DDR5 RAM – with speeds up to 4800 MHz you''ll be able to multitask and game without a hiccup',
        'CD548LR88', 112);



INSERT INTO electron_ecommerce.products_images (electron_ecommerce.products_images.product_details_id,
                                                electron_ecommerce.products_images.image_url)
VALUES (1, 'https://media.currys.biz/i/currysprod/10260142?$l-large$&fmt=auto'),
       (2, 'https://media.currys.biz/i/currysprod/10260196?$l-large$&fmt=auto'),
       (3, 'https://media.currys.biz/i/currysprod/10260198?$l-large$&fmt=auto'),
       (4, 'https://media.currys.biz/i/currysprod/10248090?$l-large$&fmt=auto'),
       (4, 'https://media.currys.biz/i/currysprod/10248090_001?$l-large$&fmt=auto'),
       (4, 'https://media.currys.biz/i/currysprod/10248090_002?$l-large$&fmt=auto'),
       (5, 'https://media.currys.biz/i/currysprod/10248088?$l-large$&fmt=auto'),
       (5, 'https://media.currys.biz/i/currysprod/10248088_001?$l-large$&fmt=auto'),
       (5, 'https://media.currys.biz/i/currysprod/10248088_002?$l-large$&fmt=auto'),
       (5, 'https://media.currys.biz/i/currysprod/10248088_003?$l-large$&fmt=auto'),
       (6, 'https://media.currys.biz/i/currysprod/10234856?$l-large$&fmt=auto'),
       (6, 'https://media.currys.biz/i/currysprod/10234856_001?$l-large$&fmt=auto'),
       (6, 'https://media.currys.biz/i/currysprod/10234856_002?$l-large$&fmt=auto'),
       (6, 'https://media.currys.biz/i/currysprod/10234856_003?$l-large$&fmt=auto'),
       (7, 'https://media.currys.biz/i/currysprod/10260124?$l-large$&fmt=auto'),
       (8, 'https://media.currys.biz/i/currysprod/10260202?$l-large$&fmt=auto');



INSERT INTO electron_ecommerce.product_item (electron_ecommerce.product_item.id,
                                             electron_ecommerce.product_item.current_rate,
                                             electron_ecommerce.product_item.price,
                                             electron_ecommerce.product_item.category_id,
                                             electron_ecommerce.product_item.product_details_id,
                                             electron_ecommerce.product_item.description,
                                             electron_ecommerce.product_item.img_url,
                                             electron_ecommerce.product_item.name,
                                             electron_ecommerce.product_item.stock_quantity)
VALUES (1, 4.2, 32.99, 1, 1,
        'Give your laptop a boost with 16 GB of DDR4 RAM – with speeds up to 3200 MHz you''ll be able to multitask and game without a hiccup',
        'https://media.currys.biz/i/currysprod/10260142?$g-small$&fmt=auto',
        'CRUCIAL DDR4 3200 MHz Laptop RAM - 16 GB', 1000),
       (2, 4.6, 32.99, 1, 2,
        'Give your PC a boost with 16 GB of RAM – with speeds up to 3200 MHz you''ll be able to multitask and game without a hiccup',
        'https://media.currys.biz/i/currysprod/10260196?$g-small$&fmt=auto', 'CRUCIAL DDR4 3200 MHz PC RAM - 16 GB',
        1000),
       (3, 4.1, 35.99, 1, 3,
        'Give your PC a boost with 16 GB of DDR4 RAM – with speeds up to 3200 MHz you''ll be able to multitask and game without a hiccup',
        'https://media.currys.biz/i/currysprod/10260198?$g-small$&fmt=auto', 'CRUCIAL DDR4 3200 MHz PC RAM - 8 GB x 2',
        1000),
       (4, 4.8, 109.00, 1, 4,
        'Power up your gaming PC with this Corsair DDR5 RAM - it speeds up to 5600 MHz, pushing your PC to new hights of performance',
        'https://media.currys.biz/i/currysprod/10248090?$g-small$&fmt=auto',
        'CORSAIR Vengeance RGB DDR5 5600 MHz AMD EXPO PC RAM - 16 GB x 2', 1000),
       (5, 4.9, 89.00, 1, 5,
        'Power up your gaming PC with this Corsair DDR5 RAM - it speeds up to 5600 MHz, pushing your PC to new hights of performance',
        'https://media.currys.biz/i/currysprod/10248088?$g-small$&fmt=auto',
        'CORSAIR Vengeance DDR5 5200 MHz PC RAM - 16 GB x 2', 1000),
       (6, 4.6, 124.99, 1, 6,
        'Get ready for the upcoming generation of gaming - this DDR5 memory speeds up to 5200 MHz, pushing new heights of performance',
        'https://media.currys.biz/i/currysprod/10234856?$g-small$&fmt=auto',
        'CORSAIR Dominator Platinum RGB DDR5 5200 MHz PC RAM - 2 x 16 GB', 1000),
       (7, 4.8, '21.99', 1, 7,
        'Give your PC a boost with 8 GB of DDR5 RAM – with speeds up to 4800 MHz you''ll be able to multitask and game without a hiccup',
        'https://media.currys.biz/i/currysprod/10260124?$g-small$&fmt=auto', 'CRUCIAL DDR5 4800 MHz PC RAM - 8 GB',
        1000),
       (8, 4.6, 22.99, 1, 8,
        'Give your laptop a boost with 8 GB of DDR5 RAM – with speeds up to 4800 MHz you''ll be able to multitask and game without a hiccup',
        'https://media.currys.biz/i/currysprod/10260202?$g-small$&fmt=auto', 'CRUCIAL DDR5 4800 MHz Laptop RAM - 8 GB',
        1000);

INSERT INTO electron_ecommerce.product_configuration (electron_ecommerce.product_configuration.product_item_id,
                                                      electron_ecommerce.product_configuration.variation_option_id)
VALUES (1, 1),
       (1, 3),
       (1, 5),
       (1, 8),

       (2, 1),
       (2, 3),
       (2, 5),
       (2, 8),

       (3, 1),
       (3, 3),
       (3, 5),
       (3, 8),

       (4, 2),
       (4, 4),
       (4, 6),
       (4, 9),

       (5, 2),
       (5, 4),
       (5, 6),
       (5, 9),


       (6, 2),
       (6, 4),
       (6, 6),
       (6, 9),

       (7, 2),
       (7, 4),
       (7, 1),
       (7, 9),

       (8, 2),
       (8, 4),
       (8, 1),
       (8, 9);



INSERT INTO electron_ecommerce.products_details (products_details.id,
                                                 electron_ecommerce.products_details.product_information,
                                                 electron_ecommerce.products_details.sku,
                                                 electron_ecommerce.products_details.visits)
VALUES (9,
        'he new king of 1440p gaming is here. The RTX 4070 Ti SUPER is built on the Ada Lovelace architecture and it packs more power than the 3070 Ti',
        'GGFRX4070TS168', 492),
       (10, 'There are dedicated cores just for Ray Tracing, making sure your graphics are super realistic.',
        'GGFRX47TS1611', 310),
       (11,
        'Got to get some work done? You''ll breeze through demanding 3D renders faster than ever before, with NVIDIA Studio for fine-tuning.',
        'GARX47TS1611', 250),
       (12,
        'There''s enough power to stream pretty much anything in high resolution and framerates. And the AI helps by enhancing your voice and video to professional levels.',
        'GGFRX47TS1612', '310');

INSERT INTO electron_ecommerce.products_images (electron_ecommerce.products_images.product_details_id,
                                                electron_ecommerce.products_images.image_url)
VALUES (9, 'https://media.currys.biz/i/currysprod/10260360?$l-large$&fmt=auto'),
       (9, 'https://media.currys.biz/i/currysprod/10260360_001?$l-large$&fmt=auto'),
       (10, 'https://media.currys.biz/i/currysprod/10260357?$l-large$&fmt=auto'),
       (10, 'https://media.currys.biz/i/currysprod/10260357_001?$l-large$&fmt=auto'),
       (10, 'https://media.currys.biz/i/currysprod/10260357_002?$l-large$&fmt=auto'),
       (10, 'https://media.currys.biz/i/currysprod/10260357_003?$l-large$&fmt=auto'),
       (10, 'https://media.currys.biz/i/currysprod/10260357_004?$l-large$&fmt=auto'),
       (11, 'https://media.currys.biz/i/currysprod/10260356?$l-large$&fmt=auto'),
       (11, 'https://media.currys.biz/i/currysprod/10260356_001?$l-large$&fmt=auto'),
       (11, 'https://media.currys.biz/i/currysprod/10260356_002?$l-large$&fmt=auto'),
       (11, 'https://media.currys.biz/i/currysprod/10260356_003?$l-large$&fmt=auto'),
       (11, 'https://media.currys.biz/i/currysprod/10260356_004?$l-large$&fmt=auto'),
       (12, 'https://media.currys.biz/i/currysprod/10260359?$l-large$&fmt=auto'),
       (12, 'https://media.currys.biz/i/currysprod/10260359_001?$l-large$&fmt=auto');



INSERT INTO electron_ecommerce.product_item (electron_ecommerce.product_item.id,
                                             electron_ecommerce.product_item.current_rate,
                                             electron_ecommerce.product_item.price,
                                             electron_ecommerce.product_item.category_id,
                                             electron_ecommerce.product_item.product_details_id,
                                             electron_ecommerce.product_item.description,
                                             electron_ecommerce.product_item.img_url,
                                             electron_ecommerce.product_item.name,
                                             electron_ecommerce.product_item.stock_quantity)
VALUES (9, 4.8, 799.00, 2, 9,
        'The new king of 1440p gaming is here. The RTX 4070 Ti SUPER is built on the Ada Lovelace architecture and it packs more power than the 3070 Ti',
        'https://media.currys.biz/i/currysprod/10260360?$g-small$&fmt=auto',
        'GIGABYTE GeForce RTX 4070 Ti SUPER 16 GB WINDFORCE OC Graphics Card',
        100),
       (10, 5, 849.00, 2, 10,
        'Got to get some work done? You''ll breeze through demanding 3D renders faster than ever before',
        'https://media.currys.biz/i/currysprod/10260357?$g-small$&fmt=auto', 'GIGABYTE GeForce RTX 4070 Ti SUPER 16 GB AERO OC Graphics Card',
        100),
       (11, 4.5, 879.00, 2,
        11,'The DLSS 3 means next generation AI enhancing the performance to new heights.',
        'https://media.currys.biz/i/currysprod/10260356?$g-small$&fmt=auto', 'GIGABYTE AORUS GeForce RTX 4070 Ti SUPER 16 GB MASTER Graphics Card',
        100),
       (12, 4.3,879.00, 2,
        '12', 'The WINDFORCE cooling system has an air passthrough screen, three fans and a whole lot of heatsinks to keep temperature in check',
        'https://media.currys.biz/i/currysprod/10260359?$g-small$&fmt=auto', 'GIGABYTE GeForce RTX 4070 Ti SUPER 16 GB EAGLE OC Graphics Card',
        100);


INSERT INTO electron_ecommerce.product_configuration (electron_ecommerce.product_configuration.product_item_id,
                                                      electron_ecommerce.product_configuration.variation_option_id)
VALUES (9, 10),
       (9, 14),
       (9, 17),
       (9, 20),

       (10, 10),
       (10, 14),
       (10, 17),
       (10, 20),

       (11, 10),
       (11, 14),
       (11, 17),
       (11, 20),

       (12, 10),
       (12, 14),
       (12, 17),
       (12, 20);

















