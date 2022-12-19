import axios from "axios";
import { useContext, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/context";

export const useVerifyUser = () => {
  const navigate = useNavigate();
  const { setUserId } = useContext(UserContext);

  const [cookies, , removeCookie] = useCookies();

  useEffect(() => {
    const verifyUser = async () => {
      if (!cookies.jwt) {
        navigate("/login");
      } else {
        const { data } = await axios.post(
          "http://localhost:3001",
          { data: {} },
          { withCredentials: true }
        );

        if (!data.status) {
          removeCookie("jwt");
          navigate("/login");
        }

        setUserId(data.user.id);
      }
    };

    verifyUser();
  }, [cookies, navigate, removeCookie, setUserId]);
};
