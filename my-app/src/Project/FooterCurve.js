import React from 'react'
import logo from "../Assets/logo.png";
// import "./Css/Footer.css";
import "./Css/Footer.css"

export default function FooterCurve() {
  return (
    <div><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#273036" fill-opacity="1" d="M0,288L48,272C96,256,192,224,288,197.3C384,171,480,149,576,165.3C672,181,768,235,864,250.7C960,267,1056,245,1152,250.7C1248,256,1344,288,1392,304L1440,320L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg>
    <div className='footer'>
        
      <div className='f-con'>
        <img src={logo} alt='logo'/>
        <p>Our Clinic has grown to provide a world class facility for the <br></br>
            clinic advanced restorative dentistry.<br></br>
             We are among the most qualified implant providers in the aus.</p>
      </div>
      <div className='f-con'>
        <h3>Departments</h3>
     <ul>
     <li>Laser Gum Surgery
</li>
     <li>Laser Depigmentation</li>
     <li>Laser Teeth Whitening</li>
     <li>Laser Root Canal Treatment</li>
     <li>Root Canal Treatment</li>
     <li>Dental Implant</li>
     <li>Orthodontic Braces</li>
     </ul>
      </div>
      <div className='f-con'>
        <h3>Contact Us</h3>
        <address>
            <ul className='address'>
       <li> Kodambakkam(Near Gokulam Signal)</li>
       <li>  No.28, 1st Cross Street, Trust Puram,</li>
       <li>Kodambakkam, Chennai-600024.</li>
       <li>For Appointment : +91 97908 97502</li>
</ul>
        </address>
      </div>

      </div>
    </div>
  )
}
