"use client";
import React, { useState } from 'react';
import { useRouter } from "next/navigation";
import { api } from "~/trpc/react";
import { toast } from "sonner";
    /* 
    model User {
        id           String        @id @default(cuid())
        username     String        @unique
        firstname    String
        lastname     String
        password     String
        money        Int
        transactions Transaction[]
        sessions     Session[]
        createdAt    DateTime      @default(now())
        updatedAt    DateTime      @updatedAt
    } */

const RegisterPage: React.FC = () => {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [password, setPassword] = useState('');
    const [confirmpassword, setConfirmPassword] = useState('');
    const register = api.auth.register.useMutation();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();


        if (!username || !firstname || !lastname || !password || !confirmpassword) {
        toast.error('Please fill in all fields');
        return;
        }
        
        if (password !== confirmpassword) {
            toast.error('Passwords do not match');
        }
        
        try {
            await register.mutateAsync({
                username,
                firstname,
                lastname,
                password,
            });
            router.push('/login');

        } 
            catch (error) {   
           
            toast.error("An error occurred");
        }
       
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="w-full max-w-md bg-white p-8 rounded shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Username
                </label>
                <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
            </div>
            <div>
                <label htmlFor="firstname" className="block text-sm font-medium text-gray-700">
                First Name
                </label>
                <input
                type="text"
                id="firstname"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
            </div>
            <div>
                <label htmlFor="lastname" className="block text-sm font-medium text-gray-700">
                Last Name
                </label>
                <input
                type="text"
                id="lastname"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
            </div>
            <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
                </label>
                <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
            </div>
            <div>
                <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">
                Confirm Password
                </label>
                <input
                type="password"
                id="confirm-password"
                value={confirmpassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
            </div>
            <button
                type="submit"
                className="w-full py-2 px-4 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
                Register
            </button>
            </form>
        </div>
        </div>
    );
    };

    export default RegisterPage;
