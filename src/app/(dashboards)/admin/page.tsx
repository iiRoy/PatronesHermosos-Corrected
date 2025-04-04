import CountChart from "@/components/graphics/countChart"
import UserCard from "@/components/UserCard"

const EstadisticasAdmin = () => {
  return (
    <div className='p-4 flex gap-4 flex-col md:flex-row'>
      {/*LEFT*/}
      <div className="w-full lg:w-2/3 flex flex-col gap-8">
        {/*USER CARD*/}
        <div className="flex gap-4 justify-between flex-wrap">
          <UserCard type="participantes"/>
          <UserCard type="colaboradores"/>
          <UserCard type="mentoras"/>
          <UserCard type="coordinadoras"/>
        </div>
        {/*GRAPHS*/}
        <div className="flex gap-4 flex-column lg:flex-row">
          {/*GRAPH RADIAL*/}
          <div className="w-full lg:w-1/3 h-auto bg-secondary rounded-2xl p-2 w-full h-full">
            <CountChart/>
          </div>
          {/*GRAPH PASTEL*/}
          <div className="w-full lg:w-2/3 h-auto bg-secondaryShade rounded-2xl">
          </div>
          {/*GRAPH BARRAS*/}
          <div className="">
          </div>
        </div>
      </div>
      {/*RIGHT*/}
      <div className="w-full lg:w-1/3">
        r
      </div>
    </div>
  )
}

export default EstadisticasAdmin