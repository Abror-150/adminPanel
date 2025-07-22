import { useQuery } from "@tanstack/react-query";
import { API } from "../../hooks/getEnv";
import axios from "axios";
import type { SiteType } from "../../types/SiteType";
import { EditOutlined } from "@ant-design/icons";

const Site = () => {
  const {
    data: site = [],
    isLoading: productsLoading,
    error: productsError,
  } = useQuery({
    queryKey: ["site"],
    queryFn: () =>
      axios
        .get(`${API}/api/site`)
        .then((res) => {
          console.log("Serverdan olingan mahsulotlar:", res.data);
          return res.data?.data || [];
        })
        .catch((error) => {
          console.error("Mahsulotlarni olish xatosi:", error.response?.data);
          throw error;
        }),
  });

  return (
    <div className="p-[20px]">
      <div>
        <div>
          <div className="grid grid-cols-3 pl-[60px] mt-[60px] pt-[15px] rounded-[30px] text-[#000000] w-[1200px] pb-2  bg-[#FFFFFF] h-[69px] font-semibold text-center">
            <div>Телефонный номер</div>
            <div>
              {site.map((item: SiteType) => (
                <div>{item.phone}</div>
              ))}
            </div>
            <div>
              <button
                className="text-[#009398]"
                // onClick={() => handleEdit(item)}
              >
                <EditOutlined />
              </button>
            </div>
          </div>
          <div className="grid grid-cols-3 pl-[60px] mt-[20px] pt-[15px] rounded-[30px] text-[#000000] w-[1200px] pb-2  bg-[#FFFFFF] h-[69px] font-semibold text-center">
            <div>Адрес</div>
            <div>
              {site.map((item: SiteType) => (
                <div>{item.adress_ru}</div>
              ))}
            </div>
            <div>
              <button
                className="text-[#009398]"
                // onClick={() => handleEdit(item)}
              >
                <EditOutlined />
              </button>
            </div>
          </div>
          <div className="grid grid-cols-3 pl-[60px] mt-[20px] pt-[15px] rounded-[30px] text-[#000000] w-[1200px] pb-2 mb-2 bg-[#FFFFFF] h-[69px] font-semibold text-center">
            <div>Рабочее время</div>
            <div>
              {site.map((item: SiteType) => (
                <div>{item.workingHours}</div>
              ))}
            </div>
            <div>
              <button
                className="text-[#009398]"
                // onClick={() => handleEdit(item)}
              >
                <EditOutlined />
              </button>
            </div>
          </div>
          <div className="grid grid-cols-3 pl-[60px] mt-[20px] pt-[15px] rounded-[30px] text-[#000000] w-[1200px] pb-2 mb-2 bg-[#FFFFFF] h-[69px] font-semibold text-center">
            <div>Телеграм</div>
            <div>
              {site.map((item: SiteType) => (
                <div>{item.telegramLink}</div>
              ))}
            </div>
            <div>
              <button
                className="text-[#009398]"
                // onClick={() => handleEdit(item)}
              >
                <EditOutlined />
              </button>
            </div>
          </div>
          <div className="grid grid-cols-3 pl-[60px] mt-[20px] pt-[15px] rounded-[30px] text-[#000000] w-[1200px] pb-2 mb-2 bg-[#FFFFFF] h-[69px] font-semibold text-center">
            <div>Инстаграм</div>
            <div>
              {site.map((item: SiteType) => (
                <div>{item.instagramLink}</div>
              ))}
            </div>
            <div>
              <button
                className="text-[#009398]"
                // onClick={() => handleEdit(item)}
              >
                <EditOutlined />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Site;
