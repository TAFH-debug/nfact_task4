"use client"
import {useState} from "react";
import axiosInstance from "@/app/axiosInstance";
import {redirect, useRouter} from "next/navigation";

type Credentials = {
    username: string,
    password: string,
    error: string
}

export default function Page() {
    const [state, setState] = useState<Credentials>({
        username: "",
        password: "",
        error: ""
    });

    const router = useRouter()

    const sendLogin = () => {
        axiosInstance.post("/auth/login", {
            username: state.username,
            password: state.password,
        }).then(
            (response) => {
                localStorage.setItem("token", response.data.token);
                router.push('/posts')
            }
        ).catch(
            (response) => {
                setState({...state, error: "Invalid credentials!"});
            }
        )
    }

    return (
        <main className="flex bg-gray-300 dark:bg-gray-900 min-h-screen w-full items-center justify-center">
            <div className="my-2 flex rounded-lg bg-white dark:bg-black flex-col justify-center items-center p-3">
                <label className="dark:text-gray-300 font-bold text-2xl text-black">Sign In</label>
                <div className="flex items-center flex-col">
                    <label className="w-full text-sm font-medium text-gray-900 dark:text-gray-300">Login</label>
                    <input className="m-2 flex h-10 w-full rounded-md border dark:bg-black text-black dark:text-gray-300 px-3 py-4 text-xl
                    ring-offset-background placeholder:text-muted-foreground
                    focus-visible:outline-none focus:border-black dark:focus:border-white"
                           onChange={(e) => setState({...state, username: e.target.value})}/>
                </div>
                <div className="my-2 flex items-center flex-col">
                    <label className="w-full text-sm font-medium text-gray-900 dark:text-gray-300">Password</label>
                    <input type="password" className="m-2 flex h-10 w-full rounded-md border dark:bg-black text-black dark:text-gray-300 px-3 py-4 text-xl
                    ring-offset-background placeholder:text-muted-foreground
                    focus-visible:outline-none focus:border-black dark:focus:border-white"
                           onChange={(e) => setState({...state, password: e.target.value})}/>
                </div>
                <input className="w-full rounded-lg bg-black dark:bg-gray-300 text-gray-300 dark:text-black p-2
                text-sm font-medium cursor-pointer hover:bg-gray-800" type="submit" value="Submit" onClick={sendLogin}/>
                <label className="text-sm text-gray-500 my-3">
                    Don&#x2019;t have an account? <a className="text-black dark:text-white hover:underline" href="/register">Sign up</a>
                </label>
                {
                    state.error === "" ? <></> : <label className="text-sm text-red-500 my-3">
                        {state.error}
                    </label>
                }
            </div>
        </main>
    )
}