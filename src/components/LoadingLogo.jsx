import { useEffect, useState } from 'react';
import styles from './Loading.module.css';

const LoadingLogo = () => {
  const [moveAnimate, setMoveAnimate] = useState(false);
  const [dotsAnimate, setDotsAnimate] = useState(false);

  useEffect(() => {
    const moveTimer = setTimeout(() => setMoveAnimate(true), 1000);
    const dotsTimer = setTimeout(() => setDotsAnimate(true), 1700);

    return () => {
      clearTimeout(moveTimer);
      clearTimeout(dotsTimer);
    };
  }, []);

  return (
    <div className={styles.loadingContainer}>
      <svg
        viewBox="0 0 3500 523"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={styles.mySvg}
      >
        <g id="Group1">
          {/* S moves right */}
          <path
            id="s"
            className={moveAnimate ? styles.moveRight : styles.startS}
            d="M1903.11 63C1914.1 63 1923 71.9047 1923 82.8887V179.111C1923 190.095 1914.1 199 1903.11 199C1903.09 199 1903.07 198.999 1903.06 198.999C1903.04 198.999 1903.02 199 1903 199H1745V112.889C1745 101.905 1753.9 93 1764.89 93C1775.87 93.0002 1784.78 101.905 1784.78 112.889V159H1814.61V97.8887C1814.61 86.9047 1823.51 78.0001 1834.5 78C1845.48 78 1854.39 86.9047 1854.39 97.8887V159H1883.22V82.8887C1883.22 71.9048 1892.13 63.0002 1903.11 63Z"
            fill="#2DFB90"
          />

          {/* E + E2 move left */}
          <g className={moveAnimate ? styles.moveLeft : styles.startEN}>
            <rect
              id="e"
              x="1854"
              y="199"
              width="40"
              height="39"
              transform="rotate(-90 1854 199)"
              fill="white"
            />
            <path
              id="e_2"
              d="M1834 78C1845.05 78 1854 86.9543 1854 98V199H1785V159H1814V98C1814 86.9543 1822.95 78 1834 78Z"
              fill="white"
            />
          </g>

          {/* N moves left */}
          <path
            id="n"
            className={moveAnimate ? styles.moveLeft : styles.startEN}
            d="M1765 77C1776.05 77 1785 85.9543 1785 97V246C1785 257.046 1776.05 266 1765 266C1764.66 266 1764.33 265.991 1764 265.975C1763.67 265.991 1763.34 266 1763 266H1646C1645.97 266 1645.94 265.998 1645.91 265.998C1645.88 265.998 1645.85 266 1645.83 266C1634.88 266 1626 257.123 1626 246.174V100.826C1626 89.8765 1634.88 81 1645.83 81C1656.78 81 1665.65 89.8766 1665.65 100.826V226H1745V97C1745 85.9543 1753.95 77 1765 77Z"
            fill="#200404"
          />

          {/* Animated dots */}
          <rect
  id="dot"
  className={`${styles.dot} ${dotsAnimate ? styles.showDot1 : ''}`}
  x="1612"
  y="83"
  width="40"
  height="40"
  rx="19.5"
  fill="#FF0130"
/>
<rect
  id="dot_2"
  className={`${styles.dot} ${dotsAnimate ? styles.showDot2 : ''}`}
  x="1719"
  y="210"
  width="40"
  height="40"
  rx="19.5"
  fill="#FF0130"
/>
<rect
  id="dot_3"
  className={`${styles.dot} ${dotsAnimate ? styles.showDot3 : ''}`}
  x="1764"
  y="210"
  width="40"
  height="40"
  rx="19.5"
  fill="#FF0130"
/>
        </g>
      </svg>
    </div>
  );
};

export default LoadingLogo;
