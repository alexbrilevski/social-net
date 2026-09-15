import React, { type ComponentType } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import type { RootState } from "../../store/store";

type MapStateToPropsType = {
  isAuth: boolean
};

const mapStateToProps = (state: RootState): MapStateToPropsType => {
  return {
    isAuth: state.auth.isAuth,
  }
};

export function withAuthRedirect<WCP>(Component: ComponentType<WCP>) {
  class AuthRedirectComponent extends React.Component<MapStateToPropsType> {
    render() {
      const { isAuth, ...restProps } = this.props;

      if (!isAuth) return <Redirect to={"/login"} />;

      return <Component {...restProps as WCP} />
    };
  }

  const ConnectedAuthRedirectComponent = connect(mapStateToProps)(AuthRedirectComponent);

  return ConnectedAuthRedirectComponent;
}
