import Header from '@/components/Header';
import Title from '@/components/Title';
import Center from '@/components/Center';
import { Category } from '@/models/Category';

export default function CategoriesPage({ mainCategories }) {
  return (
    <>
      <Header />
      <Center>
        {/* <Title>All Categories</Title> */}
        {mainCategories.map(cat => (
          <div key={cat}>
            <h2>{cat.name}</h2>
          </div>
        ))}
      </Center>
    </>
  );
}

export async function getServerSideProps() {
  const categories = await Category.find();
  return {
    props: {
      mainCategories: JSON.parse(
        JSON.stringify(categories.filter(c => !c.parent))
      ),
    },
  };
}
