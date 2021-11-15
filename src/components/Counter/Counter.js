import React, { useState } from 'react';
import './Counter.css';


function Counter() {
    const [count, setCount] = useState(true);

    return (
        <div className="App">
            <span className="btn" onClick={() => setCount(!count)}></span>
            {count && <div> </div>}
        </div>
    );
}


export default Counter;