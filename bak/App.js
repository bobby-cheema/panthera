import React, { useReducer, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Grid, Paper, Typography } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";

const Box = ({ value }) => {
  console.log("DEBUG", value);
  const styles = useStyles();
  return (
    <div className={styles.box}>
      <Paper className={styles.box}>
        {value.b}
        {value.i}
      </Paper>
    </div>
  );
};

const reducerfunc = (state, action) => {
  const { type, payload } = action;
  console.log("DEBUG:", type, payload);
  switch (type) {
    case "ADD_POSITION":
      return { ...state, ...payload };
    case "MOVE_LEFT":
      return state;
    case "MOVE_RIGHT":
      return state;
    case "MOVE_FORWARD":
      return state;
    case "MOVE_BACKWARD":
      return state;
    case "TURN_LEFT":
      const currentdir = state.dir;
      switch (currentdir) {
        case "east":
          return { ...state, dir: "north" };
        case "west":
          return { ...state, dir: "south" };
        case "north":
          return { ...state, dir: "west" };
        case "south":
          return { ...state, dir: "east" };
        default: {
          return state;
        }
      }

    case "TURN_RIGHT":
      const rightdir = state.dir;
      switch (rightdir) {
        case "east":
          return { ...state, dir: "south" };
        case "west":
          return { ...state, dir: "north" };
        case "north":
          return { ...state, dir: "east" };
        case "south":
          return { ...state, dir: "west" };
        default: {
          return state;
        }
      }

    case "ERR":
      return { ...state, ...payload };
    case "MOVE":
      const direction = state.dir;
      if (direction === "east") {
        let myx = state.X;
        if (myx - 1 < 0 || myx - 1 > 4) {
          return { ...state, err: "this move will drop you off the table" };
        } else {
          return { ...state, X: myx - 1 };
        }
      } else if (direction === "west") {
        console.log("DEBUG", state.X, state.dir);
        let myx = parseInt(state.X);
        if (myx + 1 < 5) {
          return { ...state, X: myx + 1 };
        } else {
          return { ...state, err: "This move will drop you off west side" };
        }
      } else if (direction === "north") {
        let myy = parseInt(state.Y);
        if (myy + 1 < 5) {
          return { ...state, Y: myy + 1 };
        } else {
          return { ...state, err: "This move will drop you from north side" };
        }
      } else if (direction === "south") {
        let myy = parseInt(state.Y);
        if (myy - 1 < 0 || myy + 1 > 4) {
          return { ...state, err: "This move will drop you from south side" };
        } else {
          return { ...state, Y: myy - 1 };
        }
      }
      return state;
    default:
      return state;
  }
};
const initialvalue = {
  X: "",
  Y: "",
  dir: "",

  show: false,
  err: "",
};

function App() {
  const [state, dispatch] = useReducer(reducerfunc, initialvalue);
  const [X, setX] = useState();
  const [Y, setY] = useState();
  const [dir, setdir] = useState();
  const [show, setshow] = useState(false);
  const [err, seterr] = useState("");
  const styles = useStyles();

  const setrobo = (x, y, dir) => {
    console.log(x, y, dir);
    if (x > 4 || x < 0 || y > 4 || y < 0) {
      console.log("This will drop you off the table");
      dispatch({
        type: "ERR",
        payload: { err: "Choose position on table 0-4 " },
      });
    } else {
      dispatch({
        type: "ADD_POSITION",
        payload: { X: x, Y: Y, dir: dir },
      });
    }
    setX("");
    setY("");
    setdir("");
  };
  const robomove = () => {
    const direction = state.dir;
    if (direction === "east") {
      //do east
    } else if (direction === "west") {
      //west
    } else if (direction === "north") {
      //north
    } else if (direction === "south") {
      //south
    }
  };

  const Left = () => {
    return (
      <Button
        variant="contained"
        color="primary"
        onClick={() => dispatch({ type: "TURN_LEFT" })}
      >
        TURN LEFT
      </Button>
    );
  };

  const Right = () => {
    return (
      <Button
        variant="contained"
        color="primary"
        onClick={() => dispatch({ type: "TURN_RIGHT" })}
      >
        TURN RIGHT
      </Button>
    );
  };

  const Move = () => {
    return (
      <Button
        variant="contained"
        color="primary"
        onClick={() => dispatch({ type: "MOVE" })}
      >
        MOVE
      </Button>
    );
  };

  const Report = () => {
    return <h1> I am report </h1>;
  };
  const handledir = (event) => {
    setdir(event.target.value);
  };

  const Place = () => {
    return (
      <div style={{ padding: 80 }}>
        <Paper>
          <Grid container xs={12}>
            <TextField
              label="Enter X "
              value={X}
              onChange={(e) => {
                setX(e.target.value);
              }}
            />

            <TextField
              autoFocus
              label="Enter Y"
              value={Y}
              onChange={(e) => {
                setY(e.target.value);
              }}
            />

            <TextField
              autoFocus
              label="Direction"
              value={dir}
              onChange={(e) => {
                handledir(e);
              }}
            />

            <Button
              variant="contained"
              color="primary"
              onClick={() => setrobo(X, Y, dir)}
            >
              Go
            </Button>
            {show && (
              <h6>
                X:{X} Y : {Y} Vdirection {dir}
              </h6>
            )}
          </Grid>
        </Paper>
      </div>
    );
  };

  return (
    <div style={{ margin: 30, padding: 30 }}>
      <Grid container>
        <Grid item>
          <Typography>Enter X </Typography>
          <Place />
        </Grid>
      </Grid>
      <Grid container spacing={5}>
        <Grid item>
          <Left />
        </Grid>
        <Grid item>
          <Move />
        </Grid>

        <Grid item>
          <Right />
        </Grid>
      </Grid>

      {state.Y && (
        <h1>
          Current Position {state.X},{state.Y} Direction {state.dir}
        </h1>
      )}

      {state.err && <h1 style={{ color: "red" }}>ERROR {state.err}</h1>}
    </div>
  );
}

const useStyles = makeStyles({
  container: {
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    border: 0,
    borderRadius: 3,
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    color: "black",
    height: 48,
    padding: "0 30px",
  },
  header: {
    background: "orange",
    color: "black",
  },
  box: {
    height: 50,
    width: 50,
    border: 1,
    flexDirection: "row",
  },
});

export default App;
