import React, {useState} from 'react';
import TableRow from './tableRow';

function HomeTable({ pokemons, zones }) { 

  function createRows() {
    if (pokemons) {
      return pokemons.map((pokemon, index) => {
        return (
          <TableRow
            key={index}
            pokemon={pokemon}
            pokemonID={pokemon.id}
            zone={zones[index]}
          />
        );
      });
    }
  }

  return (
    <div className="container" align="center">
      <table className="table table-striped table-bordered">
        <thead className="thead-dark">
          <tr>
            <th>Name</th>
            <th></th>
            <th>Battle Zone</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{createRows()}</tbody>
      </table>
    </div>
  );
}

export default HomeTable;
