INSERT INTO electron_ecommerce.products_details (products_details.id,
                                                 electron_ecommerce.products_details.product_information,
                                                 electron_ecommerce.products_details.sku,
                                                 electron_ecommerce.products_details.visits)
VALUES (18, 'The LIGHTSPEED wireless is so responsive you won''t even notice you''re not plugged in with a wire',
        'k111111', 153),
       (19, 'The LIGHTSPEED wireless is so responsive you won''t even notice you''re not plugged in with a wire',
        'K2222222', 452),
       (20, 'The LIGHTSPEED wireless is so responsive you won''t even notice you''re not plugged in with a wire',
        'k987987978', 143),
       (21,
        'Razer Purple switches feel lighter than traditional mechanical switches but still deliver that satisfying clicky keystroke sound',
        'K123ca1', 142),
       (22, 'Its multi-function digital dial and 4 media keys put control at your fingertips', 'KR12343221', 111);


INSERT INTO electron_ecommerce.products_images (electron_ecommerce.products_images.product_details_id,
                                                electron_ecommerce.products_images.image_url)
VALUES (18, 'https://media.currys.biz/i/currysprod/10242033?$l-large$&fmt=auto'),
       (18, 'https://media.currys.biz/i/currysprod/10242033_001?$l-large$&fmt=auto'),
       (18, 'https://media.currys.biz/i/currysprod/10242033_005?$l-large$&fmt=auto'),
       (18, 'https://media.currys.biz/i/currysprod/10242033_007?$l-large$&fmt=auto'),
       (19, 'https://media.currys.biz/i/currysprod/M10254616_black?$l-large$&fmt=auto'),
       (19, 'https://media.currys.biz/i/currysprod/M10254616_black_001?$l-large$&fmt=auto'),
       (19, 'https://media.currys.biz/i/currysprod/M10254616_black_002?$l-large$&fmt=auto'),
       (19, 'https://media.currys.biz/i/currysprod/M10254616_black_004?$l-large$&fmt=auto'),
       (20, 'https://media.currys.biz/i/currysprod/M10254616_white?$l-large$&fmt=auto'),
       (20, 'https://media.currys.biz/i/currysprod/M10254616_white_001?$l-large$&fmt=auto'),
       (20, 'https://media.currys.biz/i/currysprod/M10254616_white_003?$l-large$&fmt=auto'),
       (20, 'https://media.currys.biz/i/currysprod/M10254616_white_004?$l-large$&fmt=auto'),
       (21, 'https://media.currys.biz/i/currysprod/10232246_001?$l-large$&fmt=auto'),
       (21, 'https://media.currys.biz/i/currysprod/10232246_002?$l-large$&fmt=auto'),
       (21, 'https://media.currys.biz/i/currysprod/10232246_003?$l-large$&fmt=auto'),
       (21, 'https://media.currys.biz/i/currysprod/10232246_004?$l-large$&fmt=auto'),
       (22, 'https://media.currys.biz/i/currysprod/10252844_001?$l-large$&fmt=auto'),
       (22, 'https://media.currys.biz/i/currysprod/10252844_004?$l-large$&fmt=auto'),
       (22, 'https://media.currys.biz/i/currysprod/10252844_005?$l-large$&fmt=auto'),
       (22, 'https://media.currys.biz/i/currysprod/10252844_006?$l-large$&fmt=auto');



INSERT INTO electron_ecommerce.product_item (electron_ecommerce.product_item.id,
                                             electron_ecommerce.product_item.current_rate,
                                             electron_ecommerce.product_item.price,
                                             electron_ecommerce.product_item.category_id,
                                             electron_ecommerce.product_item.product_details_id,
                                             electron_ecommerce.product_item.description,
                                             electron_ecommerce.product_item.img_url,
                                             electron_ecommerce.product_item.name,
                                             electron_ecommerce.product_item.stock_quantity)
VALUES (18, 4.2, 179.00, 4, 18,
        'The LIGHTSPEED wireless is so responsive you won''t even notice you''re not plugged in with a wire',
        'https://media.currys.biz/i/currysprod/10242033?$g-small$&fmt=auto',
        'LOGITECH G715 Wireless Mechanical Gaming Keyboard - White', 1000),
       (19, 5, 199.00, 4, 19,
        'The G PRO X was designed in collaboration with Esports pros, to help you show off your gaming skills. ',
        'https://media.currys.biz/i/currysprod/M10254616_black?$g-small$&fmt=auto',
        'LOGITECH G Pro X TKL LIGHTSPEED Wireless Gaming Keyboard - Black', 1000),
       (20, 4.9, 199.00, 4, 20,
        'The LIGHTSPEED wireless is so responsive you won''t even notice you''re not plugged in with a wire',
        'https://media.currys.biz/i/currysprod/M10254616_white?$g-small$&fmt=auto',
        'LOGITECH G Pro X TKL LIGHTSPEED Wireless Gaming Keyboard - White', 1000),
       (21, 4.7, 159.00, 4,
        21,
        'Razer Purple switches feel lighter than traditional mechanical switches but still deliver that satisfying clicky keystroke sound',
        'https://media.currys.biz/i/currysprod/10232246?$g-small$&fmt=auto',
        'RAZER Huntsman V2 Mechanical Gaming Keyboard - Purple Switches', 1000),
       (22, 4.7, 149.00, 4, 22,
        'Its multi-function digital dial and 4 media keys put control at your fingertips',
        'https://media.currys.biz/i/currysprod/10252844?$g-small$&fmt=auto',
        'RAZER Huntsman V2 RGB Mechanical Gaming Keyboard - Clicky Purple Switches', 1000);

INSERT INTO electron_ecommerce.product_configuration (electron_ecommerce.product_configuration.product_item_id,
                                                      electron_ecommerce.product_configuration.variation_option_id)
VALUES (18, 38),
       (18, 41),
       (18, 46),

       (19, 38),
       (19, 41),
       (19, 46),

       (20, 38),
       (20, 41),
       (20, 46),

       (21, 40),
       (21, 42),
       (21, 43),

       (22, 40),
       (22, 42),
       (22, 43);

