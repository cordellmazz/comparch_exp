import styled from "styled-components";
import Navigation from "../layout/Navigation";
import MemberSummary from "../layout/misc/MemberSummary";

const WhiteBackground = styled.div`
    background-color: white;
    opacity: 0.85;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    z-index: -1;
`;

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

const BackgroundBanner = styled.img`
    position: absolute;
    top: 0;
    // opacity: 0.3;
    width: 100%;
    height: 400px;
    background-color: #f0f0f0;
    z-index: -2;
    object-fit: cover;
`;

const BackestgroundImage = styled.div`
    position: fixed;
    width: 100%;
    height: 100%;
    background-image: url("/images/background4.jpeg");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    z-index: -3;
`;

const PageAbout = () => {
    return (
        <>
            <Navigation />
            <BackestgroundImage />
            <BackgroundBanner src={"/images/background1.jpeg"} />
            <WhiteBackground />
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
                                summary: "Generated the benchmarks and created the simulation script using Gem5.",
                                image: "/images/ben.jpeg",
                                website: "https://www.linkedin.com/in/bendara/",
                            },
                            {
                                name: "Tianfang Guo",
                                summary:
                                    "Spent countless hours pouring through gem5 documentation, still very confused.",
                                image: "/images/tianfang.jpeg",
                                website: "https://tianfangguo.github.io/",
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
                                summary: "Worked on the database, data management, and documentation.",
                                image: "/images/jackson.jpg",
                                website: "https://www.linkedin.com/in/jackson-s-097389136/",
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
                    <p>
                        The code for this project's site can be found at{" "}
                        <a href="https://github.com/cordellmazz/comparch_exp">the comparch_exp GitHub repository</a> and
                        the code for the simulator can be found at{" "}
                        <a href="https://github.com/TianfangGuo/Computer-Architecture-Explorer">
                            Computer-Architecture-Explorer GitHub repository
                        </a>
                        .
                    </p>
                </AboutText>
            </AboutContainer>
        </>
    );
};

export default PageAbout;
