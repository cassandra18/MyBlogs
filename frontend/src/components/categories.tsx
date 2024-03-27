import React from 'react';

interface CategoriesProps {
  onSelectCategory : (category: string) => void;
  selectedCategory: string | null;
  activeCategory: string | null;
}
const Categories: React.FC<CategoriesProps> = ({onSelectCategory, activeCategory}) => {


  const categories = ["Nails", "Mental Health", "Fashion", "Tech"]


return (
  <div className='md:space-x-16 border-b-2 px-4 flex flex-wrap items-center mb-8 py-5 text-gray-900 font-semibold'>
    
    <button onClick={ () => onSelectCategory("") }
    className={`lg:ml-12 ${activeCategory ? "" : "activebtn"}`}>All</button>
    
    {
      categories.map((category) => (
        <button
        onClick={() => onSelectCategory(category)}
        className={`mr-2 space-x-16 ${activeCategory === category ? "activebtn" : "" }`}
        key={category}> {category} </button>
      ))
    }
  </div>

)
};

export default Categories;