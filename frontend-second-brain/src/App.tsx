import { Button } from "./components/Button"
import { Card } from "./components/card"
import { AddIcons } from "./icons/PlusIcon"
import { ShareIcons } from "./icons/ShareIcon"


function App() {
 

  return (
   <div>
  {/* header of dashboard -> your sec brain , search bar, share, add, theme button. */}
  <div className="flex gap-4 justify-end">
    <Button variant='primary'  text="Share brain"  startIcon={<ShareIcons/>}></Button>
    <Button variant='secondary'  text="Add content" startIcon={<AddIcons/>} ></Button>
  </div>

  <div className="flex gap-4">
    <Card link="https://youtu.be/p1v66VcK5HA?si=SjEpCw986F6-0b-6" title="Gana hai bhaiyt video prohec hamkkfej" type="youtube" />
    <Card link="https://x.com/AdityaRaj_x/status/1925647114878521412" title='x.xom' type='twitter'/>
  </div>


   </div>
  )
}

export default App
