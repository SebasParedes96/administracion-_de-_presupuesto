import React from "react";
import Login from "./Login";
import Register from "./Register";

function Home() {
    return (
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                alignSelf: 'stretch',
                justifyContent: 'space-around',
                backgroundImage: "url('https://i.pinimg.com/originals/b2/14/da/b214da31e10622448167a5eebf5923a5.jpg')"
            }}>
                <Login />
                <Register />
            </div>
    )
}

export default Home