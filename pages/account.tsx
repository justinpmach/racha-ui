import Button from '@/components/Button';
import Center from '@/components/Center';
import Header from '@/components/Header';

import { styled } from 'styled-components';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { RevealWrapper } from 'next-reveal';
import WhiteBox from '@/components/WhiteBox';
import Input from '@/components/Input';
import Spinner from '@/components/Spinner';
import ProductBox from '@/components/ProductBox';
import Tabs from '@/components/Tabs';
import OrderSingle from '@/components/OrderSingle';

const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 40px;
  margin: 40px 0;
  p {
    margin: 5px;
  }
`;

const CityHolder = styled.div`
  display: flex;
  gap: 5px;
`;

const WishedProductsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
`;

export default function AccountPage() {
  const { data: session } = useSession();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [country, setCountry] = useState('');
  const [addressLoaded, setAddressLoaded] = useState(true);
  const [wishlistLoaded, setWishlistLoaded] = useState(true);
  const [wishedProducts, setWishedProducts] = useState([]);
  const [ordersLoaded, setOrdersLoaded] = useState(true);
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState('Orders');

  async function logout() {
    await signOut({
      callbackUrl: process.env.NEXT_PUBLIC_URL,
    });
  }
  async function login() {
    await signIn('google');
  }

  function saveAddress() {
    const data = { name, email, city, streetAddress, postalCode, country };
    axios.put('/api/address', data);
  }

  // When page mounts (page loads) grab all info from api
  useEffect(() => {
    if (!session) {
      return;
    }
    setAddressLoaded(false);
    setWishlistLoaded(true);
    setOrdersLoaded(false);
    axios.get('/api/address').then(response => {
      setName(response.data?.name);
      setEmail(response.data?.email);
      setCity(response.data?.city);
      setPostalCode(response.data?.postalCode);
      setStreetAddress(response.data?.streetAddress);
      setCountry(response.data?.country);
      setAddressLoaded(true);
    });
    // grab all wished items upon page mount
    axios.get('/api/wishlist').then(response => {
      setWishedProducts(response.data.map(wp => wp.product));
      setWishlistLoaded(true);
    });
    axios.get('/api/order').then(response => {
      setOrders(response.data);
      setOrdersLoaded(true);
    });
  }, [session]);

  function productRemovedFromWishlist(idToRemove) {
    setWishedProducts(products => {
      return [...products.filter(p => p._id.toString() !== idToRemove)];
    });
  }

  return (
    <>
      <Header />
      <Center>
        <ColumnsWrapper>
          <div>
            <RevealWrapper delay={0}>
              <WhiteBox>
                <Tabs
                  tabs={['Orders', 'Wishlist']}
                  active={activeTab}
                  onChange={setActiveTab}
                />
                {activeTab === 'Orders' && (
                  <>
                    {!ordersLoaded && <Spinner fullWidth={true} />}
                    {ordersLoaded && (
                      <div>
                        {orders.length === 0 && (
                          <p>Login to see your orders.</p>
                        )}
                      </div>
                    )}
                    {ordersLoaded && (
                      <div>
                        {orders.length > 0 &&
                          orders.map(o => <OrderSingle key={o} {...o} />)}
                      </div>
                    )}
                  </>
                )}
                {activeTab === 'Wishlist' && (
                  <>
                    {!wishlistLoaded && <Spinner fullWidth={true} />}
                    {wishlistLoaded && (
                      <>
                        <WishedProductsGrid>
                          {wishedProducts.length > 0 &&
                            wishedProducts.map(wp => (
                              <ProductBox
                                key={wp._id}
                                {...wp}
                                wished={true}
                                onRemoveFromWishlist={
                                  productRemovedFromWishlist
                                }
                              />
                            ))}
                        </WishedProductsGrid>
                        {wishedProducts.length === 0 && (
                          <>
                            {session && <p>Your wishlist is empty.</p>}
                            {!session && (
                              <p>Login to add products to your wishlist.</p>
                            )}
                          </>
                        )}
                      </>
                    )}
                  </>
                )}
              </WhiteBox>
            </RevealWrapper>
          </div>
          <div>
            <RevealWrapper delay={100}>
              <WhiteBox>
                <h2>{session ? 'Account details' : 'Login'}</h2>
                {addressLoaded && session && (
                  <>
                    <Input
                      type='text'
                      placeholder='Name'
                      value={name}
                      name={name}
                      onChange={e => setName(e.target.value)}
                    />
                    <Input
                      type='text'
                      placeholder='Email'
                      value={email}
                      name={email}
                      onChange={e => setEmail(e.target.value)}
                    />
                    <CityHolder>
                      <Input
                        type='text'
                        placeholder='City'
                        value={city}
                        name={city}
                        onChange={e => setCity(e.target.value)}
                      />
                      <Input
                        type='text'
                        placeholder='Postal Code'
                        value={postalCode}
                        name={postalCode}
                        onChange={e => setPostalCode(e.target.value)}
                      />
                    </CityHolder>
                    <Input
                      type='text'
                      placeholder='Street Address'
                      value={streetAddress}
                      name={streetAddress}
                      onChange={e => setStreetAddress(e.target.value)}
                    />
                    <Input
                      type='text'
                      placeholder='Country'
                      value={country}
                      name={country}
                      onChange={e => setCountry(e.target.value)}
                    />
                    <Button onClick={saveAddress} black='true' block='true'>
                      Save
                    </Button>
                    <hr />
                  </>
                )}
                {session && (
                  <Button primary={1} onClick={logout}>
                    Logout
                  </Button>
                )}
                {!session && (
                  <Button primary={1} onClick={login}>
                    Login with Google
                  </Button>
                )}
              </WhiteBox>
            </RevealWrapper>
          </div>
        </ColumnsWrapper>
      </Center>
    </>
  );
}
