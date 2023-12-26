import Link from "next/link";

export default function NotFound(){
    return(
        <div>
            <h1>Oops..</h1>
            <p>This page doesn't exist</p>
            <p>Go back to the <Link href={"/"}>Homepage</Link></p>
        </div>
    );
}