const { response } = require('express');
const express=require('express')
const request=require('request-promise')

const app=express();

const PORT=process.env.PORT || 4000;

// const generateScraperUrl(api_key)=`http://api.scraperapi.com?api_key=${api_key}&autoparse=true`;

// const baseUrl =`http://api.scraperapi.com?api_key=${apiKey}&autoparse=true`;



const generateScraperUrl=(apiKey)=>`http://api.scraperapi.com?api_key=${apiKey}&autoparse=true`;


app.use(express.json());

app.get('/',(req,res)=>
{
    res.send('Welcome to Amazon Scrapper Api');
})



// Get Product Details
app.get('/products/:productId',async(req,res)=>{
    const {productId}=req.params;
    const {api_key}=req.query;
    console.log(api_key);
    console.log(productId);

    try{
        const response=await request(`${generateScraperUrl(api_key)}&url=http://www.amazon.com/dp/${productId}`);
        console.log(response)
        res.json(JSON.parse(response));
    }
    catch(error)
    {
        res.json(error);
    }
});

//Get Product Reviews
app.get('/products/:productId/reviews',async(req,res)=>{
    const {productId}=req.params;
    const {api_key}=req.query;
    console.log(api_key);
    console.log(productId);
    try{
        const response=await request
        (`${generateScraperUrl(api_key)}&url=http://www.amazon.com/product-reviews/${productId}`);
        res.json(JSON.parse(response));
    }
    catch(error)
    {
        res.json(error);
    }
});


//Get Product Offers Pendingg
app.get('/products/:productId/offers',async(req,res)=>{
    const {productId}=req.params;
    const {api_key}=req.query;


    console.log(productId);
    try{
        const response=await request
        (`${generateScraperUrl(api_key)}&url=http://www.amazon.com/offer-listing/product/${productId}`);
        res.json(JSON.parse(response));
    }
    catch(error)
    {
        res.json(error);
    }
});


// Search Product
app.get('/search/:searchQuery',async(req,res)=>{
    const {query}=req.params;
    const {api_key}=req.query;
    try{
        const response=await request
        (`${generateScraperUrl(api_key)}&url=http://www.amazon.com/s?k=${query}`);
        res.json(JSON.parse(response));
    }
    catch(error)
    {
        res.json(error);
    }
});




app.listen(PORT,()=>console.log(`Server Running on port ${PORT}`));
