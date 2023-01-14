/* 
    /categories
    /categories/2

    [
        {
            categoryId: 1,
            categoryName: 'electronics',
            subCategories: [
                {
                    subCategoryId: 1,
                    subCategoryName: 'smart phones'
                },
                {
                    subCategoryId: 2,
                    subCategoryName: 'televisions'
                },
                {
                    subCategoryId: 3,
                    subCategoryName: 'laptops'
                }
            ]
        },
        {
            categoryId: 2,
            categoryName: 'clothes',
            subCategories: [
                {
                    subCategoryId: 4,
                    subCategoryName: 'boots'
                },
                {
                    subCategoryId: 5,
                    subCategoryName: 'shirts'
                }
            ]
        }

    ]


    /subcategories
    /subcategories/1

    [
        {
            subCategoryId: 1,
            subCategoryName: 'smart phones',
            products: [
                {
                    product_id: 1, 
                    model: 'redmi',   
                    productName: 'redmi note 6 pro', 
                    color: 'black', 
                    price: '140'
                },
                { 
                    product_id: 2, 
                    model: 'samsung', 
                    product_name:     /subcategories/3

                { 
                    product_id: 7,
                    model: 'nokia',
                    product_name: '1202 ',
                    color: 'red',
                    price: '20' 
                }
                
            ]
        },
        {
            subCategoryId: 2,
            subCategoryName: 'laptops',
            products: [
                {
                    product_id: 4, 
                    model: 'hp',   
                    productName: 'hp ', 
                    color: 'black', 
                    price: '140'
                },
                { 
                    product_id: 8, 
                    model: 'acer', 
                    product_name: 'acer', 
                    color: 'red', 
                    price: '190' 
                }
                
            ]
        }
    ]


    /products --> []


    /products?categoryId=1
    /products?subCategoryId=1
    /products?subCategoryId=1&model=samsung
    /products?model=samsung
    /products/1



    POST
    /categories/2
        categoryName
    
    POST
    /subcategories/2
        categoryId, subCategoryName
    
    POST
    /products/2
        subCategoryId, productName, price, color, model


    PUT
    /categories/id
        categoryName
    
    PUT
    /subcategories/id
        categoryId, subCategoryName
    
    PUT
    /products/id
        subCategoryId, productName, price, color, model
*/

// github      --> link
// file zip    -->

// 28.11.2022 //  22:00
