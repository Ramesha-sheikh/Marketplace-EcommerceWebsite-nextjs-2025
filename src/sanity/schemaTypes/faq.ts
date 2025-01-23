const faqSchema = {
  name: 'faq',
  title: 'FAQ',
  type: 'document',
  fields: [
    {
      name: 'question',
      title: 'Question',
      type: 'string',
    },
    {
      name: 'answer',
      title: 'Answer',
      type: 'text',
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',  // or you can use a 'reference' type if you want to use a predefined list
      options: {
        list: [
          { title: 'General Information', value: 'General Information' },
          { title: 'Shipping & Delivery', value: 'Shipping & Delivery' },
          { title: 'Returns & Exchanges', value: 'Returns & Exchanges' },
          { title: 'Payment & Billing', value: 'Payment & Billing' },
          { title: 'Product Information', value: 'Product Information' },
        ],
      },
    },
    {
      name: 'isTopQuestion',
      title: 'Top Question',
      type: 'boolean', // Boolean field to mark top questions
      description: 'Mark as a frequently asked or top question',
      initialValue: false, // Set default value to false
    },
  ],
};

export default faqSchema;
