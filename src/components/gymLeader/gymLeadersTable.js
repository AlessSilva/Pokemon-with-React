import React from 'react';
import GymLeaderRow from './gymLeaderRow';

function GymLeadersTable() {
  function createTable() {
    return [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18].map((element,index)=>{
      return <GymLeaderRow key={index} number={element}/>
    });
  }

  return (
    <div>
      <div className="container" align="center">
        <table className="table table-striped table-bordered">
          <thead className="thead-dark">
            <tr>
              <th>Leader</th>
              <th colSpan="1"></th>
            </tr>
          </thead>
          <tbody>
            {createTable()}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default GymLeadersTable;
