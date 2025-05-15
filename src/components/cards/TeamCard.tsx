import React from 'react'
import { FaGlobe, FaMedium } from 'react-icons/fa'
import { appTheme } from '../../constant/theme'

interface Props {
    theme: "light" | "dark",
    img: string,
    role: string,
    name: string
    roleDescription?: string

}

const TeamCard: React.FC<Props> = ({theme, img, role, roleDescription, name}) => {
  return (
    <div 
    className="p-8 rounded-xl text-center transition-transform duration-300 hover:transform hover:scale-105"
    style={{ 
      backgroundColor: appTheme[theme].surface.elevated,
      boxShadow: appTheme.shadows.md
    }}
  >
    <div className="relative w-32 h-32 mx-auto mb-6">
      <img 
        src={img} 
        alt="Team member" 
        className="rounded-full w-full h-full object-cover border-4"
        style={{ borderColor: appTheme[theme].accent.tertiary }}
      />
    </div>
    <h3 className="text-xl font-bold mb-2">{name}</h3>
    <p className="text-sm mb-4" style={{ color: appTheme[theme].accent.tertiary }}>
    {role}
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
  )
}

export default TeamCard