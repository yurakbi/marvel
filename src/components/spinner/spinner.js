const Spinner = () => {
    return (
            <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" style={{margin: '0 auto', background: 'none', display: 'block'}} width="224px" height="224px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
                <circle cx="50" cy="50" r="24" strokeWidth="2" stroke="#1d0e0b" strokeDasharray="37.69911184307752 37.69911184307752" fill="none" strokeLinecap="round">
                <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1.4492753623188404s" keyTimes="0;1" values="0 50 50;360 50 50"></animateTransform>
                </circle>
            </svg>
   
    )
}

export default Spinner;