import RoutesConfig from "./routes";
import { getLocalUser } from "./storage";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { loadLocalUser } from "./store/auth";
import { LoadingDots } from "./components/LoadingDots";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const user = getLocalUser();
    if (user) {
      dispatch(loadLocalUser(user));
    }
    setLoading(false);
  }, [dispatch]);

  return loading ? <LoadingDots /> : <RoutesConfig />;
};

export default App;
