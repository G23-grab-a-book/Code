// pagina di test per provare a vedere se funziona il middleware
import { Button } from 'antd'
import axios from 'axios';
export default function Home() {
const onLogin = async () => {
        await axios.post("/helpers/middleware");
};
  return (



    <div>
        <h1>Home Page</h1>
          <Button type='primary'>Button</Button>
          <button className="bg-blue-500 text-white p-2">Tailwid Button</button>
      </div>
  )
}
