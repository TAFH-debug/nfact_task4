"use client"
import React, {useEffect, useState} from "react";
import {PostData} from "@/app/components/post";
import axiosInstance from "@/app/axiosInstance";
import Link from "next/link";
import {useRouter} from "next/navigation";

export default function Page() {
    const [posts, setPosts] = useState<PostData[]>([])
    const router = useRouter();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [userId, setId] = useState(0);

    useEffect(() => {
        async function data() {
            const id = (await axiosInstance.get(`/user/me`)).data.id;
            setId(id);
            setPosts((await axiosInstance.get(`/posts/user/${id}`)).data.posts);
        }
        data().catch((e) => {
            router.push("/login");
        })
    }, [])

    const [created, setCreated] = useState(false)

    const addPost = () => {
        axiosInstance.post("/posts/add", {
            title,
            body: description,
            userId
        }).then(() => {
            setCreated(true);
        })

        setPosts([...posts, {
            title: title,
            body: description,
            id: 252,
            tags: [],
            reactions: { likes: 0, dislikes: 0 },
            views: 0,
            userId: userId
        }])

        setTitle("");
        setDescription("");
    }

    return (
        <main className="min-h-screen bg-gray-50 dark:bg-gray-900 flex justify-center">
            <div className="flex flex-col items-center md:w-2/5 w-full m-4">
                <div className="w-full m-6">
                    <label className="block dark:text-gray-300 font-bold text-2xl text-black w-full text-center">
                        Create post
                    </label>
                    <div className="flex items-center flex-col">
                        <label className="w-full text-sm font-medium text-gray-900 dark:text-gray-300">Title</label>
                        <input className="m-2 flex h-10 w-full rounded-md border dark:bg-black text-black dark:text-gray-300 px-3 py-4 text-xl
                    ring-offset-background placeholder:text-muted-foreground
                    focus-visible:outline-none focus:border-black dark:focus:border-white"
                               onChange={(e) => setTitle(e.target.value)}
                               value={title}
                        />
                    </div>
                    <div className="my-2 flex items-center flex-col">
                        <label className="w-full text-sm font-medium text-gray-900 dark:text-gray-300">Content</label>
                        <textarea className="m-2 flex w-full rounded-md border dark:bg-black text-black dark:text-gray-300 px-3 py-4 text-xl
                    ring-offset-background placeholder:text-muted-foreground
                    focus-visible:outline-none focus:border-black dark:focus:border-white"
                                  onChange={(e) => setDescription(e.target.value)}
                                  value={description}
                        />
                    </div>
                    <input className="w-full rounded-lg bg-black dark:bg-gray-300 text-gray-300 dark:text-black p-2
                text-sm font-medium cursor-pointer hover:bg-gray-800" type="submit" value="Submit" onClick={addPost}/>
                    {
                        created ? <label className="text-green-500 text-sm">Post created!</label> : <></>
                    }
                </div>
                <div className="w-full m-6">
                    <label className="block dark:text-gray-300 font-bold text-2xl text-black w-full text-center">
                        Your posts
                    </label>
                    {
                        posts.map((post) => <MyPost key={post.id} {...post} />)
                    }
                </div>
            </div>
        </main>
    )
}

function CustomButton({children, className, onClick}: {children: string, className: string, onClick: () => void}) {
    return (
        <button className={className + " m-5 text-black dark:text-white"} onClick={onClick}>{children}</button>
    )
}

function MyPost(post: PostData) {
    const [isEdit, setEdit] = useState(false);
    const [deleted, setDeleted] = useState(false);
    const [title, setTitle] = useState(post.title);
    const [body, setBody] = useState(post.body);

    const save = () => {
        axiosInstance.put(`/posts/${post.id}`, {
            title,
            body
        })
    }

    const del = () => {
        setDeleted(true)
        axiosInstance.delete(`/posts/${post.id}`)
    }

    if (deleted) return <></>
    return (
        <div className="flex bg-white rounded-lg shadow-sm dark:bg-gray-950 m-2 justify-between">
            <div className="p-4">
                <Link href={isEdit ? "" : "/posts/" + post.id} className="block" prefetch={false}>
                    {
                        isEdit ? <input className="appearance-none p-2 w-full outline-0 bg-transparent text-xl font-bold mb-2 dark:text-white rounded-lg
                            border-black dark:border-white border-[1px] text-black" value={title}
                                        onChange={(e) => setTitle(e.target.value)}/> :
                            <h3 className="text-xl font-bold mb-2 dark:text-white text-black">{title}</h3>
                    }
                    {
                        isEdit ? <textarea className="appearance-none no-scrollbar p-2 w-full outline-0 bg-transparent mb-2 text-gray-500 dark:text-gray-400 rounded-lg
                            border-black dark:border-white border-[1px]" value={body} onChange={(e) => setBody(e.target.value)}/> :
                            <p className="text-gray-500 dark:text-gray-400 line-clamp-2">
                                {body}
                            </p>
                    }
                    <div className="flex">
                        {
                            post.tags.map((tag) => (
                                <div key={tag}
                                     className="rounded-full bg-gray-400 pl-2 pr-2 pb-1 pt-1 mr-2 mt-2 text-gray-800 text-xs">{tag}</div>
                            ))
                        }
                    </div>
                </Link>
            </div>
            <div className="flex flex-col justify-center items-center">
                <CustomButton className="hover:text-green-500 dark:hover:text-green-500" onClick={() => {
                    if (isEdit) {
                        save()
                    }
                    setEdit(!isEdit)
                }}>{
                    isEdit ? "Save" : "Edit"
                }</CustomButton>
                <CustomButton className="hover:text-red-500 dark:hover:text-red-500" onClick={del}>Delete</CustomButton>
            </div>
        </div>
    )
}
