import {IconProps} from "@/components/icons/interface";

export default function LinkedIn({size = 24, color = 'currentColor', title = 'LinkedIn', ...props}: IconProps) {

    return (
        <svg xmlns="http://www.w3.org/2000/svg"
             width={size}
             height={size}
             viewBox="0 0 24 24"
             fill="none"
             stroke={color}
             strokeWidth="2"
             strokeLinecap="round"
             strokeLinejoin="round"
             {...props}
        >
            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
            <rect width="4" height="12" x="2" y="9"/>
            <circle cx="4" cy="4" r="2"/>
            <title>{title}</title>
        </svg>
    )
}
