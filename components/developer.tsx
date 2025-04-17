import { FaHeart } from "react-icons/fa";

const HeartComponent = () => {
    return (
        <a
            href="https://ahmedhussein-myportfolio.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center my-16 hover:underline"
        >
            <span className="text-sm text-muted-foreground font-semibold flex items-center justify-center">
                <span>Made with ❤️ by</span>
                <p className=" hover:underline mx-2">Ahmed Hussein</p>
            </span>
        </a>
    );
};

export default HeartComponent;
