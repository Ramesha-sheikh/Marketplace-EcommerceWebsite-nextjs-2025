import { Rule } from '@sanity/types';  // Importing the correct type for Rule

export const productDetails = {
  name: 'productDetails',
  type: 'document',
  title: 'Product Details',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Product Title',
      description: 'The main title of the product (e.g., Asgaard Sofa)',
    },
    {
      name: 'price',
      type: 'string',
      title: 'Price',
      description: 'Price of the product (e.g., Rs. 250,000.00)',
    },
    {
      name: 'mainImage',
      type: 'image',
      title: 'Main Image',
      description: 'Main product image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'imageThumbnails',
      type: 'array',
      title: 'Image Thumbnails',
      description: 'Small thumbnail images for the product',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alt Text',
              description: 'Description of the image',
            },
          ],
        },
      ],
    },
    {
      name: 'rating',
      type: 'number',
      title: 'Product Rating',
      description: 'Rating of the product (out of 5)',
      validation: (Rule: Rule) => Rule.min(0).max(5),
    },
    {
      name: 'reviewCount',
      type: 'number',
      title: 'Customer Reviews Count',
      description: 'Number of reviews for the product',
    },
    {
      name: 'description',
      type: 'text',
      title: 'Product Description',
      description: 'Detailed description of the product',
    },
    {
      name: 'sizes',
      type: 'array',
      title: 'Available Sizes',
      description: 'Size options available for the product',
      of: [{ type: 'string' }],
    },
    {
      name: 'colors',
      type: 'array',
      title: 'Available Colors',
      description: 'Color options available for the product',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'name',
              type: 'string',
              title: 'Color Name',
            },
            {
              name: 'hex',
              type: 'string',
              title: 'Hex Code',
              description: 'Color code in hex format (e.g., #000000)',
            },
          ],
        },
      ],
    },
    {
      name: 'sku',
      type: 'string',
      title: 'SKU',
      description: 'Stock Keeping Unit for the product',
    },
    {
      name: 'category',
      type: 'string',
      title: 'Category',
      description: 'Category of the product (e.g., Sofas or Tables)',
      options: {
        list: [
          { title: 'Seatings', value: 'seatings' },
          { title: 'Tables', value: 'tables' },
          { title: 'Storages', value: 'storages' },
          { title: 'Home Decor', value: 'home_decor' },
          { title: 'Newly Launched', value: 'newly_launched' },
          { title: 'Bed Room', value: 'bed_room' },
          { title: 'Living Room', value: 'living_room' },
          { title: 'Dining Room', value: 'dining_room' },
          { title: 'Study Room', value: 'study_room' },
        ],
      },
    },
    {
      name: 'subCategory',
      type: 'string',
      title: 'Subcategory',
      description: 'Subcategory of the product (e.g., Sofas, Coffee Tables)',
      options: {
        list: [
          { title: 'study table', value: 'table and chair' },
          { title: 'table and chair', value: 'table and chair' },
          { title: 'Sofa', value: 'sofa' },
          { title: 'Chairs', value: 'chairs' },
          { title: 'Benches', value: 'benches' },
          { title: 'Lounge Chairs', value: 'lounge_chairs' },
          { title: 'Stools', value: 'stools' },
          { title: 'Dining Tables', value: 'dining_tables' },
          { title: 'Coffee Tables', value: 'coffee_tables' },
          { title: 'Side Tables', value: 'side_tables' },
          { title: 'Dressing Table', value: 'dressing_table' },
          { title: 'Nesting / End Tables', value: 'nesting_end_tables' },
          { title: 'Cabinets', value: 'cabinets' },
          { title: 'Media Units', value: 'media_units' },
          { title: 'Shelves', value: 'shelves' },
          { title: 'Shoe Racks', value: 'shoe_racks' },
          { title: 'Sideboards', value: 'sideboards' },
          { title: 'Planters', value: 'planters' },
          { title: 'Mirrors', value: 'mirrors' },
          { title: 'Accessories', value: 'accessories' },
          { title: 'Lights', value: 'lights' },
          { title: 'Gifting Combos', value: 'gifting_combos' },
        ],
      },
    },
    {
      name: 'tags',
      type: 'array',
      title: 'Tags',
      description: 'Tags related to the product',
      of: [{ type: 'string' }],
    },
    {
      name: 'socialMediaLinks',
      type: 'array',
      title: 'Social Media Links',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'platform',
              type: 'string',
              title: 'Platform Name',
            },
            {
              name: 'url',
              type: 'url',
              title: 'Platform URL',
            },
            {
              name: 'icon',
              type: 'image',
              title: 'Icon',
            },
          ],
        },
      ],
    },
  ],
};


// export const productDetails = {
//   name: 'productDetails',
//   type: 'document',
//   title: 'Product Details',
//   fields: [
//     {
//       name: 'title',
//       type: 'string',
//       title: 'Product Title',
//       description: 'The main title of the product (e.g., Asgaard Sofa)',
//     },
//     {
//       name: 'price',
//       type: 'string',
//       title: 'Price',
//       description: 'Price of the product (e.g., Rs. 250,000.00)',
//     },
//     {
//       name: 'mainImage',
//       type: 'image',
//       title: 'Main Image',
//       description: 'Main product image',
//       options: {
//         hotspot: true,
//       },
//     },
//     {
//       name: 'imageThumbnails',
//       type: 'array',
//       title: 'Image Thumbnails',
//       description: 'Small thumbnail images for the product',
//       of: [
//         {
//           type: 'image',
//           options: {
//             hotspot: true,
//           },
//           fields: [
//             {
//               name: 'alt',
//               type: 'string',
//               title: 'Alt Text',
//               description: 'Description of the image',
//             },
//           ],
//         },
//       ],
//     },
//     {
//       name: 'rating',
//       type: 'number',
//       title: 'Product Rating',
//       description: 'Rating of the product (out of 5)',
//       validation: (Rule:any) => Rule.min(0).max(5),
//     },
//     {
//       name: 'reviewCount',
//       type: 'number',
//       title: 'Customer Reviews Count',
//       description: 'Number of reviews for the product',
//     },
//     {
//       name: 'description',
//       type: 'text',
//       title: 'Product Description',
//       description: 'Detailed description of the product',
//     },
//     {
//       name: 'sizes',
//       type: 'array',
//       title: 'Available Sizes',
//       description: 'Size options available for the product',
//       of: [{ type: 'string' }],
//     },
//     {
//       name: 'colors',
//       type: 'array',
//       title: 'Available Colors',
//       description: 'Color options available for the product',
//       of: [
//         {
//           type: 'object',
//           fields: [
//             {
//               name: 'name',
//               type: 'string',
//               title: 'Color Name',
//             },
//             {
//               name: 'hex',
//               type: 'string',
//               title: 'Hex Code',
//               description: 'Color code in hex format (e.g., #000000)',
//             },
//           ],
//         },
//       ],
//     },
//     {
//       name: 'sku',
//       type: 'string',
//       title: 'SKU',
//       description: 'Stock Keeping Unit for the product',
//     },
//     {
//       name: 'category',
//       type: 'string',
//       title: 'Category',
//       description: 'Category of the product (e.g., Sofas or Tables)',
//       options: {
//         list: [
//           { title: 'Seatings', value: 'seatings' },
//           { title: 'Tables', value: 'tables' },
//           { title: 'Storages', value: 'storages' },
//           { title: 'Home Decor', value: 'home_decor' },
//           { title: 'Newly Launched', value: 'newly_launched' },
//           { title: 'Bed Room', value: 'bed_room' },
//           { title: 'Living Room', value: 'living_room' },
//           { title: 'Dining Room', value: 'dining_room' },
//           { title: 'Study Room', value: 'study_room' },
//         ],
//       },
//     },
//     {
//       name: 'subCategory',
//       type: 'string',
//       title: 'Subcategory',
//       description: 'Subcategory of the product (e.g., Sofas, Coffee Tables)',
//       options: {
//         list: [
//           { title: 'study table', value: 'table and chair' },

//           { title: 'table and chair', value: 'table and chair' },
//           { title: 'Sofa', value: 'sofa' },
//           { title: 'Chairs', value: 'chairs' },
//           { title: 'Benches', value: 'benches' },
//           { title: 'Lounge Chairs', value: 'lounge_chairs' },
//           { title: 'Stools', value: 'stools' },
//           { title: 'Dining Tables', value: 'dining_tables' },
//           { title: 'Coffee Tables', value: 'coffee_tables' },
//           { title: 'Side Tables', value: 'side_tables' },
//           { title: 'Dressing Table', value: 'dressing_table' },
//           { title: 'Nesting / End Tables', value: 'nesting_end_tables' },
//           { title: 'Cabinets', value: 'cabinets' },
//           { title: 'Media Units', value: 'media_units' },
//           { title: 'Shelves', value: 'shelves' },
//           { title: 'Shoe Racks', value: 'shoe_racks' },
//           { title: 'Sideboards', value: 'sideboards' },
//           { title: 'Planters', value: 'planters' },
//           { title: 'Mirrors', value: 'mirrors' },
//           { title: 'Accessories', value: 'accessories' },
//           { title: 'Lights', value: 'lights' },
//           { title: 'Gifting Combos', value: 'gifting_combos' },
//         ],
//       },
//     },
//     {
//       name: 'tags',
//       type: 'array',
//       title: 'Tags',
//       description: 'Tags related to the product',
//       of: [{ type: 'string' }],
//     },
//     {
//       name: 'socialMediaLinks',
//       type: 'array',
//       title: 'Social Media Links',
//       of: [
//         {
//           type: 'object',
//           fields: [
//             {
//               name: 'platform',
//               type: 'string',
//               title: 'Platform Name',
//             },
//             {
//               name: 'url',
//               type: 'url',
//               title: 'Platform URL',
//             },
//             {
//               name: 'icon',
//               type: 'image',
//               title: 'Icon',
//             },
//           ],
//         },
//       ],
//     },
//   ],
// };
