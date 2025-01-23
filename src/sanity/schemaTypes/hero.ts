import { Rule } from "sanity";

export const hero = {
    name: 'hero',
    title: 'hero',
    type: 'document',
    fields: [
   
      {
        name: 'title',
        title: 'Heading',
        type: 'string',
        validation: (Rule:Rule) => Rule.required().error('Heading is required'),
      },  
      {
        name: 'button',
        title: 'button',
        type: 'string',
        validation: (Rule: Rule) => Rule.required().error('Date is required'),
      },
      
      {
        name: 'image',
        title: 'Image',
        type: 'image',
        options: {
          hotspot: true, // allows cropping the image
        },
        validation: (Rule:Rule) => Rule.required().error('Image is required'),
      },
      
    ],
  };
  