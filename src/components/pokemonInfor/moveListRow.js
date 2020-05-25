import React from 'react';
import iconAttack from '../../assets/attackIcon.png';

function MoveListRow({ move }) {
  return (
    <li className="list-group-item list-group-item-warning" style={{padding: 5 }}>
      <h6
        style={{textTransform: 'capitalize', fontSize: 12, color: '#c42141' }}
      >
        {move} <img src={iconAttack} alt="icon attack" width="20"/>
      </h6>
    </li>
  );
}

export default MoveListRow;
