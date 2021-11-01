import Product from "../Product/Product";
import "./Products.css";

function Products({ products }) {
  return (
    <section className="products">
      {products.map(
        ({
          id,
          title,
          price,
          description,
          category,
          image,
          rating,
          rate,
          count,
        }) => (
          <Product
            key={id}
            id={id}
            title={title}
            price={price}
            description={description}
            category={category}
            image={image}
            rating={rating}
            rate={rate}
            count={count}
          />
        )
      )}
    </section>
  );
}

export default Products;
