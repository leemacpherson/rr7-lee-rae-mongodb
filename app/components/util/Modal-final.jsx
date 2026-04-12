function Modal({ children, onClose }) {
  return (
    <>
      <div
        className="modal-pointer-events-none fixed inset-0 z-999 grid h-screen w-screen place-items-center bg-black bg-opacity-60 opacity-0 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      >
        <p>this is the modal</p>
        <div
          data-dialog="sign-in-modal"
          class="relative mx-auto w-full max-w-[24rem] rounded-lg overflow-hidden shadow-sm"
        >
          <dialog
            className="modal"
            open
            onClick={(event) => event.stopPropagation()}
          >
            {children}
          </dialog>
        </div>
      </div>
    </>
  );
}

export default Modal;
