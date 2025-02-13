import BarChart from "./components/BarChart"
export default function Home() {
  return (
    <div>
      <BarChart   xData={['Vue', 'React', 'Angular']}
        sData={[2000, 5000, 1000]}/>
      <BarChart   xData={['Vue', 'React', 'Angular']}
        sData={[200, 500, 100]}
        style={{ width: '500px', height: '400px' }}/>
    </div>
  )
}
