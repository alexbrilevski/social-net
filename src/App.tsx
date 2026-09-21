import { Route } from "react-router-dom";
import HeaderContainer from "./components/Header/HeaderContainer";
import Sidebar from "./components/Sidebar/Sidebar";
import SignInContainer from "./pages/SignIn/SignIn";
import ProfileContainer from "./pages/Profile/ProfileContainer";
import MessagesContainer from "./pages/Messages/MessagesContainer";
import UsersContainer from "./pages/Users/UsersContainer";
import "./App.css";

function App() {
  return (
    <>
      <HeaderContainer />
      <Sidebar />
      <main className="main-content">
        <Route path="/login" render={() => <SignInContainer />} />
        <Route path="/profile/:userId?" render={() => <ProfileContainer />} />
        <Route path="/messages/:chatId?" render={() => <MessagesContainer />} />
        <Route path="/users" render={() => <UsersContainer />} />
      </main>
    </>
  )
}

export default App;
