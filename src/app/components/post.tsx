import Link from "next/link";

export type PostData = {
    title: string,
    body: string,
    id: number,
    tags: Array<string>,
    reactions: { likes: number, dislikes: number },
    views: number,
    userId: number
}

export type User = {
    firstName: string,
    lastName: string,
    address: {
        address: string,
        city: string,
        country: string
    }
}

export type PostUser = {
    post: PostData
    user: User
}

export default function Post(props: PostUser) {
    return (
        <div className="bg-white rounded-lg shadow-sm dark:bg-gray-950 m-2">
            <div className="p-4">
                <Link href={"/posts/" + props.post.id} className="block" prefetch={false}>
                    <h3 className="text-xl font-bold mb-2 dark:text-white text-black">{props.post.title}</h3>
                    <div className="flex items-center gap-2 mb-4">
                        <div>
                            <div className="font-medium dark:text-white text-black">{props.user.firstName} {props.user.lastName}</div>
                            <div className="text-gray-500 dark:text-gray-400 text-sm">{props.user.address.country}, {props.user.address.city}, {props.user.address.address}</div>
                        </div>
                    </div>
                    <p className="text-gray-500 dark:text-gray-400 line-clamp-2">
                        {props.post.body}
                    </p>
                    <div className="flex">
                        {
                            props.post.tags.map((tag) => (
                                <div key={tag} className="rounded-full bg-gray-400 pl-2 pr-2 pb-1 pt-1 mr-2 mt-2 text-gray-800 text-xs">{tag}</div>
                            ))
                        }
                    </div>
                </Link>
            </div>
        </div>
    )
}