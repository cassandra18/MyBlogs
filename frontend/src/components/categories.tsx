import React from 'react';

interface CategoriesProps {
  onSelectCategory : (category: string) => void;
  selectedCategory: string | null;
  activeCategory: string | null;
}
const Categories: React.FC<CategoriesProps> = ({onSelectCategory, activeCategory}) => {


  const categories = ["Nails", "Mental Health", "Fashion", "Tech"]


return (
  <div className='md:space-x-16 border-b-2 px-4 flex flex-wrap items-center xs:my-8 mb-4 pt-16 sm:pt-8 pb-5 text-gray-900 font-semibold'>
    
    <button onClick={ () => onSelectCategory("") }
    className={`lg:ml-12  ${activeCategory ? "" : "activebtn"} pr-2`}>All</button>
    
    {
      categories.map((category) => (
        <button
        onClick={() => onSelectCategory(category)}
        className={`mr-2 ${activeCategory === category ? "activebtn" : "" }`}
        key={category}> {category} </button>
      ))
    }
  </div>

)
};

export default Categories;