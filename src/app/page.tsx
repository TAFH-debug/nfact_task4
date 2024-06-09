import Link from "next/link";

export default function Home({ params }: { params: any }) {
    return (
        <main className="flex-1 text-black bg-white dark:text-white dark:bg-black min-h-screen">
            <section className="w-full pt-12 md:pt-24 lg:pt-32">
                <div className="px-4 md:px-6 space-y-10 xl:space-y-16">
                    <div className="grid max-w-[1300px] mx-auto gap-4 px-4 sm:px-6 md:px-10 md:grid-cols-2 md:gap-16">
                        <div>
                            <h1 className="lg:leading-tighter text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem]">
                                The complete platform for building your own blogposts.
                            </h1>
                            <p className="mx-auto my-1 max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                                You can create your own blogs, announcement channels and so on.
                            </p>
                            <div className="space-x-4 mt-6">
                                <Link
                                    href="/posts"
                                    className="inline-flex h-9 items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-white hover:text-black focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:text-white dark:hover:bg-gray-800 dark:focus-visible:ring-gray-300"
                                    prefetch={false}
                                >
                                    Get Started
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="w-full py-12 md:py-24 lg:py-32">
                <div className="container space-y-12 px-4 md:px-6">
                    <div
                        className="mx-auto grid items-start gap-8 sm:max-w-4xl sm:grid-cols-2 md:gap-12 lg:max-w-5xl lg:grid-cols-3">
                        <div className="grid gap-1">
                            <h3 className="text-lg font-bold">Explore Inspiring Stories, Insights, and Ideas</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                Dive into a world of diverse topics, from technology and science to arts and culture,
                                curated by our team of passionate writers and experts.
                            </p>
                        </div>
                        <div className="grid gap-1">
                            <h3 className="text-lg font-bold">Discover Engaging Content</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                Whether you re seeking practical advice, thought-provoking perspectives, or entertaining
                                anecdotes, you ll find it all here.
                            </p>
                        </div>
                        <div className="grid gap-1">
                            <h3 className="text-lg font-bold">Personalization at the edge</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                Deliver dynamic, personalized content, while ensuring users only see the best version of
                                your blog.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}
