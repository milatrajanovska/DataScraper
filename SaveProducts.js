const db = require("./db");
const store_ids={
    "Setec":1,
    "Neptun":2,
    "Anhoch":3
}
async function saveProducts(products,storeId){
    console.log("Save products")
    await db.query(
        `UPDATE products
        SET active=false WHERE store_id=${store_ids[storeId]}`
    );

    let store_id=store_ids[storeId];

    for(const product of products){
        const   [ existing] = await db.query(
            `SELECT *
            FROM products
            WHERE store_id=?
            AND external_id=?`,
            [
                store_id,
                product.external_id
            ]
        );
        if(existing.length >0){
            await db.query(
                `UPDATE products SET price=?, active=true, brand=?,quantity=?,image=? WHERE store_id=? AND external_id=? ` ,
                [
                    product.price,
                    product.brand,
                    product.quantity,
                    product.img_url,
                    store_id,
                    product.external_id,
                ]
            );
        }else{
            await db.query(
                `INSERT INTO products 
                (
                 store_id,
                 external_id,
                 title,
                 active,
                 category,
                 price,
                 brand,
                 quantity,
                 image
                 
                ) VALUES(?,?,?,?,?,?,?,?,?)
                `,
                [
                    store_id,
                    product.external_id,
                    product.name,
                    true,
                    product.category,
                    product.price,
                    product.brand,
                    product.quantity,
                    product.img_url
                ]
            );
        }
    }
}
module.exports = saveProducts;