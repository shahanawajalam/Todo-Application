// import React, { Component } from 'react';
// import TodoList from './Component/TodoList';

// class App extends Component {

//   constructor(props){
//       super(props);
//       this.state = {
//           items: [{text:'',}],
//           noteText : '',
//       };

//       this.handleChange = this.handleChange.bind(this);
//       this.handleSubmit = this.handleSubmit.bind(this);
//   }

//   handleChange(e){
//     this.setState({noteText: e.target.value})
//   }

//   handleSubmit(e){
//       e.preventDefault();
//       if(!this.state.noteText.length){
//         return;
//       }

//       const newItem ={
//         text: this.state.noteText
//       };

//       this.setState(prevState => ({
//           items: prevState.items.concat(newItem),
//           noteText: ''
//       }));
//   }

// handleDelete(index){
//   const updated=this.state.items.splice(index,1)
//   this.setState({
//     items:updated
//   })
// }
//   render() {
//     return (
// <div className="container-fluid">
//     <div className="container" >
//         <div className="navbar bg-info text-uppercase">Todo Application</div>
//       <form className="" >
//         <input type="text"
//                placeholder="What needs to be done? ..."
//                ref={((input) => {this.textInput = input})}
//                className="mt-2 w-100"
//                value={this.state.noteText}
//                onChange={this.handleChange}
//         />
//          <div  className="btn btn-danger btn-block mt-2 mb-2" onClick={this.handleSubmit}> + </div>
//       </form>
//       <TodoList items={this.state.items} delete={this.handleDelete}/>
//     </div>

// </div>
//     );
//   }

// }

// export default App;

import React, { useState } from "react";
import TodoList from "./Component/TodoList";
import "./App.css";

function App() {
  const [input, setInput] = useState("");
  const [todo, setTodo] = useState([]);
  const [edit, setEdit] = useState(true);
  const [ind, setInd] = useState(null);
  const [search, setSearch] = useState("");
  const [isNight, setIsNight] = useState(true);

  const handleChange = (event) => {
    setInput(event.target.value);
  };

  const searchHandler = (event) => {
    setSearch(event.target.value);
  };

  const searchButtonHandler = () => {
    if (search.length > 0) {
      setTodo(
        todo.filter((i) => {
          return i.name.match(search);
        })
      );
    }
  };

  // const searchButtonHandler=() => {
  //   const results = todo.filter(e =>
  //     e.name.toLowerCase().includes(search)
  //   );
  //   setTodo(results);
  // }

  const handleSubmit = () => {
    if (input === "") {
      return console.log("error");
    } else if (input && !edit) {
      setTodo(
        todo.map((e) => {
          if (e.id === ind) {
            return { ...e, name: input };
          }
          return e;
        })
      );

      setEdit(true);
      setInput("");
      setInd(null);
    } else {
      const allInput = { id: new Date().getTime().toString(), name: input };
      setTodo([...todo, allInput]);
      setInput("");
    }
  };
  const handleDelete = (ind) => {
    const newL = todo.filter((elem) => {
      return ind !== elem.id;
    });
    setTodo(newL);
  };

  const handleEdit = (id) => {
    let editElem = todo.find((elem) => elem.id === id);
    console.log(editElem);
    setEdit(false);
    setInput(editElem.name);
    setInd(id);
  };

  // const todoList = todo.map((e) => {
  //   return (
  //     <div className="listItems" key={e.id}>
  //       <TodoList
  //         items={e.name}
  //         delete={() => handleDelete(e.id)}
  //         edit={() => handleEdit(e.id)}
  //       />
  //     </div>
  //   );
  // });

  const todoList = todo.map((e) => {
    return (
      <li className="list-group-item" key={e.id}>
        <TodoList
          items={e.name}
          delete={() => handleDelete(e.id)}
          edit={() => handleEdit(e.id)}
        />
      </li>
    );
  });

  const clearAll = () => {
    setTodo([]);
  };
  return (
    <div className={isNight?"":"bg-dark text-white"}>
      <nav className="navbar">
        <div className="navbar-brand mb-0 h1">TODO APPLICATION</div>

        <div className="night inline-block">
            <i
              class={
                isNight
                  ? "fa fa-toggle-on  "
                  : "fa fa-toggle-off "
              }
              onClick={() => setIsNight(!isNight)}
            ></i>
            <h8>Night Mode</h8>
        </div>


              <div className="search-box inline-block">
          <i
            class="fa fa-search float-right"
            aria-hidden="true"
            onClick={searchButtonHandler}
          ></i>
          <input
            type="text"
            placeholder="Search...."
            onChange={(e) => searchHandler(e)}
            value={search}
          />
        </div>
      </nav>
      <div className="show">
        <h1 id="WelcomeNote">Welcome to Todo App</h1>
        <form className="form mt-3">
          <div className="addTodo">Add Your Todo</div>

          <input
            className="inputForm w-100"
            type="text"
            placeholder="What needs to be done? ..."
            onChange={(e) => handleChange(e)}
            value={input}
          />
          {edit ? (
            <div
              className="submitButton btn bg-primary mb-2 fa fa-plus"
              onClick={handleSubmit}
            ></div>
          ) : (
            <div
              className="submitButton btn btn-dark mb-2 fa fa-edit"
              onClick={handleSubmit}
            ></div>
          )}
        </form>
        <h3>Your Todos</h3>
        <ol className="list-group list-group flush">{todoList}</ol>
      </div>
      <button
        className="clearButton btn btn-block mt-2 mb2 btn-danger"
        onClick={clearAll}
      >
        Clear All
      </button>
    </div>
  );
}

export default App;
