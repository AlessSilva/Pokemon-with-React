import React from 'react';
import '../../css/iconstype.css';

import images from '../../assets/iconsType';

function PokedexIconType({ type }) {
  const clasName = `icon ${type}`;

  return (
    <div className={clasName}>
      <img src={images[type]} alt={type} />
    </div>
  );
}

export default PokedexIconType;
