import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

import { Box } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import ToggleList from './ToggleList';

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 60 },
    { field: 'title', headerName: 'Title', width: 300 },
    { field: 'body', headerName: 'Body', width: 950 },
    { field: 'userId', headerName: 'User ID', width: 120 },
  ];

interface Post{
    body:string;
    title:string;
    userId:number;
    id:number;
}

export const MainPage:React.FC = () => {
    const navigate= useNavigate();  
    const [data,setdata]=useState<Post[]>([]);
    useEffect(()=>{
        const details = localStorage.getItem('UserDetails')
        if(!details){
            alert("Enter user details")
            navigate('/')
            
        }

        const fetched=async()=>{
            try{
            const response=await axios.get<Post[]>('https://jsonplaceholder.typicode.com/posts');
            setdata(response.data);
            }catch(error){
             console.error("Error:",error);
            }
        }
        fetched();


    },[navigate])
    
    
    
    
    
  return (
    <>
    <div>
        <div style={{padding:"20px"}}>
        <Box sx={{ height: 400, width: '100%' }}>
            <DataGrid
            rows={data}
            columns={columns}
            checkboxSelection
            />
        </Box>
    </div>
        <div>
            <ToggleList></ToggleList>
        </div>

    </div>

    </>
  )
}
