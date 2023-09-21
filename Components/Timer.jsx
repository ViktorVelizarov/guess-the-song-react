import React from "react"

export default function CountdownTimer(props) {
    const [count, setCount] = React.useState(30)
  
    React.useEffect(() => {
      const countdownInterval = setInterval(() => {
        if (count > 0) {
          setCount(count - 1);
          props.updateTimer(count)
        } else {
          clearInterval(countdownInterval);
        }
      }, 1000);
  
      return () => {
        clearInterval(countdownInterval);
      };
    }, [count]);
  
    return (
      <div>
        <h1>{count}</h1>
      </div>
    );
  }