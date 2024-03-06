# INSERT INTO electron_ecommerce.products_details (products_details.id,
#                                                  electron_ecommerce.products_details.product_information,
#                                                  electron_ecommerce.products_details.sku,
#                                                  electron_ecommerce.products_details.visits)
# VALUES (9,
#         'he new king of 1440p gaming is here. The RTX 4070 Ti SUPER is built on the Ada Lovelace architecture and it packs more power than the 3070 Ti',
#         'GGFRX4070TS168', 492),
#        (10, 'There are dedicated cores just for Ray Tracing, making sure your graphics are super realistic.',
#         'GGFRX47TS1611', 310),
#        (11,
#         'Got to get some work done? You''ll breeze through demanding 3D renders faster than ever before, with NVIDIA Studio for fine-tuning.',
#         'GARX47TS1611', 250),
#        (12,
#         'There''s enough power to stream pretty much anything in high resolution and framerates. And the AI helps by enhancing your voice and video to professional levels.',
#         'GGFRX47TS1612', '310');
#
# INSERT INTO electron_ecommerce.products_images (electron_ecommerce.products_images.product_details_id,
#                                                 electron_ecommerce.products_images.image_url)
# VALUES (9, 'https://media.currys.biz/i/currysprod/10260360?$l-large$&fmt=auto'),
#        (9, 'https://media.currys.biz/i/currysprod/10260360_001?$l-large$&fmt=auto'),
#        (10, 'https://media.currys.biz/i/currysprod/10260357?$l-large$&fmt=auto'),
#        (10, 'https://media.currys.biz/i/currysprod/10260357_001?$l-large$&fmt=auto'),
#        (10, 'https://media.currys.biz/i/currysprod/10260357_002?$l-large$&fmt=auto'),
#        (10, 'https://media.currys.biz/i/currysprod/10260357_003?$l-large$&fmt=auto'),
#        (10, 'https://media.currys.biz/i/currysprod/10260357_004?$l-large$&fmt=auto'),
#        (11, 'https://media.currys.biz/i/currysprod/10260356?$l-large$&fmt=auto'),
#        (11, 'https://media.currys.biz/i/currysprod/10260356_001?$l-large$&fmt=auto'),
#        (11, 'https://media.currys.biz/i/currysprod/10260356_002?$l-large$&fmt=auto'),
#        (11, 'https://media.currys.biz/i/currysprod/10260356_003?$l-large$&fmt=auto'),
#        (11, 'https://media.currys.biz/i/currysprod/10260356_004?$l-large$&fmt=auto'),
#        (12, 'https://media.currys.biz/i/currysprod/10260359?$l-large$&fmt=auto'),
#        (12, 'https://media.currys.biz/i/currysprod/10260359_001?$l-large$&fmt=auto');
#
#
#
# INSERT INTO electron_ecommerce.product_item (electron_ecommerce.product_item.id,
#                                              electron_ecommerce.product_item.current_rate,
#                                              electron_ecommerce.product_item.price,
#                                              electron_ecommerce.product_item.category_id,
#                                              electron_ecommerce.product_item.product_details_id,
#                                              electron_ecommerce.product_item.description,
#                                              electron_ecommerce.product_item.img_url,
#                                              electron_ecommerce.product_item.name,
#                                              electron_ecommerce.product_item.stock_quantity)
# VALUES (9, 4.8, 799.00, 2, 9,
#         'The new king of 1440p gaming is here. The RTX 4070 Ti SUPER is built on the Ada Lovelace architecture and it packs more power than the 3070 Ti',
#         'https://media.currys.biz/i/currysprod/10260360?$g-small$&fmt=auto',
#         'GIGABYTE GeForce RTX 4070 Ti SUPER 16 GB WINDFORCE OC Graphics Card',
#         100),
#     (10, 5, 849.00, 2, 10,
#      'Got to get some work done? You''ll breeze through demanding 3D renders faster than ever before',
#      'https://media.currys.biz/i/currysprod/10260357?$g-small$&fmt=auto', 'GIGABYTE GeForce RTX 4070 Ti SUPER 16 GB AERO OC Graphics Card',
#      100),
#     (11, 4.5, 879.00, 2,
#      11,'The DLSS 3 means next generation AI enhancing the performance to new heights.',
#      'https://media.currys.biz/i/currysprod/10260356?$g-small$&fmt=auto', 'GIGABYTE AORUS GeForce RTX 4070 Ti SUPER 16 GB MASTER Graphics Card',
#      100),
#     (12, 4.3,879.00, 2,
#      '12', 'The WINDFORCE cooling system has an air passthrough screen, three fans and a whole lot of heatsinks to keep temperature in check',
#      'https://media.currys.biz/i/currysprod/10260359?$g-small$&fmt=auto', 'GIGABYTE GeForce RTX 4070 Ti SUPER 16 GB EAGLE OC Graphics Card',
#      100);
#
#
# INSERT INTO electron_ecommerce.product_configuration (electron_ecommerce.product_configuration.product_item_id,
#                                                       electron_ecommerce.product_configuration.variation_option_id)
# VALUES (9, 10),
#        (9, 14),
#        (9, 17),
#        (9, 20),
#
#        (10, 10),
#        (10, 14),
#        (10, 17),
#        (10, 20),
#
#        (11, 10),
#        (11, 14),
#        (11, 17),
#        (11, 20),
#
#        (12, 10),
#        (12, 14),
#        (12, 17),
#        (12, 20);
#
#
