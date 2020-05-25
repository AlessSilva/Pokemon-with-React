import React, { useState, useEffect } from 'react';

import apiPokemon from '../../services/apiPokemon';
import helper from '../../helpers/URLUtil';
import HomeTable from './homeTable';

function Home() {
  const [pokemons, setPokemons] = useState([]);
  const [zones, setZones] = useState([]);

  async function getRandonsPokemons() {
    const zonesNames = [
      'beach',
      'cave',
      'cemetery',
      'desert',
      'forest',
      'lava',
      'mountain',
      'plains',
      'sea',
      'snow',
      'underwater',
      'urban',
      'volcano',
    ];

    const aux_pokemons = [];
    const aux_zones = [];

    for (let index = 0; index < 20; index++) {
      const id = Math.floor(Math.random() * 400 + 1);

      const extra_life = Math.floor(Math.random() * 150 + 1);
      const extra_weight = Math.floor(Math.random() * 20 + 1);
      const extra_height = Math.floor(Math.random() * 20 + 1);

      const zoneID = Math.floor(Math.random() * 11);
      aux_zones.push(zonesNames[zoneID]);

      const URLPokemon = `${helper.URLPokemon}${id}`;

      const result = await apiPokemon.get(URLPokemon);

      let types = result.data.types.map((element, index) => {
        return element.type.name;
      });

      let moves = result.data.moves.map((element, index) => {
        return element.move.name.toUpperCase();
      });

      let randomMoves = [];

      while (randomMoves.length <= 4) {
        const id_move = Math.floor(Math.random() * moves.length);
        randomMoves = [...randomMoves, moves[id_move]];
      }

      //console.log(result.data.name);
      //console.log(zonesNames[zoneID]);

      aux_pokemons.push({
        id: id,
        name: result.data.name,
        base: result.data.base_experience + extra_life,
        extra: 0,
        weight: result.data.weight + extra_weight,
        height: result.data.height + extra_height,
        moves: moves,
        types: types,
      });
    }
    return { pokemons: aux_pokemons, zones: aux_zones };
  }

  useEffect(() => {
    getRandonsPokemons().then((result) => {
      setPokemons(result.pokemons);
      setZones(result.zones);
    });
  }, []);

  function handlerExplore() {
    getRandonsPokemons().then((result) => {
      setPokemons(result.pokemons);
      setZones(result.zones);
    });
  }

  return (
    <div
      style={{ marginTop: '30px', width: '70%' }}
      className="container"
      align="center"
    >
      <div className="row">
        <div className="col-12">
          <button
            type="button"
            className="btn btn-outline-primary btn-lg btn-block"
            onClick={handlerExplore}
          >
            To Explore
          </button>
        </div>
      </div>
      <div className="row">
        <HomeTable pokemons={pokemons} zones={zones} />
      </div>
    </div>
  );
}

export default Home;
