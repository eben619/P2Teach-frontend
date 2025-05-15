import React from 'react';
import useAppStore from '../store/useAppStore';
import { FaChalkboardTeacher, FaHandshake, FaShieldAlt, FaMoneyCheckAlt, FaComments, FaLinkedin, FaGithub, FaTwitter, FaGlobe, FaMedium } from 'react-icons/fa';
import { MdLocationOn, MdAccessTime } from 'react-icons/md';
import { appTheme } from '../constant/theme';
import { useNavigate } from 'react-router-dom';
import TeamCard from '../components/cards/TeamCard';
import Sam from '../assets/teamPhotos/Sam Edem.jpg'
import Ababio from '../assets/teamPhotos/Ababio.jpg'
import Philip from "../assets/teamPhotos/Philip.jpg"
import Ben from "../assets/teamPhotos/Ben.jpg"
import Charity from '../assets/teamPhotos/Charity.png'
import Peer from '../assets/peer-peer.jpg'

const LandingPage = () => {
  const { theme } = useAppStore(['theme']);
  const navigate = useNavigate();

  const teams = [
    {
      name: "Ababio",
      photo: Ababio,
      role: "Project Lead",
      describe: "Oversees strategic direction and ensures project milestones are met"
    },
    {
      name: "Sam Edem",
      photo: Sam,
      role: "Business Development",
      describe: "Drives partnerships and expands our academic network"
    },
    {
      name: "Bernard Baah",
      photo: Ben,
      role: "Fullstack/Blockchain Developer",
      describe: "Builds secure platform infrastructure and smart contracts"
    },
    {
      name: "Philip A. Armah",
      photo: Philip,
      role: "UI/UX Designer",
      describe: "Creates intuitive user experiences and visual interfaces"
    },
    {
      name: "Charity",
      photo: Charity,
      role: "Marketing Lead",
      describe: "Develops engagement strategies and grows our community"
    }
  ]

  return (
    <div style={{ 
      backgroundColor: appTheme[theme].base.primary,
      color: theme === "light" ? appTheme.text.primary : appTheme.text.inverted,
      minHeight: '100vh'
    }}>
      {/* Hero Section */}
      {/* Hero Section */}
<section className="relative overflow-hidden" style={{ 
  backgroundColor: appTheme[theme].accent.primary,
  minHeight: '60vh',
  padding: '6rem 1rem'
}}>
  <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12">
    {/* Text Content */}
    <div className="flex-1 text-left space-y-8 z-10">
      <h1 className="text-5xl md:text-6xl font-bold leading-tight" style={{
        color: appTheme.text.inverted,
        textShadow: `2px 2px 4px ${appTheme[theme].neutral[700]}`
      }}>
        Master Your Courses with<br/>
        <span style={{ color: appTheme[theme].accent.secondary }}>Peer-to-Peer</span> Excellence
      </h1>
      
      <p className="text-xl md:text-2xl max-w-2xl" style={{
        color: appTheme.text.inverted,
        opacity: 0.95,
        lineHeight: 1.6
      }}>
        Connect with top-performing students across Ghanaian universities for personalized, course-specific tutoring sessions.
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <button 
          onClick={() => navigate("/login")}
          className="px-8 py-4 rounded-lg font-semibold transform transition-all hover:scale-105"
          style={{ 
            backgroundColor: appTheme.text.inverted,
            color: appTheme[theme].accent.primary,
            boxShadow: appTheme.shadows.xl
          }}
        >
          Find Your Tutor Now →
        </button>
        <button
          className="px-8 py-4 rounded-lg font-semibold border-2 transform transition-all hover:scale-105"
          style={{
            borderColor: appTheme.text.inverted,
            color: appTheme.text.inverted,
            background: 'transparent'
          }}
        >
          How It Works
        </button>
      </div>
    </div>

    {/* Image Container */}
    <div className="flex-1 relative" style={{ maxWidth: '600px' }}>
      <div className="relative rounded-3xl overflow-hidden" style={{
        boxShadow: appTheme.shadows.xl,
        border: `4px solid ${appTheme[theme].accent.secondary}`
      }}>
        <img 
          src={Peer} 
          alt="Students collaborating" 
          className="w-full h-full object-cover"
          style={{
            minHeight: '400px',
            filter: `brightness(${theme === 'light' ? 1.05 : 0.95})`
          }}
        />
        <div className="absolute inset-0" style={{
          background: `linear-gradient(45deg, ${appTheme[theme].accent.primary}20, ${appTheme[theme].accent.secondary}30)`
        }}></div>
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full" style={{
        backgroundColor: appTheme[theme].accent.secondary,
        opacity: 0.2,
        filter: 'blur(40px)'
      }}></div>
    </div>
  </div>

  {/* Wave Divider */}
  <div className="absolute bottom-0 left-0 w-full overflow-hidden">
    <svg 
      viewBox="0 0 1200 120" 
      style={{
        fill: appTheme[theme].base.primary,
        transform: 'rotate(180deg)'
      }}
    >
      <path d="M0 0v46.29c47.79 22.2 103.59 32.17 158 28 70.36-5.37 136.33-33.31 206.8-37.5 73.84-4.36 147.54 16.88 218.2 35.26 69.27 18 138.3 24.88 209.4 13.08 36.15-6 69.85-17.84 104.45-29.34C989.49 25 1113-14.29 1200 52.47V0z" 
      opacity=".25" />
      <path d="M0 0v15.81c13 21.11 27.64 41.05 47.69 56.24C99.41 111.27 165 111 224.58 91.58c31.15-10.15 60.09-26.07 89.67-39.8 40.92-19 84.73-46 130.83-49.67 36.26-2.85 70.9 9.42 98.6 31.56 31.77 25.39 62.32 62 103.63 73 40.44 10.79 81.35-6.69 119.13-24.28s75.16-39 116.92-43.05c59.73-5.85 113.28 22.88 168.9 38.84 30.2 8.66 59 6.17 87.09-7.5 22.43-10.89 48-26.93 60.65-49.24V0z" 
      opacity=".5" />
      <path d="M0 0v5.63C149.93 59 314.09 71.32 475.83 42.57c43-7.64 84.23-20.12 127.61-26.46 59-8.63 112.48 12.24 165.56 35.4C827.93 77.22 886 95.24 951.2 90c86.53-7 172.46-45.71 248.8-84.81V0z" />
    </svg>
  </div>
</section>

      {/* Features Grid */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          <div className="p-6 rounded-xl" style={{ backgroundColor: appTheme[theme].surface.primary }}>
            <FaChalkboardTeacher className="text-4xl mb-4" style={{ color: appTheme[theme].accent.primary }} />
            <h3 className="text-xl font-bold mb-3">Find Tutors Easily</h3>
            <p className="opacity-80">Browse verified tutors by course, rating, and availability</p>
          </div>
          
          <div className="p-6 rounded-xl" style={{ backgroundColor: appTheme[theme].surface.primary }}>
            <FaShieldAlt className="text-4xl mb-4" style={{ color: appTheme[theme].accent.secondary }} />
            <h3 className="text-xl font-bold mb-3">Secure Transactions</h3>
            <p className="opacity-80">Blockchain-powered payments with smart contracts</p>
          </div>
          
          <div className="p-6 rounded-xl" style={{ backgroundColor: appTheme[theme].surface.primary }}>
            <MdLocationOn className="text-4xl mb-4" style={{ color: appTheme[theme].accent.tertiary }} />
            <h3 className="text-xl font-bold mb-3">Flexible Learning</h3>
            <p className="opacity-80">Meet in-person or virtual sessions</p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-6" style={{ backgroundColor: appTheme[theme].base.secondary }}>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">How P2Teach Works</h2>
          <div className="grid gap-8">
            <div className="flex items-center gap-6">
              <div className="w-12 h-12 rounded-full flex items-center justify-center" 
                style={{ backgroundColor: appTheme[theme].accent.primary }}>
                <span className="text-white font-bold">1</span>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Search & Match</h3>
                <p className="opacity-80">Find tutors based on your course needs and schedule</p>
              </div>
            </div>
            
            <div className="flex items-center gap-6">
              <div className="w-12 h-12 rounded-full flex items-center justify-center" 
                style={{ backgroundColor: appTheme[theme].accent.secondary }}>
                <span className="text-white font-bold">2</span>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Secure Booking</h3>
                <p className="opacity-80">Confirm session details and make secure payment</p>
              </div>
            </div>
            
            <div className="flex items-center gap-6">
              <div className="w-12 h-12 rounded-full flex items-center justify-center" 
                style={{ backgroundColor: appTheme[theme].accent.tertiary }}>
                <span className="text-white font-bold">3</span>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Learn & Grow</h3>
                <p className="opacity-80">Attend sessions and track your progress</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      {/* Team Section */}
<section className="py-20 px-6">
  <div className="max-w-6xl mx-auto">
    <h2 className="text-3xl font-bold text-center mb-12">Meet Our Team</h2>
    <div className="grid md:grid-cols-3 gap-8">
      {/* Team Member 1 */}
     {teams.map((teamMember, index) => (
        <TeamCard img={teamMember.photo} roleDescription={teamMember.describe} name={teamMember.name} role={teamMember.role} theme={theme} key={index} />
     ))}

    </div>

  </div>
</section>

      {/* CTA Section */}
      <section className="py-20 px-6 text-center" style={{ backgroundColor: appTheme[theme].base.tertiary }}>
        <h2 className="text-3xl font-bold mb-8">Ready to Boost Your Grades?</h2>
        <button 
            onClick={()=> navigate("/login")}
          className="px-8 py-4 rounded-lg font-semibold text-lg"
          style={{ 
            backgroundColor: appTheme[theme].accent.primary,
            color: appTheme.text.inverted
          }}
        >
          Get Started Now
        </button>
      </section>
    </div>
  );
};

export default LandingPage;