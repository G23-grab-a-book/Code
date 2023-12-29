import Link from "next/link";

export default function NotFound(){
    return(
        <div style={{paddingTop:"1%", alignItems: "center", margin: "auto", width: "75%"}}>
            <h1>Oops..</h1>
            <br/>
            <p>Questa pagina non esiste</p>
            <p>Torna all&#39;<Link href={"/"}>Homepage</Link></p>
        </div>
    );
}