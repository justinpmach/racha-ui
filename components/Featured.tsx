import styled from 'styled-components';
import { useContext } from 'react';
import { CartContext } from '@/components/CartContext';
import Button from '@/components/Button';
import ButtonLink from '@/components/ButtonLink';
import Center from '@/components/Center';
import CartIcon from '@/components/icons/CartIcon';

const Bg = styled.div`
  background-color: #222;
  color: #fff;
  padding: 50px 0;
`;

const Title = styled.h1`
  margin: 0;
  font-weight: normal;
  font-size: 3rem;
`;

const Description = styled.p`
  color: #aaa;
  font-size: 0.8rem;
`;

const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 40px;
  img {
    max-width: 100%;
  }
`;

const Column = styled.div`
  display: flex;
  align-items: center;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 25px;
`;

export default function Featured({ product }: any) {
  const { addProduct } = useContext(CartContext);
  function addFeaturedToCart() {
    addProduct(product._id);
  }
  return (
    <Bg>
      <Center>
        <ColumnsWrapper>
          <Column>
            <div>
              <Title>{product.title}</Title>
              <Description>{product.description}</Description>
              <ButtonsWrapper>
                <ButtonLink
                  href={'/products/' + product._id}
                  outline={1}
                  white={1}
                >
                  Read More
                </ButtonLink>
                <Button white='true' onClick={addFeaturedToCart}>
                  <CartIcon />
                  Add to Cart
                </Button>
              </ButtonsWrapper>
            </div>
          </Column>
          <Column>
            <img
              src='https://support.apple.com/library/APPLE/APPLECARE_ALLGEOS/SP858/mbp16-gray.png'
              alt=''
            />
          </Column>
        </ColumnsWrapper>
      </Center>
    </Bg>
  );
}
