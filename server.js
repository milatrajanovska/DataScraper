console.log('Happy developing ✨')
const express=require("express");
const cors=require("cors");
const controller=require("./controller");
const app=express();
const axios=require("axios");

app.use(express.json());
app.use(cors());
app.post('/search', controller.search);

app.get("/img-proxy",async (req,res)=>{

    try{
        const img_url=req.query.url;

        if(!img_url){
            return res.status(400).send("Missing URL");
        }
        console.log("Image requested",img_url)

        const response=await axios.get(img_url,{
            responseType:"arraybuffer",
            headers:{
                "User-Agent":"Mozilla/5.0"
            }
        });
        res.set("Content-Type",response.headers["content-type"]);
        res.set("Cache-Control","public, max-age=86400")
        res.send(response.data);
    }catch (error) {
        console.log(
            "IMAGE PROXY ERROR:",
            error.response?.status,
            error.message
        );

        res.status(500).send("Cannot load image");
    }
})
app.listen(3000,() => console.log('Listening on port 3000'));
