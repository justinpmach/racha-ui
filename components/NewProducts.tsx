import styled from 'styled-components';
import Center from '@/components/Center';
import ProductBox from '@/components/ProductBox';

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 20px;
`;

const Title = styled.h2`
  font-size: 2rem;
  marin: 30px 0 20px;
  font-weight: normal;
`;

export default function NewProducts({ products }: any) {
  return (
    <Center>
      <Title>New Arrivals</Title>
      <ProductsGrid>
        {products?.length &&
          products.map((product: any) => <ProductBox {...product} />)}
      </ProductsGrid>
    </Center>
  );
}
