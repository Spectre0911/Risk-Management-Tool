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
import {BsGraphUp} from 'react-icons/bs';
import {IoIosBug} from 'react-icons/io'
import {AiOutlineTeam} from 'react-icons/ai'
import {AiOutlineFundProjectionScreen} from 'react-icons/ai'
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import {AiOutlineWarning} from 'react-icons/ai'
import "./AdminSidebar.css";
import Guide from './Guide';

const AdminSidebar = ({projectId, teamMember}) => {
    const [collapsed, setCollapsed] = useState(false);
    const { collapseSidebar } = useProSidebar();
    const navigate = useNavigate();

    const username = useSelector(state => state.username);

    const onClickMenuIcon = () => {
        setCollapsed(!collapsed);
    };

    



    return (
        <Sidebar className="sideBar" collapsed={false}>
            <Menu iconShape='square'>
                <div className="profilePicContainer">
                    <img className='profilePic' src="http://localhost:5000/assets/jane.jpg"></img>
                    <p className="welcomeMessage">{username}</p>
                </div>
                <MenuItem className="menuItem dashboard" icon={<RiDashboardFill />} onClick={() => navigate(`/`)}>
                    {'Dashboard'}
                </MenuItem >

                {/* {!projectId && <MenuItem className="menuItem" icon={<FaBell />} onClick={() => navigate(`/managedprojects`)}>
                    {'Notifications'}
                </MenuItem >} */}

                {!projectId && <MenuItem className="menuItem" icon={<MdManageAccounts />} onClick={() => navigate(`/managedprojects`)}>
                    {'Projects'}
                </MenuItem >}

                {!projectId && <MenuItem className="menuItem" icon={<BsCodeSlash />} onClick={() => navigate(`/tasks`)}>
                    {'Tasks'}
                </MenuItem >}
 
                {(!teamMember&&projectId) && <MenuItem className="menuItem" icon={<AiOutlineFundProjectionScreen />} onClick={() => navigate(`/projects/${projectId}`)}>
                    {'Project Summary'}
                </MenuItem >}

                {(!teamMember&&projectId) && <MenuItem className="menuItem" icon={<BsGraphUp />} onClick={() => navigate(`/projects/${projectId}/github/${projectId}`)}>
                    {'Github Metrics'}
                </MenuItem >}

                {(!teamMember&&projectId) && <MenuItem className="menuItem" icon={<RiDashboardFill />} onClick={() => navigate(`/projects/${projectId}/softmetrics/${projectId}`)}>
                    {'Soft Metrics'}
                </MenuItem >}

                {(!teamMember&&projectId) && <MenuItem className="menuItem" icon={<AiOutlineWarning />} onClick={() => navigate(`/projects/${projectId}/risks/${projectId}`)}>
                    {'Risk Metrics'}
                </MenuItem >}

                {(!teamMember&&projectId) && <MenuItem className="menuItem" icon={<IoIosBug />} onClick={() => navigate(`/projects/${projectId}/bugs/${projectId}`)}>
                    {'Bugs'}
                </MenuItem >}

                {(!teamMember&&projectId) && <MenuItem className="menuItem" icon={<AiOutlineTeam />} onClick={() => navigate(`/projects/${projectId}/teammembers/${projectId}`)}>
                    {'Team members'}
                </MenuItem >}

                {(teamMember&&projectId) ? <MenuItem className="menuItem" icon={<AiOutlineTeam />} onClick={() => navigate(`/projectstm/${projectId}/teammembers/${projectId}`)}>
                    {'Team members'}
                </MenuItem >: null}

                

                {(teamMember&&projectId) ? <MenuItem className="menuItem" icon={<IoIosBug />} onClick={() => navigate(`/projectstm/${projectId}/bugs/${projectId}`)}>
                    {'Bugs'}
                </MenuItem > : null}

                <Guide />

                <MenuItem className="bottomItem" icon={<BiLogOutCircle />} onClick={() => navigate(`/dashboard/productList`)}>
                    {'Log out'}
                </MenuItem >

                
            </Menu>
        </Sidebar>
    );
};

export default AdminSidebar;