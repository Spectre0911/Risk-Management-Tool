import React from "react";
import "./index.css";
import ProfileCard from "./ProfileCard";

const UserPage = () => {

const teamMembers = [
    {
        id: "1",
        name:"Jane Arnold",
        image:"https://picsum.photos/200",
        bio:"I am a software engineer",
        skills:["Python","React"],
    },{ 
        id: "2",
        name:"Jane Arnold",
        image:"https://picsum.photos/200",
        bio:"I am a backend engineer",
        skills:["Python","Node","SQL"],
    }];

    const recommendedMembers = [
        {
            id: "1",
            name:"Jane Doe",
            image:"https://picsum.photos/200",
            bio:"I am a software engineer",
            skills:["Python","React"],
        },{ 
            id: "2",
            name:"John Smith",
            image:"https://picsum.photos/200",
            bio:"I am a backend engineer",
            skills:["Python","Node","SQL"],
        },{
            id: "3",
            name:"Jane Doe",
            image:"https://picsum.photos/200",
            bio:"I am a software engineer",
            skills:["Python","React"],
        }];

    return (
        <><div className="userContainer">
            <div className="userTitle">
                <p style={{ fontSize: "30px" }}>Current Team Members:</p>
                {teamMembers.map((member) => {
                    return (
                        <ProfileCard
                            key={member.id}
                            name={member.name}
                            image={member.image}
                            bio={member.bio}
                            skills={member.skills} />
                    );
                })}
            </div>
        </div><div className="userContainer">
                <div className="userTitle">
                    <p style={{ fontSize: "30px" }}>Recommended Team Members:</p>
                    {recommendedMembers.map((member) => {
                        return (
                            <ProfileCard
                                key={member.id}
                                name={member.name}
                                image={member.image}
                                bio={member.bio}
                                skills={member.skills} />
                        );
                    })}
                </div>
            </div></>
    );
}

export default UserPage;