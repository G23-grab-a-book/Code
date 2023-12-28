import Link from "next/link";

export default function NotFound(){
    return(
        <div>
            <h1>Oops..</h1>
            <p>Questa pagina non esiste</p>
            <p>Torna all'<Link href={"/"}>Homepage</Link></p>
        </div>
    );
}