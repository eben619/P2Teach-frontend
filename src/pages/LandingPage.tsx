import React from 'react';
import useAppStore from '../store/useAppStore';
import { FaChalkboardTeacher, FaHandshake, FaShieldAlt, FaMoneyCheckAlt, FaComments, FaLinkedin, FaGithub, FaTwitter, FaGlobe, FaMedium } from 'react-icons/fa';
import { MdLocationOn, MdAccessTime } from 'react-icons/md';
import { appTheme } from '../constant/theme';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const { theme } = useAppStore(['theme']);
  const navigate = useNavigate();

  return (
    <div style={{ 
      backgroundColor: appTheme[theme].base.primary,
      color: theme === "light" ? appTheme.text.primary : appTheme.text.inverted,
      minHeight: '100vh'
    }}>
      {/* Hero Section */}
      <section className="px-6 py-20 text-center" style={{ backgroundColor: appTheme[theme].accent.primary }}>
        <h1 className="text-4xl font-bold mb-6 text-white">Bridge Your Academic Gaps with Peer Tutoring</h1>
        <p className="text-xl mb-8 text-white opacity-90">
          Connect instantly with qualified tutors across campus or online
        </p>
        <div className="flex justify-center gap-4 mb-12">
          <button 
            onClick={()=> navigate("/login")}
            className="px-8 py-3 rounded-lg font-semibold"
            style={{ 
              backgroundColor: appTheme.text.inverted,
              color: appTheme[theme].accent.primary
            }}
          >
            Find a Tutor Now
          </button>
        </div>
        <div className="max-w-4xl mx-auto">
          <img 
            src="https://images.unsplash.com/photo-1580894732444-8ecded7900cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80" 
            alt="Students collaborating" 
            className="rounded-xl shadow-xl"
          />
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
      <div 
        className="p-8 rounded-xl text-center transition-transform duration-300 hover:transform hover:scale-105"
        style={{ 
          backgroundColor: appTheme[theme].surface.elevated,
          boxShadow: appTheme.shadows.md
        }}
      >
        <div className="relative w-32 h-32 mx-auto mb-6">
          <img 
            src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80" 
            alt="Team member" 
            className="rounded-full w-full h-full object-cover border-4"
            style={{ borderColor: appTheme[theme].accent.primary }}
          />
        </div>
        <h3 className="text-xl font-bold mb-2">Kwame Osei</h3>
        <p className="text-sm mb-4" style={{ color: appTheme[theme].accent.primary }}>
          Founder & CEO
        </p>
        <p className="mb-4 opacity-90">
          Education technology enthusiast with a passion for connecting students
        </p>
        <div className="flex justify-center gap-4">
          <a href="#" className="p-2 rounded-full hover:bg-opacity-10" 
            style={{ color: appTheme[theme].accent.primary, backgroundColor: appTheme[theme].neutral[200] }}>
            <FaLinkedin className="text-xl" />
          </a>
          <a href="#" className="p-2 rounded-full hover:bg-opacity-10"
            style={{ color: appTheme[theme].accent.primary, backgroundColor: appTheme[theme].neutral[200] }}>
            <FaTwitter className="text-xl" />
          </a>
        </div>
      </div>

      {/* Team Member 2 */}
      <div 
        className="p-8 rounded-xl text-center transition-transform duration-300 hover:transform hover:scale-105"
        style={{ 
          backgroundColor: appTheme[theme].surface.elevated,
          boxShadow: appTheme.shadows.md
        }}
      >
        <div className="relative w-32 h-32 mx-auto mb-6">
          <img 
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80" 
            alt="Team member" 
            className="rounded-full w-full h-full object-cover border-4"
            style={{ borderColor: appTheme[theme].accent.secondary }}
          />
        </div>
        <h3 className="text-xl font-bold mb-2">Ama Asante</h3>
        <p className="text-sm mb-4" style={{ color: appTheme[theme].accent.secondary }}>
          Head of Product
        </p>
        <p className="mb-4 opacity-90">
          UX specialist focused on creating seamless educational experiences
        </p>
        <div className="flex justify-center gap-4">
          <a href="#" className="p-2 rounded-full hover:bg-opacity-10"
            style={{ color: appTheme[theme].accent.secondary, backgroundColor: appTheme[theme].neutral[200] }}>
            <FaLinkedin className="text-xl" />
          </a>
          <a href="#" className="p-2 rounded-full hover:bg-opacity-10"
            style={{ color: appTheme[theme].accent.secondary, backgroundColor: appTheme[theme].neutral[200] }}>
            <FaGithub className="text-xl" />
          </a>
        </div>
      </div>

      {/* Team Member 3 */}
      <div 
        className="p-8 rounded-xl text-center transition-transform duration-300 hover:transform hover:scale-105"
        style={{ 
          backgroundColor: appTheme[theme].surface.elevated,
          boxShadow: appTheme.shadows.md
        }}
      >
        <div className="relative w-32 h-32 mx-auto mb-6">
          <img 
            src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80" 
            alt="Team member" 
            className="rounded-full w-full h-full object-cover border-4"
            style={{ borderColor: appTheme[theme].accent.tertiary }}
          />
        </div>
        <h3 className="text-xl font-bold mb-2">Kofi Mensah</h3>
        <p className="text-sm mb-4" style={{ color: appTheme[theme].accent.tertiary }}>
          Tech Lead
        </p>
        <p className="mb-4 opacity-90">
          Blockchain expert ensuring secure and reliable transactions
        </p>
        <div className="flex justify-center gap-4">
          <a href="#" className="p-2 rounded-full hover:bg-opacity-10"
            style={{ color: appTheme[theme].accent.tertiary, backgroundColor: appTheme[theme].neutral[200] }}>
            <FaGlobe className="text-xl" />
          </a>
          <a href="#" className="p-2 rounded-full hover:bg-opacity-10"
            style={{ color: appTheme[theme].accent.tertiary, backgroundColor: appTheme[theme].neutral[200] }}>
            <FaMedium className="text-xl" />
          </a>
        </div>
      </div>
    </div>

    {/* Advisors Section */}
    <div className="mt-20">
      <h3 className="text-xl font-bold text-center mb-8">Advisors</h3>
      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <div className="flex items-center gap-6 p-4 rounded-lg" 
          style={{ backgroundColor: appTheme[theme].surface.primary }}>
          <img 
            src="https://images.unsplash.com/photo-1545167622-3a6ac756afa4?ixlib=rb-1.2.1&auto=format&fit=crop&w=656&q=80" 
            className="w-16 h-16 rounded-full" 
            alt="Advisor" 
          />
          <div>
            <h4 className="font-bold">Dr. Nana Kwame</h4>
            <p className="text-sm opacity-75">Education Technology Professor</p>
          </div>
        </div>
        <div className="flex items-center gap-6 p-4 rounded-lg" 
          style={{ backgroundColor: appTheme[theme].surface.primary }}>
          <img 
            src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80" 
            className="w-16 h-16 rounded-full" 
            alt="Advisor" 
          />
          <div>
            <h4 className="font-bold">Esi Coleman</h4>
            <p className="text-sm opacity-75">Startup Mentor</p>
          </div>
        </div>
      </div>
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