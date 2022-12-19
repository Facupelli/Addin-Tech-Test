import s from "./Modal.module.css";

export default function Modal({ isOpen, children }) {
  return (
    <dialog open={isOpen} className={s.dialog}>
      {children}
    </dialog>
  );
}
