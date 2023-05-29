import Header from '@/components/Header';
import Featured from '@/components/Featured';
import { Product } from '@/models/Product';
import { mongooseConnect } from '@/lib/mongoose';
import NewProducts from '@/components/NewProducts';
import { WishedProduct } from '@/models/WishedProduct';
// import { getServerSession } from 'next-auth/next';
// import { authOptions } from '@/pages/api/auth/[...nextauth]';

export default function HomePage({ featuredProduct, newProducts }: any) {
  return (
    <div>
      <Header />
      <Featured product={featuredProduct} />
      <NewProducts products={newProducts} />
    </div>
  );
}

export async function getServerSideProps(context) {
  const featuredProductId = '6466b701dfb008546332aa63';
  await mongooseConnect();
  const featuredProduct = await Product.findById(featuredProductId);
  const newProducts = await Product.find({}, null, {
    sort: { _id: -1 },
    limit: 10,
  });
  // console.log(getServerSession(context.request, context.response, authOptions));
  const wishedNewProducts = await WishedProduct.find();
  return {
    props: {
      featuredProduct: JSON.parse(JSON.stringify(featuredProduct)),
      newProducts: JSON.parse(JSON.stringify(newProducts)),
    },
  };
}
