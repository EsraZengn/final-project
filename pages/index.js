import axios from 'axios';
import ProductFilter from '../components/Index/ProductFilter';
import ProductList from '../components/Index/ProductList';
import ProductPagination from '../components/Index/ProductPagination';
import baseUrl from '../utils/baseUrl';

function Home({ products, totalPages }) {
  return (
    <>
      <ProductFilter products={products} />
      <ProductList products={products} />;
      <ProductPagination totalPages={totalPages} />
    </>
  );
}

Home.getInitialProps = async ctx => {
  const page = ctx.query.page ? ctx.query.page : '1';
  const size = '9';
  const url = `${baseUrl}/api/products`;
  const payload = { params: { page, size } };
  const response = await axios.get(url, payload);
  return response.data;
};

export default Home;
