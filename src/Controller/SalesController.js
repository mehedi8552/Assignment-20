
const{
    total_revenueServices ,
    quantity_by_productService,
    top_productsService,
    average_priceService,
    revenue_by_monthService,
    highest_quantity_soldService
} = require('../Services/SalesServices')


//const Sales = require('../Model/SelesModel')

exports.total_revenue = async (req,res)=>{
    let result = await total_revenueServices();
    return res.status(200).json(result)
}

exports.quantity_by_product = async (req,res)=>{
    let result =await quantity_by_productService();
    return res.status(200).json(result)
}

exports.top_products =async (req,res)=>{
    let result = await top_productsService();
    return res.status(200).json(result)
}

exports.average_price =async (req,res)=>{
    let result = await average_priceService();
    return res.status(200).json(result)
}

exports.revenue_by_month = async (req,res)=>{ //highest-quantity-sold
    let result = await revenue_by_monthService();
    return res.status(200).json(result)
}
exports.highest_quantity_sold = async (req,res)=>{
    let result = await highest_quantity_soldService();
    return res.status(200).json(result)
}
