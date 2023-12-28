import Link from "next/link";

export default function NotFound(){
    return(
        <div className="annuncio">
            <h1>Oops..</h1>
            <br/>
            <p>Questa pagina non esiste</p>
            <p>Torna all'<Link href={"/"}>Homepage</Link></p>
        </div>
    );
}