import Link from 'next/link';
import { ButtonStyle } from '@/components/Button';
import styled from 'styled-components';

const StyledLink = styled(Link)`
  ${ButtonStyle}
`;

export default function ButtonLink(props: any) {
  return <StyledLink {...props} />;
}
