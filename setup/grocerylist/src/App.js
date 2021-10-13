import logo from './logo.svg';
import List from './List'
import Alert from './Alert'
import './App.css';
import React, {useEffect,useState} from 'react'

const getLocalStorage=()=>{
  let list=localStorage.getItem('list')
  if(list){
    return JSON.parse(localStorage.getItem('list'))
  }else{
    return []
  }
}

function App() {
  const [name,setName]=useState('')
  const [list,setList]=useState(getLocalStorage())
  const[isEditing,setIsEditing]=useState(false)
  const [editID,setEditID]=useState(null)
  const [alert,setAlert]=useState({show:true,msg:'',type:''})
  const handleSubmit=(e) =>{
    e.preventDefault()
    if(!name){
      //display alert. Doesn't state
      setAlert({show:true,msg:'please enter value',type:'danger'})
    }else if(name && isEditing){
      //deal with edit
      setList(list.map((item)=>{
        if(item.id=editID){
          return{...item,title:name}
        }
        return item
      }))
      setName('')
      setEditID(null)
      setIsEditing(false)
      setAlert({show:true,type:"succes",msg:'value changed'})
    }else{
      setAlert({show:true,type:'success',msg:'item added to the list'})
      //show alerts
      const newItem={id:new Date().getTime().toString(),title:name}
      setList([...list,newItem])
      setName('')
    }
  }

  const showAlert=(show=false,type="",msg="")=>{
    setAlert({show:show,type:type,msg:msg})
  }

  const clearList=()=>{
    showAlert(true,'danger','empty list')
    setList([]);
  }

  const removeItem=(id)=>{
    setAlert({show:true,type:'danger',msg:'remove item'})
    setList(list.filter((item)=>item.id !== id))
  }

  const editItem=(id) =>{
    const specificItem=list.find(item=>item.id=id)
    setIsEditing(true)
    setEditID(id)
    setName(specificItem.title)
  }

  useEffect(()=>{
    localStorage.setItem('list',JSON.stringify(list))
  },[list])
  return <section className="section-center">

    <form className="grocery-form" onSubmit={handleSubmit}>
      {alert.show && <Alert{...alert} removeAlert={showAlert} list={list}/>}
      <h3>Grocery List Calorie Tracker</h3>
      <div className="">
        <input type="text" className="grocery" placeholder="Enter Item" value={name} onChange={(e) => setName(e.target.value)}></input>
        <button type="submit" className="submit-btn">{isEditing ? 'edit' :'submit'}</button>
      </div>
    </form>

    {list.length>0 && (    
    <div className="grocery-container">
      <List items={list} removeItem={removeItem} editItem={editItem}/>
      <button type="button" className="clear-btn" onClick={clearList}>clear items</button>
    </div>)}


  </section>

}

export default App;
