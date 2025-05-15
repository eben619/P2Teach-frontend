import React from 'react';
import useAppStore from '../../../store/useAppStore';
import { appTheme } from '../../../constant/theme';
import useUserStore from '../../../store/useUserStore';

const ProfilePage = () => {
    const { theme } = useAppStore(["theme"]);
    const textColor = theme === 'light' ? appTheme.text.primary : appTheme.text.inverted;
    const {currentUser} = useUserStore()

    return (
        <div style={{ 
            backgroundColor: appTheme[theme].base.primary,
            padding: '2rem'
        }}>
            <div style={{
                maxWidth: '800px',
                margin: '0 auto',
                backgroundColor: appTheme[theme].surface.primary,
                borderRadius: appTheme.radii.lg,
                boxShadow: appTheme.shadows.md,
                padding: '2rem'
            }}>
                {/* Profile Header */}
                <div style={{
                    display: 'flex',
                    gap: '1.5rem',
                    alignItems: 'center',
                    marginBottom: '2rem',
                    borderBottom: `2px solid ${appTheme[theme].neutral[200]}`,
                    paddingBottom: '2rem'
                }}>
                    <div style={{
                        width: '100px',
                        height: '100px',
                        borderRadius: appTheme.radii.full,
                        backgroundColor: appTheme[theme].accent.primary,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: appTheme.text.inverted,
                        fontSize: '2.5rem',
                        fontWeight: 600
                    }}>
                        JD
                    </div>
                    <div>
                        <h1 style={{ 
                            color: textColor,
                            fontSize: '1.875rem',
                            marginBottom: '0.5rem'
                        }}>
                            {currentUser?.firstname + " " + currentUser?.lastname}
                        </h1>
                        <p style={{ 
                            color: appTheme[theme].neutral[500],
                            marginBottom: '0.25rem'
                        }}>
                            {currentUser?.program}
                        </p>
                        <p style={{ color:appTheme[theme].neutral[500] }}>
                            Joined: {currentUser?.created_at?.toDateString()}
                        </p>
                    </div>
                </div>

                {/* Stats Grid */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '1rem',
                    marginBottom: '2rem'
                }}>
                    <StatCard 
                        title="Completed Sessions"
                        value="45"
                        color={appTheme[theme].status.success}
                        theme={theme}
                    />
                    <StatCard 
                        title="Courses Taken"
                        value="12"
                        color={appTheme[theme].accent.secondary}
                        theme={theme}
                    />
                    <StatCard 
                        title="Avg. Rating"
                        value="4.8"
                        color={appTheme[theme].status.warning}
                        theme={theme}
                    />
                </div>

                {/* Bio Section */}
                <div style={{ marginBottom: '2rem' }}>
                    <h2 style={{ 
                        color: textColor,
                        fontSize: '1.25rem',
                        marginBottom: '1rem'
                    }}>
                        About Me
                    </h2>
                    <p style={{ 
                        color: appTheme[theme].neutral[500],
                        lineHeight: '1.6'
                    }}>
                        Computer Science student passionate about AI and machine learning. 
                        Experienced in Python and JavaScript development. 
                        Enjoys mentoring peers in algorithm design.
                    </p>
                </div>

                {/* Action Buttons */}
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <Button color={appTheme[theme].accent.primary}>
                        Edit Profile
                    </Button>
                    <Button color={appTheme[theme].status.error}>
                        Delete Account
                    </Button>
                </div>
            </div>
        </div>
    );
};

// Stat Card Component
const StatCard = ({ title, value, color, theme }: { title: string; value: string; color: string, theme: "light" | "dark"}) => (
    <div style={{
        backgroundColor: appTheme[theme].surface.elevated,
        padding: '1rem',
        borderRadius: appTheme.radii.md,
        textAlign: 'center'
    }}>
        <div style={{ 
            color,
            fontSize: '1.5rem',
            fontWeight: 600,
            marginBottom: '0.5rem'
        }}>
            {value}
        </div>
        <div style={{ 
            color: appTheme[theme].neutral[500],
            fontSize: '0.875rem'
        }}>
            {title}
        </div>
    </div>
);

// Reusable Button Component
const Button = ({ color, children }: { color: string; children: React.ReactNode }) => (
    <button style={{
        backgroundColor: color,
        color: appTheme.text.inverted,
        padding: '0.75rem 1.5rem',
        borderRadius: appTheme.radii.md,
        border: 'none',
        cursor: 'pointer',
        transition: appTheme.effects.transition,
        filter: appTheme.effects.hover
    }}>
        {children}
    </button>
);

export default ProfilePage;