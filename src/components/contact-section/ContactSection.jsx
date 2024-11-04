import mapImage from "../../assets/map.png"

function ContactSection() {
    return(
        <section className="contact-section">
            <div className="contact-box">
                <div className="contact-info">
                    <h3>Have Any Questions? Contact Us</h3>
                    <p><strong>Phone:</strong> (703)-993-2975</p>
                    <p><strong>Email:</strong> property@gmu.edu</p>
                    <p><strong>Address:</strong> 4400 University Drive, MSN 2FL, Fairfax, Virginia 22030</p>
                </div>
                <div className="contact-map">
                    <img
                    src={mapImage}
                    alt="GMU Campus Map"
                    />
                </div>
            </div>
      </section>
    );
}

export default ContactSection