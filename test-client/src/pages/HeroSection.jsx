import railImg from "../assets/images/rail1.jpg";
export default function HeroSection()
{
    return(
            <div className="hero">
                <img src={railImg} style={{height:"95vh"}} className="img-fluid w-100" alt="Rail" />
                <div className="hero-box">
                    <h1>Train Reservation System</h1>
                    <b>Welcomes you to Safe Journey</b>
                </div>
            </div>
    )
}