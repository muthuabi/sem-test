import travelImg2 from "../assets/images/travel2.jpg";
export default function AboutUs()
{
    return(
        <div className="about-us-container">
             <h2 className="text-center">About Us</h2>
        <div className="row mt-2 about-us">
            <div className="col-md-6 about-img-container">

                <img src={travelImg2} className="w-100 h-100" alt="Rail" />
                <div className="about-me-hidden">
                    <h3>Journey Makes Mind Relaxed</h3>
                </div>
            </div>
            <div className="col-md-6">
                <p style={{textAlign:"justify"}}>Lorem ipsum dolor, sit amet consectetur adipisicing elit. 
                    Nostrum dolorum quo exercitationem impedit in, 
                    inventore debitis ipsa pariatur accusantium ut error, aut minima 
                    quaerat provident eius neque veritatis asperiores quibusdam saepe 
                    nulla eveniet ipsum voluptatibus praesentium! Nulla hic expedita tempore excepturi 
                    minus reprehenderit doloribus, itaque molestias, dolores nisi harum! Dolorum perferendis 
                    cumque repudiandae, iste eius placeat sequi architecto accusamus, id recusandae enim maxime 
                    laboriosam nobis eos officiis odit blanditiis rerum qui! Laudantium earum pariatur enim 
                    nihil fugiat illo? Saepe, ullam obcaecati adipisci consequuntur libero quae consectetur 
                    ab incidunt distinctio quia ducimus sit accusamus. At numquam, facere itaque reiciendis 
                    dolor repellendus iusto exercitationem laboriosam omnis quia perferendis alias distinctio 
                    suscipit! Ex eum pariatur perspiciatis non, laboriosam vitae omnis veritatis velit earum 
                    similique. Accusantium sint recusandae pariatur aliquid beatae nam vero, nobis accusamus 
                    animi vel quia debitis. Illum quis nam corrupti dolorum blanditiis molestias cum culpa 
                    ipsum asperiores, doloribus illo a iure fuga, accusantium dolorem. Delectus exercitationem 
                    magni, molestias nostrum sapiente maxime eligendi explicabo tempora placeat, minima odio 
                    voluptatibus nisi rerum quis libero cum! Ipsum, cupiditate culpa voluptatum fugiat aperiam 
                    qui quo quisquam minus velit rerum unde ullam omnis esse fuga.
                     Dolorum at esse architecto ab 
                     dignissimos voluptas inventore quisquam libero optio.</p>
            </div>
        </div>
        </div>
    )
}