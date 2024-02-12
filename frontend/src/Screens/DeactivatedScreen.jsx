import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ticktime from '../img/ticktime-banner.png'

const DeactivatedScreen = () => {
  const { loggedInUser } = useSelector((state) => state.data);
  const navigate = useNavigate();

  if (loggedInUser.isActive) {
    navigate("/dashboard");
  }

  return (
    <div className='flex flex-col items-center justify-center w-full h-screen gap-4'>
      
      <img
        src={ticktime}
        alt='TickTime Logo'
        className='w-[20%]'
      />
      <h1 className="font-bold text-2xl">Your Account is Deactivated. Contact your Admin for further Information</h1>
    </div>
  );
}
export default DeactivatedScreen