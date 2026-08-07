// const scrapeNeptun=require('./NaptunHtml.js')
// const scrapeSetec=require('./SetecApi.js')
// const scrapeAnhoch=require('./achochApi.js')
const createExcelFile=require('./excel.js')
const db=require('./db')
exports.search=async (req, res) => {
    try {
        console.log("Body",req.query);
        const category = req.body.category;
        const brand = req.body.brand;
        const output = req.body.selected;


        const price = req.body.price;
        console.log(category,brand,price,output);
        let products
        if (brand===""){
             [products]=await db.query(
                `SELECT * FROM products WHERE category=? AND price<=?`,
                [
                    category,
                    price
                ]
            )
        }else {
             [products] = await db.query(
                `SELECT *
                 FROM products
                 WHERE category = ?
                   AND brand = ?
                   AND price <= ?`,
                [
                    category,
                    brand,
                    price
                ]
            )
        }


        if(output=="web"){
            console.log("Products size", products.length)
            return res.json(products);
        }
        if(output=="excel"){
            const file=await createExcelFile(products);
            return res.download(file);
        }

    }catch(err){
        console.log(err);
        res.status(500).json({
            message: "Server Error",
        })
    }
}

