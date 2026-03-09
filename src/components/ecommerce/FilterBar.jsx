// src/components/ecommerce/FilterBar.jsx
// Bootstrap filter bar — category pills wrap naturally on mobile,
// sort dropdown sits below on small screens

import PropTypes from "prop-types";

const FilterBar = ({
  categories,
  activeCategory,
  onCategoryChange,
  sortBy,
  onSortChange,
  productCount,
}) => {
  return (
    <div
      className="bg-white border-bottom shadow-sm sticky-top"
      style={{ top: 84, zIndex: 90 }}
    >
      <div className="container-fluid px-3 px-md-4 py-2">
        <div className="d-flex flex-wrap align-items-center gap-2 justify-content-between">

          {/* Category pills — flex-wrap handles mobile overflow naturally */}
          <div className="d-flex flex-wrap gap-1" role="group" aria-label="Filter by category">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`btn btn-sm fw-bold rounded-pill ${
                  activeCategory === cat
                    ? "btn-primary"
                    : "btn-outline-secondary"
                }`}
                style={{ fontSize: 12 }}
                onClick={() => onCategoryChange(cat)}
                aria-pressed={activeCategory === cat}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Count + Sort — sits on its own line on very small screens */}
          <div className="d-flex align-items-center gap-2 flex-shrink-0">
            <small className="text-muted fw-semibold">
              {productCount} item{productCount !== 1 ? "s" : ""}
            </small>
            <select
              className="form-select form-select-sm"
              style={{ width: "auto", fontSize: 12 }}
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              aria-label="Sort products"
            >
              <option value="default">Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Top Rated</option>
              <option value="name">Name A-Z</option>
            </select>
          </div>

        </div>
      </div>
    </div>
  );
};

FilterBar.propTypes = {
  categories:       PropTypes.arrayOf(PropTypes.string).isRequired,
  activeCategory:   PropTypes.string.isRequired,
  onCategoryChange: PropTypes.func.isRequired,
  sortBy:           PropTypes.string.isRequired,
  onSortChange:     PropTypes.func.isRequired,
  productCount:     PropTypes.number.isRequired,
};

export default FilterBar;
