import { styled } from 'styled-components';
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { debounce } from 'lodash';
import Center from '@/components/Center';
import Header from '@/components/Header';
import Input from '@/components/Input';
import ProductsGrid from '@/components/ProductsGrid';
import Spinner from '@/components/Spinner';

const SearchInput = styled(Input)`
  padding: 5px 10px;
  border-radius: 0;
  margin: 30px 0 30px;
  font-size: 1.4rem;
`;

const InputWrapper = styled.div`
  position: sticky;
  top: 68px;
  margin: 25px 0;
  padding: 5px 0;
  background-color: #eeeeeeaa;
`;

export default function Search() {
  const [phrase, setPhrase] = useState('');
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const debouncedSearch = useCallback(debounce(searchProducts, 500), []);
  useEffect(() => {
    if (phrase.length > 0) {
      setIsLoading(true);
      debouncedSearch(phrase);
    } else {
      setProducts([]);
    }
  }, [phrase]);

  function searchProducts(phrase) {
    axios
      .get('/api/products?phrase=' + encodeURIComponent(phrase))
      .then(response => {
        setProducts(response.data);
        setIsLoading(false);
      });
  }
  return (
    <>
      <Header />
      <Center>
        <InputWrapper>
          <SearchInput
            autoFocus
            onChange={e => setPhrase(e.target.value)}
            value={phrase}
            placeholder='Search for products...'
          />
        </InputWrapper>
        {!isLoading && phrase !== '' && products.length === 0 && (
          <h2>No products found for query "{phrase}"</h2>
        )}
        {isLoading && <Spinner fullWidth={true} />}
        {!isLoading && products.length > 0 && (
          <ProductsGrid products={products} />
        )}
      </Center>
    </>
  );
}
