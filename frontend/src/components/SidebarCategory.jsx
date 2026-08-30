import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faHandFist,
    faCompass,
    faFaceLaugh,
    faHeart,
    faUserSecret,
    faWandMagicSparkles,
    faMicrochip,
    faTrophy,
} from "@fortawesome/free-solid-svg-icons";

const categories = [
    {
        name: "Action",
        icon: faHandFist,
    },
    {
        name: "Adventure",
        icon: faCompass,
    },
    {
        name: "Comedy",
        icon: faFaceLaugh,
    },
    {
        name: "Romance",
        icon: faHeart,
    },
    {
        name: "Dark & Mystery",
        icon: faUserSecret,
    },
    {
        name: "Fantasy",
        icon: faWandMagicSparkles,
    },
    {
        name: "Sci-Fi & Technology",
        icon: faMicrochip,
    },
    {
        name: "Sports & Games",
        icon: faTrophy,
    },
];

export default function SideBar() {
    return (
        <aside className="fixed left-0 top-0 flex h-screen w-72 flex-col items-start border-r border-gray-200 bg-linear-to-t from-indigo-950 to-blue-900 pt-20 pl-10 text-white">
            <h2 className="mt-5 font-montserrat text-xl font-bold border-b border-blue-800/50 pb-7">
                Menu Category
            </h2>

            <nav className="mt-10">
                <ul className="flex flex-col gap-8">
                    {categories.map((category) => (
                        <li key={category.name}>
                            <button
                                type="button"
                                className="flex cursor-pointer items-center gap-4 text-sm font-open-sans transition hover:translate-x-1 hover:text-blue-200"
                            >
                                <FontAwesomeIcon
                                    icon={category.icon}
                                    className="w-5 text-center"
                                />

                                <span>{category.name}</span>
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>
        </aside>
    );
}