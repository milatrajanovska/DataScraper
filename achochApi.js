const axios=require("axios");
const categorySearch={
    "laptops":"site-laptopi",
    "monitors":"monitori",
    "keyboards":"tastaturi",
    "mice":"gluvchinja"

}
const brands = [
    "HP",
    "Dell",
    "Lenovo",
    "Asus",
    "Acer",
    "MSI",
    "Apple",
    "Gigabyte",
    "Samsung"
];

async function scrapeAnhoch(category){
    let page=1;
    let searchDone=false;
    const scrapedProducts=[];
    let cat=await categorySearch[category];
    if(cat=="tastaturi" || cat=="gluvchinja"){
        while(!searchDone) {
            let tempScrapedProducts=[];
            const url1 = `https://www.anhoch.com/products?query=&categories[0]=zhichani-${cat}&tag=&fromPrice=0&toPrice=500000&inStockOnly=2&sort=latest&perPage=30&page=${page}`
            const response = await axios.get(url1);
            const products = response.data.products.data;
           // console.log("Anhoch products",products);

            for (const product of products) {
                const priceItem = product.price.amount;
                const name = product.name;
                const inStock = product.in_stock;
                const external_id=product.id;
                const img_url=product.base_image.path;
                const quantity=product.qty;
                let brandP=""
                for(const brand of brands){
                    if(name.toLowerCase().includes(brand.toLowerCase())){
                        brandP=brand;
                        break;
                    }
                }
                tempScrapedProducts.push({
                        store: "Anhoch",
                        external_id: external_id,
                        name: name,
                        inStock: inStock,
                        category:category,
                        price: Number(priceItem),
                        brand: brandP,
                        quantity: Number(quantity),
                        img_url:img_url
                    });


            }


            const url2 = `https://www.anhoch.com/products?query=&categories[0]=bezhichni-${cat}&tag=&fromPrice=0&toPrice=500000&inStockOnly=2&sort=latest&perPage=30&page=${page}`
            const response2 = await axios.get(url2);
            const products2 = response2.data.products.data;
           // console.log("Anhoch products",products2);


            for (const product of products2) {
                const priceItem = product.price.amount;
                const name = product.name;
                const inStock = product.in_stock;
                const external_id=product.id;
                const img_url=product.base_image.path;
                const quantity=product.qty;
                let brandP=""
                for(const brand of brands){
                    if(name.toLowerCase().includes(brand.toLowerCase())){
                        brandP=brand;
                        break;
                    }
                }
                tempScrapedProducts.push({
                    store: "Anhoch",
                    external_id: external_id,
                    name: name,
                    inStock: inStock,
                    category:category,
                    price: Number(priceItem),
                    brand: brandP,
                    quantity: Number(quantity),
                    img_url:img_url
                });

            }
            if(tempScrapedProducts.length <=0){
                searchDone = true;
            }else {
                page++;
                scrapedProducts.push(...tempScrapedProducts);
            }
        }

    }else {
        while(!searchDone) {
            let tempScrapedProducts=[]
            const url = `https://www.anhoch.com/products?query=&categories[0]=${cat}&tag=&fromPrice=0&toPrice=500000&inStockOnly=2&sort=latest&perPage=30&page=${page}`
            const response = await axios.get(url);
            const products = response.data.products.data;
          //  console.log("Anhoch products",products);

            for (const product of products) {
                const priceItem = product.price.amount;
                const name = product.name;
                const inStock = product.in_stock;
                const external_id=product.id;
                const img_url=product.base_image.path;
                const quantity=product.qty;
                let brandP=""
                for(const brand of brands){
                    if(name.toLowerCase().includes(brand.toLowerCase())){
                        brandP=brand;
                        break;
                    }
                }
                tempScrapedProducts.push({
                    store: "Anhoch",
                    external_id: external_id,
                    name: name,
                    inStock: inStock,
                    category:category,
                    price: Number(priceItem),
                    brand: brandP,
                    quantity: Number(quantity),
                    img_url:img_url
                });

            }
            if(tempScrapedProducts.length <=0){
                searchDone = true;
            }else {
                page++;
                scrapedProducts.push(...tempScrapedProducts);
            }
        }
    }
    return scrapedProducts;

}
module.exports=scrapeAnhoch;
