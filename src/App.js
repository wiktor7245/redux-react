import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addBird, incrementBird } from "./store/birds/birds";

function App() {
  const [birdName, setBird] = useState("");
  const birds = [...useSelector((state) => state.birds)].sort((a, b) => {
    return a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1;
  });
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (birdName !== "") {
      dispatch(addBird(birdName));
      setBird("");
    }
  };

  return (
    <div className="wrapper">
      <h1>Bird list</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Add bird</p>
          <input
            type="text"
            onChange={(e) => setBird(e.target.value)}
            value={birdName}
          />
        </label>
        <div>
          <button type="submit">Add</button>
        </div>
      </form>
      <ul>
        {birds.map((bird) => (
          <li key={bird.name}>
            <h3>{bird.name}</h3>
            <p>Views: {bird.views}</p>
            <button onClick={() => dispatch(incrementBird(bird.name))}>
              <span role="img" aria-label="add">
                +
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
