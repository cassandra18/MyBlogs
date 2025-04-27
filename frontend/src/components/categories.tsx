import React from 'react';

interface CategoriesProps {
  onSelectCategory: (category: string) => void;
  selectedCategory: string | null;
  activeCategory: string | null;
  categories: string[]; // <-- Now categories come from props
}

const Categories: React.FC<CategoriesProps> = ({ onSelectCategory, activeCategory, categories }) => {
  return (
    <div className="md:space-x-7 border-b-2 px-2 flex flex-wrap items-center xs:my-8 mb-4 pt-16 sm:pt-8 pb-5 text-gray-900 font-semibold justify-center">
      {/* "All" button */}
      <button
        onClick={() => onSelectCategory("")}
        className={`lg:ml-12 ${activeCategory ? "" : "activebtn"} pr-2`}
      >
        All
      </button>

      {/* Dynamic categories */}
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onSelectCategory(category)}
          className={`mr-2 ${activeCategory === category ? "activebtn" : ""}`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default Categories;
