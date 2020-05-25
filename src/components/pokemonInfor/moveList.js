import React, { useState } from 'react';
import MoveListRow from './moveListRow';

function MoveList({ moves }) {
  const [search, setSearch] = useState('');

  function createListMoves() {
    if (moves) {
      let movies_search = search
        ? moves.filter((move) => move.includes(search))
        : moves; 

      return movies_search.map((move, index) => {
        return <MoveListRow key={index} move={move} />;
      });
    }
  }

  function handlerSearch(event) {
    setSearch(event.target.value.replace(' ', '').toUpperCase());
  }

  return (
    <>
      <div className="row" style={{ marginTop: 15 }}>
        <div className="container">
          <div className="input-group mb-3">
            <input
              value={search}
              onChange={handlerSearch}
              type="text"
              className="form-control"
              placeholder="Search for one move"
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
            />
          </div>
        </div>
      </div>
      <div className="row ">
        <div className="container">
          <ul
            className="list-group"
            style={{ fontSize: 12, height: '200px', overflow: 'scroll' }}
          >
            {createListMoves()}
          </ul>
        </div>
      </div>
    </>
  );
}

export default MoveList;
