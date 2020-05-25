import React from 'react';
import MyPokemonRow from './mypokemonRow';

function MyPokemons() {
  const myPokemons = JSON.parse(sessionStorage.getItem('myPokemons'));

  function createTable() {
    return myPokemons.map((pokemon, index) => {
      return <MyPokemonRow key={index} pokemon={pokemon} />;
    });
  }

  return (
    <>
      <div className="container" align="center">
        <h2>{myPokemons.length}/6</h2>
        <table className="table table-striped table-bordered">
          <thead className="thead-dark">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th colSpan="3"></th>
            </tr>
          </thead>
          <tbody>{createTable()}</tbody>
          <tfoot></tfoot>
        </table>
      </div>
    </>
  );
}

export default MyPokemons;
