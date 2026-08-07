const axios = require("axios");
const https = require("https");

const httpsAgent = new https.Agent({
    rejectUnauthorized: false
});
const cat={
    "keyboards":"pcat_01K4B52NV9SHVEJ8BB49CH1MM7",
    "laptops":"pcat_01JFZ1W5Q38VHNF746YGVYZ0PM",
    "mice":"pcat_01K4B52NQYW260GV5QYVHJEWN3",
    "monitors":"pcat_01K5H73MS2D2Q48XCY7C5ZTA4Q"
}

async function scrapeSetec(category) {
    const products=[]
    const response = await axios.post(
        "https://search.sp.solslab.dev/indexes/products/search",
        {
            q: "",
            limit: 300,
            offset: 0,
            filter: `product_categories.id = '${cat[category]}' AND variants.calculated_price.calculated_amount >= 0 AND variants.calculated_price.calculated_amount <= 500000 AND status = 'published' AND is_web_active = 'true'`,
            sort: ["variants.calculated_price.calculated_amount:asc"],
            matchingStrategy: "all",
            facets: ["brand_name"]
        },

        {
            httpsAgent,

            headers: {
                accept: "*/*",
                "accept-language":"en-GB,en;q=0.9,mk-GB;q=0.8,mk;q=0.7",
                authorization: "Bearer c0424dab588b8cbbbe0a4809fc10b5f1c0c7d183b5b28ebe799f3fbf583ab358",
                "content-type": "application/json",
                origin: "https://setec.mk",
                referer: "https://setec.mk/",
                "user-agent":
                    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/141.0.0.0 Safari/537.36"
            }
        }
    );
    const Scrapedproducts=response.data.hits;
    // console.log("Setec products",Scrapedproducts)
    // console.log(Scrapedproducts.title,Scrapedproducts.variants[0].calculated_price.calculated_amount,Scrapedproducts.attributes);
    Scrapedproducts.forEach(product=>{
        let name=product.title;
        let brandP=product.brand_name;
        let priceP=product.variants[0].calculated_price.calculated_amount;
        let external_id=product.external_id;
        let image_url=encodeURI(product.thumbnail);
        let inStock=product.is_web_active;
        let quantity=product.total_web_quantity;

            products.push({
                store: "Setec",
                external_id:external_id,
                name: name,
                inStock: inStock,
                category:category,
                price: Number(priceP),
                brand: brandP,
                quantity: quantity,
                img_url:image_url
            });

    })
    return products;
}

module.exports=scrapeSetec;