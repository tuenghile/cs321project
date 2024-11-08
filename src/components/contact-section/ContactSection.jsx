import mapImage from "../../assets/map.png"
import styles from "./ContactSection.module.css"

function ContactSection() {
    return(
        <section className={styles.contactSection} id="contact">
            <h2>Contact</h2>
            <div className={styles.contactContent}>
                <div className={styles.contactBox}>
                    <div className={styles.contactInfo}>
                        <h3>Have Any Questions? Reach out to us!</h3>
                        <p><strong>Phone:</strong> (703)-993-2975</p>
                        <p><strong>Email:</strong> property@gmu.edu</p>
                        <p><strong>Address:</strong> 4400 University Drive, MSN 2FL, Fairfax, Virginia 22030</p>
                    </div>
                </div>
                <div className={styles.contactMap}>
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