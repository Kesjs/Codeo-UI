import React from 'react';
import Image from 'next/image';

const Logo = () => {
  return (
    <div style={{ width: '240px', position: 'relative', display: 'flex', alignItems: 'center' }}>
      <Image
        src="/mon-logo.png"
        alt="Codeo UI"
        width={240}
        height={72}
        style={{
          width: '100%',
          height: 'auto',
          display: 'block',
          objectFit: 'contain',
          objectPosition: 'left center'
        }}
        priority
      />
    </div>
  );
};

export default Logo;
