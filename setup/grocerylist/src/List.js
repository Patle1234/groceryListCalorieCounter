import React from 'react'
 //import {FaEdit,FeTrash} from 'react-icons/fa'

const List= ({items,removeItem,editItem}) => {
    return <div className="grocery-list">
        {items.map((items)=>{
            const {id,title}=items
            return <article key={id} className="grocery-item">
                <p className='title'>{title}</p>
                <div className="btn-container">

                    <button className="edit-btn" type='button' onClick={()=>editItem(id)}>
                        Edit
                    </button>

                    <button className="delete-btn" type='button' onClick={()=>removeItem(id)}>
                        Delete
                    </button>

                </div>
            </article>
        })}

    </div>

}

export default List