import React from 'react'
import styled from "styled-components";

const Ul = styled.ul`
    list-style: none;
    display: flex;
    flex-flow: row nowrap;

    li {
        padding: 18px 10px;
    }

    @media (max-width: 768px) {
        flex-flow: column nowrap;
        background-color: #0d2538;
        position: fixed;
        transform: ${({ open }) =>
        open ? "translateX(0)" : "translateX(100%)"};
        top: 0;
        left: 0;
        height: 100vh;
        width: 300px;
        padding-top: 3.5rem;
        transition: transform 0.3s ease-in-out;

        li {
            color: #fff;
        }
    }
`;



function Nav(props) {
    const username = localStorage.getItem("username");
    const email = localStorage.getItem("email");
    const picture = localStorage.getItem("picture");

    return (
        <Ul>
            <li>
                <label style={{ textDecoration: "none", color: "Gray" }}>
                    {email}
                </label>
            </li>
            <li>
                <label style={{ textDecoration: "none", color: "Gray" }}>
                    {username}
                </label>
            </li>
            {/* avatar profile picture */}
            <li>
                <label style={{
                    borderRadius: "50%",
                    width: 30,
                    height: 30,
                    display: "block",
                    background: `url(${picture})`,
                    backgroundPosition: "center",
                    backgroundSize: "auto 30px"
                }}>
                </label>
            </li>
        </Ul>
    )
}
export default Nav