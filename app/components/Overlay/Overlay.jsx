import Styles from "./Overlay.module.css";

export const Overlay = (props) => {
  return (
		<div
			onClick={props.isClose}
			className={`${Styles['overlay']} ${
				props.isOpen && Styles['overlay_is-opened']
			}`}
		></div>
	)
};
