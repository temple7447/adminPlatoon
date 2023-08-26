import { useState , useEffect} from 'react';

import './App.css';
import axios from 'axios';

function App() {
 const [fullName,setFullName] = useState(' ')
 const [stateCode,setStateCode] = useState(' ')
 const [AmountPay,setAmountPay] = useState(' ')
 const [list, setList] = useState([])
 const [change, setChage] = useState(true)
 
 const fetchData = () => {
  axios
    .get('https://charming-cod-gaiters.cyclic.app/Plantoon')
    .then((res) => {
      setList(res.data);
    })
    .catch((error) => {
      console.log(error);
    });
};

const HandleSubmit = (e)=>{
  e.preventDefault();
  try {
    
  axios.post("https://charming-cod-gaiters.cyclic.app/Plantoon", {
    fullName,stateCode,AmountPay
  })
  .then((res)=>{
    alert("It has been saved successfully");
    console.log(res)
    setChage(!change)
    setFullName(" ")
    setAmountPay(" ")
    setStateCode(" ")
    fetchData();
  })
  .catch((error)=>{
    console.log(error)
  })
  } catch (error) {
    console.log(error)
  }


}




const HandleDelete = (id)=>{

  try {
    
  axios.post("https://charming-cod-gaiters.cyclic.app/PlantoonDelete", {
   id
  })
  .then((res)=>{
    alert("It was successfully deleted");
    console.log(res)
    setChage(!change)
    fetchData();
  })
  .catch((error)=>{
    console.log(error)
  })
  } catch (error) {
    console.log(error)
  }
}

useEffect(() => {
  fetchData(); // Fetch initial data
}, [change]);


  return (
    <div className="container-fluid"> {/* Use container-fluid class for full width */}
      <h1>Platoon Four Payment List</h1>
      <form className='my-4'>
  <div className="form-group">
    <label htmlFor="formGroupExampleInput">FullName</label>
    <input onChange={(e)=> setFullName(e.target.value)} value={fullName} type="text" className="form-control" id="formGroupExampleInput" placeholder="Example input" />
  </div>
  <div className="form-group">
    <label htmlFor="formGroupExampleInput2">State Code</label>
    <input onChange={(e)=> setStateCode(e.target.value)}  value={stateCode} type="text" className="form-control" id="formGroupExampleInput2" placeholder="Another input" />
  </div>
  <div className="form-group">
    <label htmlFor="formGroupExampleInput2">Price</label>
    <input onChange={(e)=> setAmountPay(e.target.value)} value={AmountPay}  type="text" className="form-control" id="formGroupExampleInput2" placeholder="Another input" />
  </div>
  <button onClick={HandleSubmit} className='bg-success text-light my-3'>Submit</button>
</form>
      <table className="table table-striped table-dark table-responsive">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">FullName</th>
            <th scope="col">StateCode</th>
            <th scope="col">Amount</th>
            <th scope="col">Date</th>
            <th scope="col">Option</th>

          </tr>
        </thead>
        <tbody>
        {list.map((items, index)=>{
          const inputDate = new Date(items?.createdAt);
     const formattedDate = `${("0" + (inputDate.getMonth() + 1)).slice(-2)}-${( "0" + inputDate.getDate()  ).slice(-2)}-${inputDate.getFullYear()}`;
    

          return(
            <tr key={items?._id}>
            <th scope="row">{index+1}</th>
            <td>{items?.fullName}</td>
            <td>{items?.stateCode}</td>
            <td>{items?.AmountPay}</td>
            <td>{formattedDate}</td>
            <td>
  <button
    className="btn btn-danger"
    onClick={() => HandleDelete(items._id)}
  >
    Delete
  </button>
</td>
        
           
          </tr>
          )
        
        })}
        
     
     
        </tbody>
      </table>
    </div>
  );
}

export default App;
