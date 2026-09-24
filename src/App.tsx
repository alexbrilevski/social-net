import { Component } from "react";
import { connect } from "react-redux";
import { Route } from "react-router-dom";
import { initializeApp } from "./store/appReducer";
import type { RootState } from "./store/store";
import Preloader from "./components/UI/Preloader/Preloader";
import HeaderContainer from "./components/Header/HeaderContainer";
import Sidebar from "./components/Sidebar/Sidebar";
import SignInContainer from "./pages/SignIn/SignIn";
import ProfileContainer from "./pages/Profile/ProfileContainer";
import MessagesContainer from "./pages/Messages/MessagesContainer";
import UsersContainer from "./pages/Users/UsersContainer";
import "./App.css";

type MapStateToProps = {
  isInitialized: boolean,
};

type MapDispatchToProps = {
  initializeApp: () => void,
};

type AppProps = MapStateToProps & MapDispatchToProps;

const mapStateToProps = (state: RootState): MapStateToProps => ({
  isInitialized: state.app.isInitialized,
});

class App extends Component<AppProps> {
  componentDidMount() {
    this.props.initializeApp();
  }

  render() {
    if (!this.props.isInitialized) {
      return <Preloader />;
    }

    return (
      <div className="app-container">
        <HeaderContainer />
        <Sidebar />
        <main className="main-content">
          <Route path="/login" render={() => <SignInContainer />} />
          <Route path="/profile/:userId?" render={() => <ProfileContainer />} />
          <Route path="/messages/:chatId?" render={() => <MessagesContainer />} />
          <Route path="/users" render={() => <UsersContainer />} />
        </main>
      </div>
    );
  }
}

export default connect(mapStateToProps, { initializeApp })(App);
