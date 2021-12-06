import React, { useState } from 'react';
import './Counter.css';


function Counter() {
    const [count, setCount] = useState(true);

    return (
        <div className="App">
            <button className="btn" onClick={() => setCount(!count)}>Welcome to GoCode Shop</button>
            {count && <div></div>}
        </div>
    );
}


export default Counter;


