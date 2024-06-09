export default function Switchbox(props: { onClick: () => void }) {

    return (<>
        <div className="flex items-center">
            <label className="m-2 text-center text-black dark:text-white">Dark mode</label>
            <span className="rounded-full bg-gray-200 dark:bg-gray-700 w-14 h-8">
            <input type="checkbox"
                   className="appearance-none m-1 rounded-full w-6 h-6 bg-white transition-all dark:translate-x-full duration-500 cursor-pointer" {...props}/>
            </span>
        </div>
    </>)
}