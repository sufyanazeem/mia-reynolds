import Link from "next/link"; // Corrected import statement
import { RiYoutubeFill, RiInstagramFill, RiSpotifyFill, RiSoundcloudFill } from 'react-icons/ri';

const socials = [ // Fixed the array declaration
    {
        path: '#',
        icon: <RiYoutubeFill />
    },
    {
        path: '#',
        icon: <RiInstagramFill />
    },
    {
        path: '#',
        icon: <RiSpotifyFill />
    },
    {
        path: '#',
        icon: <RiSoundcloudFill />
    },
]

const Social = ({ containerStyles, iconStyles }) => {
    return (
        <div className={`${containerStyles}`}>
            {socials.map((item, index) => {
                return <Link key={index} href={item.path}>
                
                <div className={`${iconStyles}`}>
                {item.icon}
                </div>
                
                </Link>
            })}
        </div>
    )
}

export default Social
