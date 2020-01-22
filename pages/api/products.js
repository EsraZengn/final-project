//import products from '../../static/products.json';
import Product from '../../models/Product';
import connectDb from '../../utils/connectDb';

connectDb();

export default async (req, res) => {
  try {
    await connectDb();
  } catch (error) {
    return res.status(403).send('Database connection error');
  }
  try {
    const { page, size } = req.query;
    const pageNum = Number(page);
    const pageSize = Number(size);
    let products = [];
    const totalDocs = await Product.countDocuments();
    const totalPages = Math.ceil(totalDocs / pageSize);

    if (pageNum === 1) {
      products = await Product.find()
        .sort({ name: 'asc' })
        .limit(pageSize);
    } else {
      const skips = pageSize * (pageNum - 1);
      products = await Product.find()
        .sort({ name: 'asc' })
        .skip(skips)
        .limit(pageSize);
    }

    res.status(200).json({ products, totalPages });
  } catch (error) {
    res.status(500).send('Error displaying products home page');
  }
};
