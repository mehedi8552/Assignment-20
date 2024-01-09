const mongoose = require("mongoose");

const DataSchema = mongoose.Schema(
  {
    product: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    date: { type: Date, default: new Date() },
  },
  { versionKey: false }
);

const SalesModel = mongoose.model("sales", DataSchema);

module.exports = SalesModel;











// const mongoose = require('mongoose');

// const DataScema = mongoose.Schema(
//     {
//         "product":{String},
//         "quantity":{Number},
//         "price":{Number},
//         date: Date,
//       })
// const SalseModel = mongoose.model('sales',DataScema);
// module.exports = SalseModel;