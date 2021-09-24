import React, { Fragment, useState, useEffect} from 'react'
import "./App.css"

const getLocalStorage = ()=>{
  let list = localStorage.getItem('lists');
  console.log(list);
  if(list){
    return JSON.parse(localStorage.getItem('lists'));
  }else{
    return [];
  }
}


export default function App() {

    const [inputData, setInputData]= useState('');
    const [items, setItems]= useState(getLocalStorage());
    const [toggleSubmit, setToggleSubmit] = useState(true);
    const [updateItem, setUpdateItem] = useState(null);

  
    const addItem=()=>{
            if(!inputData){

            }
            else{
                  const allInputData = {id:new Date().getTime().toString(), name : inputData}
                  setItems([...items,  allInputData]);
                  setInputData('');
            }
    }

    const deleteItem=(index)=>{
      const updatedItems = items.filter((elem)=>{
                return index != elem.id;
      });
      setItems(updatedItems);
    }

    
    const editItem=(id)=>{
            let newEditItem = items.find((elem)=>{
              return elem.id === id
            });
            setToggleSubmit(false);
            setInputData(newEditItem.name);
            setUpdateItem(id);
          }


    const UpdateItem=()=>{
                 if(!inputData){

                 }else if(inputData && !toggleSubmit){
                   setItems(
                     items.map((elem)=>{
                           if(elem.id===updateItem){
                             return{...elem, name:inputData}
                           }
                           return elem;
                     })
                   )
                 }
                 setInputData("");
                 setToggleSubmit(true);
                 setUpdateItem('null');
    } 
    
    

    const removeAll=()=>{
      setItems([]);
    }


    useEffect(() => {
     localStorage.setItem('lists', JSON.stringify(items))
    }, [items]);

    


    return (
        <Fragment>
            <div className="main-div">
                 <div className="child-div">
                    
                    <figure>
                         <figcaption>Add Your List Here</figcaption>
                    </figure>
                    
                    <div className="addItems">
                      
                       <input type="text" placeholder="Add Items..."
                         value = {inputData}
                         onChange={(e)=>{setInputData(e.target.value)}}>
                       </input>
                       
                       {
                          toggleSubmit ? <i className="fa fa-plus add-btn" title="Add Item" onClick={addItem}></i>:
                          <i className="far fa-edit add-btn" title="Update Item" onClick={UpdateItem}></i>

                       }
                       
                    </div>
                   
                    <div className="showItems">

                         {
                           items.map((elem)=>{
                             return(
                               <div className="eachItem" key={elem.id}>
                               <h3>{elem.name}</h3>
                               <div className="todo-btn">
                                 <i className="far fa-edit add-btn" title="Edit Item" onClick={()=>editItem(elem.id)}></i>
                                 <i className="far fa-trash-alt add-btn" title="Delete Item" onClick={()=>deleteItem(elem.id)}></i>
                               </div>
                               
                               
                            </div>
                             )
                           })
                         }
                         
                    </div>
                    
                    <div className="showItems">
                       <button className="btn effect04" data-sm-link-text="Remove All" onClick={removeAll}><span>CHECK LIST</span></button>
                    
                    </div>

                 </div>
                
            </div>
        </Fragment>
    )
}