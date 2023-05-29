import Center from '@/components/Center';
import Header from '@/components/Header';
import Input from '@/components/Input';
import ProductsGrid from '@/components/ProductsGrid';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { styled } from 'styled-components';

const SearchInput = styled(Input)`
  padding: 5px 10px;
  border-radius: 0;
  margin: 30px 0 30px;
  font-size: 1.4rem;
`;

export default function Search() {
  const [phrase, setPhrase] = useState('');
  const [products, setProducts] = useState([]);
  useEffect(() => {
    if (phrase.length > 0) {
      axios
        .get('/api/products?phrase=' + encodeURIComponent(phrase))
        .then(response => setProducts(response.data));
    }
  }, [phrase]);
  return (
    <>
      <Header />
      <Center>
        <SearchInput
          autoFocus
          onChange={e => setPhrase(e.target.value)}
          value={phrase}
          placeholder='Search for products...'
        />
        <ProductsGrid products={products} />
      </Center>
    </>
  );
}
