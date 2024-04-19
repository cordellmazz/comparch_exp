import React from "react";
import styled from "styled-components";

// Styled components
export const CardContainer = styled.div`
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    padding: 20px;
    gap: 20px;
`;

const Card = styled.div`
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
    transition: 0.3s;
    width: 250px;
    border-radius: 10px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #fff;
`;

const CardImage = styled.img`
    width: 100%;
    height: 150px;
    object-fit: cover;
`;

const CardName = styled.h2`
    font-size: 20px;
    font-weight: bold;
    margin: 10px;
`;

const CardSummary = styled.p`
    padding: 0 15px 15px;
    text-align: center;
`;

const CardLink = styled.a`
    color: #0077cc;
    text-decoration: none;
    margin-bottom: 15px;
    font-weight: bold;
`;

export const MemberCard = ({ member }) => {
    return (
        <Card>
            <CardImage src={member.image} alt={member.name} />
            <CardName>{member.name}</CardName>
            <CardSummary>{member.summary}</CardSummary>
            <CardLink href={member.website}>Visit Website</CardLink>
        </Card>
    );
};

const MemberSummary = ({ members = [] }) => {
    return (
        <CardContainer>
            {members.map((member) => (
                <MemberCard key={member.name} member={member} />
            ))}
        </CardContainer>
    );
};

export default MemberSummary;
