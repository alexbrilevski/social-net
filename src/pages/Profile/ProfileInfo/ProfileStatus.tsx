import { Component, type ChangeEvent } from "react";
import s from "./ProfileStatus.module.css";

type ProfileStatusProps = {
  status: string,
  updateUserStatus: (status: string) => void,
};

export class ProfileStatus extends Component<ProfileStatusProps> {
  state = {
    editMode: false,
    statusText: "",
  };

  activateEditMode = () => {
    this.setState({
      editMode: true,
      statusText: this.props.status,
    });
  };

  deactivateEditMode = () => {
    this.setState({
      editMode: false,
      statusText: "",
    });

    this.props.updateUserStatus(this.state.statusText);
  };

  changeStatusText(e: ChangeEvent<HTMLInputElement>) {
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
