// @ts-nocheck

"use client";

import { useEffect, useState } from "react";

const API_URL =
    process.env.NEXT_PUBLIC_API_URL ||
    "http://localhost:5000";

export default function Home() {
    const [about, setAbout] = useState(null);
    const [skills, setSkills] = useState([]);
    const [projects, setProjects] = useState([]);
    const [blogs, setBlogs] = useState([]);
    const [experience, setExperience] = useState([]);
    const [services, setServices] = useState([]);
    const [testimonials, setTestimonials] = useState([]);

    const [contactForm, setContactForm] = useState({
        name: "",
        email: "",
        subject: "",
        message: ""
    });

    const [contactStatus, setContactStatus] =
        useState("");

    useEffect(() => {
        const loadData = async () => {
            try {
                const [
                    aboutResponse,
                    skillsResponse,
                    projectsResponse,
                    blogsResponse,
                    experienceResponse,
                    servicesResponse,
                    testimonialsResponse
                ] = await Promise.all([
                    fetch(`${API_URL}/about`),
                    fetch(`${API_URL}/skills`),
                    fetch(`${API_URL}/projects`),
                    fetch(`${API_URL}/blogs`),
                    fetch(`${API_URL}/experience`),
                    fetch(`${API_URL}/services`),
                    fetch(`${API_URL}/testimonials`)
                ]);

                const aboutData =
                    await aboutResponse.json();

                const skillsData =
                    await skillsResponse.json();

                const projectsData =
                    await projectsResponse.json();

                const blogsData =
                    await blogsResponse.json();

                const experienceData =
                    await experienceResponse.json();

                const servicesData =
                    await servicesResponse.json();

                const testimonialsData =
                    await testimonialsResponse.json();

                setAbout(
                    aboutData.data ||
                    aboutData
                );

                setSkills(
                    Array.isArray(skillsData)
                        ? skillsData
                        : []
                );

                setProjects(
                    Array.isArray(projectsData)
                        ? projectsData
                        : []
                );

                setBlogs(
                    Array.isArray(blogsData)
                        ? blogsData.filter(
                              (blog) =>
                                  blog.published
                          )
                        : []
                );

                setExperience(
                    Array.isArray(experienceData)
                        ? experienceData
                        : []
                );

                setServices(
                    Array.isArray(servicesData)
                        ? servicesData
                        : []
                );

                setTestimonials(
                    Array.isArray(
                        testimonialsData
                    )
                        ? testimonialsData
                        : []
                );

            } catch (error) {
                console.error(
                    "Failed to load portfolio data:",
                    error
                );
            }
        };

        loadData();
    }, []);

    const getImageUrl = (image) => {
        if (!image) {
            return "";
        }

        if (image.startsWith("http")) {
            return image;
        }

        return `${API_URL}${image}`;
    };

    const handleContactChange = (e) => {
        setContactForm({
            ...contactForm,
            [e.target.name]: e.target.value
        });
    };

    const handleContactSubmit = async (e) => {
        e.preventDefault();

        setContactStatus("Sending...");

        try {
            const response = await fetch(
                `${API_URL}/contact`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type":
                            "application/json"
                    },
                    body: JSON.stringify(
                        contactForm
                    )
                }
            );

            const data =
                await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message ||
                    "Failed to send message"
                );
            }

            setContactStatus(
                "Message sent successfully."
            );

            setContactForm({
                name: "",
                email: "",
                subject: "",
                message: ""
            });

        } catch (error) {
            console.error(error);

            setContactStatus(
                error.message ||
                "Failed to send message."
            );
        }
    };

    return (
        <main>

            {/* NAVIGATION */}

            <nav className="navbar">
                <div className="nav-container">

                    <a
                        href="#home"
                        className="logo"
                    >
                        Sharon.
                    </a>

                    <div className="nav-links">

                        <a href="#home">
                            Home
                        </a>

                        <a href="#about">
                            About
                        </a>

                        <a href="#skills">
                            Skills
                        </a>

                        <a href="#projects">
                            Projects
                        </a>

                        <a href="#experience">
                            Experience
                        </a>

                        <a href="#services">
                            Services
                        </a>

                        <a href="#testimonials">
                            Testimonials
                        </a>

                        <a href="#blog">
                            Blog
                        </a>

                        <a href="#contact">
                            Contact
                        </a>

                    </div>

                </div>
            </nav>


            {/* HERO */}

            <section
                id="home"
                className="hero section"
            >

                <div className="hero-content">

                    <p className="eyebrow">
                        AI PRODUCT DESIGNER
                    </p>

                    <h1>
                        Designing digital
                        experiences that
                        <span>
                            make an impact.
                        </span>
                    </h1>

                    <p className="hero-description">
                        I am a computer science
                        student passionate about
                        AI, product design, UI/UX,
                        and creating meaningful
                        digital experiences.
                    </p>

                    <div className="hero-buttons">

                        <a
                            href="#projects"
                            className="button primary"
                        >
                            View My Work
                        </a>

                        <a
                            href="#contact"
                            className="button secondary"
                        >
                            Let's Talk
                        </a>

                    </div>

                </div>

                <div className="hero-card">

                    <div className="hero-card-inner">

                        <span>
                            AI
                        </span>

                        <span>
                            UX
                        </span>

                        <span>
                            PRODUCT
                        </span>

                        <span>
                            DESIGN
                        </span>

                    </div>

                </div>

            </section>


            {/* ABOUT */}

            <section
                id="about"
                className="section"
            >

                <div className="section-container">

                    <div className="section-heading">

                        <p className="eyebrow">
                            ABOUT ME
                        </p>

                        <h2>
                            Building with
                            curiosity and purpose.
                        </h2>

                    </div>

                    <div className="about-grid">

                        <div className="about-image">

                            {about?.profile_image ? (

                                <img
                                    src={getImageUrl(
                                        about.profile_image
                                    )}
                                    alt="Sharon"
                                />

                            ) : (

                                <div className="image-placeholder">
                                    <span>
                                        SHARON
                                    </span>
                                </div>

                            )}

                        </div>

                        <div className="about-content">

                            <h3>
                                {about?.title ||
                                    "AI Product Designer"}
                            </h3>

                            <p>
                                {about?.description ||
                                    "I am a computer science student passionate about AI, product design, UI/UX, and creating meaningful digital experiences."}
                            </p>

                            {about?.resume_url && (

                                <a
                                    href={getImageUrl(
                                        about.resume_url
                                    )}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="button primary"
                                >
                                    View Resume
                                </a>

                            )}

                        </div>

                    </div>

                </div>

            </section>


            {/* SKILLS */}

            <section
                id="skills"
                className="section section-alt"
            >

                <div className="section-container">

                    <div className="section-heading">

                        <p className="eyebrow">
                            SKILLS
                        </p>

                        <h2>
                            What I work with.
                        </h2>

                    </div>

                    <div className="skills-grid">

                        {skills.length === 0 ? (

                            <p>
                                No skills added yet.
                            </p>

                        ) : (

                            skills.map((skill) => (

                                <div
                                    className="skill-card"
                                    key={skill.id}
                                >

                                    <div className="skill-icon">
                                        {skill.icon ||
                                            "✦"}
                                    </div>

                                    <h3>
                                        {skill.name}
                                    </h3>

                                    <p>
                                        {skill.category ||
                                            "Skill"}
                                    </p>

                                    <div className="skill-bar">

                                        <div
                                            className="skill-progress"
                                            style={{
                                                width: `${Math.min(
                                                    skill.proficiency ||
                                                        0,
                                                    100
                                                )}%`
                                            }}
                                        />

                                    </div>

                                    <span>
                                        {skill.proficiency ||
                                            0}
                                        %
                                    </span>

                                </div>

                            ))

                        )}

                    </div>

                </div>

            </section>


            {/* PROJECTS */}

            <section
                id="projects"
                className="section"
            >

                <div className="section-container">

                    <div className="section-heading">

                        <p className="eyebrow">
                            PROJECTS
                        </p>

                        <h2>
                            Selected work.
                        </h2>

                    </div>

                    <div className="projects-grid">

                        {projects.length === 0 ? (

                            <p>
                                No projects added yet.
                            </p>

                        ) : (

                            projects.map(
                                (project) => (

                                    <article
                                        className="project-card"
                                        key={
                                            project.id
                                        }
                                    >

                                        <div className="project-image">

                                            {project.image ? (

                                                <img
                                                    src={getImageUrl(
                                                        project.image
                                                    )}
                                                    alt={
                                                        project.title
                                                    }
                                                />

                                            ) : (

                                                <div className="project-placeholder">
                                                    PROJECT
                                                </div>

                                            )}

                                        </div>

                                        <div className="project-content">

                                            <p className="project-label">

                                                {project.featured
                                                    ? "FEATURED PROJECT"
                                                    : "PROJECT"}

                                            </p>

                                            <h3>
                                                {
                                                    project.title
                                                }
                                            </h3>

                                            <p>
                                                {
                                                    project.description
                                                }
                                            </p>

                                            {project.technologies && (

                                                <div className="technology-list">

                                                    {project.technologies
                                                        .split(",")
                                                        .map(
                                                            (
                                                                tech,
                                                                index
                                                            ) => (

                                                                <span
                                                                    key={
                                                                        index
                                                                    }
                                                                >
                                                                    {tech.trim()}
                                                                </span>

                                                            )
                                                        )}

                                                </div>

                                            )}

                                            <div className="project-links">

                                                {project.project_url && (

                                                    <a
                                                        href={
                                                            project.project_url
                                                        }
                                                        target="_blank"
                                                        rel="noreferrer"
                                                    >
                                                        Live Project →
                                                    </a>

                                                )}

                                                {project.github_url && (

                                                    <a
                                                        href={
                                                            project.github_url
                                                        }
                                                        target="_blank"
                                                        rel="noreferrer"
                                                    >
                                                        GitHub →
                                                    </a>

                                                )}

                                            </div>

                                        </div>

                                    </article>

                                )
                            )

                        )}

                    </div>

                </div>

            </section>


            {/* EXPERIENCE */}

            <section
                id="experience"
                className="section section-alt"
            >

                <div className="section-container">

                    <div className="section-heading">

                        <p className="eyebrow">
                            EXPERIENCE
                        </p>

                        <h2>
                            My journey so far.
                        </h2>

                    </div>

                    <div className="timeline">

                        {experience.length === 0 ? (

                            <p>
                                No experience added yet.
                            </p>

                        ) : (

                            experience.map(
                                (item) => (

                                    <div
                                        className="timeline-item"
                                        key={item.id}
                                    >

                                        <div className="timeline-dot" />

                                        <div className="timeline-content">

                                            <span className="timeline-date">

                                                {item.start_date
                                                    ? item.start_date.substring(
                                                          0,
                                                          7
                                                      )
                                                    : ""}

                                                {" — "}

                                                {item.current_position
                                                    ? "Present"
                                                    : item.end_date
                                                    ? item.end_date.substring(
                                                          0,
                                                          7
                                                      )
                                                    : ""}

                                            </span>

                                            <h3>
                                                {
                                                    item.position
                                                }
                                            </h3>

                                            <h4>
                                                {
                                                    item.company
                                                }
                                            </h4>

                                            {item.location && (

                                                <p className="location">
                                                    {
                                                        item.location
                                                    }
                                                </p>

                                            )}

                                            <p>
                                                {
                                                    item.description
                                                }
                                            </p>

                                        </div>

                                    </div>

                                )
                            )

                        )}

                    </div>

                </div>

            </section>


            {/* SERVICES */}

            <section
                id="services"
                className="section"
            >

                <div className="section-container">

                    <div className="section-heading">

                        <p className="eyebrow">
                            SERVICES
                        </p>

                        <h2>
                            What I can help with.
                        </h2>

                    </div>

                    <div className="services-grid">

                        {services.length === 0 ? (

                            <p>
                                No services added yet.
                            </p>

                        ) : (

                            services.map(
                                (service) => (

                                    <div
                                        className="service-card"
                                        key={
                                            service.id
                                        }
                                    >

                                        <div className="service-icon">
                                            {service.icon ||
                                                "✦"}
                                        </div>

                                        <h3>
                                            {
                                                service.title
                                            }
                                        </h3>

                                        <p>
                                            {
                                                service.description
                                            }
                                        </p>

                                    </div>

                                )
                            )

                        )}

                    </div>

                </div>

            </section>


            {/* TESTIMONIALS */}

            <section
                id="testimonials"
                className="section section-alt"
            >

                <div className="section-container">

                    <div className="section-heading">

                        <p className="eyebrow">
                            TESTIMONIALS
                        </p>

                        <h2>
                            What people say.
                        </h2>

                    </div>

                    <div className="testimonials-grid">

                        {testimonials.length === 0 ? (

                            <p>
                                No testimonials added yet.
                            </p>

                        ) : (

                            testimonials.map(
                                (testimonial) => (

                                    <div
                                        className="testimonial-card"
                                        key={
                                            testimonial.id
                                        }
                                    >

                                        <p className="quote">
                                            "
                                            {
                                                testimonial.message
                                            }
                                            "
                                        </p>

                                        <div className="testimonial-person">

                                            {testimonial.image ? (

                                                <img
                                                    src={getImageUrl(
                                                        testimonial.image
                                                    )}
                                                    alt={
                                                        testimonial.name
                                                    }
                                                />

                                            ) : (

                                                <div className="avatar">

                                                    {
                                                        testimonial.name?.charAt(
                                                            0
                                                        )
                                                    }

                                                </div>

                                            )}

                                            <div>

                                                <strong>
                                                    {
                                                        testimonial.name
                                                    }
                                                </strong>

                                                <span>

                                                    {
                                                        testimonial.role
                                                    }

                                                    {testimonial.company
                                                        ? ` · ${testimonial.company}`
                                                        : ""}

                                                </span>

                                            </div>

                                        </div>

                                    </div>

                                )
                            )

                        )}

                    </div>

                </div>

            </section>


            {/* BLOG */}

            <section
                id="blog"
                className="section"
            >

                <div className="section-container">

                    <div className="section-heading">

                        <p className="eyebrow">
                            BLOG
                        </p>

                        <h2>
                            Thoughts & insights.
                        </h2>

                    </div>

                    <div className="blogs-grid">

                        {blogs.length === 0 ? (

                            <p>
                                No published blogs yet.
                            </p>

                        ) : (

                            blogs.map(
                                (blog) => (

                                    <article
                                        className="blog-card"
                                        key={
                                            blog.id
                                        }
                                    >

                                        <div className="blog-image">

                                            {blog.cover_image ? (

                                                <img
                                                    src={getImageUrl(
                                                        blog.cover_image
                                                    )}
                                                    alt={
                                                        blog.title
                                                    }
                                                />

                                            ) : (

                                                <div className="blog-placeholder">
                                                    BLOG
                                                </div>

                                            )}

                                        </div>

                                        <div className="blog-content">

                                            <span>
                                                {blog.author ||
                                                    "Sharon"}
                                            </span>

                                            <h3>
                                                {
                                                    blog.title
                                                }
                                            </h3>

                                            <p>
                                                {
                                                    blog.excerpt
                                                }
                                            </p>

                                            <a href="#">
                                                Read Article →
                                            </a>

                                        </div>

                                    </article>

                                )
                            )

                        )}

                    </div>

                </div>

            </section>


            {/* CONTACT */}

            <section
                id="contact"
                className="section contact-section"
            >

                <div className="section-container">

                    <div className="contact-grid">

                        <div>

                            <p className="eyebrow">
                                CONTACT
                            </p>

                            <h2>
                                Let's create
                                something meaningful.
                            </h2>

                            <p className="contact-description">
                                Have a project,
                                opportunity, or idea?
                                Send me a message and
                                let's talk.
                            </p>

                        </div>

                        <form
                            className="contact-form"
                            onSubmit={
                                handleContactSubmit
                            }
                        >

                            <input
                                type="text"
                                name="name"
                                placeholder="Your name"
                                value={
                                    contactForm.name
                                }
                                onChange={
                                    handleContactChange
                                }
                                required
                            />

                            <input
                                type="email"
                                name="email"
                                placeholder="Your email"
                                value={
                                    contactForm.email
                                }
                                onChange={
                                    handleContactChange
                                }
                                required
                            />

                            <input
                                type="text"
                                name="subject"
                                placeholder="Subject"
                                value={
                                    contactForm.subject
                                }
                                onChange={
                                    handleContactChange
                                }
                            />

                            <textarea
                                name="message"
                                placeholder="Your message"
                                rows={6}
                                value={
                                    contactForm.message
                                }
                                onChange={
                                    handleContactChange
                                }
                                required
                            />

                            <button
                                type="submit"
                                className="button primary"
                            >
                                Send Message
                            </button>

                            {contactStatus && (

                                <p className="contact-status">
                                    {
                                        contactStatus
                                    }
                                </p>

                            )}

                        </form>

                    </div>

                </div>

            </section>


            {/* FOOTER */}

            <footer className="footer">

                <div className="footer-container">

                    <div>

                        <h3>
                            Sharon.
                        </h3>

                        <p>
                            AI Product Designer
                        </p>

                    </div>

                    <div>

                        <p>
                            ©{" "}
                            {new Date().getFullYear()}
                            {" "}
                            Sharon. All rights
                            reserved.
                        </p>

                    </div>

                </div>

            </footer>

        </main>
    );
}