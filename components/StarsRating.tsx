import StarOutline from '@/components/icons/StarOutline';
import { primary } from '@/lib/colors';
import { useState } from 'react';
import { styled } from 'styled-components';
import StarSolid from './icons/StarSolid';

const StarsWrapper = styled.div`
  display: inline-flex;
  gap: 1px;
  align-items: center;
`;

const StarWrapper = styled.button`
  ${props =>
    props.size === 'md' &&
    `
  height: 1.4rem;
  width: 1.4rem;
`}
  ${props =>
    props.size === 'sm' &&
    `
  height: 1rem;
  width: 1rem;
`}
${props =>
    !props.disabled &&
    `
  cursor: pointer;
`}
  padding: 0;
  border: 0;
  display: inline-block;
  background-color: transparent;
  color: ${primary};
`;

export default function StarsRating({
  size = 'md',
  defaultRating = 0,
  disabled,
  onChange = () => {},
}) {
  const [rating, setRating] = useState(defaultRating);
  const stars = [1, 2, 3, 4, 5];

  function handleStarClick(star) {
    if (disabled) return;
    setRating(star);
    onChange(star);
  }

  return (
    <StarsWrapper>
      {stars.map(star => (
        <>
          <StarWrapper
            disabled={disabled}
            size={size}
            onClick={() => handleStarClick(star)}
          >
            {rating >= star ? <StarSolid /> : <StarOutline />}
          </StarWrapper>
        </>
      ))}
    </StarsWrapper>
  );
}
