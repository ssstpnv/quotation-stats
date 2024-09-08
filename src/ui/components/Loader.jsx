import './Loader.css';

const Loader = ({ children, show }) => {
    return show ? (
        <div className="loader"></div>
    ) : children;
};

export default Loader;