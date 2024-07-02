"use client"
import React, { useEffect, useState } from 'react';
import { DataTable } from './data-table';
import { columns } from './column';
//import Sidebar from '../../../components/sidebar.jsx'
import { API } from '../../../config';

import {getEmp_details} from '../../../actions'

 

const Page =  () => {

    const [emp_list, setEmp_list] = useState([])
    
  useEffect(() => {
    const fetchData = async () => {
        try {
            console.log("requested");
            const response = await fetch(`${API}/auth/users`);
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            const data = await response.json(); 
            setEmp_list(data);
            return data; // Return the fetched data
        } catch (error) {
            console.error('There has been a problem with your fetch operation:', error);
            return []; // Return an empty array or handle error as needed
        }
    };

    fetchData();
  }, []);

  return (
    <div className="content-section bg-[rgb(247, 249, 253)] w-full p-5">
      <p className='text-[20px] font-bold'>Employee List</p>
      <div className="container mx-auto py-5">
        <DataTable columns={columns} data={emp_list} />
      </div>
    </div>
  );
}

export default Page;
