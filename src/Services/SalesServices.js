const Sales = require('../Model/SelesModel')


const total_revenueServices = async (req)=>{
  try{
        let pipeline = [
            {
              $group: {
                _id: null,
                totalRevenue: { $sum: { $multiply: ['$quantity', '$price'] } },
              },
            },
          ];
      
          // Execute the aggregation
          let result = await Sales.aggregate(pipeline);
      
          // Extract the total revenue from the result
          let totalRevenue = result.length > 0 ? result[0].totalRevenue : 0;
          console.log(totalRevenue)
          //res.json({ totalRevenue });


          return {status:'success',data:totalRevenue};

        }
        catch(e){
        return {status:'Failed',data:e.toString()}
    }
}

const quantity_by_productService = async (req)=>{
  try{
    const pipeline = [
      {
        $group: {
          _id: '$product',
          totalQuantity: { $sum: '$quantity' },
        },
      },
    ];

    let result = await Sales.aggregate(pipeline);
    // let result = 300*3020
    console.log(result)
    
    return {status:'success',data:result};
  }
  catch(e){
    return {status:'Failed',data:e.toString()}
  }
}

const top_productsService = async (req)=>{
  try{
    const pipeline = [
      {
        $group: {
          _id: '$product',
          totalRevenue: { $sum: { $multiply: ['$quantity', '$price'] } },
        },
      },
      {
        $sort: { totalRevenue: -1 },
      },
      {
        $limit: 5,
      },
    ];

    let result = await Sales.aggregate(pipeline);

    console.log(result)

    return {status:"success",data:result}
  }
  catch(e){
    return {status:"Faild",data:e.toString()}
  }
}

const average_priceService = async (req)=>{
  try{

    const revenueByMonth = await Sales.aggregate([
      {
        $group: {
          _id: { year: { $year: "$date" }, month: { $month: "$date" } },
          totalRevenue: { $sum: { $multiply: ["$quantity", "$price"] } },
        },
      },
    ]);

    return {status:"success",data:revenueByMonth}
  }
  catch(e){
    return {status:"Faild",data:e.toString()}
  }
}
const revenue_by_monthService = async (req,res)=>{
  try{
      const revenueByMonth = await Sales.aggregate([
        {
          $group: {
            _id: { year: { $year: "$date" }, month: { $month: "$date" } },
            totalRevenue: { $sum: { $multiply: ["$quantity", "$price"] } },
          },
        },
      ]);
      console.log(revenueByMonth)
      return {status:"success",data:revenueByMonth}
      
    } catch (err) {
      return {status:"Faild",data:err.toString()}
    }
}


const highest_quantity_soldService = async (req,res)=>{
  try{
    const pipeline = [
      {
        $group: {
          _id: {
            product: '$product',
            date: '$date',
          },
          totalQuantity: { $sum: '$quantity' },
        },
      },
      {
        $sort: { totalQuantity: -1 },
      },
      {
        $limit: 1,
      },
      {
        $project: {
          _id: 0,
          product: '$_id.product',
          totalQuantity: 1,
        },
      },
    ];
    const result = await Sales.aggregate(pipeline);
      return {status:"success",data:result}
      
    } catch (err) {
      
      return {status:"Faild",data:err.toString()}
    }
}


module.exports = {
    total_revenueServices ,
    quantity_by_productService,
    top_productsService,
    average_priceService,
    revenue_by_monthService,
    highest_quantity_soldService
}