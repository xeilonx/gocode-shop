import { useEffect, useState } from "react";
import { useParams } from "react-router";

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  useEffect(() => {
    fetch(`/api/products/${id}`)
      .then((res) => res.json())
      .then((product) => setProduct(product));
  }, [id]);
  console.log(id);
  return <div>Product Details: {product && product.title} </div>;
}

export default ProductDetails;
