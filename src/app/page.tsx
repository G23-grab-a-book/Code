
import { Button } from 'antd'
import { connectDB } from '../../dbConfig'

export default function Home() {

  connectDB();
  return (
      <div>
        <h1>Home Page</h1>
          <Button type='primary'>Button</Button>
          <button className="bg-blue-500 text-white p-2">Tailwid Button</button>
      </div>
  )
}
