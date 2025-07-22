import { useContext } from "react";
import Layout from "./features";
import AuthRoute from "./routes/route";
import { Context } from "./context/Context";
function App() {
  const { token } = useContext(Context);

  return token ? <Layout /> : <AuthRoute />;
}

export default App;
