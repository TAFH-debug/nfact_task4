"use client"
import axiosInstance from "@/app/axiosInstance";
import {useEffect, useState} from "react";
import {PostUser} from "@/app/components/post";

type State = PostUser

async function getPost(id: string) {
    return (await axiosInstance.get(`/posts/${id}`)).data
}

async function getUser(id: number) {
    return (await axiosInstance.get(`/users/${id}`)).data
}

export default function Page({params: { slug }}: {params: {slug: string}}) {
    const [state, setState] = useState<State | null>(null)
    useEffect(() => {
        async function run() {
            const post = (await getPost(slug))
            const user = await getUser(post.userId)
            setState({
                post,
                user
            })
        }
        run()
    }, [])

    if (state === null) return (
        <main className="flex justify-center items-center dark:bg-gray-900 min-h-screen text-black dark:text-white text-2xl">
            Loading...
        </main>
    )

    return (
        <main className="min-h-screen bg-gray-200 dark:bg-gray-900">
            <article className="prose prose-gray max-w-3xl md:mx-auto dark:prose-invert mx-2">
                <div className="space-y-2 not-prose">
                    <h1 className="text-4xl font-extrabold tracking-tight dark:text-white text-black py-3 text-center">{state.post.title}</h1>
                    <div className="relative h-[400px] md:h-[500px] overflow-hidden rounded-lg">
                        <img
                            src="/default.jpg"
                            alt="Featured Image"
                            width={1200}
                            height={500}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                            <img src="/default.jpg" alt="Author Avatar" width={32} height={32}
                                 className="rounded-full"/>
                            <span className="text-sm font-medium dark:text-white text-black">{state.user.firstName + " " + state.user.lastName}</span>
                        </div>
                        <span
                            className="text-sm text-gray-500 dark:text-gray-400">{state.user.address.country}, {state.user.address.city}, {state.user.address.address}</span>
                    </div>
                </div>
                <p className="my-3 dark:text-white text-black">
                    {state.post.body}
                </p>
            </article>
        </main>
    )
}