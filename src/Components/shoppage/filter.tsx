import React from "react";

interface FiltersProps {
  categories: string[];
  subCategories: string[];
  colors: string[];
  categoryFilter: string;
  setCategoryFilter: React.Dispatch<React.SetStateAction<string>>;
  subCategoryFilter: string;
  setSubCategoryFilter: React.Dispatch<React.SetStateAction<string>>;
  colorFilter: string;
  setColorFilter: React.Dispatch<React.SetStateAction<string>>;
  filteredProductsLength: number;
  productItemsLength: number;
}

const Filters: React.FC<FiltersProps> = ({
  categories,
  subCategories,
  colors,
  categoryFilter,
  setCategoryFilter,
  subCategoryFilter,
  setSubCategoryFilter,
  colorFilter,
  setColorFilter,
  filteredProductsLength,
  productItemsLength,
}) => {
  return (
    <div className="w-full bg-[#FAF4F4] mt-8 p-4">
      <div className="flex flex-wrap items-center justify-between gap-4 lg:gap-8">
        <div className="flex flex-wrap items-center gap-4">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="p-2 border rounded"
          >
            <option value="">All Categories</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
          <select
            value={subCategoryFilter}
            onChange={(e) => setSubCategoryFilter(e.target.value)}
            className="p-2 border rounded"
          >
            <option value="">All Subcategories</option>
            {subCategories.map((subCategory, index) => (
              <option key={index} value={subCategory}>
                {subCategory}
              </option>
            ))}
          </select>
          <select
            value={colorFilter}
            onChange={(e) => setColorFilter(e.target.value)}
            className="p-2 border rounded"
          >
            <option value="">All Colors</option>
            {colors.map((color, index) => (
              <option key={index} value={color}>
                {color}
              </option>
            ))}
          </select>
        </div>
        <p className="text-sm md:text-base font-medium">
          Showing {filteredProductsLength} of {productItemsLength} results
        </p>
      </div>
    </div>
  );
};

export default Filters;

// import React from "react";
// import { IoFilter } from "react-icons/io5";
// import { BiGridSmall } from "react-icons/bi";
// import { BsViewList } from "react-icons/bs";

// interface FiltersProps {
//   categories: string[];
//   subCategories: string[];
//   colors: string[];
//   categoryFilter: string;
//   setCategoryFilter: React.Dispatch<React.SetStateAction<string>>;
//   subCategoryFilter: string;
//   setSubCategoryFilter: React.Dispatch<React.SetStateAction<string>>;
//   colorFilter: string;
//   setColorFilter: React.Dispatch<React.SetStateAction<string>>;
//   filteredProductsLength: number;
//   productItemsLength: number;
// }

// const Filters: React.FC<FiltersProps> = ({
//   categories,
//   subCategories,
//   colors,
//   categoryFilter,
//   setCategoryFilter,
//   subCategoryFilter,
//   setSubCategoryFilter,
//   colorFilter,
//   setColorFilter,
//   filteredProductsLength,
//   productItemsLength,
// }) => {
//   return (
//     <div className="w-full bg-[#FAF4F4] mt-8 p-4">
//       <div className="flex flex-wrap items-center justify-between gap-4 lg:gap-8">
//         <div className="flex flex-wrap items-center gap-4">
//           <select
//             value={categoryFilter}
//             onChange={(e) => setCategoryFilter(e.target.value)}
//             className="p-2 border rounded"
//           >
//             <option value="">All Categories</option>
//             {categories.map((category, index) => (
//               <option key={index} value={category}>
//                 {category}
//               </option>
//             ))}
//           </select>
//           <select
//             value={subCategoryFilter}
//             onChange={(e) => setSubCategoryFilter(e.target.value)}
//             className="p-2 border rounded"
//           >
//             <option value="">All Subcategories</option>
//             {subCategories.map((subCategory, index) => (
//               <option key={index} value={subCategory}>
//                 {subCategory}
//               </option>
//             ))}
//           </select>
//           <select
//             value={colorFilter}
//             onChange={(e) => setColorFilter(e.target.value)}
//             className="p-2 border rounded"
//           >
//             <option value="">All Colors</option>
//             {colors.map((color, index) => (
//               <option key={index} value={color}>
//                 {color}
//               </option>
//             ))}
//           </select>
//         </div>
//         <p className="text-sm md:text-base font-medium">
//           Showing {filteredProductsLength} of {productItemsLength} results
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Filters;
