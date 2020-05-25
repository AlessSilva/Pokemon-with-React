import React, { useState, useEffect } from 'react';
import PokemonShow from './PokemonShow';
import Arena from './arena';

import ExtraZoneStrength from './extraZoneStrength';
import PokemonStrengths from './pokemonStrengths';

function PokemonBattle({ enemies, zoneID, arenaBattle }) {
  const myPokemons = getPokemonsWithEZS();
  const [lifeMyPokemons, setLifeMyPokemons] = useState([]);
  const [lifeMyEnemies, setLifeMyEnemies] = useState([]);
  const [chosen, setChosen] = useState(0);
  const [enemy, setEnemy] = useState(0);
  let aux_message = '';
  const [message, setMessage] = useState(`${enemies[enemy].name} show up`);

  useEffect(() => {
    if (lifeMyPokemons.length === 0) {
      let aux = [];
      for (let index = 0; index < myPokemons.length; index++) {
        let pokemon = myPokemons[index];
        aux = [...aux, pokemon.base + pokemon.extra];
      }
      setLifeMyPokemons(aux);
    }
  }, [lifeMyPokemons.length, myPokemons]);

  useEffect(() => {
    if (lifeMyEnemies.length === 0) {
      let aux = [];
      for (let index = 0; index < enemies.length; index++) {
        let pokemon = enemies[index];
        aux = [...aux, pokemon.base + pokemon.extra];
      }
      setLifeMyEnemies(aux);
    }
  }, [enemies, lifeMyEnemies.length]);

  function getPokemonsWithEZS() {
    const my_pokemons = JSON.parse(sessionStorage.getItem('myPokemons'));
    let aux = [];
    for (let index = 0; index < my_pokemons.length; index++) {
      let pokemon = my_pokemons[index];
      pokemon.extra = calculatorEZS(pokemon);
      aux = [...aux, pokemon];
    }

    return aux;
  }

  function calculatorEZS(pokemon) {
    let extra = 0;
    for (let index = 0; index < pokemon.types.length; index++) {
      const type = pokemon.types[index];
      extra = extra + ExtraZoneStrength[zoneID][type];
    }
    return extra;
  }

  function handlerChooseNewPokemon(index) {
    setChosen(index);
  }

  function showMyPokemons() {
    return myPokemons.map((pokemon, index) => {
      return (
        <PokemonShow
          key={index}
          index={index}
          idPokemon={pokemon.id}
          enemy={false}
          handlerOnClick={handlerChooseNewPokemon}
        />
      );
    });
  }

  function showEnemies() {
    return enemies.map((enemy, index) => {
      return <PokemonShow key={index} idPokemon={enemy.id} enemy={true} />;
    });
  }

  function showArena() {
    if (!myPokemons || myPokemons.length === 0) {
      return;
    }
    return (
      <Arena
        myPokemon={myPokemons[chosen]}
        myEnemy={enemies[enemy]}
        lifeMyPokemon={lifeMyPokemons[chosen]}
        lifeMyEnemy={lifeMyEnemies[enemy]}
        iMyPokemon={chosen}
        iMyEnemy={enemy}
        message={message}
        zoneID={zoneID}
        handlerAttack={attack}
        arenaBattle={arenaBattle}
      />
    );
  }

  function attack(halfMessage) {
    let damage =
      Math.floor(Math.random() * 5 + 5) +
      DamageByPokemonStrengths(false) +
      DamageByPokemonDimensions(false);

    let aux = [...lifeMyEnemies];
    aux[enemy] = aux[enemy] - damage < 0 ? 0 : aux[enemy] - damage;

    setMessage(`${halfMessage} || Damage to ${enemies[enemy].name}: ${damage}`);

    setLifeMyEnemies(aux);

    if (aux[enemy] === 0) {
      setMessage(`${enemies[enemy].name} fainted`);
    } else {
      const randomMoveEnemy = Math.floor(
        Math.random() * enemies[enemy].moves.length
      );
      const moveEnemy = enemies[enemy].moves[randomMoveEnemy];

      let damageEnemy =
        Math.floor(Math.random() * 5 + 5) +
        DamageByPokemonStrengths(false) +
        DamageByPokemonDimensions(false);

      let aux2 = [...lifeMyPokemons];
      aux2[chosen] = aux2[chosen] - 10 < damageEnemy ? 0 : aux2[chosen] - damageEnemy;

      setMessage(
        `${enemies[enemy].name} used ${moveEnemy} || Damage to ${myPokemons[chosen].name}: ${damageEnemy}`
      );

      setLifeMyPokemons(aux2);
    }
  }

  function DamageByPokemonStrengths(IsEnemy) {
    const [attacker, target] = IsEnemy ? [enemy, chosen] : [chosen, enemy];

    for (let index1 = 0; index1 < myPokemons[attacker].types.length; index1++) {
      const attackertype = myPokemons[attacker].types[index1];
      for (let index2 = 0; index2 < enemies[target].types.length; index2++) {
        const targettype = enemies[target].types[index2];
        if (PokemonStrengths[attackertype].includes(targettype)) {
          return Math.floor(Math.random() * 10);
        }
      }
    }
    return 0;
  }

  function DamageByPokemonDimensions(IsEnemy) {
    const [attacker, target] = IsEnemy ? [enemy, chosen] : [chosen, enemy];

    let damage = 0;
    if (myPokemons[attacker].weight > enemies[target].weight) {
      damage = damage + Math.floor(Math.random() * 2);
    }
    if (myPokemons[attacker].height > enemies[target].height) {
      damage = damage + Math.floor(Math.random() * 3);
    }

    return damage;
  }

  return (
    <div style={{ marginTop: '30px', width: '60%' }} className="container">
      <div className="row">
        <div className="col-2" style={{ padding: '0.5em' }}>
          {showMyPokemons()}
        </div>
        <div
          className="col-8"
          style={{
            borderLeft: '1px solid #cecece',
            borderRight: '1px solid #cecece',
            paddingTop: '2em',
          }}
        >
          {showArena()}
        </div>
        <div className="col-2" style={{ padding: '0.5em' }}>
          {showEnemies()}
        </div>
      </div>
    </div>
  );
}

export default PokemonBattle;
