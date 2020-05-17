import React from 'react';
import InforType from './inforType';

function InforGeneral({ pokemon, idPokemon }) {
  return (
    <>
      <ul className="list-group" style={{ fontSize: 17 }}>
        <li
          className="list-group-item"
          style={{ padding: 5 }}
        >
          <strong>Base Life: </strong>
          {pokemon.base} points
        </li>
        <li
          className="list-group-item list-group-item-light"
          style={{ padding: 5 }}
        >
          <strong>Weight: </strong>
          {pokemon.weight} hectograms
        </li>
        <li
          className="list-group-item list-group-item-light"
          style={{ padding: 5 }}
        >
          <strong>Height: </strong>
          {pokemon.height} decimetres
        </li>
        <li
          className="list-group-item list-group-item-light"
          style={{ padding: 5 }}
        >
          <InforType idPokemon={idPokemon} />
        </li>
      </ul>
    </>
  );
}

export default InforGeneral;
