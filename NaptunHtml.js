const axios=require("axios")
const cheerio=require("cheerio")
const puppeteer=require("puppeteer");
const categorySearch={
    "laptops":"prenosni_kompjuteri",
    "monitors":"monitori1",
    "keyboards":"TASTATURI",
    "mice":"GLUVCINA"
}

async function scrapeNeptun(category) {
    const scrapedProducts=[]

    const browser=await puppeteer.launch({
        headless:true
    })

    const page=await browser.newPage();
    for(let pageN=1;pageN<=10;pageN++) {
        const url=`https://www.neptun.mk/${categorySearch[category]}.nspx?page=${pageN}&priceRange=0_500000`;
            await page.goto(url,
            {
                waitUntil: "networkidle2",
            }
            );

        await page.waitForSelector("#angularApp");

        // const html=await page.content();
        const data = await page.$eval("#angularApp", el =>
            el.getAttribute("data-categorydetails")
        );
        if(!data){
            break;
        }
        const parsedData = JSON.parse(data);
        const products = parsedData.Products;
       // console.log("Neptun products",products);
       //  console.log("Imag:", products[0].Images)

        if(products.length==0){
            break;
        }
        products.forEach(product => {
            let name = product.Title;
            let priceP = Number(product.RegularPrice);
            //let url=product.URL;
            let brandP = product.Manufacturer.Name;
            let external_id=product.Id;
            let inStock=product.Active;
            let quantity=product.Quantity;
            let image_url="https://www.neptun.mk/"+product.Thumbnail;

                scrapedProducts.push({
                    store: "Neptun",
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
    }


    await browser.close();
    return scrapedProducts;
}
module.exports=scrapeNeptun;
