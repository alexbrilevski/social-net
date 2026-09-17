import { Component, type ChangeEvent } from "react";
import s from "./ProfileStatus.module.css";

type ProfileStatusProps = {
  status: string,
  updateUserStatus: (status: string) => void,
};

type ProfileStatusState = {
  editMode: boolean
  statusText: string
};

export class ProfileStatus extends Component<ProfileStatusProps> {
  state: ProfileStatusState = {
    editMode: false,
    statusText: this.props.status,
  };

  componentDidUpdate(prevProps:ProfileStatusProps, prevState: ProfileStatusState) {
    if (this.props.status !== prevProps.status) {
      this.setState({
        statusText: this.props.status,
      });
    }
  };

  activateEditMode = () => {
    this.setState({
      editMode: true,
    });
  };

  deactivateEditMode = () => {
    this.setState({
      editMode: false,
    });

    this.props.updateUserStatus(this.state.statusText);
  };

  changeStatusText = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      statusText: e.currentTarget.value,
    });
  };

  render() {
    return (
      <div className={s.status}>
        {!this.state.editMode &&
          <span className={s["status-text"]} onDoubleClick={this.activateEditMode}>
            {this.props.status || "----"}
          </span>
        }
        {this.state.editMode &&
          <input
            className={s["status-input"]}
            value={this.state.statusText}
            onChange={this.changeStatusText}
            onBlur={this.deactivateEditMode}
            autoFocus
          />
        }
      </div>
    );
  };
}
