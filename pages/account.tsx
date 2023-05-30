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

const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 40px;
  margin: 40px 0;
`;

const CityHolder = styled.div`
  display: flex;
  gap: 5px;
`;

export default function AccountPage() {
  const { data: session } = useSession();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [country, setCountry] = useState('');
  const [loaded, setLoaded] = useState(false);
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

  useEffect(() => {
    axios.get('/api/address').then(response => {
      setName(response.data?.name);
      setEmail(response.data?.email);
      setCity(response.data?.city);
      setPostalCode(response.data?.postalCode);
      setStreetAddress(response.data?.streetAddress);
      setCountry(response.data?.country);
      setLoaded(true);
    });
  }, []);

  return (
    <>
      <Header />
      <Center>
        <ColumnsWrapper>
          <div>
            <RevealWrapper delay={0}>
              <WhiteBox>
                <h2>Wishlist</h2>
              </WhiteBox>
            </RevealWrapper>
          </div>
          <div>
            <RevealWrapper delay={100}>
              <WhiteBox>
                <h2>Account Details</h2>
                {!loaded && <Spinner fullWidth={true} />}
                {loaded && (
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
                    Login
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
