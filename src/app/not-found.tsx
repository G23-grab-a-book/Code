import Link from "next/link";

export default function NotFound(){
    return(
        <div className="annuncio">
            <h1>Oops..</h1>
            <br/>
            <p>This page doesn't exist</p>
            <p>Go back to the <Link href={"/"}>Homepage</Link></p>
        </div>
    );
}