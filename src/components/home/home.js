import React, { useState, useEffect } from 'react';

import apiPokemon from '../../services/apiPokemon';
import helper from '../../helpers/URLUtil';
import HomeTable from './homeTable';

function between(x, v1, v2) {
  return x >= v1 && x <= v2;
}

function Home() {
  const [pokemons, setPokemons] = useState([]);
  const [zones, setZones] = useState([]);

  async function getRandonsPokemons() {
    const zonesNames = [
      'beach',
      'beach2',
      'cave',
      'cave2',
      'cemetery',
      'desert',
      'desert2',
      'forest',
      'forest2',
      'lava',
      'mansion',
      'misty',
      'mountain',
      'mountain2',
      'plains',
      'plains2',
      'plains3',
      'sanctuary',
      'sea',
      'sea2',
      'snow',
      'space',
      'underwater',
      'urban',
      'urban2',
      'volcano',
    ];

    const aux_pokemons = [];
    const aux_zones = [];

    //ban = [144...151, 243 ... 251, 377 ... 386,480...493,633...649];

    for (let index = 0; index < 20; index++) {
      const id = Math.floor(Math.random() * 649 + 1);

      if (
        between(id, 144, 151) ||
        between(id, 243, 251) ||
        between(id, 377, 386) ||
        between(id, 480, 493) ||
        between(id, 633, 649)
      ) {
        continue;
      }

      const extra_life = Math.floor(Math.random() * 50);
      const extra_weight = Math.floor(Math.random() * 10);
      const extra_height = Math.floor(Math.random() * 10);

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
