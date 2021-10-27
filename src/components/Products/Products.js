import Product from "../Product/Product";
import "./Products.css";

function Products({ products }) {
  return (
    <section className="products">
      {products.map(({ id, title, price, image }) => (
        <Product key={id} id={id} title={title} price={price} image={image} />
      ))}
    </section>
  );
}
export default Products;
