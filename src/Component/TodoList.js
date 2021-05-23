// import React,{Component} from 'react';

// class TodoList extends Component{

//     render(){
//         const styles ={
//             todoList:{
//                 padding: '4px',
//                 border: '3px',
//                 color: 'brown',
//                 background: '#fff',
//                 border: 'solid 1px #e9e9e9',
//                 cursor: 'pointer',
//                 boxshadow: '0px 0px 14px 0px rgba(0,0,0,0.1)',
//                 transition: 'transform .2s ease'
//             }

//         }
//         return(
//             <div className="list-group " style={styles.todoList}>
//                 {this.props.items.map((item,index) =>(
//                     <div  className="list-group-item"  key={index}>
//                     <h1 className="font-smaller bg-black">{item.todo}</h1>
//                     <button className="btn btn-danger  btn-sm   float-right">Delete</button>
//                     </div>
//                 ))}
//             </div>
//         )
//     }

// }

// export default TodoList;

import React ,{useState} from "react";

function TodoList(props) {
    const [done,setDone]=useState(false);
  return (
    <div className={done?"completed":""} >
        <h2 className="card-text">{props.items}</h2>
        <button
          className="btn btn-danger  btn-sm   float-right fa fa-trash"
          onClick={props.delete}
        ></button>
        <button
          className="btn btn-info btn-sm float-right mr-1 fa fa-edit"
          onClick={props.edit}
        ></button>

        <button className={done? "btn btn-sm bg-success mr-1 float-right fa fa-check": "btn btn-sm mr-1 bg-light float-right fa fa-times"}
        onClick={()=>setDone(!done)}></button>
        <br />
      </div>
  );
}

export default TodoList;
