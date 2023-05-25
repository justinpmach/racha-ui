import styled from 'styled-components';
import Center from '@/components/Center';
import ProductsGrid from './ProductsGrid';

const Title = styled.h2`
  font-size: 2rem;
  marin: 30px 0 20px;
  font-weight: normal;
`;

export default function NewProducts({ products }: any) {
  return (
    <Center>
      <Title>New Arrivals</Title>
      <ProductsGrid products={products} />
    </Center>
  );
}
