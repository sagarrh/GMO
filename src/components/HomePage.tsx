import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { TextField } from '@mui/material';
import Button from '@mui/material/Button';



const HomePage:React.FC  = () => {
  const[name,setName]=useState('');
  const[phone,setPhone]=useState('');
  const[email,setEmail]=useState('');

  const navigate= useNavigate();

  const HandlesSubmission=(event:React.FormEvent)=>{
    event.preventDefault();
    if(name && email && phone){
      localStorage.setItem('UserDetails',JSON.stringify({name,phone,email}));
      navigate("/mainpage");
    }else{
      alert("Please fill in all the details");
    }

  }
  return (
    <>
   <h1 style={{textAlign:'center', marginBottom:'20px'}}>Enter Your Details</h1>
   <form onSubmit={HandlesSubmission}>
   <div style={{display:'flex', justifyContent:"center", alignItems:"center", flexDirection:'column'}} >
          <div style={{margin:"10px"}}>
          <label>Name :</label>
          <TextField type='text' value={name} id="outlined-basic"  variant="outlined" onChange={(e)=>setName(e.target.value)}/>
          </div>
          
            <div style={{margin:"10px"}}>
          <label>Phone :</label>
          <TextField
          id="outlined-number"
          label="Number"
          value={phone}
          onChange={e=>setPhone(e.target.value)}
          type="tel"
        /></div>
        
        <div style={{margin:"10px"}}><label>Email :</label>
         <TextField
          required
          type='email'
          value={email}
          id="outlined-required"
          
          onChange={(e) => setEmail(e.target.value)}
         
        />

        </div>
      
        
        <div>
        <Button type='submit' onSubmit={HandlesSubmission} variant="contained">Submit</Button>
        </div>
        </div>
   </form>
    </>
  )
}

export default HomePage;