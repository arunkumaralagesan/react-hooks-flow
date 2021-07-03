import React, { useEffect, useLayoutEffect, useState } from "react";

const colorLog = (color, spacing, prefix) => (str) => {
    console.log(`%c ${new Array(spacing).fill(" ").join("")} ${prefix} -> ${str}`, `color: ${color}`)
}

const appLog = colorLog("MediumSpringGreen", 0, "App")
const parentLog = colorLog("tomato", 4, "Parent")
const childLog = colorLog("Aqua", 8, "Child")

function Child({ variableOne }) {
    childLog("Render Start")

    const [variableTwo, setVariableTwo] = useState(() => {
        childLog("State initializer (variableTwo)")
        return 0
    })

    const [result, setResult] = useState(() => {
        childLog("State initializer (result)")
        return 0
    })

    useLayoutEffect(() => {
        childLog("useLayoutEffect INVOCATION : []")
        return () => {
            childLog("useLayoutEffect CLEANUP : []")
        }
    }, [])

    useLayoutEffect(() => {
        childLog("useLayoutEffect INVOCATION : [variableOne, variableTwo]")
        return () => {
            childLog("useLayoutEffect CLEANUP : [variableOne, variableTwo]")
        }
    }, [variableOne, variableTwo])

    useEffect(() => {
        childLog("useEffect INVOCATION : []")
        return () => {
            childLog("useEffect CLEANUP : []")
        }
    }, [])

    useEffect(() => {
        childLog("useEffect INVOCATION : [variableOne, variableTwo]")
        setResult(variableOne * variableTwo)
        return () => {
            childLog("useEffect CLEANUP : [variableOne, variableTwo]")
        }
    }, [variableOne, variableTwo])

    return (
        <>
            <h3>(Child) Multiplier Two: {variableTwo}</h3>
            <div style={{ display: "flex", flexDirection: "row" }}>
                Rerender Child
                <button onClick={event => {
                    setVariableTwo(count => count + 1)
                }}>Increment Multiplier Two
                </button>
                <button onClick={event => {
                    setVariableTwo(count => count - 1)
                }}>Decrement Multiplier Two
                </button>
            </div>
            <h3>
                Result {result}
            </h3>
        </>
    )

}

function Parent() {
    parentLog("Render Start")

    const [variableOne, setVariableOne] = useState(() => {
        parentLog("State initializer (variableOne)")
        return 0
    })

    useLayoutEffect(() => {
        parentLog("useLayoutEffect INVOCATION : []")
        return () => {
            parentLog("useLayoutEffect CLEANUP : []")
        }
    }, [])

    useLayoutEffect(() => {
        parentLog("useLayoutEffect INVOCATION : [variableOne]")
        return () => {
            parentLog("useLayoutEffect CLEANUP : [variableOne]")
        }
    }, [variableOne])

    useEffect(() => {
        parentLog("useEffect INVOCATION : []")
        return () => {
            parentLog("useEffect CLEANUP : []")
        }
    }, [])

    useEffect(() => {
        parentLog("useEffect INVOCATION : [variableOne]")
        return () => {
            parentLog("useEffect CLEANUP : [variableOne]")
        }
    }, [variableOne])

    return (
        <>
            <h3>(Parent) Multiplier One: {variableOne}</h3>
            <div style={{ display: "flex", flexDirection: "row" }}>
                Rerender Parent
                <button onClick={event => {
                    setVariableOne(count => count + 1)
                }}>Increment Multiplier One
                </button>
                <button onClick={event => {
                    setVariableOne(count => count - 1)
                }}>Decrement Multiplier One
                </button>
            </div>
            <Child variableOne={variableOne} />
        </>
    )

}


function App() {
    appLog("Render Start")
    const [mountParent, setMountParent] = useState(() => {
        appLog("State initializer (mountParent)")
        return false
    })

    useLayoutEffect(() => {
        appLog("useLayoutEffect INVOCATION : []")
        return () => {
            appLog("useLayoutEffect CLEANUP : []")
        }
    }, [])

    useLayoutEffect(() => {
        appLog("useLayoutEffect INVOCATION : [mountParent]")
        return () => {
            appLog("useLayoutEffect CLEANUP : [mountParent]")
        }
    }, [mountParent])

    useEffect(() => {
        appLog("useEffect INVOCATION : []")
        return () => {
            appLog("useEffect CLEANUP : []")
        }
    }, [])

    useEffect(() => {
        appLog("useEffect INVOCATION : [mountParent]")
        return () => {
            appLog("useEffect CLEANUP : [mountParent]")
        }
    }, [mountParent])

    return (
        <div>
            <button onClick={event => {
                setMountParent(prevState => !prevState)
            }}>{mountParent ? "Unmount Parent" : "Mount Parent"}</button>
            {
                mountParent && <Parent />
            }
        </div>
    );
}

export default App;
