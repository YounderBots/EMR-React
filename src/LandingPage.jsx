import React, { useState, useEffect, useRef } from 'react';
import './LandingPage.css';
import { BiBrain, BiCalendar, BiCalendarEvent, BiClipboard, BiCloud, BiCloudDownload, BiFolder, BiGlobe, BiLock, BiMobile, BiNotepad, BiReceipt, BiRocket, BiShield, BiTime, BiUserPlus, BiUserVoice } from 'react-icons/bi';
import { GiChart, GiChemicalDrop, GiDoctorFace, GiHospital, GiLightningElectron, GiMedicinePills, GiMicroscope, GiNotebook, GiNurseFemale, GiRobotAntennas, GiRobotHelmet, GiStethoscope, GiSyringe, GiThunderBlade } from 'react-icons/gi';
import { ImLab } from 'react-icons/im';
import { CgProfile, CgWebsite } from 'react-icons/cg';
import { FaRobot } from 'react-icons/fa';
import { BsFillLightningChargeFill, BsGlobe2, BsPhoneFlip, BsRobot, BsThunderbolt } from 'react-icons/bs';
import { PiLockKeyBold } from 'react-icons/pi';
import { LuLockKeyholeOpen } from 'react-icons/lu';
import { RiSecurePaymentLine, RiShieldKeyholeLine } from "react-icons/ri";
import { FaMoneyBillWheat, FaSackDollar, FaUserDoctor } from 'react-icons/fa6';
import { TbMoneybag } from 'react-icons/tb';
import { CiMobile1, CiMobile4 } from 'react-icons/ci';
import logo from './assets/images/ananseEmrLogo.png'
import ananseEmrLogo from './assets/images/ananseEmrLogo.png'



const colorWhiteFont = { color: 'white' }


// Particle Animation Component
const ParticleBackground = () => {
    const canvasRef = useRef(null);


    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationId;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        const particles = [];
        const particleCount = 50;

        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 2 + 1,
                opacity: Math.random() * 0.5 + 0.2
            });
        }

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach(particle => {
                particle.x += particle.vx;
                particle.y += particle.vy;

                if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
                if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(96, 165, 250, ${particle.opacity})`;
                ctx.fill();
            });

            // Draw connections
            particles.forEach((particle, i) => {
                particles.slice(i + 1).forEach(otherParticle => {
                    const dx = particle.x - otherParticle.x;
                    const dy = particle.y - otherParticle.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 100) {
                        ctx.beginPath();
                        ctx.moveTo(particle.x, particle.y);
                        ctx.lineTo(otherParticle.x, otherParticle.y);
                        ctx.strokeStyle = `rgba(96, 165, 250, ${0.1 * (1 - distance / 100)})`;
                        ctx.lineWidth = 1;
                        ctx.stroke();
                    }
                });
            });

            animationId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            cancelAnimationFrame(animationId);
        };
    }, []);

    return <canvas ref={canvasRef} className="particle-canvas" />;
};

// Floating Icons Component
const FloatingIcons = () => {
    // const icons = ['⚕️', <GiMedicinePills style={colorWhiteFont} />, <GiMicroscope style={colorWhiteFont} />, <GiChart style={colorWhiteFont} />, <GiHospital style={colorWhiteFont} />, <GiSyringe style={colorWhiteFont} />, <GiStethoscope style={colorWhiteFont} />, <GiNotebook style={colorWhiteFont} />];
    const icons = [
        <img src={ananseEmrLogo} style={{ height: '70px', objectFit: 'cover' }} />,

        <GiMedicinePills style={colorWhiteFont} />, <GiMicroscope style={colorWhiteFont} />, <GiChart style={colorWhiteFont} />,
        <img src={ananseEmrLogo} style={{ height: '50px', objectFit: 'cover' }} />, <GiHospital style={colorWhiteFont} />, <GiSyringe style={colorWhiteFont} />, <GiStethoscope style={colorWhiteFont} />, <GiNotebook style={colorWhiteFont} />
    ]
    return (
        <div className="floating-icons">
            {icons.map((icon, index) => (
                <div
                    key={index}
                    className="floating-icon"
                    style={{
                        '--delay': `${index * 0.5}s`,
                        '--duration': `${8 + index}s`,
                        left: `${10 + (index * 10)}%`,
                        top: `${20 + (index % 3) * 20}%`
                    }}
                >
                    {icon}
                </div>
            ))}
        </div>
    );
};

// Hero Component
const Hero = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePosition({
                x: (e.clientX - window.innerWidth / 2) / 50,
                y: (e.clientY - window.innerHeight / 2) / 50
            });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const scrollToFeatures = () => {
        document.getElementById('features').scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section className="hero">
            <ParticleBackground />
            <FloatingIcons />
            <div className="hero-content">
                <div className="hero-badge">
                    <span className="badge-text"><BiRocket /> Next-Gen Healthcare</span>
                </div>
                <h1
                    className="hero-title"
                    style={{
                        transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`
                    }}
                >
                    Revolutionizing Healthcare
                    <span className="gradient-text"> with <br />Ananse EMR</span>
                </h1>
                <p className="hero-subtitle">
                    A next-generation platform powered by latest technologies to manage patient records,
                    appointments, billing, and care with unprecedented efficiency.
                </p>
                <div className="hero-buttons">
                    <button className="cta-primary" onClick={scrollToFeatures}>
                        <span>Explore Features</span>
                        <div className="button-glow"></div>
                    </button>
                    <a href="http://153.92.222.134:8070/hms/login/login" target='_blank' style={{ textDecoration: 'none' }}>
                        <button className="cta-secondary">

                            <span>Start Trial</span>
                            <div className="play-icon">▶</div>
                        </button>
                    </a>
                </div>
                {/* <div className="hero-stats">
          <div className="stat-item">
            <div className="stat-number">10K+</div>
            <div className="stat-label">Healthcare Providers</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">1M+</div>
            <div className="stat-label">Patient Records</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">99.9%</div>
            <div className="stat-label">Uptime</div>
          </div>
        </div> */}
            </div>
            <div className="hero-visual">
                <div className="medical-dashboard">
                    <div className="dashboard-header">
                        <div className="status-dots">
                            <span className="dot green"></span>
                            <span className="dot yellow"></span>
                            <span className="dot red"></span>
                        </div>
                    </div>
                    <div className="dashboard-content">
                        <div className="chart-container" style={{ backgroundColor: 'white', width: '100%' }}>
                            {/* <div className="pulse-line"></div> */}
                            <div style={{ height: '80%', display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '20px' }} >
                                <img className='logoPulse' src={ananseEmrLogo} alt="" style={{ height: '60%', objectFit: 'cover' }} />
                                <div style={{ color: '#3C669D', display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
                                    <p style={{ fontSize: '28px', fontWeight: '700' }}>Ananse EMR</p>
                                    <p style={{ fontSize: '13px' }}>[Revolutionizing Health Care]</p>

                                </div>

                            </div>
                        </div>
                        <div className="data-cards">
                            <div className="data-card">
                                <div className="card-icon"><CgProfile style={colorWhiteFont} /></div>
                                <div className="card-data">2,847</div>
                            </div>
                            <div className="data-card">
                                <div className="card-icon"><GiChart style={colorWhiteFont} /></div>
                                <div className="card-data">94%</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

// Why Choose Section with 3D Cards
const WhyChoose = () => {
    const [hoveredCard, setHoveredCard] = useState(null);

    const benefits = [
        {
            title: "Centralized Patient Records",
            description: "Easily store and access complete patient histories, lab reports, and prescriptions in one secure system.",
            icon: <BiFolder style={colorWhiteFont} />,
            color: "from-blue-500 to-purple-600"
        },
        {
            title: "Improved Efficiency",
            description: "Digitized workflows reduce paperwork and manual errors, allowing staff to spend more time on patient care.",
            icon: <BiTime style={colorWhiteFont} />,
            color: "from-green-500 to-blue-600"
        },
        {
            title: "Data Security & Compliance",
            description: "Patient information is protected with secure access controls and compliance with healthcare regulations.",
            icon: <RiShieldKeyholeLine style={colorWhiteFont} />,
            color: "from-purple-500 to-pink-600"
        },
        {
            title: "Accessibility Anywhere",
            description: "Cloud-based access enables doctors and staff to securely view and update records from any device, anytime.",
            icon: <BiCloudDownload style={colorWhiteFont} />,
            color: "from-cyan-500 to-blue-600"
        },
        {
            title: "Better Patient Engagement",
            description: "Patients can view their reports, prescriptions, and appointments online, leading to better communication and trust.",
            icon: <BiUserVoice style={colorWhiteFont} />,
            color: "from-purple-500 to-pink-600"
        }
    ];

    return (
        <section className="why-choose">
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">
                        Why Choose Our <span className="gradient-text">Ananse EMR</span>
                    </h2>
                    <p className="section-subtitle">
                        Experience the future of healthcare management with cutting-edge technology
                    </p>
                </div>
                <div className="benefits-grid">
                    {benefits.map((benefit, index) => (
                        <div
                            key={index}
                            className={`benefit-card-3d ${hoveredCard === index ? 'hovered' : ''}`}
                            onMouseEnter={() => setHoveredCard(index)}
                            onMouseLeave={() => setHoveredCard(null)}
                            style={{ '--delay': `${index * 0.1}s` }}
                        >
                            <div className="card-inner">
                                <div className="card-front">
                                    <div className={`card-gradient bg-gradient-to-br ${benefit.color}`}></div>
                                    <div className="card-content">
                                        <div className="benefit-icon">{benefit.icon}</div>
                                        <h3>{benefit.title}</h3>
                                        <p>{benefit.description}</p>
                                    </div>
                                    <div className="card-glow"></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

// Features Section with Interactive Elements
const Features = () => {
    const [activeFeature, setActiveFeature] = useState(0);

    const features = [
        {
            icon: <GiHospital style={colorWhiteFont} />,
            title: "Smart Front Office",
            description: "AI-powered appointment scheduling with conflict detection and automated patient flow optimization.",
            visual: <BiCalendarEvent style={colorWhiteFont} />
        },
        {
            icon: <FaUserDoctor style={colorWhiteFont} />,
            title: "Doctor Command Center",
            description: "Voice-activated charting, predictive diagnosis assistance, and streamlined patient care workflows.",
            visual: <GiStethoscope style={colorWhiteFont} />
        },
        {
            icon: <GiNurseFemale style={colorWhiteFont} />,
            title: "Nurse Intelligence Hub",
            description: "Real-time vitals monitoring, smart alerts, and collaborative care coordination dashboard.",
            visual: <GiSyringe style={colorWhiteFont} />
        },
        {
            icon: <FaSackDollar style={colorWhiteFont} />,
            title: "Revenue Optimizer",
            description: "Automated billing, insurance claim processing, and financial analytics with fraud detection.",
            visual: <GiChart style={colorWhiteFont} />
        },
        {
            icon: <GiMicroscope style={colorWhiteFont} />,
            title: "Lab Integration Suite",
            description: "Seamless lab orders, instant results delivery, and AI-powered diagnostic recommendations.",
            visual: <GiChemicalDrop style={colorWhiteFont} />

        },
        {
            icon: <GiMedicinePills style={colorWhiteFont} />,
            title: "Pharmacy Network",
            description: "Smart inventory management, automated reordering, and drug interaction checking.",
            visual: <ImLab style={colorWhiteFont} />
        },
        {
            icon: <BsPhoneFlip style={colorWhiteFont} />,
            title: "Patient Universe",
            description: "Telemedicine platform, health tracking, appointment booking, and secure messaging portal.",
            visual: <BsGlobe2 style={colorWhiteFont} />
        }
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveFeature((prev) => (prev + 1) % features.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section id="features" className="features">
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">
                        Complete <span className="gradient-text">Healthcare Ecosystem</span>
                    </h2>
                </div>
                <div className="features-showcase">
                    <div className="features-grid">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className={`feature-card-modern ${activeFeature === index ? 'active' : ''}`}
                                onClick={() => setActiveFeature(index)}
                            >
                                <div className="feature-icon-container">
                                    <div className="feature-icon">{feature.icon}</div>
                                    <div className="icon-pulse"></div>
                                </div>
                                <div className="feature-content">
                                    <h3>{feature.title}</h3>
                                    <p>{feature.description}</p>
                                </div>
                                <div className="feature-arrow">→</div>
                            </div>
                        ))}
                    </div>
                    <div className="features-visual">
                        <div className="visual-container">
                            <div className="central-hub">
                                <div className="hub-core">{features[activeFeature].visual}</div>
                                <div className="hub-rings">
                                    <div className="ring ring-1"></div>
                                    <div className="ring ring-2"></div>
                                    <div className="ring ring-3"></div>
                                </div>
                                <div className="data-streams">
                                    {[...Array(8)].map((_, i) => (
                                        <div key={i} className="data-stream" style={{ '--i': i }}></div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

// How It Works with Timeline Animation
const HowItWorks = () => {
    const [visibleSteps, setVisibleSteps] = useState([]);

    const steps = [
        {
            step: "01",
            title: "Patient Registration",
            description: "Quick and easy digital registration with essential details securely stored in the system.",
            icon: <BiUserPlus style={colorWhiteFont} />
        },
        {
            step: "02",
            title: "Appointment Scheduling",
            description: "Flexible scheduling to manage patient visits, avoid double-booking, and improve clinic flow.",
            icon: <BiCalendar style={colorWhiteFont} />
        },
        {
            step: "03",
            title: "Clinical Documentation",
            description: "Doctors can record patient history, diagnoses, and treatment plans in an organized format.",
            icon: <BiNotepad style={colorWhiteFont} />
        },
        {
            step: "04",
            title: "Prescription & Lab Orders",
            description: "Generate digital prescriptions and send lab requests directly through the EMR system.",
            icon: <BiClipboard style={colorWhiteFont} />
        },
        {
            step: "05",
            title: "Billing & Reports",
            description: "Streamlined billing process with accurate invoices and insightful patient or clinic reports.",
            icon: <BiReceipt style={colorWhiteFont} />
        }
    ];


    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const stepIndex = parseInt(entry.target.dataset.step);
                        setVisibleSteps(prev => [...new Set([...prev, stepIndex])]);
                    }
                });
            },
            { threshold: 0.1 }
        );

        document.querySelectorAll('.timeline-step').forEach((step) => {
            observer.observe(step);
        });

        return () => observer.disconnect();
    }, []);

    return (
        <section className="how-it-works">
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title white">
                        The Future of Healthcare is <span className="gradient-text-light">Here</span>
                    </h2>
                </div>
                <div className="timeline">
                    <div className="timeline-line"></div>
                    {steps.map((step, index) => (
                        <div
                            key={index}
                            className={`timeline-step ${visibleSteps.includes(index) ? 'visible' : ''}`}
                            data-step={index}
                        >
                            <div className="timeline-content">
                                <div className="step-icon">
                                    <span>{step.icon}</span>
                                </div>
                                <div className="step-info">
                                    <div className="step-number">{step.step}</div>
                                    <h3>{step.title}</h3>
                                    <p>{step.description}</p>
                                </div>
                            </div>
                            <div className="timeline-dot"></div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

//Contact Modal 

const LandingPageContactModal = ({ setIsOpenModal }) => {
    const [formData, setFormData] = useState({
        fullName: "",
        companyName: "",
        email: "",
        phoneNumber: "",
        requirements: "",
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleFormChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const SaveTrailUser = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API call
        setTimeout(() => {
            alert("Trial request submitted successfully!");
            setIsOpenModal(false);
            setIsSubmitting(false);
        }, 1500);
    };

    return (
        <div className="modal-overlay" onClick={() => setIsOpenModal(false)}>
            <div className="modal-container" onClick={(e) => e.stopPropagation()}>
                {/* Background decoration */}
                <div className="modal-bg-decoration">
                    <div className="decoration-circle decoration-1"></div>
                    <div className="decoration-circle decoration-2"></div>
                    <div className="decoration-circle decoration-3"></div>
                </div>

                {/* Close button */}
                <button
                    className="modal-close-btn"
                    onClick={() => setIsOpenModal(false)}
                    aria-label="Close modal"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                </button>

                {/* Header */}
                <div className="modal-header">
                    <div className="modal-icon">
                        <img src={logo} alt="" style={{ height: '100%', objectFit: 'cover' }} />
                    </div>
                        <p className='modal-title' style={{ fontSize: '28px', fontWeight: '700' }}>Ananse EMR</p>
                    <h2>Start Your Free Trial</h2>
                    <p className="modal-subtitle">Experience the full power of our platform with a 14-day free trial</p>
                </div>

                {/* Form */}
                <div className="modal-form">
                    <div className="form-row">
                        <div className="form-field">
                            <label htmlFor="fullName">Full Name *</label>
                            <input
                                id="fullName"
                                type="text"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleFormChange}
                                placeholder="Enter your full name"
                                required
                            />
                        </div>
                        <div className="form-field">
                            <label htmlFor="companyName">Company *</label>
                            <input
                                id="companyName"
                                type="text"
                                name="companyName"
                                value={formData.companyName}
                                onChange={handleFormChange}
                                placeholder="Your company name"
                                required
                            />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-field">
                            <label htmlFor="email">Email Address *</label>
                            <input
                                id="email"
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleFormChange}
                                placeholder="your@email.com"
                                required
                            />
                        </div>
                        <div className="form-field">
                            <label htmlFor="phoneNumber">Phone Number</label>
                            <input
                                id="phoneNumber"
                                type="tel"
                                name="phoneNumber"
                                value={formData.phoneNumber}
                                onChange={handleFormChange}
                                placeholder="+1 (555) 000-0000"
                            />
                        </div>
                    </div>

                    <div className="form-field">
                        <label htmlFor="requirements">Tell us about your needs</label>
                        <textarea
                            id="requirements"
                            name="requirements"
                            rows="3"
                            value={formData.requirements}
                            onChange={handleFormChange}
                            placeholder="What are you looking to achieve? Any specific requirements?"
                        />
                    </div>

                    <button
                        type="button"
                        className="submit-button"
                        disabled={isSubmitting}
                        onClick={SaveTrailUser}
                        style={{ marginTop: '10px' }}
                    >
                        {isSubmitting ? (
                            <span className="button-content">
                                <div className="loading-spinner"></div>
                                Processing...
                            </span>
                        ) : (
                      

                            <span className="button-content">
                                Start Free Trial
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                    <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </span>
              
                        )}
                    </button>

                    <p className="form-disclaimer">
                        No credit card required • Cancel anytime • Full access to all features
                    </p>
                </div>
            </div>


        </div>
    );
};


// Final CTA with Interactive Elements
const FinalCTA = ({ setIsOpenModal }) => {


    return (
        <section className="final-cta">
            <div className="cta-background">
                <div className="cta-grid"></div>
            </div>
            <div className="container">
                <div className="cta-content">
                    <h2>Ready to Transform Healthcare?</h2>
                    <p>Join thousands of healthcare providers revolutionizing patient care with our Ananse EMR platform.</p>
                    <div className="cta-buttons">
                      <a href="http://153.92.222.134:8070/hms/login/login" target='_blank' style={{textDecoration:'none'}}> 

                        <button className="cta-primary large">
                            <span>Start Free Trial</span>
                            <div className="button-shine"></div>
                        </button>
                      </a>
                        <button className="cta-outline">
                            <span onClick={() => setIsOpenModal(true)}>Schedule Demo</span>
                        </button>

                    </div>
                    <div className="trust-indicators">
                        <div className="trust-item">
                            <span className="trust-icon">
                                <BiShield />
                            </span>
                            <span>HIPAA Compliant</span>
                        </div>
                        <div className="trust-item">
                            <span className="trust-icon">
                                <BsFillLightningChargeFill />
                            </span>
                            <span>99.99% Uptime</span>
                        </div>
                        <div className="trust-item">
                            <span className="trust-icon">
                                <BiLock />
                            </span>
                            <span>Enterprise Security</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};



// Footer
const Footer = () => {


    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-content">
                    <div className="footer-brand">
                        <h3>Ananse EMR</h3>
                        <p>Revolutionizing Healthcare Technology</p>
                        <small>Pioneering the future of healthcare.</small>
                    </div>
                    <div className="footer-links">
                        <div className="link-group">
                            <h4>Product</h4>
                            <a href="#features">Features</a>
                            {/* <a href="#pricing">Pricing</a>
                            <a href="#security">Security</a> */}
                        </div>
                        <div className="link-group">
                            <h4>Company</h4>
                            <a href="#about">About</a>
                            {/* <a href="#careers">Careers</a>
                            <a href="#contact">Contact</a> */}
                        </div>


                    </div>
                </div>
                <div className="footer-bottom">
                    <p>&copy; 2025 | All rights reserved @ Ananse EMR.</p>
                </div>
            </div>
        </footer>
    );
};

// Main App Component
const LandingPage = () => {
    const [isOpenModal, setIsOpenModal] = useState(false);

    useEffect(() => {
        // show modal after 4 seconds
        const timer = setTimeout(() => {
            setIsOpenModal(true);
        }, 2000);

        // cleanup timer when component unmounts
        return () => clearTimeout(timer);
    }, []);


    return (
        <div className="LandingPage">
            <Hero />
            <WhyChoose />
            <Features />
            <HowItWorks />
            <FinalCTA setIsOpenModal={setIsOpenModal} />
            <Footer />
            {
                isOpenModal && <LandingPageContactModal setIsOpenModal={setIsOpenModal} />
            }
        </div>
    );
};

export default LandingPage;