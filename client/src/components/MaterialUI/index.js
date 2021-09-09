import React, { useState } from 'react';
import './style.css';
import { IoIosClose } from 'react-icons/io'

const Modal = (props) => {
    if (!props.visible) {
        return null;
    }
    return (
        <>
            <div className="modalFixedBg">
                <div style={{ position: 'relative' }}>
                    <div className="modalClose" onClick={props.onClose}><IoIosClose size={40} /></div>
                    <div className="modalContainer">
                        {props.children}
                    </div>
                </div>
            </div>
        </>
    )
}

const MaterialInput = (props) => {
    const [focus, setFocus] = useState(false)

    return (
        <div className="materialInput">
            <label
                className={`label ${(focus || props.value !== "" || props.type === 'date') ? 'focus' : ''}`} style={{
                    top: 0,
                    lineHeight: 'none'
                }}>{props.label}</label>
            <div style={{
                display: 'flex',
                flexDirection: 'row'
            }}>
                <input className="input"
                    type={props.type}
                    value={props.value}
                    onChange={props.onChange}
                    required={props.required}
                    {...props}
                    onFocus={(e) => {
                        setFocus(true)
                    }}
                    onBlur={(e) => {
                        if (e.target.value === "") {
                            setFocus(false)
                        }
                    }} />
                {
                    props.rightElement ? props.rightElement : null
                }
            </div>
        </div>
    )
}

const MaterialButton = (props) => {

    const onClick = () => {
        props.onClick && props.onClick()
    }
    return (
        <div style={{ width: '100%', ...props.style }}>
            <button
                className="materialButton"
                style={{ backgroundColor: props.bgColor, color: props.textColor }}
                onClick={onClick}
                type={props.type}
            >
                {props.icon && props.icon}
                {props.title && props.title}
            </button>
        </div>

    )
}

const DropdownMenu = (props) => {
    return (
        <div className="headerDropdownContainer">
            {props.menu}
            <div className="dropdown">
                <div className="upArrowContainer">
                    <div className="upArrow"></div>
                </div>
                <div className="dropdownMenu">
                    {props.firstMenu}
                    <ul className="headerDropdownMenu">
                        {props.menus &&
                            props.menus.map((item, index) => (
                                <li key={index}>
                                    <a
                                        onClick={(e) => {
                                            if (item.onClick) {
                                                e.preventDefault();
                                                item.onClick && item.onClick();
                                            }
                                        }}
                                        href={`${item.href}`}
                                    >
                                        {item.icon && item.icon} {item.label}
                                    </a>
                                </li>
                            ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

const Anchor = (props) => {
    return (
        <button {...props} className="anchorButton">
            {props.name}
        </button>
    )
}

const Breed = (props) => {
    const breedLen = props.breed?.length
    return (
        <div className="breed">
            <ul>
                {
                    props.breed &&
                    props.breed.map((item, index) => (
                        <li key="index">
                            <a href={item.href}>{item.name}</a>
                            {index + 1 !== breedLen &&
                                props.breedIcon
                            }
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

export {
    Modal,
    MaterialInput,
    MaterialButton,
    DropdownMenu,
    Anchor,
    Breed
}