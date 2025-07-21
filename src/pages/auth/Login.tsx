import LoginImage from "../../assets/images/LoginImage.png";
import LoginForm from "../../components/LoginForm";

const Login = () => {
  return (
    <div className="w-screen h-screen relative overflow-hidden">
      <img
        src={LoginImage}
        alt="login image"
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      />

      <div className="z-10 relative flex items-center justify-center h-full ">
        <div className="flex flex-col">
          <div className="bg-white bg-opacity-90 px-8 py-6 rounded-lg shadow-lg  w-[450px]">
            <div className="pb-[30px]">
              <h2 className="text-[#00e0c1] text-4xl font-bold text-center ">
                INTEX-MARKET.UZ
              </h2>
            </div>
            <div className="w-[400px] ">
              <p className="text-center text-[#A3A3A3] text-base mb-4 leading-relaxed">
                Введите имя пользователя и пароль, чтобы <br />
                получить доступ к системе.
              </p>
              <div className="pl-[80px]">
                <LoginForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
