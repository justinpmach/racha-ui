import { mongooseConnect } from '@/lib/mongoose';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { WishedProduct } from '@/models/WishedProduct';

export default async function handler(req, res) {
  await mongooseConnect();
  const { user } = await getServerSession(req, res, authOptions);
  const { product } = req.body;
  const wishedDoc = await WishedProduct.findOne({
    userEmail: user.email,
    product,
  });

  if (req.method === 'POST') {
    if (wishedDoc) {
      await WishedProduct.findByIdAndDelete(wishedDoc._id);
      res.json({ wishedDoc });
    } else {
      await WishedProduct.create({ userEmail: user.email, product });
      res.json('created');
    }
  }

  if (req.method === 'GET') {
    // if (wishedDoc) {
    //   const wishedProducts = await WishedProduct.findOne({
    //     userEmail: user.email,
    //     product,
    //   });
    // }
    res.json(
      await WishedProduct.find({ userEmail: user.email }).populate('product')
    );
  }
}
