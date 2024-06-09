'use client'
import Post, {PostData, PostUser} from "@/app/components/post";
import {useEffect, useState} from "react";
import axiosInstance from "@/app/axiosInstance";

async function getUser(id: number) {
    return (await axiosInstance.get(`/users/${id}`)).data
}

export default function PostPage() {
    const [posts, setPosts] = useState<PostUser[]>([]);
    const [size, setSize] = useState<number>(5)

    async function getData() {
        const posts = (await axiosInstance.get("/posts")).data.posts
        const data: PostUser[] = [];

        let cnt = 0;
        for(const post of posts) {
            if (cnt >= size) break;
            data.push({
                post: post,
                user: await getUser(post.userId)
            })
            cnt++;
        }
        return data
    }

    useEffect(() => {
        async function run() {
            const p = (await getData())
            setPosts(p)
        }
        run()
    }, [size])

    if (posts.length != size) return (
        <main className="flex justify-center items-center bg-gray-50 dark:bg-gray-900 text-black dark:text-white text-2xl
        min-h-screen font-bold">
            Loading...
        </main>
    )
    return (
        <main className="flex flex-1 bg-gray-50 dark:bg-gray-900 min-h-screen items-center flex-col">
            <div className="flex w-full md:w-2/5 min-h-screen flex-col items-center">
                {posts.map((post, index) => (
                    index >= size ? <></> :
                        <Post key={post.post.id} {...post}/>
                ))}
                <button onClick={() => setSize(size + 3)}
                        className="m-3 p-2 w-1/5 rounded-lg bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 hover:dark:bg-gray-200">
                    Show more
                </button>
            </div>
        </main>
    )
}