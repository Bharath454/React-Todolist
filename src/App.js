import './App.css';
import { useEffect, useState } from 'react';
import Practice from './Components/Practice';
import Additems from './Components/Additems';
import Searchitem from './Components/Searchitem';
import ApiRequest from './Apirequest';

function App() {

  const API_URL ='http://localhost:3500/name';

  const [name, setName] = useState([])
  const [fetcherr,setFetcherr]=useState(null)
  const [isloading,setIsloading]=useState(true)

  useEffect(()=> {
    const fetchdata= async()  => {
        try{
          const response = await fetch(API_URL);
          if(!response.ok) throw Error('Data is not responding')
          const listitem = await response.json()
          setName(listitem)
        }catch(err){
          setFetcherr(err.message)
        } finally{
          setIsloading(false)
        }
    }

   setTimeout(()=>{
    (async () => await fetchdata())()
   },2000)

  },[])


  const handlechange= async(id)=>{
    const listitems = name.map((item) => (
      item.id === id ? { ...item, checked: !item.checked } : item
    ))

    setName(listitems)
     
    const newitems=listitems.filter(item => item.id === id)

    const updateoption={
      method:'PATCH',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({checked:newitems[0].checked})
    }
    const requrl=`${API_URL}/${id}`
    const result = await ApiRequest(requrl,updateoption)
    if(result) setFetcherr(result)
  }

  const handledelete= async(id)=> {
    const deleteitem = name.filter((item) => (
      item.id !== id
    ))
    setName(deleteitem)
    localStorage.setItem("todolist", JSON.stringify(deleteitem));

    const deleteoption ={method:'DELETE'}
    const requrl = `${API_URL}/${id}`
    const result = await ApiRequest(requrl,deleteoption)      
    if(result) setFetcherr(result)
  }

  const Additem = async (item) => {
   const id = name.length? Number(name[name.length - 1].id) + 1: 1;
    const listitem = {id, checked: false, item }
    const additem = [...name, listitem];
    setName(additem);

    const postoption={
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify(listitem)
    }
    
    const result = await ApiRequest(API_URL,postoption)  
    if(result) setFetcherr(result)
  }


  const [newitem, setnewitem] = useState('');

  function handlesubmit(e) {
    e.preventDefault()
    if (!newitem) return;
    Additem(newitem)
    setnewitem('')
  }

  const [search,setSearch] = useState('')

  return (
    <div className="app-container">
      <div className="app-card">
        <header className="app-header">
          <h1 className="app-title">Todo List 📝</h1>
        </header>

        <section className="app-form-section">
          <Additems
            newitem={newitem}
            setnewitem={setnewitem}
            handlesubmit={handlesubmit}
          />
        </section>

        <section className="app-search-section">
          <Searchitem
            search={search}
            setSearch={setSearch}
          />
        </section>

        <main className="app-content">
          {isloading && <p className="status-message loading">Loading your list...</p>}
          {fetcherr && <p className="status-message error">{`Error: ${fetcherr}`}</p>}
          {!isloading && !fetcherr && 
            <Practice
              name={name.filter(items => ((items.item).toLowerCase()).includes(search.toLowerCase()))}
              setName={setName}
              handlechange={handlechange} 
              handledelete={handledelete}
            />
          }
        </main>

        <footer className="app-footer">
          <p className="footer-count">
            {name.length} list {name.length === 1 ? 'item' : 'items'} remaining
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;