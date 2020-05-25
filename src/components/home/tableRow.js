import React from 'react';
import { Link } from 'react-router-dom';

import zones from '../../assets/zoneBattle';

import helper from '../../helpers/URLUtil';

function TableRow({ pokemon, pokemonID, zone }) {
  const imgPokemon = `${helper.URLPokemonFront}${pokemonID}.png`;

  function handlerTryCapture() {
    sessionStorage.setItem('enemies', JSON.stringify([pokemon]));
  }

  return (
    <>
      <tr>
        <td style={{ verticalAlign: 'middle' }}>{pokemon.name}</td>
        <td style={{ verticalAlign: 'middle' }}>
          <img src={imgPokemon} alt={pokemonID} />
        </td>
        <td style={{ verticalAlign: 'middle' }}>
          <img style={{ width: 200 }} src={zones[zone]} alt={zone} />
        </td>
        <td style={{ verticalAlign: 'middle' }}>
          <Link
            onClick={handlerTryCapture}
            to={`/home/capture/${pokemonID}/${zone}`}
            className="btn btn-primary"
          >
            Try To Capture
          </Link>
        </td>
      </tr>
    </>
  );
}

export default TableRow;
