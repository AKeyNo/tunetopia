import { useState } from 'react';
import { Heart } from '@phosphor-icons/react';

export const HeartButton: React.FC<{
  className?: string;
  onClick?: () => void;
  size?: number;
}> = ({ className, onClick, size }) => {
  const [isHoveringOverHeart, setIsHoveringOverHeart] = useState(false);

  return (
    <Heart
      className={`text-gray-400 duration-200 ${className}`}
      size={size || 20}
      weight={isHoveringOverHeart ? 'regular' : 'light'}
      onClick={onClick}
      onMouseEnter={() => setIsHoveringOverHeart(true)}
      onMouseLeave={() => setIsHoveringOverHeart(false)}
    />
  );
};
