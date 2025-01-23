import { Rule } from "sanity";

export const blog = {
    name: 'blog',
    title: 'Blog',
    type: 'document',
    fields: [
   
      {
        name: 'title',
        title: 'Heading',
        type: 'string',
        validation: (Rule:Rule) => Rule.required().error('Heading is required'),
      },  
      {
        name: 'date',
        title: 'Date',
        type: 'date',
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
      {
        name: 'content',
        title: 'Paragraph',
        type: 'text',
        validation: (Rule:Rule) => Rule.required().error('Content is required'),
      },
      {
        name: 'name',
        title: 'Name',
        type: 'string',
        validation: (Rule:Rule) => Rule.required().error('Author is required'),
      }
    ],
  };
  