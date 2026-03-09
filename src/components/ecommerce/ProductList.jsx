// src/components/ecommerce/ProductList.jsx
// Bootstrap responsive grid — 1 col mobile, 2 col md, 3 col lg, 4 col xl

import PropTypes from "prop-types";
import ProductCard from "./ProductCard";
import EmptyState  from "./EmptyState";

const ProductList = ({ products, cart, onAdd, onRemove, isLoggedIn, onClearFilters }) => {
  // Empty state — no products match search/filter
  if (products.length === 0) {
    return (
      <EmptyState
        emoji="🔍"
        title="No products found"
        subtitle="Try adjusting your search or filters to find what you are looking for."
        actionLabel="Clear Filters"
        onAction={onClearFilters}
      />
    );
  }

  return (
    // Short fragment — no wrapper div needed
    <>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-3">
        {/* .map() with product.id as key */}
        {products.map((product) => (
          <div className="col" key={product.id}>
            <ProductCard
              product={product}
              cartQty={cart[product.id] || 0}
              onAdd={onAdd}
              onRemove={onRemove}
              isLoggedIn={isLoggedIn}
            />
          </div>
        ))}
      </div>
    </>
  );
};

ProductList.propTypes = {
  products:       PropTypes.array.isRequired,
  cart:           PropTypes.object.isRequired,
  onAdd:          PropTypes.func.isRequired,
  onRemove:       PropTypes.func.isRequired,
  isLoggedIn:     PropTypes.bool.isRequired,
  onClearFilters: PropTypes.func.isRequired,
};

export default ProductList;
