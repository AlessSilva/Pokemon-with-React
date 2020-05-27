import React from 'react';
import { Link } from 'react-router-dom';

import leaders from '../../assets/gymLeaders';

import '../../css/iconstype.css';

function GymLeaderRow({ number }) {
  const leader = `gym_leader${number}`;
  return (
    <tr>
      <td>
        <img
          style={{ width: 150, height: 140 }}
          src={leaders[leader]}
          alt={number}
        />
      </td>
      <td style={{ verticalAlign: 'middle' }}>
        {number <= 3 && (
          <Link to={`/gymleader/${number}`} className="btn btn-primary">
            To Challenge
          </Link>
        )}
        {number > 3 && (
          <button className="btn btn-primary" disabled={true}>
            To Challenge
          </button>
        )}
      </td>
    </tr>
  );
}

export default GymLeaderRow;
