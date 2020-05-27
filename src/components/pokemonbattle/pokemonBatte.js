import React, { useState, useEffect } from 'react';
import PokemonShow from './PokemonShow';
import Arena from './arena';

import ExtraZoneStrength from './extraZoneStrength';
import PokemonStrengths from './pokemonStrengths';

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

function PokemonBattle({ enemies, zoneID, arenaBattle }) {
  const myPokemons = getPokemonsWithEZS();
  const [lifeMyPokemons, setLifeMyPokemons] = useState([]);
  const [lifeMyEnemies, setLifeMyEnemies] = useState([]);
  const [chosen, setChosen] = useState(0);
  const [enemy, setEnemy] = useState(0);
  const [message, setMessage] = useState(`${enemies[enemy].name} show up`);
  const [attacking, setAttacking] = useState(false);
  const [MySituation, setMySituation] = useState('normal');

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
    let extra = -100;
    for (let index = 0; index < pokemon.types.length; index++) {
      const type = pokemon.types[index];
      if (ExtraZoneStrength[zoneID][type] > extra) {
        extra = ExtraZoneStrength[zoneID][type];
      }
    }
    return extra;
  }

  function handlerChooseNewPokemon(index) {
    setChosen(index);
  }

  function showMyPokemons() {
    if (myPokemons[chosen]) {
      return myPokemons.map((pokemon, index) => {
        return (
          <PokemonShow
            key={index}
            index={index}
            idPokemon={pokemon.id}
            pokemon={myPokemons[index]}
            lifePokemon={lifeMyPokemons[index]}
            enemy={false}
            handlerOnClick={handlerChooseNewPokemon}
          />
        );
      });
    }
  }

  function showEnemies() {
    return enemies.map((ene, index) => {
      return (
        <PokemonShow
          key={index}
          idPokemon={ene.id}
          pokemon={enemies[index]}
          lifePokemon={lifeMyEnemies[index]}
          enemy={true}
        />
      );
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
        attacking={attacking}
        MySituation={MySituation}
        zoneID={zoneID}
        handlerAttack={attack}
        arenaBattle={arenaBattle}
      />
    );
  }

  async function attack(halfMessage) {
    setAttacking(true);

    let damage =
      Math.floor(Math.random() * 5 + 5) +
      DamageByPokemonStrengths(false) +
      DamageByPokemonDimensions(false);

    let aux = [...lifeMyEnemies];
    aux[enemy] = aux[enemy] - damage <= 0 ? 0 : aux[enemy] - damage;

    setMessage(`${halfMessage} || Damage to ${enemies[enemy].name}: ${damage}`);
    await delay(2000);
    setLifeMyEnemies(aux);

    if (aux[enemy] <= 0) {
      setMessage(`${enemies[enemy].name} fainted`);
      await delay(2000);
      if (netxEnemy() === -1) {
        if (arenaBattle) {
          setMessage(`Congratulations!!! You beat this Gym Leader!!!`);
          setMySituation('winner');
          return;
        }
        setMessage(`It's time to capture this pokémon!!!`);
        setMySituation('winner');
        return;
      }
      setEnemy(enemy + 1);
      setMessage(`${enemies[enemy].name} show up`);
      await delay(2000);
    } else {
      const randomMoveEnemy = Math.floor(
        Math.random() * enemies[enemy].moves.length
      );
      const moveEnemy = enemies[enemy].moves[randomMoveEnemy];

      let damageEnemy =
        Math.floor(Math.random() * 5 + 5) +
        DamageByPokemonStrengths(true) +
        DamageByPokemonDimensions(true);

      let aux2 = [...lifeMyPokemons];
      aux2[chosen] =
        aux2[chosen] - damageEnemy <= 0 ? 0 : aux2[chosen] - damageEnemy;

      setMessage(
        `${enemies[enemy].name} used ${moveEnemy} || Damage to ${myPokemons[chosen].name}: ${damageEnemy}`
      );
      await delay(2000);
      setLifeMyPokemons(aux2);
      if (aux2[chosen] <= 0) {
        setMessage(`${myPokemons[chosen].name} fainted`);
        await delay(2000);
      }
      if (Loser(damageEnemy, chosen)) {
        setMessage('You lose!!! Try next time...');
        setMySituation('loser');
        return;
      }
    }
    setAttacking(false);
  }

  function DamageByPokemonStrengths(IsEnemy) {
    if (!IsEnemy) {
      for (let index1 = 0; index1 < myPokemons[chosen].types.length; index1++) {
        const attackertype = myPokemons[chosen].types[index1];
        for (let index2 = 0; index2 < enemies[enemy].types.length; index2++) {
          const targettype = enemies[enemy].types[index2];
          if (PokemonStrengths[attackertype].includes(targettype)) {
            return 10 + Math.floor(Math.random() * 5);
          }
        }
      }
    } else {
      for (let index1 = 0; index1 < enemies[enemy].types.length; index1++) {
        const attackertype = enemies[enemy].types[index1];
        for (
          let index2 = 0;
          index2 < myPokemons[chosen].types.length;
          index2++
        ) {
          const targettype = myPokemons[chosen].types[index2];
          if (PokemonStrengths[attackertype].includes(targettype)) {
            return 10 + Math.floor(Math.random() * 5);
          }
        }
      }
    }
    return 0;
  }

  function DamageByPokemonDimensions(IsEnemy) {
    let damage = 0;
    if (!IsEnemy) {
      if (myPokemons[chosen].weight > enemies[enemy].weight) {
        damage = damage + 2 + Math.floor(Math.random() * 3);
      }
      if (myPokemons[chosen].height > enemies[enemy].height) {
        damage = damage + 2 + Math.floor(Math.random() * 3);
      }
    } else {
      if (myPokemons[chosen].weight < enemies[enemy].weight) {
        damage = damage + 2 + Math.floor(Math.random() * 3);
      }
      if (myPokemons[chosen].height < enemies[enemy].height) {
        damage = damage + 2 + Math.floor(Math.random() * 3);
      }
    }
    return damage;
  }

  function Loser(damage, i) {
    for (let index = 0; index < lifeMyPokemons.length; index++) {
      if (lifeMyPokemons[index] - (i === index && damage) > 0) {
        return false;
      }
    }
    return true;
  }

  function netxEnemy() {
    if (enemy === enemies.length - 1) {
      return -1;
    }
    return enemy + 1;
  }

  return (
    <div style={{ marginTop: '30px', width: '70%' }} className="container">
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
