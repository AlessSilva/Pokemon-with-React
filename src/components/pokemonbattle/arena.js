import React from 'react';
import { Link } from 'react-router-dom';
import helper from '../../helpers/URLUtil';
import zones from '../../assets/zoneBattle';

import iconAttack from '../../assets/attackIcon.png';
import iconEscape from '../../assets/escapeIcon.png';
import iconCapture from '../../assets/captureIcon.png';

function Arena({
  myPokemon,
  myEnemy,
  message,
  zoneID,
  lifeMyPokemon,
  lifeMyEnemy,
  handlerAttack,
  arenaBattle,
}) {
  const imgEnemy = `${helper.URLPokemonFront}${myEnemy.id}.png`;
  const imgMyPokemon = `${helper.URLPokemonBack}${myPokemon.id}.png`;

  function createSelectMoves() {
    return myPokemon.moves.map((move, index) => {
      return (
        <option
          key={index}
          style={{ textTransform: 'uppercase', fontSize: 13 }}
        >
          {move}
        </option>
      );
    });
  }

  function moveSelected() {
    const select = document.getElementById('selectMoves');
    return select.options[select.selectedIndex].text;
  }

  function captureButton() {
    if (!arenaBattle) {
      return (
        <div className="col-12 text-center">
          {lifeMyEnemy <= 0 && (
            <Link
              onClick={capturePokemon}
              to="/mypokemons"
              type="button"
              className="btn btn-primary"
              style={{ margin: 5 }}
            >
              To Capture!!!{' '}
              <img src={iconCapture} alt="icon attack" width="15" />
            </Link>
          )}
        </div>
      );
    }
  }

  function capturePokemon() {
    const myPokemons = JSON.parse(sessionStorage.getItem('myPokemons'));
    if(myPokemons.length<=5){
      sessionStorage.setItem(
        'myPokemons',
        JSON.stringify([...myPokemons, myEnemy])
      );
      return;
    }
    alert("Pokéballs are not enough!!! Limit of 6 Pokémons.");
  }

  return (
    <>
      <div
        className="row"
        style={{ background: `url(${zones[zoneID]}) no-repeat center center` }}
      >
        <div className="col-12">
          <div className="row">
            <div className="col-12 text-right">
              <span style={{ textTransform: 'capitalize' }}>
                <b>
                  {myEnemy.name} ({lifeMyEnemy}/{myEnemy.base + myEnemy.extra})
                </b>
              </span>
              <img src={imgEnemy} alt={myEnemy.id} />
            </div>
          </div>
          <div className="row">
            <div className="col-12 text-left">
              <img src={imgMyPokemon} alt={myPokemon.id} />
              <span style={{ textTransform: 'capitalize' }}>
                <b>
                  {myPokemon.name} ({lifeMyPokemon}/
                  {myPokemon.base + myPokemon.extra})
                </b>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="row" style={{ marginTop: 10 }}>
        <div className="col-6 text-center">
          <select
            id="selectMoves"
            className="form-control"
            style={{ textTransform: 'uppercase' }}
          >
            {createSelectMoves()}
          </select>
        </div>
        <div className="col-6 text-center">
          <button
            onClick={() =>
              handlerAttack(`${myPokemon.name} used ${moveSelected()}`)
            }
            type="button"
            className="btn btn-danger"
            style={{ margin: 5 }}
          >
            Attack <img src={iconAttack} alt="icon attack" width="15" />
          </button>
          <button className="btn btn-secondary" style={{ margin: 5 }}>
            Escape <img src={iconEscape} alt="icon attack" width="15" />
          </button>
        </div>
      </div>
      <div className="row">
        <div className="col-12 text-center">
          <div
            className="alert alert-warning"
            role="alert"
            style={{ textTransform: 'uppercase', margin: 20, fontSize: 12 }}
          >
            {message}
          </div>
        </div>
      </div>
      <div className="row">{captureButton()}</div>
    </>
  );
}

export default Arena;
