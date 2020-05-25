import React from 'react';
import { Link } from 'react-router-dom';

import leaders from '../../assets/gymLeaders';
import iconsType from '../../assets/iconsType';

import '../../css/iconstype.css';

function GymLeaderRow({ number }) {
  const leader = `gym_leader${number}`;
  return (
    <tr>
      <td>
        <img
          style={{ width: 100, height: 120 }}
          src={leaders[leader]}
          alt={number}
        />
      </td>
      <td style={{ verticalAlign: 'middle' }}>
        {number === 1 && (
          <img
            className="icon bug"
            style={{ width: 70, height: 70 }}
            src={iconsType['bug']}
            alt="bug"
          />
        )}
        {number === 2 && (
          <img
            className="icon dark"
            style={{ width: 70, height: 70 }}
            src={iconsType['dark']}
            alt="dark"
          />
        )}
        {number === 3 && (
          <img
            className="icon steel"
            style={{ width: 70, height: 70 }}
            src={iconsType['steel']}
            alt="steel"
          />
        )}
        {number === 4 && (
          <img
            className="icon electric"
            style={{ width: 70, height: 70 }}
            src={iconsType['electric']}
            alt="electric"
          />
        )}
        {number === 5 && (
          <img
            className="icon flying"
            style={{ width: 70, height: 70 }}
            src={iconsType['flying']}
            alt="flying"
          />
        )}
        {number === 6 && (
          <img
            className="icon poison"
            style={{ width: 70, height: 70 }}
            src={iconsType['poison']}
            alt="poison"
          />
        )}
        {number === 7 && (
          <img
            className="icon fairy"
            style={{ width: 70, height: 70 }}
            src={iconsType['fairy']}
            alt="fairy"
          />
        )}
        {number === 8 && (
          <img
            className="icon rock"
            style={{ width: 70, height: 70 }}
            src={iconsType['rock']}
            alt="rock"
          />
        )}
        {number === 9 && (
          <img
            className="icon grass"
            style={{ width: 70, height: 70 }}
            src={iconsType['grass']}
            alt="grass"
          />
        )}
        {number === 10 && (
          <img
            className="icon water"
            style={{ width: 70, height: 70 }}
            src={iconsType['water']}
            alt="water"
          />
        )}
        {number === 11 && (
          <img
            className="icon fire"
            style={{ width: 70, height: 70 }}
            src={iconsType['fire']}
            alt="fire"
          />
        )}
        {number === 12 && (
          <img
            className="icon fighting"
            style={{ width: 70, height: 70 }}
            src={iconsType['fighting']}
            alt="fighting"
          />
        )}
        {number === 13 && (
          <img
            className="icon psychic"
            style={{ width: 70, height: 70 }}
            src={iconsType['psychic']}
            alt="psychic"
          />
        )}
        {number === 14 && (
          <img
            className="icon normal"
            style={{ width: 70, height: 70 }}
            src={iconsType['normal']}
            alt="normal"
          />
        )}
        {number === 15 && (
          <img
            className="icon ghost"
            style={{ width: 70, height: 70 }}
            src={iconsType['ghost']}
            alt="ghost"
          />
        )}
        {number === 16 && (
          <img
            className="icon dragon"
            style={{ width: 70, height: 70 }}
            src={iconsType['dragon']}
            alt="dragon"
          />
        )}
      </td>
      <td style={{ verticalAlign: 'middle' }}>
        <Link to={`/gymleader/${number}`} className="btn btn-primary">
          To Challenge
        </Link>
      </td>
    </tr>
  );
}

export default GymLeaderRow;
