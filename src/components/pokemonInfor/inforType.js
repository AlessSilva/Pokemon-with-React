import React, { useState, useEffect } from 'react';

import apiPokemon from '../../services/apiPokemon';

import helper from '../../helpers/URLUtil';
import PokedexIconType from './iconType';

function InforType({ idPokemon }) {
  const [types, setTypes] = useState([]);

  useEffect(() => {
    if (idPokemon) {
      const URLPokemon = `${helper.URLPokemon}${idPokemon}`;
      apiPokemon
        .get(URLPokemon)
        .then((result) => {
          setTypes(
            result.data.types.map((element, index) => {
              return element.type.name;
            })
          );
        })
        .catch();
    }
  }, [idPokemon]);

  function createIconType() {
    if (types) {
      return types.map((type, index) => {
        return (
          <div key={index} className="col-6">
            <PokedexIconType type={type} />
          </div>
        );
      });
    }
  }

  return <div className="row">{createIconType()}</div>;
}

export default InforType;
