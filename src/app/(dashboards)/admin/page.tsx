import CountChart from "@/components/graphics/countChart"
import UserCard from "@/components/headers_menu_users/UserCard"

const EstadisticasAdmin = () => {
  return (
    <div className='p-4 flex gap-4 flex-col md:flex-row'>
      <div className="w-full flex flex-col gap-8">
        {/*USER CARD*/}
        <div className="flex gap-4 justify-between flex-wrap">
          <UserCard type="participantes"/>
          <UserCard type="colaboradores"/>
          <UserCard type="mentoras"/>
          <UserCard type="coordinadoras"/>
        </div>
        {/*GRAPHS*/}
        <div className="flex gap-4 flex-column lg:flex-row odd:text-primary even:text-secondary">
          {/*GRAPH RADIAL*/}
          <div className="w-full lg:w-2/5 h-[450px] bg-white rounded-2xl p-3 w-full h-full">
            <CountChart/>
          </div>
          {/*GRAPH PASTEL*/}
          <div className="w-full lg:w-3/5 h-auto bg-white rounded-2xl">
          </div>
          {/*GRAPH BARRAS*/}
          <div className="">
          </div>
        </div>
      </div>
    </div>
  )
}

export default EstadisticasAdmin