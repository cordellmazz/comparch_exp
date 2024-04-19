import styled from "styled-components";
import Navigation from "../layout/Navigation";
import MemberSummary from "../layout/misc/MemberSummary";

const AboutContainer = styled.div`
    width: 60%;
    height: 100%;
    padding: 5%;
    // center the container
    margin: auto;
`;

// With text wrapping applied
const AboutText = styled.div`
    font-size: 20px;
    text-align: left;
    width: 100%;
    overflow-wrap: break-word; // This line ensures text wrapping

    h1 {
        font-size: 30px;
        margin-bottom: 20px;
    }

    p {
        margin-bottom: 20px;
    }
`;

const PageAbout = () => {
    return (
        <>
            <Navigation />
            <AboutContainer>
                <AboutText>
                    <h1>About</h1>
                    <p>
                        The goal of this project is to provide a web-based interface for the Computer Architecture
                        community to visualize and analyze simulation data. The tool is designed to be flexible and
                        extensible, to allow students new to the field to explore and understand the performance of
                        different computer architectures.
                    </p>
                    <p>
                        The tool is built using React and Chart.js over two semesters by a team of students at the
                        University of Texas at Austin for their capstone project. The team includes the following
                        students:
                    </p>
                    <MemberSummary
                        members={[
                            {
                                name: "Ben Endara",
                                summary:
                                    "Experienced software engineer with a passion for developing scalable web applications and working across the full stack.",
                                image: "path_to_image.jpg",
                                website: "https://johndoe.com",
                            },
                            {
                                name: "Tianfang Guo",
                                summary:
                                    "Creative graphic designer with over 10 years of experience in creating stunning visuals for brands and businesses.",
                                image: "/images/tianfang.jpeg",
                                website: "https://janesmith.com",
                            },
                            {
                                name: "Cord Mazzetti",
                                summary:
                                    "Wrote the website's code and made it look pretty. Person to blame for any bugs.",
                                image: "/images/cord.jpeg",
                                website: "https://cordmazz.com",
                            },
                            {
                                name: "Jackson Schilling",
                                summary:
                                    "Digital marketer with a focus on SEO and SEM, helping businesses grow their online presence and increase ROI.",
                                image: "/images/jackson.jpg",
                                website: "https://alicebrown.com",
                            },
                        ]}
                    />
                    <p>
                        This project is supervized by Prof. Mattan Erez who gave guidance regarding simulator design,
                        compute costs, website ui, and much more.
                    </p>
                    <MemberSummary
                        members={[
                            {
                                name: "Prof. Mattan Erez",
                                image: "/images/erez-mattan.png",
                                summary: "Prof. Erez is a faculty member at the University of Texas at Austin.",
                                website: "https://lph.ece.utexas.edu/merez/MattanErez/Home",
                            },
                        ]}
                    />
                    <p>The code for this project can be found at [_____LINK____TO_____GITHUB______].</p>
                </AboutText>
            </AboutContainer>
        </>
    );
};

export default PageAbout;
