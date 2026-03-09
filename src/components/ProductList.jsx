// ProductList.jsx
// Maintains the products array and renders multiple ProductCard components
// Demonstrates component composition — parent passing data to children

import ProductCard from "./ProductCard";

// Product data array — stored in the parent (ProductList)
// Each object is passed as props to ProductCard
const products = [
  {
    id: 1,
    name: "boAt Rockerz 450",
    price: 1299,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop",
    rating: 4,
    inStock: true,
  },
  {
    id: 2,
    name: "Nike Air Max 270",
    price: 8995,
    category: "Footwear",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop",
    rating: 5,
    inStock: true,
  },
  {
    id: 3,
    name: "Leather Wallet",
    price: 599,
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=400&h=300&fit=crop",
    rating: 4,
    inStock: false,
  },
  {
    id: 4,
    name: "Mechanical Keyboard",
    price: 3499,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=300&fit=crop",
    rating: 5,
    inStock: true,
  },
  {
    id: 5,
    name: "Levi's Denim Jacket",
    price: 2999,
    category: "Clothing",
    image: "https://images.unsplash.com/photo-1551537482-f2075a1d41f2?w=400&h=300&fit=crop",
    rating: 4,
    inStock: true,
  },
  {
    id: 6,
    name: "Smart Watch Series 9",
    price: 12999,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop",
    rating: 5,
    inStock: false,
  },
];

const ProductList = () => {
  return (
    <section style={styles.section}>
      {/* Section Heading */}
      <h2 style={styles.heading}>🔥 Featured Products</h2>
      <p style={styles.subheading}>
        Showing {products.length} products · {products.filter(p => p.inStock).length} in stock
      </p>

      {/* Renders a ProductCard for each product in the array */}
      {/* Each product's data is spread as props into ProductCard */}
      <div style={styles.grid}>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            name={product.name}
            price={product.price}
            category={product.category}
            image={product.image}
            rating={product.rating}
            inStock={product.inStock}
          />
        ))}
      </div>
    </section>
  );
};

const styles = {
  section: {
    padding: "40px",
    background: "#f1f5f9",
    minHeight: "60vh",
  },
  heading: {
    fontSize: "28px",
    fontWeight: "800",
    color: "#1e293b",
    marginBottom: "6px",
  },
  subheading: {
    color: "#64748b",
    fontSize: "14px",
    marginBottom: "28px",
  },
  grid: {
    display: "flex",
    flexWrap: "wrap",
    gap: "24px",
  },
};

export default ProductList;
