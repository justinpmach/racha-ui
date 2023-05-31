import Header from '@/components/Header';
import Featured from '@/components/Featured';
import { Product } from '@/models/Product';
import { Setting } from '@/models/Setting';
import { mongooseConnect } from '@/lib/mongoose';
import NewProducts from '@/components/NewProducts';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { WishedProduct } from '@/models/WishedProduct';

export default function HomePage({
  featuredProduct,
  newProducts,
  wishedNewProducts,
}: any) {
  return (
    <div>
      <Header />
      <Featured product={featuredProduct} />
      <NewProducts products={newProducts} wishedProducts={wishedNewProducts} />
    </div>
  );
}

export async function getServerSideProps(context) {
  const featuredProductSetting = await Setting.findOne({
    name: 'featuredProductId',
  });
  const featuredProductId = featuredProductSetting.value;
  await mongooseConnect();
  const featuredProduct = await Product.findById(featuredProductId);
  const newProducts = await Product.find({}, null, {
    sort: { _id: -1 },
    limit: 10,
  });
  // console.log(getServerSession(context.request, context.response, authOptions));
  const session = await getServerSession(context.req, context.res, authOptions);

  const wishedNewProducts = session?.user
    ? await WishedProduct.find({
        userEmail: session.user.email,
        product: newProducts.map(p => p._id.toString()),
      })
    : [];
  return {
    props: {
      featuredProduct: JSON.parse(JSON.stringify(featuredProduct)),
      newProducts: JSON.parse(JSON.stringify(newProducts)),
      wishedNewProducts: wishedNewProducts.map(i => i.product.toString()),
    },
  };
}
