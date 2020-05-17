import React, { useState, useEffect } from 'react';

import apiPokemon from '../../services/apiPokemon';
import PokedexRow from './pokedexRow';

import '../../css/pokedex.css';

function PokedexTable() {
  const pokedexURL = sessionStorage.getItem('pokedexURL');
  const [data, setData] = useState([]);

  function getPokemonsFromURL(URL) {
    apiPokemon
      .get(URL)
      .then((result) => {
        setData({
          count: result.data.count,
          next: result.data.next,
          previous: result.data.previous,
          pokemons: result.data.results,
        });
        console.log(result.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  useEffect(() => {
    getPokemonsFromURL(pokedexURL);
  }, [pokedexURL]);

  function createRows() {
    if (!data.pokemons) {
      return;
    }

    return data.pokemons.map((pokemon, index) => {
      return <PokedexRow key={index} pokemon={pokemon} />;
    });
  }

  function nextPokemons() {
    const { next } = data;
    if (next) {
      getPokemonsFromURL(next);
      sessionStorage.setItem('pokedexURL', next);
    }
  }

  function prevPokemons() {
    const { previous } = data;
    if (previous) {
      getPokemonsFromURL(previous);
      sessionStorage.setItem('pokedexURL', previous);
    }
  }

  return (
    <div className="container" align="center">
      <table className="table table-striped table-bordered">
        <thead className="thead-dark">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th colSpan="2"></th>
          </tr>
        </thead>
        <tbody>{createRows()}</tbody>
        <tfoot>
          <tr>
            <td colSpan="4">
              <button
                className="btn btn-link"
                onClick={prevPokemons}
                disabled={!data.previous}
              >
                Previous
              </button>
              <button
                className="btn btn-link"
                onClick={nextPokemons}
                disabled={!data.next}
              >
                Next
              </button>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

export default PokedexTable;
