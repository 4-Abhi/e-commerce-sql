Attribute → defines possible filter types.

CategoryAttribute → decides which filters are relevant for a given category.

ProductAttribute → stores actual filter values for each product.


In Clothing, you want filters for Color, Size, Brand.

In Electronics, you want filters for Brand, Material


Category Table
---------------
id | name
---+---------
1  | Clothing
2  | Electronics

CategoryAttribute Table
------------------------
id | categoryId | attributeId
---+------------+------------
1  | 1          | 1   (Clothing → Color)
2  | 1          | 2   (Clothing → Size)
3  | 1          | 3   (Clothing → Brand)
4  | 2          | 3   (Electronics → Brand)
5  | 2          | 4   (Electronics → Material)


Product Table
--------------
id | name
---+----------------
1  | Red T-Shirt
2  | Sony TV

ProductAttribute Table
----------------------
id | productId | attributeId | value
---+-----------+-------------+-------
1  | 1         | 1 (Color)   | Red
2  | 1         | 2 (Size)    | M
3  | 1         | 3 (Brand)   | Nike
4  | 2         | 3 (Brand)   | Sony
5  | 2         | 4 (Material)| Plastic
