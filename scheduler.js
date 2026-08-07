const cron=require("node-cron");

const scrapeNeptun=require('./NaptunHtml.js')
const scrapeSetec=require('./SetecApi.js')
const scrapeAnhoch=require('./achochApi.js')
const saveProducts=require('./SaveProducts.js')

const categories=[
    "laptops",
    "monitors",
    "keyboards",
    "mice"
]

cron.schedule('* * * * *',async()=>{
    console.log("CRON STARTED")
    const setecProducts=[]
    const neptunProducts = [];
    const anhochProducts = [];
    for (const cat of categories){

        console.log("Category:", cat);

        const [neptun,setec,anhoch]=await Promise.all([
               scrapeNeptun(cat),
               scrapeSetec(cat),
               scrapeAnhoch(cat)
        ]);

        console.log(
            "Products returned:",
            neptun.length,
            setec.length,
            anhoch.length
        );
       setecProducts.push(...setec);
       neptunProducts.push(...neptun);
       anhochProducts.push(...anhoch);

    }
    await saveProducts(neptunProducts,"Neptun");
    await saveProducts(setecProducts,"Setec");
    await saveProducts(anhochProducts,"Anhoch");
})