import GrandChildComponent from './GrandChildComponent';

const ChildComponent = ({ count, setCount }) => {
    return (
        <>
            <div className="text-center mt-3">
                <h2 className="text-3xl">Child Component</h2>
                <small>Not Using the count state too</small>
            </div>

            <GrandChildComponent count={count} setCount={setCount} />
        </>
    );
};

export default ChildComponent;