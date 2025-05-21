import travelImg from "../assets/images/travel1.jpg";
import travelImg2 from "../assets/images/travel2.jpg";
export default function HeroSection()
{
    return(
            <div className="hero">
                {/* <img src={travelImg} style={{height:"95vh"}} className="img-fluid w-100" alt="Rail" /> */}
                <div id="travelCarousel" style={{height:"95vh"}} className="carousel slide" data-bs-ride="carousel">
                    <ul className="carousel-indicators" style={{listStyle:"none"}}>
                        <li
                            data-bs-target="#travelCarousel"
                            data-bs-slide-to="0"
                            className="active"
                            aria-current="true"
                            aria-label="First slide"
                        ></li>
                        <li
                            data-bs-target="#travelCarousel"
                            data-bs-slide-to="1"
                            aria-label="Second slide"
                        ></li>
                    </ul>
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img
                                src={travelImg}
                                className="w-100 d-block"
                                alt="First slide"
                            />
                            <div className="carousel-caption">
                                <h3>Travel Information System</h3>
                                <p>Here you can manage Info</p>
                            </div>
                        </div>
                        <div className="carousel-item">
                            <img
                                src={travelImg2}
                                className="w-100 d-block"
                                alt="Second slide"
                            />
                            <div className="carousel-caption">
                                <h3>Travel?</h3>
                                <p>You are at Right area</p>
                            </div>
                        </div>
                    </div>
                    <button
                        className="carousel-control-prev"
                        type="button"
                        data-bs-target="#travelCarousel"
                        data-bs-slide="prev"
                    >
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button
                        className="carousel-control-next"
                        type="button"
                        data-bs-target="#travelCarousel"
                        data-bs-slide="next"
                    >
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
                
                <div className="hero-box">
                    <h1>Travel Information System</h1>
                </div>
            </div>
    )
}