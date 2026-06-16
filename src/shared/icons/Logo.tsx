
export const Logo = (props: React.SVGProps<SVGSVGElement>) => {
    return (
     <svg 
    {...props}
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 200 120"
>
    <g 
        fill="none" 
        stroke="#BF9430" 
        strokeWidth="10" 
        strokeLinecap="round" 
        strokeLinejoin="round"
    >
        <path d="M20 100 L70 20 L85 45 L45 100 Z" />
        <path d="M180 100 L130 20 L115 45 L155 100 Z" />
        <path d="M80 90 L100 55 L120 90 Z" />
    </g>
</svg>

    )
}


