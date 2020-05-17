import React, { useState, useEffect } from 'react';

import apiPokemon from '../../services/apiPokemon';
import helper from '../../helpers/URLUtil';
import HomeTable from './homeTable';

function Home() {
  const [pokemons, setPokemons] = useState([]);
  const [zones, setZones] = useState([]);

  async function getRandonsPokemons() {
    const zonesNames = [
      'base',
      'beach',
      'cave',
      'cosmos',
      'eden',
      'forest',
      'fullMoon',
      'ghostly',
      'mountains',
      'volcano',
      'winter',
    ];

    const aux_pokemons = [];
    const aux_zones = [];

    for (let index = 0; index < 20; index++) {
      const id = Math.floor(Math.random() * 600 + 1);

      const zoneID = Math.floor(Math.random() * 11);
      aux_zones.push(zonesNames[zoneID]);

      const URLPokemon = `${helper.URLPokemon}${id}`;

      const result = await apiPokemon.get(URLPokemon);

      //console.log(result.data.name);
      //console.log(zonesNames[zoneID]);

      aux_pokemons.push({
        id: id,
        name: result.data.name,
        life: result.data.base_experience,
        moves: [],
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
