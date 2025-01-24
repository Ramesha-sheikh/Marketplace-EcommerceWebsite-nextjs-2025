import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface Product {
  id: string;
  title: string;
  price: number;
  mainImage: string;
}

interface RelatedProductProps {
  relatedProducts: Product[];
}

const RelatedProduct: React.FC<RelatedProductProps> = ({ relatedProducts }) => {
  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Related Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {relatedProducts.map((related) => (
          <div key={related.id} className="bg-white shadow rounded-lg p-4">
            <Image
              src={related.mainImage || "/placeholder.svg"}
              alt={related.title}
              width={200}
              height={200}
              className="rounded-lg mb-4 object-cover w-full h-auto"
            />
            <h3 className="text-lg font-bold text-gray-800">{related.title}</h3>
            <p className="text-gray-500">Rs. {related.price.toLocaleString()}</p>
            <Link href={`/cardproduct/${related.id}`}>
              <button className="mt-4 bg-black text-white py-2 px-4 rounded-full">
                View Details
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedProduct;
