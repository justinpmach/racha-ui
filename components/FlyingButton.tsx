import styled from 'styled-components';
import { ButtonStyle } from '@/components/Button';
import { primary } from '@/lib/colors';
import { CartContext } from './CartContext';
import { useContext, useEffect, useRef } from 'react';

const FlyingButtonWrapper = styled.div`
  button {
    ${ButtonStyle};

    ${props =>
      props.main
        ? `
        background-color: ${primary};
        color: white;
      `
        : `
        background-color: transparent;
        border: 1px solid ${primary};
        color: ${primary};
    `}
    ${props =>
      props.white &&
      `
      background-color: white;
      border: 1px solid white;
      font-weight: 500;
    `}
  }

  @keyframes fly {
    100% {
      top: 0;
      left: 100%;
      opacity: 0;
      display: none;
      max-width: 150px;
      max-height: 150px;
    }
  }
  img {
    display: none;
    max-width: 100px;
    max-height: 100px;
    opacity: 1;
    position: fixed;
    z-index: 5;
    animation: fly 1s;
    border-raidus: 10px;
  }
`;
export default function FlyingButton(props) {
  const { addProduct } = useContext(CartContext);
  const imgRef = useRef();
  function sendImageToCart(e) {
    imgRef.current.style.display = 'inline-block';
    imgRef.current.style.left = e.clientX - 50 + 'px';
    imgRef.current.style.top = e.clientY - 50 + 'px';
    setTimeout(() => {
      imgRef.current.style.display = 'none';
    }, 1000);
  }
  useEffect(() => {
    const interval = setInterval(() => {
      const reveal = imgRef.current?.closest('div[data-sr-id]');
      if (reveal?.style.opacity === '1') {
        // visible
        reveal.style.transform = 'none';
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <FlyingButtonWrapper
        white={props.white}
        main={props.main}
        onClick={() => addProduct(props._id)}
      >
        <img src={props.src} alt='' ref={imgRef} />
        <button onClick={e => sendImageToCart(e)} {...props} />
      </FlyingButtonWrapper>
    </>
  );
}
