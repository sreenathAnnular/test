"use client";

import React, { useState } from 'react';


const RegistrationForm = ({setIsShow}) => {
    console.log(setIsShow)
    const [formData, setFormData] = useState({
        emp_id: '',
        emp_name: '',
        gender: '',
        date_of_joining: '',
        contact_number: '',
        work_email: '',
        active_status: '', // This will be boolean
        designation: '',
        work_location: '',
        password: '',
    });

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        });
    };

    const formatDate = (date) => {
        if (!date) return '';
        const d = new Date(date);
        const year = d.getFullYear();
        let month = '' + (d.getMonth() + 1);
        let day = '' + d.getDate();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        return [year, month, day].join('-');
    };

    const handleSubmit = async (e) => {
        console.log("before try");
        e.preventDefault();
        
        const dataToSend = {
            ...formData,
            date_of_joining: formatDate(formData.date_of_joining),
            active_status: formData.active_status === 'true', // Convert to boolean
        };

        try { 
            const response = await fetch("http://localhost:3000/api/auth/register", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataToSend),
            });

            if (response.ok) {
                console.log('User registered successfully');
                alert("User registered successfully")
                // Optionally reset the form after successful submission
                setFormData({
                    emp_id: '',
                    emp_name: '',
                    gender: '',
                    date_of_joining: '',
                    contact_number: '',
                    work_email: '',
                    active_status: '',
                    designation: '',
                    work_location: '',
                    password: '',
                });
                setIsShow(false)
            } else {
                console.error('Failed to register user');
            }
        } catch (error) {
            console.error("Error:", error);
        }
        console.log("after try");
    };

    return (
        <div>
            <div className='box md:max-h-[600px] overflow-y-auto relative top-1 flex flex-col items-center'>
                <div className='mt-6 min-w-[400px]'>
                    <form onSubmit={handleSubmit} className='grid grid-cols-2 gap-3'>
                        <label htmlFor='emp_id' className='ml-2 font-popins' type="number" required>Employee Id</label>
                        <input id="emp_id" value={formData.emp_id} className='border border-gray-500 mr-2 rounded-md p-1 focus:border-formblue hover:border-formblue' onChange={handleInputChange} />

                        <label htmlFor='date_of_joining' className='font-popins ml-2' type="date" required>Date of Joining</label>
                        <input id="date_of_joining" value={formData.date_of_joining} type="date" className='border border-gray-500 mr-2 rounded-md p-1 focus:border-formblue hover:border-formblue' onChange={handleInputChange} />

                        <label htmlFor='emp_name' className='font-popins ml-2'>Employee Name</label>
                        <input id="emp_name" value={formData.emp_name} className='border border-gray-500 mr-2 rounded-md p-1' type="text" required onChange={handleInputChange} />

                        <label htmlFor='gender' className='font-popins ml-2'>Gender</label>
                        <select id="gender" value={formData.gender} className='border border-gray-500 mr-2 rounded-md p-1' onChange={handleInputChange}>
                            <option value="">Select Gender</option>
                            <option value="M">Male</option>
                            <option value="F">Female</option>
                        </select>

                        <label htmlFor='contact_number' className='font-popins ml-2'>Contact No</label>
                        <input id="contact_number" type="text" value={formData.contact_number} className='border border-gray-500 mr-2 rounded-md p-1' onChange={handleInputChange} />

                       

                        <label htmlFor='work_location' className='font-popins ml-2'>Location</label>
                        <input id="work_location" value={formData.work_location} className='border border-gray-500 mr-2 rounded-md p-1' required onChange={handleInputChange} />

                        <label htmlFor='designation' className='font-popins ml-2'>Designation</label>
                        <input id="designation" value={formData.designation} className='border border-gray-500 mr-2 rounded-md p-1' required onChange={handleInputChange} />

                       
                        <label htmlFor='active_status' className='font-popins ml-2'>Employee Status</label>
                        <select id="active_status" value={formData.active_status} className='border border-gray-500 mr-2 rounded-md p-1' required onChange={handleInputChange}>
                            <option value="">Select Status</option>
                            <option value="true">Active</option>
                            <option value="false">Inactive</option>
                        </select>
                        <label htmlFor='work_email' className='font-popins ml-2'>Work Email</label>
                        <input id="work_email" value={formData.work_email} className='border border-gray-500 mr-2 rounded-md p-1' required onChange={handleInputChange} />
                        <label htmlFor='password' className='font-popins ml-2'>Password</label>
                        <input id="password" type="password" value={formData.password} className='border border-gray-500 mr-2 rounded-md p-1' required onChange={handleInputChange} />

                    </form>

                    <div className='flex mt-3 w-full items-center justify-end'>
                        <button className='mr-2 p-2 rounded-sm h-fit bg-blue-400 text-lg' onClick={handleSubmit}>Register</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RegistrationForm;