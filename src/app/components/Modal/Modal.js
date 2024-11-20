const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;
  
    return (
      <div
        onClick={onClose}
        className={`w-full h-screen fixed inset-0 flex items-center justify-center z-50 bg-[rgba(0,0,0,0.4)] ${isOpen ? "block" : "hidden"}`}>
        <div
          onClick={(e) => e.stopPropagation()}
          className="bg-white p-6 rounded-lg shadow-lg">
          {children}
        </div>
      </div>
    );
  };
  
  export default Modal;