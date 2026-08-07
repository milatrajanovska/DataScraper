const ExcelJS=require("exceljs");
const store_ids={
    1:"Setec",
    2:"Neptun",
    3:"Anhoch"
}
async function createExcelTable(products){
    const workbook = new ExcelJS.Workbook();
    const sheet=workbook.addWorksheet("Products");

    sheet.columns=[
        {
            header:"Name",
            key: "name",
            width: 100,
        },
        {
            header:"Brand",
            key: "brand",
            width: 50,
        },
        {
            header:"Price",
            key: "price",
            width: 20,
        },
        {
            header:"Quantity",
            key:"quantity",
            width: 20,
        },
        {
            header:"Store",
            key: "store",
            width: 100,
        }
    ]

    products.forEach(product=>{
        sheet.addRow({
            name: product.title,
            brand: product.brand,
            price: product.price,
            quantity: product.quantity,
            store: store_ids[product.store_id]
        })
    })

    const fileName="products.xlsx";
    await workbook.xlsx.writeFile(fileName);

    return fileName;
}
module.exports = createExcelTable;