import React from 'react';
import { Sidebar, Menu, MenuItem, useProSidebar, SubMenu, ProSidebarProvider } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import { AiOutlineMenu } from 'react-icons/ai';
import { FaGem, FaHeart, FaCog, FaBell} from 'react-icons/fa';
import {MdManageAccounts} from 'react-icons/md'
import {BsCodeSlash} from 'react-icons/bs'
import {CgProfile} from 'react-icons/cg'
import {RiDashboardFill} from 'react-icons/ri'
import {BiLogOutCircle} from 'react-icons/bi'
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import "./AdminSidebar.css";

const AdminSidebar = () => {
    const [collapsed, setCollapsed] = useState(false);
    const { collapseSidebar } = useProSidebar();
    const navigate = useNavigate();

    const onClickMenuIcon = () => {
        setCollapsed(!collapsed);
    };
    return (
        <Sidebar className="sideBar" collapsed={false}>
            <Menu iconShape='square'>
                <div className="profilePicContainer">
                    <img className='profilePic' src="http://localhost:5000/assets/jane.jpg"></img>
                    <p className="welcomeMessage">Jane Arnold</p>
                </div>
                <MenuItem className="menuItem" icon={<RiDashboardFill />} onClick={() => navigate(`/dashboard/productList`)}>
                    {'Dashboard'}
                </MenuItem >

                <MenuItem className="menuItem" icon={<CgProfile />} onClick={() => navigate(`/editprofile`)}>
                    {'Edit Profile'}
                </MenuItem >

                <MenuItem className="menuItem" icon={<FaBell />} onClick={() => navigate(`/dashboard/productList`)}>
                    {'Notifications'}
                </MenuItem >

                <MenuItem className="menuItem" icon={<MdManageAccounts />} onClick={() => navigate(`/dashboard/productList`)}>
                    {'Managed Projcts'}
                </MenuItem >

                <MenuItem className="menuItem" icon={<BsCodeSlash />} onClick={() => navigate(`/dashboard/productList`)}>
                    {'Developed Projects'}
                </MenuItem >

                <MenuItem className="bottomItem" icon={<BiLogOutCircle />} onClick={() => navigate(`/dashboard/productList`)}>
                    {'Log out'}
                </MenuItem >

                {/* <SubMenu label="other" title='Other' icon={<FaHeart />}>
                    <MenuItem icon={<FaGem />}>
                    {'Order'}
                    </MenuItem>
                    <MenuItem icon={<FaGem />}>
                    {' '}
                    </MenuItem>
                    <MenuItem icon={<FaGem />}>
                    {' '}
                    </MenuItem>
                    <MenuItem icon={<FaGem />}>
                    {' '}
                    </MenuItem>
                    <MenuItem icon={<FaGem />}>
                    {' '}
                    </MenuItem>
                    <MenuItem icon={<FaGem />}>
                    {' '}
                    </MenuItem>
                </SubMenu> */}
            </Menu>
        </Sidebar>
    );
};

export default AdminSidebar;