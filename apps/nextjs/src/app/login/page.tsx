"use client";

import React, { useState } from 'react';
import { useRouter } from "next/navigation";
import { api } from "~/trpc/react";
import { toast } from "sonner";
import { set } from 'zod';

const LoginPage: React.FC = () => {
    const router = useRouter();
        
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const login = api.auth.login.useMutation();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

    
        if (!username || !password) {
        alert('Please enter both username and password');
        return;
        }

        if (username === "" || password === "") {
            toast.error("Please fill in all fields");
        }
        else{

        try {
            const result= await login.mutateAsync({
                username,
                password,
            });
            toast.success("Login successful");
            localStorage.setItem('token', result.token);
            
            setTimeout(() => {
            router.push('/');
            },1000)
        } 
        catch (error) {
            toast.error("An error occurred");
        }
    }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="w-full max-w-md bg-white p-8 rounded shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
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
            <button
                type="submit"
                className="w-full py-2 px-4 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
                Login
            </button>
            </form>
        </div>
        </div>
    );
    };

    export default LoginPage;
